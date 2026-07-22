type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  light?: boolean;
  align?: "left" | "center";
};

export default function SectionHeading({
  title,
  subtitle,
  light = false,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-10 md:mb-14 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h2
        className={`text-2xl font-bold leading-tight md:text-3xl lg:text-4xl ${
          light ? "text-white" : "text-[#003d78]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mx-auto mt-4 max-w-3xl text-base leading-relaxed md:text-lg ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-white/90" : "text-gray-600"}`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-1 w-16 rounded-full bg-[#ffb300] ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
