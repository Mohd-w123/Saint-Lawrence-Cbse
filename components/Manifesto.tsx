"use client";

import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { manifestoPoints } from "@/data/homepage";
import { images } from "@/lib/images";
import { school } from "@/lib/school";

type ManifestoProps = {
  onApplyClick: () => void;
};

export default function Manifesto({ onApplyClick }: ManifestoProps) {
  return (
    <section className="bg-[#003d78] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={images.manifesto}
              alt={`${school.director.name}, ${school.director.title}`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              title="The Saint Lawrence Manifesto"
              subtitle="Equal Opportunity for Every Learner: We make sure every child, regardless of background or ability, gets the resources, support, and encouragement they need to succeed."
              light
              align="left"
            />
            <ul className="space-y-4">
              {manifestoPoints.map((point) => (
                <li key={point.title} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#ffb300]" />
                  <div>
                    <p className="font-semibold text-white">{point.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/80">
                      {point.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={onApplyClick}
              className="mt-8 rounded bg-[#ffb300] px-8 py-3 font-semibold text-[#003d78] transition hover:bg-[#ffcc02]"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
