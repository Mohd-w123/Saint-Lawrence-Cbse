import SectionHeading from "@/components/ui/SectionHeading";
import { school } from "@/lib/school";

export default function WhyChoose() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          title={`Why Choose ${school.shortName} – A Top CBSE School in Jaipur`}
          subtitle={`At ${school.name}, we believe every child learns differently — and thrives when their unique pace is respected. Our approach builds genuine curiosity, strong learning habits, and real confidence at every stage of growth. Students don't just follow a curriculum; they own their learning journey. That's what makes Saint Lawrence one of the most trusted English-medium CBSE schools in Jaipur.`}
        />
      </div>
    </section>
  );
}
