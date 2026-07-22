"use client";

import { useCallback, useId, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import SectionHeading from "@/components/ui/SectionHeading";
import { faqItems } from "@/data/homepage";

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  id,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  id: string;
}) {
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50"
        >
          <span className="font-semibold text-[#003d78]">{question}</span>
          <FaChevronDown
            aria-hidden
            className={`h-4 w-4 flex-shrink-0 text-[#0b5699] transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-600">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  }, []);

  return (
    <section className="relative z-10 bg-[#f8f9fa] py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <SectionHeading title="Frequently Asked Questions" />

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={item.question}
              id={`${baseId}-faq-${index}`}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
