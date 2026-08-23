"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BeatDetailsModal({ beat, onClose, onPlay }) {
  const router = useRouter();

  const [showLicenses, setShowLicenses] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState("PREMIUM");

  const licensePrices = {
    BASIC: 29,
    PREMIUM: 59,
    UNLIMITED: 99,
  };

  const selectedPrice = licensePrices[selectedLicense];

  if (!beat) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-5 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950/90 shadow-[0_30px_100px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
      >
        {/* Ambient Light */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-red-900/20 blur-[100px]" />

        <div className="grid md:grid-cols-[280px_1fr]">

          {/* =========================
              COVER
          ========================== */}

          <div className="relative aspect-square md:aspect-auto md:min-h-[430px]">

            <Image
              src={beat.cover}
              alt={beat.title}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* PLAY BUTTON */}

            <button
              onClick={() =>
                onPlay({
                  title: beat.title,
                  genre: beat.genre,
                  audio: beat.audio,
                  cover: beat.cover,
                  price: beat.price,
                })
              }
              className="absolute bottom-5 left-5 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
            >
              ▶
            </button>

          </div>


          {/* =========================
              CONTENT
          ========================== */}

          <div className="relative flex flex-col p-7 sm:p-9">

            {/* CLOSE */}

            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition-all hover:bg-white/10 hover:text-white"
            >
              ×
            </button>


            {/* HEADER */}

            <div className="pr-10">

              <p className="mb-3 text-[10px] font-medium tracking-[0.35em] text-red-500">
                BEAT DETAILS
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {beat.title}
              </h2>

              <p className="mt-2 text-xs tracking-[0.3em] text-zinc-500">
                {beat.genre}
              </p>

            </div>


            {/* DESCRIPTION */}

            <div className="mt-8">

              <p className="text-sm leading-7 text-zinc-400">
                {beat.description}
              </p>

            </div>


            {/* MOOD */}

            <div className="mt-7">

              <p className="mb-3 text-[10px] tracking-[0.3em] text-zinc-600">
                MOOD
              </p>

              <div className="flex flex-wrap gap-2">

                {beat.mood?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] tracking-[0.15em] text-zinc-400 backdrop-blur-md"
                  >
                    {tag}
                  </span>
                ))}

              </div>

            </div>


            {/* METADATA */}

            <div className="mt-8 grid grid-cols-3 gap-3">

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">

                <p className="text-[9px] tracking-[0.2em] text-zinc-600">
                  BPM
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  {beat.bpm}
                </p>

              </div>


              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">

                <p className="text-[9px] tracking-[0.2em] text-zinc-600">
                  KEY
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  {beat.keyName}
                </p>

              </div>


              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">

                <p className="text-[9px] tracking-[0.2em] text-zinc-600">
                  FROM
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  ${beat.price}
                </p>

              </div>

            </div>


            {/* GET BEAT */}

            <div className="mt-auto pt-8">

              <button
                onClick={() => setShowLicenses(true)}
                className="w-full rounded-xl bg-white px-5 py-3.5 text-sm font-semibold tracking-wide text-black transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]"
              >
                GET THIS BEAT
              </button>

            </div>

          </div>

        </div>


        {/* =====================================================
            LICENSE SELECTOR
        ====================================================== */}

        {showLicenses && (

          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/85 p-6 backdrop-blur-xl">

            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl">

              {/* LICENSE HEADER */}

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[10px] tracking-[0.3em] text-red-500">
                    CHOOSE YOUR LICENSE
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-white">
                    {beat.title}
                  </h3>

                </div>


                <button
                  onClick={() => setShowLicenses(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition-all hover:bg-white/10 hover:text-white"
                >
                  ×
                </button>

              </div>


              {/* LICENSE OPTIONS */}

              <div className="mt-6 space-y-3">

                <LicenseCard
                  name="BASIC"
                  price={29}
                  description="MP3/WAV license for independent releases."
                  selected={selectedLicense === "BASIC"}
                  onClick={() => setSelectedLicense("BASIC")}
                />


                <LicenseCard
                  name="PREMIUM"
                  price={59}
                  description="Extended commercial usage with high-quality files."
                  selected={selectedLicense === "PREMIUM"}
                  popular
                  onClick={() => setSelectedLicense("PREMIUM")}
                />


                <LicenseCard
                  name="UNLIMITED"
                  price={99}
                  description="Unlimited commercial use and distribution."
                  selected={selectedLicense === "UNLIMITED"}
                  onClick={() => setSelectedLicense("UNLIMITED")}
                />

              </div>


              {/* SELECTED LICENSE */}

              <div className="mt-6 border-t border-white/10 pt-5">

                <div className="flex items-center justify-between">

                  <span className="text-xs tracking-[0.2em] text-zinc-500">
                    SELECTED LICENSE
                  </span>

                  <span className="text-sm font-semibold text-white">
                    {selectedLicense}
                  </span>

                </div>


                {/* CHECKOUT BUTTON */}

                <button
                  onClick={() => {

                    const params = new URLSearchParams({
                      beat: beat.title,
                      genre: beat.genre,
                      cover: beat.cover,
                      license: selectedLicense,
                      price: selectedPrice.toString(),
                    });

                    router.push(`/checkout?${params.toString()}`);

                  }}
                  className="mt-4 w-full rounded-xl bg-white px-5 py-3.5 text-sm font-semibold tracking-wide text-black transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                >
                  CONTINUE — ${selectedPrice}
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}


/* =========================================================
   LICENSE CARD
========================================================= */

function LicenseCard({
  name,
  price,
  description,
  selected,
  popular,
  onClick,
}) {

  const [mousePosition, setMousePosition] = useState({
    x: 50,
    y: 50,
  });


  function handleMouseMove(e) {

    const rect = e.currentTarget.getBoundingClientRect();

    const x =
      ((e.clientX - rect.left) / rect.width) * 100;

    const y =
      ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({
      x,
      y,
    });

  }


  return (

    <button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={`group relative w-full overflow-hidden rounded-xl border p-4 text-left transition-all duration-300 ${
        selected
          ? "border-red-500/60 bg-red-500/[0.08]"
          : "border-white/10 bg-white/[0.04] hover:border-white/20"
      }`}
    >

      {/* =================================================
          LIQUID MOUSE GLOW
      ================================================= */}

      <div
        className="pointer-events-none absolute h-40 w-40 rounded-full bg-red-600/25 blur-[55px] transition-all duration-300"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
          opacity: selected ? 0.9 : 0.65,
        }}
      />


      {/* SECONDARY GLOW */}

      <div
        className="pointer-events-none absolute h-20 w-20 rounded-full bg-red-400/10 blur-[35px] transition-all duration-300"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />


      {/* GLASS HIGHLIGHT */}

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(
            circle at ${mousePosition.x}% ${mousePosition.y}%,
            rgba(255, 30, 50, 0.14),
            transparent 42%
          )`,
        }}
      />


      {/* POPULAR BADGE */}

      {popular && (

        <div className="absolute -top-2.5 right-4 z-20 rounded-full bg-red-600 px-2.5 py-1 text-[9px] font-bold tracking-[0.15em] text-white shadow-[0_0_20px_rgba(220,38,38,0.35)]">
          POPULAR
        </div>

      )}


      {/* CONTENT */}

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <span className="font-semibold text-white">
              {name}
            </span>


            {selected && (

              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] text-white">
                ✓
              </span>

            )}

          </div>


          <span className="text-sm font-medium text-zinc-300">
            ${price}
          </span>

        </div>


        <p className="mt-2 text-xs leading-5 text-zinc-500">
          {description}
        </p>

      </div>

    </button>

  );
}