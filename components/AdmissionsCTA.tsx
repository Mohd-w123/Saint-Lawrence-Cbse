"use client";

import Image from "next/image";
import { images } from "@/lib/images";

type AdmissionsCTAProps = {
  onApplyClick: () => void;
};

export default function AdmissionsCTA({ onApplyClick }: AdmissionsCTAProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <Image
        src={images.frontGate}
        alt="Mayoor School Jaipur front gate"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#0b5699]/88" />
      <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-8">
        <h2 className="text-2xl font-bold text-white md:text-4xl">
          School Admissions Open for the Session 2026–27
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
          Mayoor School Jaipur, in collaboration with Mayo College General
          Council, Ajmer, is recognised as a leading CBSE school in Jaipur,
          Rajasthan. Today&apos;s world values citizens who are creative,
          empathetic, self-motivated, and critical thinkers.
        </p>
        <button
          onClick={onApplyClick}
          className="mt-8 rounded bg-[#ffb300] px-10 py-3 font-semibold text-[#003d78] transition hover:bg-[#ffcc02]"
        >
          Apply Now
        </button>
      </div>
    </section>
  );
}
