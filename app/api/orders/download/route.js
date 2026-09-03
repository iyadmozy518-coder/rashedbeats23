import { createHash } from "node:crypto";
import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";

const referencePattern = /^RB-[0-9]{4}-[0-9]{6}$/;
const tokenPattern = /^[0-9a-f]{64}$/i;
const bucket = "beat-deliverables";

function invalidAccess() {
  return Response.json({ error: "Order access could not be verified." }, { status: 401 });
}

function hashToken(token) {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const orderReference = String(body?.order_reference || "");
    const token = String(body?.token || "");
    const deliverableId = body?.deliverable_id == null ? "" : String(body.deliverable_id);

    if (!referencePattern.test(orderReference) || !tokenPattern.test(token)) {
      return invalidAccess();
    }

    const supabase = getSupabaseAdmin();
    const tokenHash = hashToken(token);
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("beat_id, selected_license, payment_status")
      .eq("order_reference", orderReference)
      .eq("order_access_token_hash", tokenHash)
      .maybeSingle();

    if (orderError || !order) return invalidAccess();
    if (order.payment_status !== "paid") {
      return Response.json({ error: "Downloads are available after payment approval." }, { status: 403 });
    }

    const { data: files, error: filesError } = await supabase
      .from("beat_deliverables")
      .select("id, file_name, storage_path")
      .eq("beat_id", order.beat_id)
      .eq("license", order.selected_license)
      .order("file_name", { ascending: true });

    if (filesError) {
      console.error("Deliverable lookup failed:", filesError);
      return Response.json({ error: "Downloads are temporarily unavailable." }, { status: 500 });
    }

    if (!deliverableId) {
      return Response.json({
        deliverables: (files || []).map((file) => ({ id: file.id, file_name: file.file_name })),
      });
    }

    if (!deliverableId || deliverableId.length > 200) {
      return Response.json({ error: "Deliverable not found." }, { status: 404 });
    }

    const file = (files || []).find((entry) => String(entry.id) === deliverableId);
    if (!file) return Response.json({ error: "Deliverable not found." }, { status: 404 });

    const { data: signed, error: signedError } = await supabase.storage
      .from(bucket)
      .createSignedUrl(file.storage_path, 180, { download: file.file_name });

    if (signedError || !signed?.signedUrl) {
      console.error("Deliverable signing failed:", signedError);
      return Response.json({ error: "This download is temporarily unavailable." }, { status: 500 });
    }

    return Response.json({ file_name: file.file_name, url: signed.signedUrl });
  } catch (error) {
    console.error("Download authorization failed:", error);
    return Response.json({ error: "This download is temporarily unavailable." }, { status: 500 });
  }
}
