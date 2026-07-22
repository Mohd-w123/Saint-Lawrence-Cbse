import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { whyChooseUsCards } from "@/data/homepage";

export default function WhyChooseUs() {
  return (
    <section className="bg-[#003d78] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading title="Why Choose Us" light />

        <div className="grid gap-8 md:grid-cols-3">
          {whyChooseUsCards.map((card) => (
            <div
              key={card.title}
              className="overflow-hidden rounded-2xl bg-white shadow-xl transition hover:-translate-y-1"
            >
              <div className="relative h-52">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#003d78]">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
