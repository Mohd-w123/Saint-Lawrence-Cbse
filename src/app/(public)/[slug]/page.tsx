import { notFound } from "next/navigation";
import { pageService } from "@/services/page.service";
import { Container } from "@/components/layout/container";
import { RichTextRenderer } from "@/components/shared/rich-text-renderer";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await pageService.findPublishedBySlug(slug);
  if (!page) return { title: "Not Found" };
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.description,
    keywords: page.seoKeywords,
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const page = await pageService.findPublishedBySlug(slug);
  if (!page) notFound();

  return (
    <main>
      {page.banner && (
        <div className="relative h-48 md:h-64 bg-primary/10">
          <img src={page.banner} alt={page.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{page.title}</h1>
          </div>
        </div>
      )}
      <Container className="py-12">
        {!page.banner && <h1 className="text-3xl font-bold mb-6">{page.title}</h1>}
        {page.description && <p className="text-lg text-muted-foreground mb-8">{page.description}</p>}
        {page.blocks.map((block, idx) => (
          <div key={idx}>
            {block.type === "rich-text" && typeof block.content.html === "string" && (
              <RichTextRenderer content={block.content.html} />
            )}
            {block.type === "image" && typeof block.content.url === "string" && (
              <figure className="my-8">
                <img src={block.content.url} alt={(block.content.alt as string) || ""} className="rounded-lg w-full" />
                {typeof block.content.caption === "string" && <figcaption className="text-sm text-muted-foreground mt-2 text-center">{block.content.caption}</figcaption>}
              </figure>
            )}
          </div>
        ))}
      </Container>
    </main>
  );
}
