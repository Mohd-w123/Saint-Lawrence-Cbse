"use client";

import Image from "next/image";
import { images } from "@/lib/images";

type HeroProps = {
  onEnquireClick: () => void;
};

export default function Hero({ onEnquireClick }: HeroProps) {
  return (
    <section className="relative mt-[104px] min-h-[70vh] overflow-hidden lg:mt-[120px] lg:min-h-[85vh]">
      <Image
        src={images.hero}
        alt="Mayoor School Jaipur campus"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#003d78]/85 via-[#0b5699]/70 to-[#003d78]/40" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-4 py-16 lg:min-h-[85vh] lg:px-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#ffb300] md:text-base">
          Be the Light
        </p>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          Mayoor School Jaipur – One of the Best Schools in Jaipur
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
          Where every child is known by name, nurtured by purpose, and inspired
          to lead with empathy, integrity, perseverance, and autonomy.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={onEnquireClick}
            className="rounded bg-[#ffb300] px-8 py-3 font-semibold text-[#003d78] transition hover:bg-[#ffcc02]"
          >
            Enquire Now
          </button>
          <a
            href="#news"
            className="rounded border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-[#003d78]"
          >
            Latest News
          </a>
        </div>
      </div>
    </section>
  );
}
