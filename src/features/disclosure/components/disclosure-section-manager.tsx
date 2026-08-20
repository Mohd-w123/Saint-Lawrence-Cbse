/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StatusBadge } from "@/features/admin/components/status-badge";
import { createDisclosureSection, updateDisclosureSection, deleteDisclosureSection } from "@/actions/disclosure.actions";
import { generateSlug } from "@/lib/cms/slug";
import { toast } from "sonner";
import { Plus, Trash2, Pencil } from "lucide-react";
import Link from "next/link";

interface Props {
  categoryId: string;
  categoryName: string;
  sections: any[];
}

export function DisclosureSectionManager({ categoryId, categoryName, sections: initialSections }: Props) {
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("draft");

  const resetForm = () => { setTitle(""); setSlug(""); setDescription(""); setStatus("draft"); setEditItem(null); };
  const openEdit = (item: any) => { setEditItem(item); setTitle(item.title); setSlug(item.slug); setDescription(item.description || ""); setStatus(item.status); setDialogOpen(true); };

  const handleSubmit = () => {
    startTransition(async () => {
      const payload = { category: categoryId, title, slug: slug || generateSlug(title), description, status };
      const result = editItem ? await updateDisclosureSection({ id: editItem._id, ...payload }) : await createDisclosureSection(payload);
      if (result.error) toast.error(result.error);
      else { toast.success(result.success); setDialogOpen(false); resetForm(); }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const r = await deleteDisclosureSection(id);
      if (r.error) toast.error(r.error);
      else toast.success(r.success);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/admin/disclosure" className="hover:text-foreground">Disclosure</Link>
        <span>/</span>
        <span className="text-foreground font-medium">{categoryName}</span>
      </div>

      <div className="flex justify-end">
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) resetForm(); }}>
          <DialogTrigger><Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Section</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editItem ? "Edit" : "Add"} Section</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2"><Label>Title</Label><Input value={title} onChange={(e) => { setTitle(e.target.value); if (!editItem) setSlug(generateSlug(e.target.value)); }} placeholder="e.g. School Information" /></div>
              <div className="space-y-2"><Label>Slug</Label><Input value={slug} onChange={(e) => setSlug(generateSlug(e.target.value))} /></div>
              <div className="space-y-2"><Label>Description</Label><Input value={description} onChange={(e) => setDescription(e.target.value)} /></div>
              <div className="space-y-2"><Label>Status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v || "draft")}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="published">Published</SelectItem></SelectContent></Select>
              </div>
              <Button onClick={handleSubmit} disabled={isPending} className="w-full">{isPending ? "Saving..." : editItem ? "Update" : "Create"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {initialSections.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">No sections yet. Add sections like &quot;School Information&quot;, &quot;Teaching Staff&quot;, etc.</CardContent></Card>
      ) : (
        <Accordion className="space-y-3">
          {initialSections.map((section: any) => (
            <AccordionItem key={section._id} value={section._id} className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <span className="font-medium">{section.title}</span>
                  <StatusBadge status={section.status} />
                  <span className="text-xs text-muted-foreground">({section.fields?.length || 0} fields)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="flex gap-2 mb-4">
                  <Button size="sm" variant="outline" onClick={() => openEdit(section)}><Pencil className="h-3 w-3 mr-1" /> Edit</Button>
                  <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleDelete(section._id)} disabled={isPending}><Trash2 className="h-3 w-3 mr-1" /> Delete</Button>
                </div>
                {section.fields && section.fields.length > 0 ? (
                  <div className="space-y-2">
                    {section.fields.map((field: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-muted/50 rounded text-sm">
                        <span className="font-medium flex-1">{field.label}</span>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded font-mono">{field.type}</span>
                        <span className="text-xs text-muted-foreground truncate max-w-[200px]">{String(field.value ?? "—")}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No fields configured. Edit sections to add disclosure fields.</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
