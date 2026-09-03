"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function formatEgp(value) {
  return `${Number(value).toLocaleString("en-US")} EGP`;
}

const statusCopy = {
  pending: ["PENDING VERIFICATION", "Payment is being reviewed."],
  paid: ["PAYMENT CONFIRMED", "Your files are ready."],
  rejected: ["PAYMENT PROOF REJECTED", "Payment proof was rejected."],
  cancelled: ["ORDER CANCELLED", "Order cancelled."],
};

export default function OrderPage() {
  const { reference } = useParams();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deliverables, setDeliverables] = useState([]);
  const [downloadsLoading, setDownloadsLoading] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);

  async function loadDeliverables(orderReference, accessToken) {
    setDownloadsLoading(true);
    setDownloadError("");

    try {
      const response = await fetch("/api/orders/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_reference: orderReference,
          token: accessToken,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      setDeliverables(result.deliverables || []);
    } catch (loadError) {
      console.error("Deliverables lookup failed:", loadError);
      setDownloadError("Downloads are temporarily unavailable.");
    } finally {
      setDownloadsLoading(false);
    }
  }

  async function downloadDeliverable(deliverableId) {
    setDownloadingId(deliverableId);
    setDownloadError("");

    try {
      const response = await fetch("/api/orders/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_reference: reference,
          token,
          deliverable_id: deliverableId,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      const link = document.createElement("a");
      link.href = result.url;
      link.download = result.file_name;
      link.rel = "noreferrer";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (downloadError) {
      console.error("Deliverable download failed:", downloadError);
      setDownloadError("This download is temporarily unavailable.");
    } finally {
      setDownloadingId(null);
    }
  }

  useEffect(() => {
    let active = true;

    async function loadOrder() {
      if (!reference || !token) {
        setError("This order link is incomplete.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/orders/${encodeURIComponent(reference)}?token=${encodeURIComponent(token)}`);
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        if (active) setOrder(result.order);
        if (result.order.payment_status === "paid") {
          await loadDeliverables(reference, token);
        }
      } catch (loadError) {
        console.error("Order page lookup failed:", loadError);
        if (active) setError("We could not find this order.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadOrder();
    return () => { active = false; };
  }, [reference, token]);

  if (loading) return <main className="min-h-screen bg-black px-6 py-20 text-white"><p className="text-center text-xs tracking-[0.3em] text-zinc-500">LOADING ORDER...</p></main>;

  if (error || !order) return <main className="min-h-screen bg-black px-6 py-20 text-white"><div className="mx-auto max-w-lg text-center"><p className="text-xs tracking-[0.3em] text-red-400">ORDER UNAVAILABLE</p><p className="mt-4 text-zinc-500">{error}</p><Link href="/" className="mt-8 inline-block text-xs tracking-[0.2em] text-white">BACK TO STORE</Link></div></main>;

  const [heading, message] = statusCopy[order.payment_status] || statusCopy.pending;

  return (
    <main className="min-h-screen bg-black px-5 py-16 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-xs tracking-[0.25em] text-zinc-500 hover:text-white">BACK TO STORE</Link>
        <p className="mt-14 text-[10px] tracking-[0.35em] text-red-500">RASHEDBEATS / ORDER</p>
        <h1 className="mt-3 text-4xl font-bold">{heading}</h1>
        <p className="mt-4 text-sm leading-7 text-zinc-500">{message}</p>

        <div className="mt-10 space-y-4 rounded-[28px] border border-white/10 bg-white/[0.03] p-7 sm:p-9">
          <Detail label="ORDER REFERENCE" value={order.order_reference} />
          <Detail label="BEAT" value={order.beat_title} />
          <Detail label="LICENSE" value={order.selected_license} />
          <Detail label="AMOUNT" value={formatEgp(order.amount)} />
          <Detail label="PAYMENT METHOD" value={order.payment_method.replace("_", " ").toUpperCase()} />
          <Detail label="STATUS" value={order.payment_status.toUpperCase()} />
          <Detail label="CREATED" value={new Date(order.created_at).toLocaleString()} />
          <Detail label="UPDATED" value={new Date(order.updated_at).toLocaleString()} />
        </div>

        {order.payment_status === "paid" && (
          <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/[0.06] p-5 text-sm text-green-300">
            <p>Payment confirmed. Your {order.selected_license} files are ready.</p>
            {downloadsLoading ? (
              <p className="mt-4 text-xs text-green-200/70">LOADING DOWNLOADS...</p>
            ) : deliverables.length ? (
              <div className="mt-5 space-y-3">
                {deliverables.map((deliverable) => (
                  <div key={deliverable.id} className="flex items-center justify-between gap-4 rounded-xl border border-green-300/15 bg-black/20 p-3">
                    <span className="min-w-0 truncate text-sm text-green-100">{deliverable.file_name}</span>
                    <button type="button" onClick={() => downloadDeliverable(deliverable.id)} disabled={downloadingId === deliverable.id} className="shrink-0 rounded-full bg-white px-4 py-2 text-[9px] font-semibold tracking-[0.15em] text-black disabled:opacity-50">
                      {downloadingId === deliverable.id ? "PREPARING..." : "DOWNLOAD"}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-xs text-green-200/70">No delivery files have been configured yet.</p>
            )}
            {downloadError && <p className="mt-4 text-xs text-red-200">{downloadError}</p>}
          </div>
        )}
      </div>
    </main>
  );
}

function Detail({ label, value }) {
  return <div className="flex items-center justify-between gap-5 border-b border-white/5 pb-4 last:border-0 last:pb-0"><span className="text-[9px] tracking-[0.2em] text-zinc-600">{label}</span><span className="text-right text-sm text-zinc-200">{value}</span></div>;
}
