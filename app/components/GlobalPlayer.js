"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function GlobalPlayer({ beat, onClose }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!beat?.audio) return;

    const audio = new Audio(beat.audio);

    audioRef.current = audio;

    audio.preload = "metadata";

    const handleLoadedMetadata = () => {
      if (Number.isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });

    return () => {
      audio.pause();
      audio.src = "";

      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);

      audioRef.current = null;
    };
  }, [beat]);

  if (!beat) return null;

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (error) {
      console.error("Audio playback failed:", error);
      setIsPlaying(false);
    }
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;

    if (!audio) return;

    const newTime = Number(event.target.value);

    if (!Number.isFinite(newTime)) return;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (!Number.isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress =
    duration > 0
      ? Math.min((currentTime / duration) * 100, 100)
      : 0;

  return (
    <div
      className="
        fixed
        bottom-3
        left-1/2
        z-50
        w-[94%]
        max-w-5xl
        -translate-x-1/2
        sm:bottom-5
      "
    >
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          -inset-2
          rounded-[24px]
          bg-red-950/15
          blur-xl
          sm:-inset-3
          sm:rounded-[28px]
          sm:blur-2xl
        "
      />

      {/* Player */}
      <div
        className="
          relative
          overflow-hidden
          rounded-[18px]
          border
          border-white/10
          bg-black/90
          px-3
          py-3
          shadow-[0_12px_45px_rgba(0,0,0,0.5)]
          sm:rounded-[22px]
          sm:px-4
          sm:py-3
          sm:bg-black/60
          sm:shadow-[0_20px_80px_rgba(0,0,0,0.55)]
          sm:backdrop-blur-xl
        "
      >
        {/* Top light */}
        <div
          className="
            pointer-events-none
            absolute
            left-0
            right-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-red-500/40
            to-transparent
          "
        />

        <div className="flex items-center gap-2 sm:gap-4">

          {/* Cover */}
          <div
            className="
              relative
              hidden
              h-14
              w-14
              shrink-0
              overflow-hidden
              rounded-xl
              border
              border-white/10
              sm:block
            "
          >
            <Image
              src={beat.cover || "/beats/after-dark.jpg"}
              alt={beat.title || "Beat cover"}
              fill
              sizes="56px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Play */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="
              group
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white
              text-black
              shadow-lg
              transition-transform
              duration-200
              hover:scale-105
              hover:bg-zinc-200
              active:scale-95
              sm:h-12
              sm:w-12
            "
          >
            <span className="text-sm transition-transform duration-200 group-active:scale-75">
              {isPlaying ? "Ⅱ" : "▶"}
            </span>
          </button>

          {/* Beat Info */}
          <div className="min-w-0 flex-1 sm:min-w-[150px] sm:flex-none">
            <div className="flex items-center gap-2">
              <p className="truncate text-xs font-bold tracking-wide text-white sm:text-sm">
                {beat.title}
              </p>

              {isPlaying && (
                <span className="hidden gap-[2px] sm:flex">
                  <span className="h-2 w-[2px] animate-pulse bg-red-500" />

                  <span className="h-3 w-[2px] animate-pulse bg-red-500 [animation-delay:100ms]" />

                  <span className="h-2 w-[2px] animate-pulse bg-red-500 [animation-delay:200ms]" />
                </span>
              )}
            </div>

            <p className="mt-1 truncate text-[9px] uppercase tracking-[0.2em] text-zinc-500 sm:text-[10px] sm:tracking-[0.25em]">
              {beat.genre}
            </p>
          </div>

          {/* Progress */}
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <span className="hidden text-[10px] tabular-nums text-zinc-500 md:block">
              {formatTime(currentTime)}
            </span>

            <div className="relative flex-1">
              {/* Background */}
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                {/* Progress */}
                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-red-700
                    to-red-400
                  "
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              {/* Range control */}
              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.01"
                value={currentTime}
                onChange={handleSeek}
                aria-label="Seek through beat"
                className="
                  absolute
                  inset-0
                  h-5
                  w-full
                  -translate-y-2
                  cursor-pointer
                  opacity-0
                "
              />

              {/* Dot */}
              <div
                className="
                  pointer-events-none
                  absolute
                  top-1/2
                  h-2.5
                  w-2.5
                  -translate-y-1/2
                  rounded-full
                  bg-white
                  shadow-[0_0_8px_rgba(255,255,255,0.4)]
                "
                style={{
                  left: `calc(${progress}% - 5px)`,
                }}
              />
            </div>

            <span className="hidden text-[10px] tabular-nums text-zinc-500 md:block">
              {formatTime(duration)}
            </span>
          </div>

          {/* Price */}
          <div className="hidden items-center gap-2 lg:flex">
            <span className="text-xs text-zinc-500">
              LICENSE
            </span>

            <span className="text-sm font-semibold text-white">
              ${beat.price || "29"}
            </span>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close player"
            className="
              group
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              text-zinc-500
              transition-colors
              duration-200
              hover:border-white/20
              hover:bg-white/10
              hover:text-white
              sm:h-9
              sm:w-9
            "
          >
            <span className="text-lg transition-transform duration-200 group-hover:rotate-90">
              ×
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}