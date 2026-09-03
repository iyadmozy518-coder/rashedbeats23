"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import BeatCard from "./components/BeatCard";
import GlobalPlayer from "./components/GlobalPlayer";
import BeatDetailsModal from "./components/BeatDetailsModal";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [currentBeat, setCurrentBeat] = useState(null);
  const [selectedBeat, setSelectedBeat] = useState(null);

  const [beats, setBeats] = useState([]);
  const [loadingBeats, setLoadingBeats] = useState(true);
  const [beatError, setBeatError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function initializePage() {
      await Promise.all([
        trackVisitor(),
        loadBeats(isMounted),
      ]);
    }

    initializePage();

    return () => {
      isMounted = false;
    };
  }, []);

  async function trackVisitor() {
    try {
      let visitorId = localStorage.getItem("rashed_visitor_id");

      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem("rashed_visitor_id", visitorId);
      }

      const { error } = await supabase.rpc("track_visitor", {
        p_visitor_id: visitorId,
      });

      if (error) {
        console.error("Error tracking visitor:", error);
      }
    } catch (error) {
      console.error("Visitor tracking error:", error);
    }
  }

  async function loadBeats(isMounted = true) {
    try {
      if (isMounted) {
        setLoadingBeats(true);
        setBeatError("");
      }

      const { data, error } = await supabase
        .from("beats")
        .select(
          "id, title, genre, bpm, key_name, price, cover_url, audio_url, description, mood"
           + ", basic_license_price, premium_license_price, unlimited_license_price"
        )
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading beats:", error);

        if (isMounted) {
          setBeatError("Unable to load beats right now.");
          setBeats([]);
        }

        return;
      }

      const formattedBeats = (data || []).map((beat) => ({
        id: beat.id,
        title: beat.title || "",
        genre: beat.genre || "",
        bpm: beat.bpm != null ? String(beat.bpm) : "",
        keyName: beat.key_name || "",
        price: beat.price != null ? String(beat.price) : "",
        basicLicensePrice:
          beat.basic_license_price != null
            ? Number(beat.basic_license_price)
            : null,
        premiumLicensePrice:
          beat.premium_license_price != null
            ? Number(beat.premium_license_price)
            : null,
        unlimitedLicensePrice:
          beat.unlimited_license_price != null
            ? Number(beat.unlimited_license_price)
            : null,
        cover: beat.cover_url || "",
        audio: beat.audio_url || "",
        description: beat.description || "",
        mood: Array.isArray(beat.mood) ? beat.mood : [],
      }));

      if (isMounted) {
        setBeats(formattedBeats);
      }
    } catch (error) {
      console.error("Unexpected beats loading error:", error);

      if (isMounted) {
        setBeatError("Unable to load beats right now.");
        setBeats([]);
      }
    } finally {
      if (isMounted) {
        setLoadingBeats(false);
      }
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* =========================
          BACKGROUND
          ========================= */}

      <div className="background-blur" />

      {/* Desktop-only background glow */}
      <div className="pointer-events-none absolute left-[-15%] top-[20%] hidden h-[400px] w-[400px] rounded-full bg-red-700/[0.08] blur-[150px] md:block" />

      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] hidden h-[450px] w-[450px] rounded-full bg-white/[0.025] blur-[150px] md:block" />

      {/* =========================
          NAVBAR
          ========================= */}

      <nav className="glass-nav relative z-30 mx-auto mt-4 flex w-[94%] max-w-5xl items-center justify-between rounded-full px-4 py-3 sm:mt-5 sm:w-[92%] sm:px-8 sm:py-4">

        <a
          href="/"
          className="relative z-10 text-base font-bold tracking-[0.2em] transition hover:text-red-400 sm:text-lg sm:tracking-[0.25em]"
        >
          RASHED
        </a>

        <div className="relative z-10 flex items-center gap-1 sm:gap-3">

          <a
            href="#beats"
            className="rounded-full px-3 py-2 text-[10px] tracking-[0.15em] text-zinc-400 transition hover:bg-white/[0.04] hover:text-white sm:px-4 sm:text-xs sm:tracking-[0.2em]"
          >
            BEATS
          </a>

          <a
            href="/about"
            className="rounded-full px-3 py-2 text-[10px] tracking-[0.15em] text-zinc-400 transition hover:bg-white/[0.04] hover:text-white sm:px-4 sm:text-xs sm:tracking-[0.2em]"
          >
            ABOUT
          </a>

        </div>
      </nav>

      {/* =========================
          HERO
          ========================= */}

      <section className="relative flex min-h-[78svh] flex-col items-center justify-center px-5 text-center sm:min-h-[85vh] sm:px-6">

        <div className="light-sweep" />

        <p className="relative z-10 mb-5 text-[9px] tracking-[0.45em] text-zinc-500 sm:mb-6 sm:text-xs sm:tracking-[0.6em]">
          PRODUCER / ARTIST
        </p>

        <h1 className="relative z-10 text-5xl font-black tracking-[0.12em] sm:text-9xl sm:tracking-[0.18em]">
          RASHED
        </h1>

        <p className="relative z-10 mt-5 max-w-xl text-[10px] tracking-[0.22em] text-zinc-400 sm:mt-6 sm:text-base sm:tracking-[0.3em]">
          BEATS WITHOUT LIMITS.
        </p>

        <a
          href="#beats"
          className="liquid-glass liquid-glass-red relative z-10 mt-8 rounded-full px-8 py-3.5 text-[10px] font-bold tracking-[0.28em] text-white sm:mt-10 sm:px-10 sm:py-4 sm:text-xs sm:tracking-[0.35em]"
        >
          EXPLORE BEATS
        </a>

        <div className="absolute bottom-6 z-10 flex flex-col items-center gap-3 text-[9px] tracking-[0.35em] text-zinc-600 sm:bottom-8 sm:text-[10px] sm:tracking-[0.4em]">
          SCROLL
          <div className="h-7 w-px bg-zinc-700 sm:h-8" />
        </div>

      </section>

      {/* =========================
          LATEST BEATS
          ========================= */}

      <section
        id="beats"
        className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 sm:px-6 sm:pb-32"
      >

        <div className="mb-9 flex items-end justify-between sm:mb-12">

          <div>
            <p className="mb-3 text-[9px] tracking-[0.35em] text-zinc-600 sm:text-xs sm:tracking-[0.4em]">
              THE SOUND
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              LATEST BEATS
            </h2>
          </div>

          <span className="hidden text-xs tracking-[0.3em] text-zinc-600 sm:block">
            {loadingBeats
              ? "LOADING..."
              : `${String(beats.length).padStart(2, "0")} RELEASES`}
          </span>

        </div>

        {/* LOADING */}

        {loadingBeats && (
          <div className="flex min-h-[220px] items-center justify-center">

            <div className="flex flex-col items-center">

              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-red-500" />

              <p className="mt-5 text-[9px] tracking-[0.3em] text-zinc-600">
                LOADING THE SOUND...
              </p>

            </div>

          </div>
        )}

        {/* ERROR */}

        {!loadingBeats && beatError && (
          <div className="rounded-[24px] border border-red-500/20 bg-red-500/[0.04] p-8 text-center sm:rounded-[28px] sm:p-10">

            <p className="text-[9px] tracking-[0.3em] text-red-400 sm:text-[10px]">
              SOMETHING WENT WRONG
            </p>

            <p className="mt-3 text-sm text-zinc-600">
              {beatError}
            </p>

          </div>
        )}

        {/* NO BEATS */}

        {!loadingBeats && !beatError && beats.length === 0 && (
          <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-10 text-center sm:rounded-[28px] sm:p-14">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xl text-zinc-700">
              ♫
            </div>

            <p className="mt-6 text-[9px] tracking-[0.3em] text-zinc-600">
              NEW SOUND COMING SOON
            </p>

          </div>
        )}

        {/* BEATS */}

        {!loadingBeats && !beatError && beats.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">

            {beats.map((beat) => (
              <BeatCard
                key={beat.id}
                id={beat.id}
                title={beat.title}
                genre={beat.genre}
                bpm={beat.bpm}
                keyName={beat.keyName}
                price={beat.price}
                basicLicensePrice={beat.basicLicensePrice}
                premiumLicensePrice={beat.premiumLicensePrice}
                unlimitedLicensePrice={beat.unlimitedLicensePrice}
                cover={beat.cover}
                audio={beat.audio}
                description={beat.description}
                mood={beat.mood}
                onPlay={setCurrentBeat}
                onDetails={setSelectedBeat}
              />
            ))}

          </div>
        )}

      </section>

      {/* =========================
          ABOUT PREVIEW
          ========================= */}

      <section
        id="about"
        className="relative z-10 border-t border-white/10 px-5 py-24 sm:px-10 sm:py-32 lg:px-16"
      >

        <div className="mx-auto max-w-6xl">

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">

            <div>

              <p className="text-[9px] tracking-[0.35em] text-red-500 sm:text-[10px] sm:tracking-[0.4em]">
                MORE ABOUT ME
              </p>

              <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-7xl">
                MORE THAN
                <span className="text-zinc-700">
                  {" "}THE BEATS.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-500 sm:mt-7 sm:text-base">
                I&apos;m Rashed. Producer, artist and someone who never really
                wanted to stay inside one sound. From Giza to wherever the
                music takes me, I&apos;m just here to make things that feel
                like me.
              </p>

              <a
                href="/about"
                className="liquid-glass liquid-glass-red mt-7 inline-flex rounded-full px-7 py-3.5 text-[9px] font-bold tracking-[0.28em] text-white sm:mt-8 sm:px-8 sm:py-4 sm:text-[10px] sm:tracking-[0.3em]"
              >
                MORE ABOUT ME →
              </a>

            </div>

            <div className="relative mx-auto w-full max-w-[380px]">

              {/* Desktop only glow */}
              <div className="pointer-events-none absolute -inset-10 hidden rounded-full bg-red-600/[0.08] blur-[70px] md:block" />

              <div className="relative aspect-square overflow-hidden rounded-[28px] border border-red-500/20 bg-white/[0.03] sm:rounded-[35px]">

                <Image
                  src="/about.jpg"
                  alt="Rashed"
                  fill
                  sizes="(max-width: 768px) 90vw, 380px"
                  className="object-cover grayscale transition duration-700 hover:scale-105 hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />

                <div className="absolute bottom-6 left-6 sm:bottom-7 sm:left-7">

                  <p className="text-[8px] tracking-[0.3em] text-zinc-500 sm:text-[9px] sm:tracking-[0.35em]">
                    RASHED / 001
                  </p>

                  <p className="mt-1 text-lg font-semibold tracking-[0.06em] sm:text-xl sm:tracking-[0.08em]">
                    PRODUCER
                  </p>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          YOUTUBE / MORE
          ========================= */}

      <section className="relative z-10 border-t border-white/10 px-5 py-24 sm:px-10 sm:py-32 lg:px-16">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-5 md:grid-cols-2 md:gap-6">

            <a
              href="/about"
              className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-red-500/30 sm:rounded-[30px] sm:p-8 md:backdrop-blur-xl"
            >

              <div className="pointer-events-none absolute -right-10 -top-10 hidden h-40 w-40 rounded-full bg-red-600/[0.08] blur-[60px] transition group-hover:bg-red-600/[0.14] md:block" />

              <div className="relative">

                <p className="text-[9px] tracking-[0.35em] text-red-500">
                  01 / YOUTUBE
                </p>

                <h3 className="mt-4 text-3xl font-semibold">
                  REMIXES.
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-500">
                  Check out my remixes, productions and experiments over on
                  YouTube.
                </p>

                <p className="mt-8 text-[10px] font-semibold tracking-[0.25em] text-zinc-400 transition group-hover:text-red-400">
                  EXPLORE →
                </p>

              </div>
            </a>

            <a
              href="/about"
              className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-red-500/30 sm:rounded-[30px] sm:p-8 md:backdrop-blur-xl"
            >

              <div className="pointer-events-none absolute -right-10 -top-10 hidden h-40 w-40 rounded-full bg-red-600/[0.08] blur-[60px] transition group-hover:bg-red-600/[0.14] md:block" />

              <div className="relative">

                <p className="text-[9px] tracking-[0.35em] text-zinc-600">
                  02 / ABOUT
                </p>

                <h3 className="mt-4 text-3xl font-semibold">
                  THE STORY.
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-500">
                  Get to know the person behind the sound and see what else
                  I&apos;m working on.
                </p>

                <p className="mt-8 text-[10px] font-semibold tracking-[0.25em] text-zinc-400 transition group-hover:text-red-400">
                  MEET RASHED →
                </p>

              </div>
            </a>

          </div>
        </div>
      </section>

      {/* =========================
          FOOTER
          ========================= */}

      <footer className="relative z-10 border-t border-white/10 px-5 pb-8 pt-14 sm:px-10 sm:pt-16 lg:px-16">

        <div className="mx-auto max-w-6xl">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-lg font-bold tracking-[0.25em]">
                RASHED
              </p>

              <p className="mt-2 text-[9px] tracking-[0.3em] text-zinc-700">
                MORE SOUND. LESS RULES.
              </p>

            </div>

            <div className="flex gap-5 sm:gap-6">

              <a
                href="/"
                className="text-[9px] tracking-[0.25em] text-zinc-600 transition hover:text-white"
              >
                HOME
              </a>

              <a
                href="/#beats"
                className="text-[9px] tracking-[0.25em] text-zinc-600 transition hover:text-white"
              >
                BEATS
              </a>

              <a
                href="/about"
                className="text-[9px] tracking-[0.25em] text-zinc-600 transition hover:text-red-400"
              >
                ABOUT
              </a>

            </div>

          </div>

          <div className="mt-8 border-t border-white/5 pt-6 text-[9px] tracking-[0.25em] text-zinc-800">
            © 2026 RASHED — MADE IN GIZA, EGYPT.
          </div>

        </div>
      </footer>

      {/* =========================
          GLOBAL PLAYER
          ========================= */}

      <GlobalPlayer
        beat={currentBeat}
        onClose={() => setCurrentBeat(null)}
      />

      {/* =========================
          BEAT DETAILS MODAL
          ========================= */}

      <BeatDetailsModal
        beat={selectedBeat}
        onClose={() => setSelectedBeat(null)}
        onPlay={setCurrentBeat}
      />
    </main>
  );
}