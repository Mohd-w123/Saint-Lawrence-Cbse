import SectionHeading from "@/components/ui/SectionHeading";
import { visionStages } from "@/data/homepage";
import { school } from "@/lib/school";

const stageColors = [
  "border-[#ffb300] bg-[#ffb300]/10",
  "border-[#0b5699] bg-[#0b5699]/10",
  "border-[#8d4a35] bg-[#8d4a35]/10",
  "border-[#003d78] bg-[#003d78]/10",
  "border-[#ffcc02] bg-[#ffcc02]/10",
];

export default function VisionSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          title={`Vision of ${school.name}`}
          subtitle={`Recognised as one of Jaipur's most trusted schools, ${school.shortName} is dedicated to nurturing empathy, integrity, perseverance, and autonomy in every child — shaping young people who are confident, capable, and ready to serve the world with purpose and zeal.`}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {visionStages.map((stage, index) => (
            <div
              key={stage.name}
              className={`rounded-xl border-l-4 p-5 ${stageColors[index % stageColors.length]}`}
            >
              <h3 className="text-xl font-bold text-[#003d78]">{stage.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#0b5699]">
                {stage.grades}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
