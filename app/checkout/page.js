"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function CheckoutContent() {
  const searchParams = useSearchParams();

  const beat = searchParams.get("beat") || "UNKNOWN BEAT";
  const genre = searchParams.get("genre") || "UNKNOWN";
  const cover = searchParams.get("cover") || "/beats/after-dark.jpg";
  const license = searchParams.get("license") || "PREMIUM";
  const price = searchParams.get("price") || "59";

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  function continueToPayment(e) {
    e.preventDefault();

    setError("");

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    setStep(2);
  }

  function formatCardNumber(value) {
    const numbers = value.replace(/\D/g, "").slice(0, 16);

    return numbers.replace(/(.{4})/g, "$1 ").trim();
  }

  function formatExpiry(value) {
    const numbers = value.replace(/\D/g, "").slice(0, 4);

    if (numbers.length > 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    }

    return numbers;
  }

  function payNow(e) {
    e.preventDefault();

    setError("");

    if (cardName.trim().length < 2) {
      setError("Please enter the name on the card.");
      return;
    }

    if (cardNumber.replace(/\s/g, "").length < 16) {
      setError("Please enter a valid card number.");
      return;
    }

    if (expiry.length < 5) {
      setError("Please enter a valid expiry date.");
      return;
    }

    if (cvv.length < 3) {
      setError("Please enter a valid CVV.");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      alert(
        "Payment UI is working! The real payment gateway will be connected next."
      );
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-black px-5 py-16 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-12">

          <Link
            href="/"
            className="text-xs tracking-[0.25em] text-zinc-500 transition hover:text-white"
          >
            ← BACK TO STORE
          </Link>

          <p className="mt-10 text-[10px] tracking-[0.35em] text-red-500">
            RASHEDBEATS
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            CHECKOUT
          </h1>

          <p className="mt-3 text-sm text-zinc-500">
            Complete your purchase and get your beat instantly.
          </p>

        </div>

        {/* PROGRESS */}

        <div className="mb-8 flex items-center gap-3">

          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
              step >= 1
                ? "bg-white text-black"
                : "bg-white/10 text-zinc-600"
            }`}
          >
            1
          </div>

          <div
            className={`h-px w-16 transition-all ${
              step >= 2
                ? "bg-red-500"
                : "bg-white/10"
            }`}
          />

          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
              step >= 2
                ? "bg-white text-black"
                : "bg-white/10 text-zinc-600"
            }`}
          >
            2
          </div>

          <span className="ml-2 text-[10px] tracking-[0.2em] text-zinc-600">
            {step === 1 ? "CUSTOMER INFO" : "PAYMENT"}
          </span>

        </div>

        {/* MAIN GRID */}

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

          {/* LEFT SIDE */}

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-2xl sm:p-9">

            <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-red-700/10 blur-[100px]" />

            <div className="relative z-10">

              {/* STEP 1 */}

              {step === 1 && (

                <form
                  onSubmit={continueToPayment}
                  className="animate-[fadeIn_0.4s_ease-out]"
                >

                  <p className="text-[10px] tracking-[0.3em] text-zinc-500">
                    STEP 01
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold">
                    Where should we send your beat?
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    Enter your email and we'll use it for your order and
                    digital delivery.
                  </p>

                  <div className="mt-8">

                    <label className="text-xs text-zinc-400">
                      EMAIL ADDRESS
                    </label>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="you@example.com"
                      autoFocus
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-red-500/50 focus:bg-white/[0.04]"
                    />

                    <p className="mt-2 text-[10px] text-zinc-600">
                      Your download link will be sent here.
                    </p>

                  </div>

                  {error && (
                    <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-xs text-red-400">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="mt-8 w-full rounded-xl bg-white px-5 py-4 text-sm font-semibold tracking-wide text-black transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)]"
                  >
                    CONTINUE TO PAYMENT →
                  </button>

                </form>

              )}

              {/* STEP 2 */}

              {step === 2 && (

                <form
                  onSubmit={payNow}
                  className="animate-[fadeIn_0.4s_ease-out]"
                >

                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setError("");
                    }}
                    className="mb-7 text-[10px] tracking-[0.2em] text-zinc-600 transition hover:text-white"
                  >
                    ← BACK
                  </button>

                  <p className="text-[10px] tracking-[0.3em] text-red-500">
                    STEP 02
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold">
                    Payment details
                  </h2>

                  <p className="mt-3 text-sm text-zinc-600">
                    Paying for {beat} — {license}.
                  </p>

                  {/* CARD PREVIEW */}

                  <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-800 via-zinc-950 to-black p-6 shadow-2xl">

                    <div className="flex items-start justify-between">

                      <span className="text-[9px] tracking-[0.3em] text-zinc-500">
                        RASHEDBEATS
                      </span>

                      <span className="text-xs text-zinc-600">
                        CARD
                      </span>

                    </div>

                    <div className="mt-10 text-lg tracking-[0.25em] text-zinc-300">
                      {cardNumber || "•••• •••• •••• ••••"}
                    </div>

                    <div className="mt-6 flex justify-between">

                      <div>
                        <p className="text-[8px] tracking-[0.2em] text-zinc-600">
                          CARD HOLDER
                        </p>

                        <p className="mt-1 text-xs uppercase text-zinc-400">
                          {cardName || "YOUR NAME"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[8px] tracking-[0.2em] text-zinc-600">
                          EXPIRES
                        </p>

                        <p className="mt-1 text-xs text-zinc-400">
                          {expiry || "MM/YY"}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* CARD INFORMATION */}

                  <div className="mt-8">

                    <label className="text-xs text-zinc-400">
                      CARD NUMBER
                    </label>

                    <input
                      type="text"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                      }
                      placeholder="1234 5678 9012 3456"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm tracking-wider text-white outline-none transition placeholder:text-zinc-700 focus:border-red-500/50"
                    />

                    <div className="mt-3 grid grid-cols-2 gap-3">

                      <div>

                        <label className="text-xs text-zinc-400">
                          EXPIRY
                        </label>

                        <input
                          type="text"
                          inputMode="numeric"
                          value={expiry}
                          onChange={(e) =>
                            setExpiry(formatExpiry(e.target.value))
                          }
                          placeholder="MM/YY"
                          className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-red-500/50"
                        />

                      </div>

                      <div>

                        <label className="text-xs text-zinc-400">
                          CVV
                        </label>

                        <input
                          type="password"
                          inputMode="numeric"
                          maxLength={4}
                          value={cvv}
                          onChange={(e) =>
                            setCvv(e.target.value.replace(/\D/g, ""))
                          }
                          placeholder="•••"
                          className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-red-500/50"
                        />

                      </div>

                    </div>

                    <label className="mt-4 block text-xs text-zinc-400">
                      NAME ON CARD
                    </label>

                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Rashed"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-red-500/50"
                    />

                  </div>

                  {error && (
                    <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-xs text-red-400">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={processing}
                    className="mt-8 w-full rounded-xl bg-white px-5 py-4 text-sm font-semibold tracking-wide text-black transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {processing
                      ? "PROCESSING..."
                      : `PAY $${price}`}
                  </button>

                  <div className="mt-5 text-center text-[10px] tracking-wide text-zinc-600">
                    🔒 SECURE PAYMENT • DIGITAL DELIVERY
                  </div>

                </form>

              )}

            </div>

          </div>

          {/* ORDER SUMMARY */}

          <aside className="h-fit overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl">

            <div className="relative aspect-video w-full">

              <Image
                src={cover}
                alt={beat}
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute bottom-5 left-5">

                <p className="text-[9px] tracking-[0.3em] text-zinc-400">
                  BEAT
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {beat}
                </h2>

              </div>

            </div>

            <div className="p-7">

              <p className="text-[10px] tracking-[0.3em] text-zinc-500">
                ORDER SUMMARY
              </p>

              <div className="mt-6 flex items-center justify-between">

                <div>

                  <p className="text-sm font-semibold">
                    {beat}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    {genre}
                  </p>

                </div>

                <span className="text-sm text-zinc-300">
                  ${price}
                </span>

              </div>

              <div className="my-6 h-px bg-white/10" />

              <div className="flex items-center justify-between">

                <span className="text-xs text-zinc-500">
                  LICENSE
                </span>

                <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[10px] font-semibold text-red-400">
                  {license}
                </span>

              </div>

              {email && (

                <div className="mt-5 flex items-center justify-between">

                  <span className="text-xs text-zinc-500">
                    EMAIL
                  </span>

                  <span className="max-w-[190px] truncate text-xs text-zinc-400">
                    {email}
                  </span>

                </div>

              )}

              <div className="mt-7 flex items-end justify-between">

                <span className="text-xs tracking-[0.2em] text-zinc-500">
                  TOTAL
                </span>

                <span className="text-3xl font-bold">
                  ${price}
                </span>

              </div>

              <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.03] p-4">

                <p className="text-xs font-semibold text-zinc-300">
                  INSTANT DIGITAL DELIVERY
                </p>

                <p className="mt-2 text-[11px] leading-5 text-zinc-600">
                  Your licensed beat files will be delivered digitally after successful payment.
                </p>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
          <div className="text-center">
            <p className="text-[10px] tracking-[0.35em] text-red-500">
              RASHEDBEATS
            </p>

            <p className="mt-3 text-sm text-zinc-600">
              LOADING CHECKOUT...
            </p>
          </div>
        </main>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}