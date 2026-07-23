import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import { school } from "@/lib/school";

export default function DirectorSection() {
  return (
    <section className="bg-[#f8f9fa] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          title="Director's Desk"
          subtitle={`At ${school.name}, leadership is rooted in vision, dedication, and a deep commitment to nurturing every child's potential.`}
        />

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl shadow-xl lg:max-w-none">
            <Image
              src={images.director}
              alt={`${school.director.name}, ${school.director.title}`}
              fill
              className="object-cover object-top"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0b5699]">
              {school.director.title}
            </p>
            <h3 className="mt-2 text-3xl font-bold text-[#003d78] md:text-4xl">
              {school.director.name}
            </h3>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-600">
              <p>
                Welcome to {school.name}. Our institution stands as a beacon of
                quality education on Goner Road, Jaipur — committed to shaping
                confident, compassionate, and capable young leaders.
              </p>
              <p>
                Under our leadership, we strive to provide a nurturing
                environment where academic excellence meets holistic development.
                Every child at Saint Lawrence is encouraged to discover their
                strengths, embrace curiosity, and grow with integrity.
              </p>
              <p>
                We invite you to visit our campus, meet our dedicated faculty,
                and experience the spirit of learning that defines our school
                community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
