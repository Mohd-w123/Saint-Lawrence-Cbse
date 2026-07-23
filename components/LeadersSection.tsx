"use client";

import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import SectionHeading from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import { school } from "@/lib/school";

type LeadersSectionProps = {
  onApplyClick: () => void;
};

export default function LeadersSection({ onApplyClick }: LeadersSectionProps) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          title="Learners will be Leaders"
          subtitle={`At ${school.name}, every child learns by doing, exploring, experimenting, and experiencing knowledge beyond textbooks. Follow us on social media to see how our classrooms, labs, and playgrounds come alive with discovery!`}
        />

        <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onApplyClick}
            className="rounded bg-[#0b5699] px-8 py-3 font-semibold text-white transition hover:bg-[#003d78]"
          >
            Apply Now
          </button>
          <a
            href={school.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href={school.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1877f2] text-white"
            aria-label="Facebook"
          >
            <FaFacebook size={20} />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {images.gallery.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={src}
                alt={`${school.name} gallery ${i + 1}`}
                fill
                className="object-cover transition hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
