import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { developmentPillars } from "@/data/homepage";

export default function StudentDevelopment() {
  return (
    <section className="bg-[#f8f9fa] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          title="Student Development at a Leading CBSE School in Jaipur"
          subtitle="At Mayoor, holistic development isn't a buzzword — it's built into every school day. We nurture six dimensions of growth that prepare students not just for exams, but for life."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {developmentPillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#003d78]">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
