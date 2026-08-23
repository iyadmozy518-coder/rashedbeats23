"use client";

import Image from "next/image";

const youtubeVideos = [
  {
    id: "GV1UHqb9S8k",
    title: "LEGE-CY - MANZZAR",
    subtitle: "RASHED REMIX",
    type: "REMIX",
  },
  {
    id: "LHi_-iMJJj8",
    title: "TL3T FO2 AL STO7",
    subtitle: "RASHED REMIX",
    type: "REMIX",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="background-blur" />

      <div className="pointer-events-none absolute left-[-15%] top-[20%] h-[400px] w-[400px] rounded-full bg-red-700/[0.08] blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[450px] w-[450px] rounded-full bg-white/[0.025] blur-[150px]" />


      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav className="glass-nav relative z-30 mx-auto mt-5 flex w-[92%] max-w-5xl items-center justify-between rounded-full px-6 py-4 sm:px-8">

        <a
          href="/"
          className="relative z-10 text-lg font-bold tracking-[0.25em] transition hover:text-red-400"
        >
          RASHED
        </a>

        <div className="relative z-10 flex items-center gap-2 sm:gap-3">

          <a
            href="/#beats"
            className="rounded-full px-4 py-2 text-xs tracking-[0.2em] text-zinc-400 transition hover:text-white"
          >
            BEATS
          </a>

          <a
            href="/about"
            className="rounded-full bg-white/[0.06] px-4 py-2 text-xs tracking-[0.2em] text-white"
          >
            ABOUT
          </a>

        </div>

      </nav>


      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative flex min-h-[78vh] items-center px-6 py-24 sm:px-10 lg:px-16">

        <div className="light-sweep" />

        <div className="relative z-10 mx-auto w-full max-w-6xl">

          <div className="max-w-4xl">

            <p className="mb-6 text-[10px] tracking-[0.55em] text-red-500">
              PRODUCER / ARTIST / CREATIVE
            </p>

            <h1 className="text-6xl font-black leading-[0.9] tracking-[-0.04em] sm:text-8xl lg:text-[9rem]">
              MORE
              <br />
              <span className="text-zinc-700">
                THAN
              </span>
              <br />
              THE BEATS.
            </h1>

            <p className="mt-8 max-w-xl text-sm leading-7 tracking-[0.08em] text-zinc-500 sm:text-base">
              A little more about the person behind the sound,
              the ideas, the experiments, and everything in between.
            </p>

          </div>

          <div className="mt-16 flex items-center gap-4 text-[9px] tracking-[0.4em] text-zinc-700">

            <span>
              SCROLL TO EXPLORE
            </span>

            <div className="h-px w-16 bg-zinc-800" />

          </div>

        </div>

      </section>


      {/* =====================================================
          ABOUT SECTION
      ====================================================== */}

      <section className="relative z-10 px-6 pb-32 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-6xl">

          <div className="grid items-center gap-16 lg:grid-cols-[0.8fr_1.2fr]">


            {/* PHOTO */}

            <div className="group relative mx-auto w-full max-w-[430px] [perspective:1200px]">

              <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-red-600/[0.08] blur-[45px] transition duration-700 group-hover:bg-red-600/[0.13]" />

              <div
                className="
                  relative
                  aspect-[4/5]
                  overflow-hidden
                  rounded-[32px]
                  border
                  border-red-500/20
                  bg-white/[0.03]
                  shadow-[0_30px_100px_rgba(0,0,0,0.45)]
                  transition-all
                  duration-700
                  [transform:rotateY(-4deg)_rotateX(2deg)]
                  group-hover:[transform:rotateY(0deg)_rotateX(0deg)_translateY(-6px)]
                  group-hover:border-red-500/35
                "
              >

                <Image
                  src="/about.jpg"
                  alt="Rashed"
                  fill
                  priority
                  className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-7 left-7">

                  <p className="text-[9px] tracking-[0.35em] text-zinc-500">
                    RASHED / 001
                  </p>

                  <p className="mt-1 text-xl font-semibold tracking-[0.08em]">
                    PRODUCER
                  </p>

                </div>

              </div>

            </div>


            {/* BIO */}

            <div>

              <p className="text-[10px] tracking-[0.4em] text-red-500">
                WHO I AM
              </p>

              <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                I DON&apos;T MAKE
                <span className="text-zinc-700">
                  {" "}ONE SOUND.
                </span>
              </h2>


              {/* Glass Bio */}

              <div className="group relative mt-10 [perspective:1200px]">

                <div className="pointer-events-none absolute -inset-5 rounded-[32px] bg-red-600/[0.07] blur-[40px] transition duration-700 group-hover:bg-red-600/[0.12]" />

                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[30px]
                    border
                    border-red-500/20
                    bg-white/[0.035]
                    p-7
                    shadow-[0_25px_90px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]
                    backdrop-blur-2xl
                    transition-all
                    duration-700
                    [transform:rotateX(2deg)_rotateY(-3deg)]
                    group-hover:[transform:rotateX(0deg)_rotateY(0deg)_translateY(-4px)]
                    group-hover:border-red-500/35
                  "
                >

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />

                  <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-red-500/70 to-transparent" />

                  <div className="relative z-10 space-y-5 text-sm leading-7 text-zinc-400">

                    <p>
                      I&apos;m Rashed. I grew up in Giza, surrounded by
                      noise, people, stories, and a lot of different sounds.
                      Somewhere along the way, I started turning all of that
                      into music.
                    </p>

                    <p>
                      I&apos;ve never really been the type to stay inside
                      one sound. I like experimenting, switching things up,
                      making something loud one day and something completely
                      different the next.
                    </p>

                    <p>
                      For me, music is less about fitting into a genre and
                      more about creating something that actually feels like
                      me.
                    </p>

                    <p className="text-zinc-200">
                      RashedBeats is where all of that comes together.
                    </p>

                  </div>

                </div>

              </div>


              {/* Tags */}

              <div className="mt-8 flex flex-wrap gap-2">

                {[
                  "GIZA, EGYPT",
                  "PRODUCER",
                  "ARTIST",
                  "REMIXES",
                  "EXPERIMENTS",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[9px] tracking-[0.2em] text-zinc-500 transition hover:border-red-500/30 hover:bg-red-500/[0.05] hover:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          THE SOUND / YOUTUBE
      ====================================================== */}

      <section className="relative z-10 border-t border-white/10 px-6 py-32 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-6xl">


          {/* Heading */}

          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

            <div>

              <p className="text-[10px] tracking-[0.4em] text-red-500">
                THE SOUND
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
                RECENT
                <span className="text-zinc-700">
                  {" "}WORK.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-500">
                Remixes, productions, experiments, and sounds that don&apos;t
                always fit inside a beat store.
              </p>

            </div>


            <a
              href="https://www.youtube.com/@Rashedd.jr1"
              target="_blank"
              rel="noreferrer"
              className="text-[9px] tracking-[0.3em] text-zinc-600 transition hover:text-red-400"
            >
              VIEW CHANNEL →
            </a>

          </div>


          {/* =================================================
              VIDEO CARDS
          ================================================== */}

          <div className="grid gap-8 lg:grid-cols-2">

            {youtubeVideos.map((video, index) => (

              <div
                key={video.id}
                className="group relative [perspective:1400px]"
              >

                {/* Glow */}

                <div className="pointer-events-none absolute -inset-6 rounded-[38px] bg-red-600/[0.05] blur-[55px] transition duration-700 group-hover:bg-red-600/[0.12]" />


                {/* Glass Frame */}

                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[30px]
                    border
                    border-white/10
                    bg-white/[0.035]
                    p-3
                    shadow-[0_30px_100px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]
                    backdrop-blur-2xl
                    transition-all
                    duration-700
                    [transform:rotateX(2deg)_rotateY(-2deg)]
                    group-hover:[transform:rotateX(0deg)_rotateY(0deg)_translateY(-7px)]
                    group-hover:border-red-500/30
                  "
                >

                  {/* YouTube player */}

                  <div className="relative aspect-video overflow-hidden rounded-[22px] bg-black">

                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />

                  </div>


                  {/* Video information */}

                  <div className="px-3 pb-3 pt-5">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-[8px] tracking-[0.35em] text-red-500">
                          {video.type}
                        </p>

                        <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
                          {video.title}
                        </h3>

                        <p className="mt-1 text-[10px] tracking-[0.2em] text-zinc-600">
                          {video.subtitle}
                        </p>

                      </div>


                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm text-zinc-500 transition duration-500 group-hover:border-red-500/30 group-hover:bg-red-500/[0.08] group-hover:text-red-400">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                    </div>


                    <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">

                      <span className="text-[8px] tracking-[0.3em] text-zinc-700">
                        RASHED / YOUTUBE
                      </span>

                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[8px] tracking-[0.25em] text-zinc-500 transition hover:text-red-400"
                      >
                        OPEN →
                      </a>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* Coming soon */}

          <div className="mt-8 rounded-[24px] border border-white/5 bg-white/[0.02] px-6 py-5 text-center">

            <p className="text-[9px] tracking-[0.35em] text-zinc-700">
              MORE REMIXES COMING SOON.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          MORE FROM RASHED
      ====================================================== */}

      <section className="relative z-10 px-6 pb-32 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-6xl">

          <div className="mb-10">

            <p className="text-[10px] tracking-[0.4em] text-zinc-600">
              KEEP EXPLORING
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              MORE FROM RASHED.
            </h2>

          </div>


          <div className="grid gap-5 md:grid-cols-2">


            {/* BEATS */}

            <a
              href="/#beats"
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-red-500/25"
            >

              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-600/[0.08] blur-[50px] transition group-hover:bg-red-600/[0.14]" />

              <div className="relative">

                <p className="text-[9px] tracking-[0.35em] text-zinc-600">
                  01 / BEATS
                </p>

                <h3 className="mt-4 text-3xl font-semibold">
                  LISTEN
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-500">
                  Dark trap, rage, melodic sounds and everything in between.
                </p>

                <p className="mt-8 text-[10px] font-semibold tracking-[0.25em] text-zinc-400 transition group-hover:text-red-400">
                  EXPLORE BEATS →
                </p>

              </div>

            </a>


            {/* YOUTUBE */}

            <a
              href="https://www.youtube.com/@Rashedd.jr1"
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-red-500/25"
            >

              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-600/[0.08] blur-[50px] transition group-hover:bg-red-600/[0.14]" />

              <div className="relative">

                <p className="text-[9px] tracking-[0.35em] text-zinc-600">
                  02 / YOUTUBE
                </p>

                <h3 className="mt-4 text-3xl font-semibold">
                  WATCH
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-500">
                  Remixes, productions, experiments and sounds outside the
                  beat store.
                </p>

                <p className="mt-8 text-[10px] font-semibold tracking-[0.25em] text-zinc-400 transition group-hover:text-red-400">
                  VISIT YOUTUBE →
                </p>

              </div>

            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="relative z-10 border-t border-white/10 px-6 pb-8 pt-16 sm:px-10 lg:px-16">

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


            <div className="flex gap-6">

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
                href="https://www.youtube.com/@Rashedd.jr1"
                target="_blank"
                rel="noreferrer"
                className="text-[9px] tracking-[0.25em] text-zinc-600 transition hover:text-red-400"
              >
                YOUTUBE
              </a>

            </div>

          </div>


          <div className="mt-8 border-t border-white/5 pt-6 text-[9px] tracking-[0.25em] text-zinc-800">
            © 2026 RASHED — MADE IN GIZA, EGYPT.
          </div>

        </div>

      </footer>

    </main>
  );
}