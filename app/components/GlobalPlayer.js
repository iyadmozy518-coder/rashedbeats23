"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function GlobalPlayer({ beat, onClose }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!beat) return;

    const audio = new Audio(beat.audio);
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    audio.play().catch(() => {
      setIsPlaying(false);
    });

    setIsPlaying(true);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audioRef.current = null;
    };
  }, [beat]);

  if (!beat) return null;

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;

    if (!audio) return;

    const newTime = Number(event.target.value);

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
    duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[94%] max-w-5xl -translate-x-1/2">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-3 rounded-[28px] bg-red-950/20 blur-2xl" />

      {/* Player */}
      <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-black/60 px-4 py-3 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl">

        {/* Top light */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

        <div className="flex items-center gap-4">

          {/* Cover */}
          <div className="relative hidden h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 sm:block">

            <Image
              src={beat.cover || "/beats/after-dark.jpg"}
              alt={beat.title}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/20" />

          </div>

          {/* Play */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-lg transition-all duration-300 hover:scale-105 hover:bg-zinc-200"
          >
            <span className="transition-transform duration-300 group-active:scale-75">
              {isPlaying ? "Ⅱ" : "▶"}
            </span>
          </button>

          {/* Beat Info */}
          <div className="hidden min-w-[150px] sm:block">

            <div className="flex items-center gap-2">

              <p className="text-sm font-bold tracking-wide text-white">
                {beat.title}
              </p>

              {isPlaying && (
                <span className="flex gap-[2px]">
                  <span className="h-2 w-[2px] animate-pulse bg-red-500" />
                  <span className="h-3 w-[2px] animate-pulse bg-red-500 [animation-delay:100ms]" />
                  <span className="h-2 w-[2px] animate-pulse bg-red-500 [animation-delay:200ms]" />
                </span>
              )}

            </div>

            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              {beat.genre}
            </p>

          </div>

          {/* Progress */}
          <div className="flex flex-1 items-center gap-3">

            <span className="hidden text-[10px] tabular-nums text-zinc-500 md:block">
              {formatTime(currentTime)}
            </span>

            <div className="relative flex-1">

              {/* Background */}
              <div className="h-1 overflow-hidden rounded-full bg-white/10">

                {/* Progress */}
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-700 to-red-400 transition-[width] duration-100"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

              {/* Invisible range control */}
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="absolute inset-0 h-4 w-full -translate-y-1.5 cursor-pointer opacity-0"
              />

              {/* Dot */}
              <div
                className="pointer-events-none absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-[left] duration-100"
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
            onClick={onClose}
            aria-label="Close player"
            className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <span className="text-lg transition-transform duration-300 group-hover:rotate-90">
              ×
            </span>
          </button>

        </div>

      </div>

    </div>
  );
}