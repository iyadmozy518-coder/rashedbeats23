"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { supabase } from "../../lib/supabase";

const methods = [["instapay", "InstaPay"], ["vodafone_cash", "Vodafone Cash"], ["telda", "Telda"]];

function formatEgp(value) {
  return `${Number(value).toLocaleString("en-US")} EGP`;
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const beatId = searchParams.get("beatId") || "";
  const beat = searchParams.get("beat") || "UNKNOWN BEAT";
  const license = searchParams.get("license") || "PREMIUM";
  const displayPrice = searchParams.get("price") || "";
  const cover = searchParams.get("cover") || "/beats/after-dark.jpg";
  const [paymentSettings, setPaymentSettings] = useState(null);
  const [method, setMethod] = useState("instapay");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [proof, setProof] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      const { data, error: settingsError } = await supabase.rpc("get_checkout_payment_settings");
      if (settingsError) {
        console.error("Payment settings error:", settingsError);
        setError("Payment details are temporarily unavailable.");
      } else {
        setPaymentSettings(data || {});
      }
      setLoadingSettings(false);
    }
    loadSettings();
  }, []);

  const selectedMethod = paymentSettings?.[method] || {};
  const hasPaymentDetails = Boolean(selectedMethod.account);

  async function copyAccount() {
    if (!selectedMethod.account) return;
    await navigator.clipboard.writeText(selectedMethod.account);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  function selectProof(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.type) || file.size > 10 * 1024 * 1024) {
      setError("Upload a JPG, PNG, WEBP, or PDF smaller than 10 MB.");
      return;
    }
    setError("");
    setProof(file);
  }

  async function submitOrder(event) {
    event.preventDefault();
    setError("");
    if (!beatId) return setError("This checkout link is missing the beat identity.");
    if (name.trim().length < 2) return setError("Enter your full name.");
    if (!email.includes("@") || !email.includes(".")) return setError("Enter a valid email address.");
    if (!hasPaymentDetails) return setError("This payment method is currently unavailable.");
    if (!proof) return setError("Upload your payment proof before submitting.");

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("beatId", beatId);
      formData.append("license", license);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("paymentMethod", method);
      formData.append("proof", proof);
      const response = await fetch("/api/orders", { method: "POST", body: formData });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setSuccess(result.order);
    } catch (submitError) {
      console.error("Checkout submission failed:", submitError);
      setError("We could not submit your order. Please check your details and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return <main className="min-h-screen bg-black px-5 py-16 text-white sm:px-8 lg:px-12"><div className="mx-auto max-w-2xl"><p className="text-[10px] tracking-[0.35em] text-red-500">RASHEDBEATS / ORDER RECEIVED</p><h1 className="mt-4 text-4xl font-bold">PENDING VERIFICATION</h1><p className="mt-4 text-sm leading-7 text-zinc-500">Your payment is being reviewed. You will receive access to your files once the payment is confirmed.</p><div className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.03] p-7 sm:p-9"><Detail label="ORDER REFERENCE" value={success.order_reference} /><Detail label="BEAT" value={success.beat_title} /><Detail label="LICENSE" value={success.selected_license} /><Detail label="AMOUNT" value={formatEgp(success.amount)} /><Detail label="PAYMENT METHOD" value={method.replace("_", " ").toUpperCase()} /><Detail label="STATUS" value="PENDING" /></div><Link href={`/order/${success.order_reference}?token=${success.access_token}`} className="mt-7 inline-flex rounded-full bg-white px-7 py-4 text-xs font-semibold tracking-[0.2em] text-black">VIEW ORDER STATUS</Link></div></main>;
  }

  return <main className="min-h-screen bg-black px-5 py-16 text-white sm:px-8 lg:px-12"><div className="mx-auto max-w-6xl"><Link href="/" className="text-xs tracking-[0.25em] text-zinc-500 hover:text-white">BACK TO STORE</Link><p className="mt-10 text-[10px] tracking-[0.35em] text-red-500">RASHEDBEATS / CHECKOUT</p><h1 className="mt-3 text-4xl font-bold">MANUAL PAYMENT</h1><p className="mt-3 text-sm text-zinc-500">Complete the transfer, upload your proof, and submit the order for review.</p><form onSubmit={submitOrder} className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]"><section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7 sm:p-9"><h2 className="text-2xl font-semibold">Customer details</h2><div className="mt-7 space-y-5"><Field label="FULL NAME" value={name} onChange={setName} placeholder="Your full name" /><Field label="EMAIL ADDRESS" value={email} onChange={setEmail} placeholder="you@example.com" type="email" /><Field label="PHONE (OPTIONAL)" value={phone} onChange={setPhone} placeholder="01xxxxxxxxx" /></div><h2 className="mt-10 text-2xl font-semibold">Payment method</h2><div className="mt-5 grid gap-3 sm:grid-cols-3">{methods.map(([id, label]) => { const configured = Boolean(paymentSettings?.[id]?.account); return <button type="button" key={id} disabled={!configured || loadingSettings} onClick={() => setMethod(id)} className={`rounded-2xl border p-4 text-left transition ${method === id ? "border-red-500/60 bg-red-500/[0.08]" : "border-white/10 bg-black/20"} disabled:cursor-not-allowed disabled:opacity-40`}><span className="text-sm font-semibold">{label}</span><span className="mt-2 block text-[9px] tracking-[0.15em] text-zinc-600">{configured ? "AVAILABLE" : "NOT CONFIGURED"}</span></button>; })}</div><div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-5">{loadingSettings ? <p className="text-xs text-zinc-500">LOADING PAYMENT DETAILS...</p> : hasPaymentDetails ? <><p className="text-[9px] tracking-[0.25em] text-red-400">{selectedMethod.display_name || methods.find(([id]) => id === method)?.[1]}</p><div className="mt-3 flex items-center justify-between gap-3"><p className="break-all text-lg font-semibold">{selectedMethod.account}</p><button type="button" onClick={copyAccount} className="shrink-0 rounded-full border border-white/10 px-3 py-2 text-[9px] tracking-[0.15em] text-zinc-400">{copied ? "COPIED" : "COPY"}</button></div>{selectedMethod.instructions && <p className="mt-4 whitespace-pre-line text-sm leading-6 text-zinc-500">{selectedMethod.instructions}</p>}</> : <p className="text-sm text-zinc-500">This payment method is currently unavailable.</p>}</div><h2 className="mt-10 text-2xl font-semibold">Payment proof</h2><label className="mt-5 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-white/15 bg-black/20 p-5"><span className="min-w-0"><span className="block text-sm font-semibold">{proof ? proof.name : "Upload transfer screenshot or PDF"}</span><span className="mt-2 block text-xs text-zinc-600">Maximum 10 MB</span></span><span className="shrink-0 rounded-full bg-white px-4 py-2 text-[9px] font-semibold tracking-[0.15em] text-black">CHOOSE FILE</span><input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={selectProof} className="hidden" /></label>{error && <p className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-4 text-sm text-red-300">{error}</p>}<button type="submit" disabled={submitting || loadingSettings || !hasPaymentDetails} className="mt-7 w-full rounded-xl bg-white px-5 py-4 text-sm font-semibold tracking-wide text-black disabled:cursor-not-allowed disabled:opacity-50">{submitting ? "SUBMITTING ORDER..." : "I&apos;VE PAID / SUBMIT ORDER"}</button></section><aside className="h-fit overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]"><div className="relative aspect-video"><Image src={cover} alt={beat} fill className="object-cover" priority /></div><div className="space-y-4 p-6"><Detail label="BEAT" value={beat} /><Detail label="LICENSE" value={license} /><Detail label="DISPLAY PRICE" value={displayPrice ? formatEgp(displayPrice) : "CALCULATED AT SUBMISSION"} /><Detail label="CURRENCY" value="EGP" /><p className="pt-3 text-xs leading-6 text-zinc-600">The final amount is verified from the selected beat in the database when your order is created.</p></div></aside></form></div></main>;
}

function Field({ label, value, onChange, placeholder, type = "text" }) { return <label className="block"><span className="text-[9px] tracking-[0.25em] text-zinc-500">{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-sm outline-none placeholder:text-zinc-700 focus:border-red-500/50" /></label>; }
function Detail({ label, value }) { return <div className="flex items-center justify-between gap-5 border-b border-white/5 pb-3 last:border-0"><span className="text-[9px] tracking-[0.2em] text-zinc-600">{label}</span><span className="text-right text-sm text-zinc-200">{value}</span></div>; }
export default function CheckoutPage() { return <Suspense fallback={<main className="min-h-screen bg-black p-10 text-center text-xs tracking-[0.3em] text-zinc-500">LOADING CHECKOUT...</main>}><CheckoutContent /></Suspense>; }
