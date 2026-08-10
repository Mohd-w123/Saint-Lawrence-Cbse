"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { StatusBadge } from "@/features/admin/components/status-badge";
import { SECTION_TYPES, type HomepageSectionInput } from "@/lib/validations/homepage";
import { updateHomepageSections, publishHomepage, unpublishHomepage } from "@/actions/homepage.actions";
import { Plus, GripVertical, Trash2, Copy, Send, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface HomepageEditorProps {
  config: {
    sections: HomepageSectionInput[];
    status: string;
  };
}

export function HomepageEditor({ config }: HomepageEditorProps) {
  const [sections, setSections] = useState<HomepageSectionInput[]>(config.sections);
  const [isPending, startTransition] = useTransition();
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [confirmPublish, setConfirmPublish] = useState(false);

  const addSection = (type: string) => {
    const label = SECTION_TYPES.find((s) => s.value === type)?.label ?? type;
    setSections((prev) => [
      ...prev,
      { type, title: label, content: {}, isEnabled: true, order: prev.length },
    ]);
    setShowAddMenu(false);
  };

  const removeSection = (index: number) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const duplicateSection = (index: number) => {
    setSections((prev) => {
      const source = prev[index];
      if (!source) return prev;
      const copy = { ...source, _id: undefined, order: prev.length };
      return [...prev, copy];
    });
  };

  const toggleSection = (index: number) => {
    setSections((prev) =>
      prev.map((s, i) => (i === index ? { ...s, isEnabled: !s.isEnabled } : s))
    );
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    setSections((prev) => {
      const newSections = [...prev];
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= newSections.length) return prev;
      const a = newSections[index]!;
      const b = newSections[target]!;
      newSections[index] = b;
      newSections[target] = a;
      return newSections.map((s, i) => ({ ...s, order: i }));
    });
  };

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateHomepageSections(sections);
      if (result.error) toast.error(result.error);
      else toast.success("Sections saved");
    });
  };

  const handlePublish = () => {
    startTransition(async () => {
      const result = config.status === "published"
        ? await unpublishHomepage()
        : await publishHomepage();
      if (result.error) toast.error(result.error);
      else toast.success(result.success);
      setConfirmPublish(false);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <StatusBadge status={config.status} />
        <div className="flex-1" />
        <Button variant="outline" onClick={handleSave} disabled={isPending}>
          Save Draft
        </Button>
        <Button onClick={() => setConfirmPublish(true)} disabled={isPending}>
          <Send className="h-4 w-4 mr-2" />
          {config.status === "published" ? "Unpublish" : "Publish"}
        </Button>
      </div>

      {sections.map((section, index) => (
        <Card key={section._id ?? index} className={!section.isEnabled ? "opacity-60" : ""}>
          <CardHeader className="flex flex-row items-center gap-2 py-3 px-4">
            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
            <CardTitle className="text-sm flex-1">
              {section.title || SECTION_TYPES.find((s) => s.value === section.type)?.label || section.type}
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button size="sm" variant="ghost" onClick={() => moveSection(index, "up")} disabled={index === 0}>
                ↑
              </Button>
              <Button size="sm" variant="ghost" onClick={() => moveSection(index, "down")} disabled={index === sections.length - 1}>
                ↓
              </Button>
              <Button size="sm" variant="ghost" onClick={() => toggleSection(index)}>
                {section.isEnabled ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => duplicateSection(index)}>
                <Copy className="h-3.5 w-3.5" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => removeSection(index)}>
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="py-2 px-4">
            <p className="text-xs text-muted-foreground">Type: {section.type}</p>
          </CardContent>
        </Card>
      ))}

      {/* Add Section */}
      <div className="relative">
        <Button variant="outline" className="w-full border-dashed" onClick={() => setShowAddMenu(!showAddMenu)}>
          <Plus className="h-4 w-4 mr-2" /> Add Section
        </Button>
        {showAddMenu && (
          <Card className="absolute z-10 mt-2 w-full max-h-64 overflow-y-auto">
            <CardContent className="p-2 grid grid-cols-2 gap-1">
              {SECTION_TYPES.map((type) => (
                <Button key={type.value} variant="ghost" size="sm" className="justify-start text-xs" onClick={() => addSection(type.value)}>
                  {type.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      <ConfirmDialog
        open={confirmPublish}
        onOpenChange={setConfirmPublish}
        title={config.status === "published" ? "Unpublish Homepage?" : "Publish Homepage?"}
        description={config.status === "published" ? "The homepage will revert to draft state." : "The current sections will be live on the public website."}
        onConfirm={handlePublish}
        loading={isPending}
      />
    </div>
  );
}
