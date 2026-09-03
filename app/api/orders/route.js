import { createClient } from "@supabase/supabase-js";

const allowedMethods = new Set(["instapay", "vodafone_cash", "telda"]);
const allowedLicenses = new Set(["BASIC", "PREMIUM", "UNLIMITED"]);
const maxProofSize = 10 * 1024 * 1024;
const allowedProofTypes = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Server Supabase credentials are not configured.");
  }

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function badRequest(message) {
  return Response.json({ error: message }, { status: 400 });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const beatId = String(formData.get("beatId") || "");
    const license = String(formData.get("license") || "");
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const phone = String(formData.get("phone") || "").trim();
    const paymentMethod = String(formData.get("paymentMethod") || "");
    const proof = formData.get("proof");

    if (!/^[0-9a-f-]{36}$/i.test(beatId)) return badRequest("Invalid beat.");
    if (!allowedLicenses.has(license)) return badRequest("Invalid license.");
    if (!allowedMethods.has(paymentMethod)) return badRequest("Invalid payment method.");
    if (name.length < 2 || name.length > 120) return badRequest("Enter your full name.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 254) {
      return badRequest("Enter a valid email address.");
    }
    if (phone.length > 40) return badRequest("Enter a valid phone number.");
    if (!(proof instanceof File) || !allowedProofTypes.has(proof.type)) {
      return badRequest("Upload a JPG, PNG, WEBP, or PDF payment proof.");
    }
    if (proof.size === 0 || proof.size > maxProofSize) {
      return badRequest("Payment proof must be smaller than 10 MB.");
    }

    const supabase = getAdminClient();
    const { data: order, error: orderError } = await supabase.rpc("create_pending_order", {
      p_beat_id: beatId,
      p_selected_license: license,
      p_customer_name: name,
      p_customer_email: email,
      p_customer_phone: phone || null,
      p_payment_method: paymentMethod,
    });

    if (orderError || !order?.order_reference || !order?.access_token) {
      console.error("Order creation failed:", orderError);
      return Response.json({ error: "We could not create your order. Please try again." }, { status: 500 });
    }

    const extension = proof.name.split(".").pop()?.toLowerCase() || "bin";
    const proofPath = `${order.order_reference}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from("payment-proofs")
      .upload(proofPath, proof, { contentType: proof.type, upsert: false });

    if (uploadError) {
      console.error("Payment proof upload failed:", uploadError);
      return Response.json({ error: "Your order was created, but the proof upload failed. Please try again." }, { status: 500 });
    }

    const { error: attachError } = await supabase
      .from("orders")
      .update({ payment_proof_path: proofPath, updated_at: new Date().toISOString() })
      .eq("order_reference", order.order_reference);

    if (attachError) {
      console.error("Payment proof association failed:", attachError);
      return Response.json({ error: "We could not finish your order. Please contact support." }, { status: 500 });
    }

    return Response.json({
      order: {
        ...order,
        payment_proof_path: undefined,
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Order route failed:", error);
    return Response.json({ error: "We could not process your order. Please try again." }, { status: 500 });
  }
}
