"use client";

import Image from "next/image";

export default function BeatCard({
  title,
  genre,
  bpm,
  keyName,
  price,
  cover,
  audio,
  description,
  mood,
  onPlay,
  onDetails,
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20">

      {/* Cover */}
      <div className="relative aspect-square overflow-hidden rounded-xl">

        <Image
          src={cover}
          alt={`${title} beat cover`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/35" />

        {/* Genre */}
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[10px] font-medium tracking-[0.2em] text-white backdrop-blur-md">
          {genre}
        </div>

        {/* Play */}
        <button
          type="button"
          onClick={() =>
            onPlay({
              title,
              genre,
              audio,
              cover,
              price,
            })
          }
          aria-label={`Play ${title}`}
          className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition-all duration-300 hover:scale-110 hover:bg-zinc-200"
        >
          ▶
        </button>

      </div>

      {/* Info */}
      <div className="mt-5">

        {/* Title + Price */}
        <div className="flex items-start justify-between gap-4">

          <div>
            <h3 className="text-lg font-bold tracking-wide">
              {title}
            </h3>

            <p className="mt-1 text-xs tracking-[0.2em] text-zinc-500">
              {genre}
            </p>
          </div>

          <span className="text-sm font-semibold text-zinc-300">
            ${price}
          </span>

        </div>

        {/* Metadata */}
        <div className="mt-5 flex gap-4 text-xs tracking-wider text-zinc-500">
          <span>{bpm} BPM</span>
          <span>{keyName}</span>
        </div>

        {/* View Details */}
        <div className="mt-5 flex items-center justify-between">

          <button
            type="button"
            onClick={() =>
              onDetails({
                title,
                genre,
                bpm,
                keyName,
                price,
                cover,
                description,
                mood,
              })
            }
            className="group/view flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-white"
          >
            VIEW DETAILS

            <span className="transition-transform duration-300 group-hover/view:translate-x-1">
              →
            </span>
          </button>

        </div>

      </div>

    </article>
  );
}