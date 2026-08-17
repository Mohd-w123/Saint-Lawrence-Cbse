import { disclosureCategoryService, disclosureSectionService } from "@/services/disclosure.service";
import { Container } from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mandatory Public Disclosure", description: "CBSE Mandatory Public Disclosure" };

export default async function PublicDisclosurePage() {
  const categories = await disclosureCategoryService.findPublished();
  const categoriesWithSections = await Promise.all(
    categories.data.map(async (cat) => {
      const sections = await disclosureSectionService.findPublishedByCategory(cat._id.toString());
      return { ...cat, sections };
    })
  );

  return (
    <main>
      <div className="bg-[#003d78] text-white py-16">
        <Container><h1 className="text-4xl font-bold">Mandatory Public Disclosure</h1><p className="mt-2 text-white/80 text-lg">As per CBSE requirements</p></Container>
      </div>
      <Container className="py-12">
        {categoriesWithSections.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">Disclosure information coming soon.</p>
        ) : (
          <div className="space-y-8 max-w-4xl mx-auto">
            {categoriesWithSections.map((cat) => (
              <Card key={cat._id.toString()} className="overflow-hidden">
                <CardHeader className="bg-[#003d78]/5 border-b"><CardTitle className="text-xl">{cat.name}</CardTitle>{cat.description && <p className="text-sm text-muted-foreground">{cat.description}</p>}</CardHeader>
                <CardContent className="p-0">
                  {cat.sections.length === 0 ? (
                    <p className="p-6 text-sm text-muted-foreground">No sections available.</p>
                  ) : (
                    <Accordion className="divide-y">
                      {cat.sections.map((sec) => (
                        <AccordionItem key={sec._id.toString()} value={sec._id.toString()} className="border-0">
                          <AccordionTrigger className="px-6 hover:no-underline hover:bg-muted/30"><span className="font-medium">{sec.title}</span></AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            {sec.fields && sec.fields.length > 0 ? (
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <tbody className="divide-y">
                                    {sec.fields.map((field: { label: string; type: string; value: unknown }, idx: number) => (
                                      <tr key={idx}>
                                        <td className="py-2 pr-4 font-medium text-muted-foreground w-1/3">{field.label}</td>
                                        <td className="py-2">
                                          {field.type === "url" ? (
                                            <a href={String(field.value)} target="_blank" rel="noopener" className="text-[#0b5699] hover:underline inline-flex items-center gap-1"><ExternalLink className="h-3 w-3" /> View</a>
                                          ) : field.type === "document" ? (
                                            <a href={String(field.value)} target="_blank" rel="noopener" className="text-[#0b5699] hover:underline inline-flex items-center gap-1"><FileText className="h-3 w-3" /> Download</a>
                                          ) : field.type === "boolean" ? (
                                            <span>{field.value ? "Yes" : "No"}</span>
                                          ) : (
                                            <span>{String(field.value ?? "—")}</span>
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">Details coming soon.</p>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
