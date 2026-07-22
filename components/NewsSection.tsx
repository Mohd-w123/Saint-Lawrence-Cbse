"use client";

import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SectionHeading from "@/components/ui/SectionHeading";
import { newsItems } from "@/data/homepage";

export default function NewsSection() {
  const [active, setActive] = useState(0);
  const item = newsItems[active];

  const prev = () => setActive((i) => (i === 0 ? newsItems.length - 1 : i - 1));
  const next = () => setActive((i) => (i === newsItems.length - 1 ? 0 : i + 1));

  return (
    <section id="news" className="bg-[#f8f9fa] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          title="Explore Latest News"
          subtitle="Stay up to date with events, activities, and updates from one of the best CBSE schools in Jaipur."
        />

        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[260px] md:min-h-[420px]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded bg-[#ffb300] px-3 py-1 text-xs font-bold uppercase text-[#003d78]">
                Education World Award
              </span>
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-sm font-semibold text-[#0b5699]">{item.date}</p>
              <h3 className="mt-2 text-xl font-bold leading-snug text-[#003d78] md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-4 line-clamp-5 text-gray-600">{item.excerpt}</p>
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={prev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0b5699] text-[#0b5699] transition hover:bg-[#0b5699] hover:text-white"
                  aria-label="Previous news"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={next}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0b5699] text-[#0b5699] transition hover:bg-[#0b5699] hover:text-white"
                  aria-label="Next news"
                >
                  <FaChevronRight />
                </button>
                <span className="ml-2 text-sm text-gray-500">
                  {active + 1} / {newsItems.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {newsItems.map((news, index) => (
            <button
              key={news.title}
              onClick={() => setActive(index)}
              className={`min-w-[180px] flex-shrink-0 rounded-lg border px-4 py-3 text-left text-sm transition ${
                active === index
                  ? "border-[#0b5699] bg-[#0b5699] text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-[#0b5699]"
              }`}
            >
              <span className="block text-xs opacity-80">{news.date}</span>
              <span className="line-clamp-2 font-medium">{news.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
