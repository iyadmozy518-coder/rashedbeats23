import { createClient } from "@supabase/supabase-js";

function getPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}

export async function GET(request, { params }) {
  const { reference } = await params;
  const token = new URL(request.url).searchParams.get("token") || "";

  if (!/^RB-[0-9]{4}-[0-9]{6}$/.test(reference) || !/^[0-9a-f]{64}$/i.test(token)) {
    return Response.json({ error: "Order not found." }, { status: 404 });
  }

  const { data, error } = await getPublicClient().rpc("get_customer_order", {
    p_order_reference: reference,
    p_access_token: token,
  });

  if (error || !data) {
    console.error("Order lookup failed:", error);
    return Response.json({ error: "Order not found." }, { status: 404 });
  }

  return Response.json({ order: data });
}
