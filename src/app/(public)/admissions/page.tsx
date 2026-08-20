import { admissionService } from "@/services/admission.service";
import { Container } from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RichTextRenderer } from "@/components/shared/rich-text-renderer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admissions", description: "Admission information and process" };

export default async function PublicAdmissionsPage() {
  const result = await admissionService.findPublished();

  return (
    <main>
      <div className="bg-[#003d78] text-white py-16">
        <Container>
          <h1 className="text-4xl font-bold">Admissions</h1>
          <p className="mt-2 text-white/80 text-lg">Join our family of learners</p>
        </Container>
      </div>
      <Container className="py-12">
        {result.data.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">Admission information coming soon.</p>
        ) : (
          <div className="space-y-8 max-w-4xl mx-auto">
            {result.data.map((item) => (
              <Card key={item._id.toString()} className="overflow-hidden">
                <CardHeader className="bg-[#003d78]/5"><CardTitle className="text-xl">{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">Session: {item.session}</p>
                </CardHeader>
                <CardContent className="p-6"><RichTextRenderer content={item.content} /></CardContent>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
