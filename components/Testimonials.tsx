"use client";

import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/homepage";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const item = testimonials[active];

  const prev = () =>
    setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () =>
    setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading title="Parent Testimonials" />

        <div className="relative mx-auto max-w-4xl rounded-2xl bg-[#f8f9fa] p-8 md:p-12">
          <FaQuoteLeft className="text-4xl text-[#ffb300]/40" />
          <p className="mt-4 text-lg italic leading-relaxed text-gray-700 md:text-xl">
            &ldquo;{item.quote}&rdquo;
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-[#ffb300]">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div>
              <p className="font-bold text-[#003d78]">{item.name}</p>
              <p className="text-sm text-gray-500">{item.role}</p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b5699] text-white transition hover:bg-[#003d78]"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === active ? "w-8 bg-[#ffb300]" : "w-2.5 bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b5699] text-white transition hover:bg-[#003d78]"
              aria-label="Next testimonial"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
