import { Container } from "@/components/layout/container";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import type { HomepageSectionInput } from "@/lib/validations/homepage";

interface HomepageRendererProps {
  sections: HomepageSectionInput[];
}

export function HomepageRenderer({ sections }: HomepageRendererProps) {
  const enabledSections = sections.filter((s) => s.isEnabled).sort((a, b) => a.order - b.order);

  return (
    <>
      {enabledSections.map((section, index) => (
        <HomepageSection key={section._id ?? index} section={section} />
      ))}
    </>
  );
}

function HomepageSection({ section }: { section: HomepageSectionInput }) {
  const content = section.content as Record<string, any>;

  switch (section.type) {
    case "hero":
      return (
        <section className="relative min-h-[60vh] flex items-center bg-primary/5">
          {content.backgroundImage && (
            <img src={content.backgroundImage as string} alt="" className="absolute inset-0 w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black/40" />
          <Container className="relative z-10 text-center text-white py-20">
            {content.title && <h1 className="text-4xl md:text-6xl font-bold mb-4">{content.title as string}</h1>}
            {content.subtitle && <p className="text-xl md:text-2xl mb-6 opacity-90">{content.subtitle as string}</p>}
            {content.buttonText && (
              <a href={(content.buttonUrl as string) || "#"} className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-md font-medium hover:opacity-90 transition">
                {content.buttonText as string}
              </a>
            )}
          </Container>
        </section>
      );

    case "announcement":
      return (
        <div className="bg-accent text-accent-foreground py-3">
          <Container className="text-center text-sm font-medium">
            {content.text as string}
          </Container>
        </div>
      );

    case "introduction":
    case "principal-message":
    case "chairman-message":
      return (
        <SectionWrapper background="default">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              {section.title && <h2 className="text-3xl font-bold mb-4">{section.title}</h2>}
              {content.subtitle && <p className="text-lg text-muted-foreground mb-6">{content.subtitle as string}</p>}
              <div className="flex flex-col md:flex-row items-center gap-8">
                {content.image && (
                  <img src={content.image as string} alt={section.title || ""} className="w-48 h-48 rounded-full object-cover" />
                )}
                <div className="text-left">
                  {content.description && <p className="text-muted-foreground">{content.description as string}</p>}
                  {content.name && <p className="mt-4 font-semibold">{content.name as string}</p>}
                  {content.designation && <p className="text-sm text-muted-foreground">{content.designation as string}</p>}
                </div>
              </div>
            </div>
          </Container>
        </SectionWrapper>
      );

    case "statistics":
      return (
        <SectionWrapper background="primary">
          <Container>
            {section.title && <h2 className="text-3xl font-bold text-center mb-8">{section.title}</h2>}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {Array.isArray(content.items) && (content.items as { value: string; label: string }[]).map((item, i) => (
                <div key={i}>
                  <p className="text-4xl font-bold">{item.value}</p>
                  <p className="text-sm opacity-80 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </SectionWrapper>
      );

    case "programs":
    case "facilities":
    case "achievements":
      return (
        <SectionWrapper>
          <Container>
            {section.title && <h2 className="text-3xl font-bold text-center mb-8">{section.title}</h2>}
            {content.description && <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">{content.description as string}</p>}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.isArray(content.items) && (content.items as { title: string; description?: string; image?: string }[]).map((item, i) => (
                <div key={i} className="rounded-lg border p-6 text-center">
                  {item.image && <img src={item.image} alt={item.title} className="w-16 h-16 mx-auto mb-4 rounded" />}
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                </div>
              ))}
            </div>
          </Container>
        </SectionWrapper>
      );

    case "cta":
    case "contact-cta":
      return (
        <SectionWrapper background="accent">
          <Container className="text-center">
            {section.title && <h2 className="text-3xl font-bold mb-4">{section.title}</h2>}
            {content.description && <p className="text-lg mb-6 opacity-80">{content.description as string}</p>}
            {content.buttonText && (
              <a href={(content.buttonUrl as string) || "#"} className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:opacity-90 transition">
                {content.buttonText as string}
              </a>
            )}
          </Container>
        </SectionWrapper>
      );

    case "video":
      return (
        <SectionWrapper>
          <Container className="max-w-4xl">
            {section.title && <h2 className="text-3xl font-bold text-center mb-8">{section.title}</h2>}
            {content.videoUrl && (
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe src={content.videoUrl as string} className="w-full h-full" allowFullScreen />
              </div>
            )}
          </Container>
        </SectionWrapper>
      );

    case "faq":
      return (
        <SectionWrapper background="muted">
          <Container className="max-w-3xl">
            {section.title && <h2 className="text-3xl font-bold text-center mb-8">{section.title}</h2>}
            <div className="space-y-4">
              {Array.isArray(content.items) && (content.items as { question: string; answer: string }[]).map((item, i) => (
                <details key={i} className="rounded-lg border p-4">
                  <summary className="font-medium cursor-pointer">{item.question}</summary>
                  <p className="mt-2 text-muted-foreground">{item.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </SectionWrapper>
      );

    default:
      return (
        <SectionWrapper>
          <Container>
            {section.title && <h2 className="text-3xl font-bold text-center mb-4">{section.title}</h2>}
            {content.description && <p className="text-center text-muted-foreground">{content.description as string}</p>}
          </Container>
        </SectionWrapper>
      );
  }
}
