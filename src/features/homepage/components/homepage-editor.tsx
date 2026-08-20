/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { StatusBadge } from "@/features/admin/components/status-badge";
import { MediaPicker } from "@/features/media/components/media-picker";
import { ImageSettingInput } from "@/features/settings/components/image-setting-input";
import { SECTION_TYPES, type HomepageSectionInput } from "@/lib/validations/homepage";
import { updateHomepageSections, publishHomepage, unpublishHomepage } from "@/actions/homepage.actions";
import {
  Plus,
  GripVertical,
  Trash2,
  Copy,
  Send,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  ImageIcon,
  Save,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

interface HomepageEditorProps {
  config: {
    sections: HomepageSectionInput[];
    status: string;
  };
}

export function HomepageEditor({ config }: HomepageEditorProps) {
  const [sections, setSections] = useState<HomepageSectionInput[]>(config.sections);
  const [status, setStatus] = useState(config.status);
  const [isPending, startTransition] = useTransition();
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [confirmPublish, setConfirmPublish] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeMediaTarget, setActiveMediaTarget] = useState<{ sectionIndex: number; field: string; subIndex?: number } | null>(null);

  const addSection = (type: string) => {
    const label = SECTION_TYPES.find((s) => s.value === type)?.label ?? type;
    const newSec: HomepageSectionInput = {
      type,
      title: label,
      content: getDefaultContentForType(type),
      isEnabled: true,
      order: sections.length,
    };
    setSections((prev) => [...prev, newSec]);
    setExpandedIndex(sections.length);
    setShowAddMenu(false);
  };

  const removeSection = (index: number) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
    if (expandedIndex === index) setExpandedIndex(null);
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

  const updateSectionField = (index: number, field: "title", value: string) => {
    setSections((prev) => {
      const next = [...prev];
      if (!next[index]) return prev;
      next[index] = { ...next[index]!, [field]: value };
      return next;
    });
  };

  const updateSectionContent = (index: number, contentField: string, value: any) => {
    setSections((prev) => {
      const next = [...prev];
      const sec = next[index];
      if (!sec) return prev;
      const content = { ...(sec.content || {}), [contentField]: value };
      next[index] = { ...sec, content };
      return next;
    });
  };

  const updateSectionAllContent = (index: number, newContent: Record<string, any>) => {
    setSections((prev) => {
      const next = [...prev];
      const sec = next[index];
      if (!sec) return prev;
      next[index] = { ...sec, content: newContent };
      return next;
    });
  };

  // Validation helper to ensure mandatory fields like hero banner image are filled
  const validateSections = (sectionsList: HomepageSectionInput[]): boolean => {
    for (let i = 0; i < sectionsList.length; i++) {
      const sec = sectionsList[i]!;
      if (sec.type === "hero" && sec.isEnabled) {
        const content = (sec.content || {}) as Record<string, any>;
        const rawBanners = Array.isArray(content.banners) ? content.banners : [];

        if (rawBanners.length === 0) {
          if (!content.backgroundImage || !String(content.backgroundImage).trim()) {
            toast.error(`Hero Banner Section: Banner image is mandatory. Please upload or select an image.`);
            setExpandedIndex(i);
            return false;
          }
        } else {
          for (let b = 0; b < rawBanners.length; b++) {
            const slide = rawBanners[b];
            if (!slide || !slide.image || !String(slide.image).trim()) {
              toast.error(`Hero Banner Slide ${b + 1}: Banner image is mandatory. Please upload or choose an image.`);
              setExpandedIndex(i);
              return false;
            }
          }
        }
      }
    }
    return true;
  };

  const handleSave = () => {
    if (!validateSections(sections)) return;

    startTransition(async () => {
      const result = await updateHomepageSections(sections);
      if (result.error) toast.error(result.error);
      else toast.success("Draft saved successfully");
    });
  };

  // Save single section as draft
  const handleSaveSection = (sectionIndex: number) => {
    if (!validateSections(sections)) return;

    const sec = sections[sectionIndex];
    const typeLabel = SECTION_TYPES.find((s) => s.value === sec?.type)?.label ?? sec?.title ?? "Section";

    startTransition(async () => {
      const result = await updateHomepageSections(sections);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`"${sec?.title || typeLabel}" saved as draft!`);
      }
    });
  };

  // Save single section and immediately publish live
  const handleSaveAndPublishSection = (sectionIndex: number) => {
    if (!validateSections(sections)) return;

    const sec = sections[sectionIndex];
    const typeLabel = SECTION_TYPES.find((s) => s.value === sec?.type)?.label ?? sec?.title ?? "Section";

    startTransition(async () => {
      const saveRes = await updateHomepageSections(sections);
      if (saveRes.error) {
        toast.error(saveRes.error);
        return;
      }
      const pubRes = await publishHomepage();
      if (pubRes.error) {
        toast.error(pubRes.error);
      } else {
        setStatus("published");
        toast.success(`"${sec?.title || typeLabel}" saved & published live to homepage!`);
      }
    });
  };

  const handlePublish = () => {
    if (status !== "published" && !validateSections(sections)) return;

    startTransition(async () => {
      if (status === "published") {
        const result = await unpublishHomepage();
        if (result.error) toast.error(result.error);
        else {
          toast.success(result.success);
          setStatus("draft");
        }
      } else {
        const saveRes = await updateHomepageSections(sections);
        if (saveRes.error) {
          toast.error(saveRes.error);
          return;
        }
        const result = await publishHomepage();
        if (result.error) toast.error(result.error);
        else {
          toast.success("Homepage saved and published live!");
          setStatus("published");
        }
      }
      setConfirmPublish(false);
    });
  };

  const handleMediaSelect = (url: string) => {
    if (!activeMediaTarget) return;
    const { sectionIndex, field, subIndex } = activeMediaTarget;
    if (subIndex !== undefined) {
      const sec = sections[sectionIndex];
      if (sec) {
        const content = (sec.content || {}) as Record<string, any>;
        const items = Array.isArray(content.items) ? [...content.items] : [];
        if (items[subIndex]) {
          items[subIndex] = { ...items[subIndex], [field]: url };
          updateSectionContent(sectionIndex, "items", items);
        }
      }
    } else {
      updateSectionContent(sectionIndex, field, url);
    }
    setActiveMediaTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Global Bar */}
      <div className="flex items-center gap-3 bg-card p-4 rounded-xl border shadow-xs">
        <StatusBadge status={status} />
        <span className="text-sm text-muted-foreground">({sections.length} sections configured)</span>
        <div className="flex-1" />
        <Button variant="outline" onClick={handleSave} disabled={isPending}>
          {isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Save All Draft
        </Button>
        <Button
          variant={status === "published" ? "outline" : "default"}
          onClick={() => setConfirmPublish(true)}
          disabled={isPending}
          className={status !== "published" ? "bg-[#003d78] hover:bg-[#002a54] text-white" : ""}
        >
          <Send className="h-4 w-4 mr-2" />
          {status === "published" ? "Unpublish Homepage" : "Publish Live"}
        </Button>
      </div>

      {/* Sections List */}
      <div className="space-y-3">
        {sections.map((section, index) => {
          const isExpanded = expandedIndex === index;
          const typeLabel = SECTION_TYPES.find((s) => s.value === section.type)?.label ?? section.type;

          return (
            <Card key={section._id ?? index} className={`transition-all shadow-xs ${!section.isEnabled ? "opacity-50" : ""}`}>
              <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-3 flex-1">
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                  <div className="flex items-center gap-2 flex-1">
                    <span className="font-semibold text-sm">{typeLabel}</span>
                    <Input
                      value={section.title || ""}
                      onChange={(e) => updateSectionField(index, "title", e.target.value)}
                      placeholder="Section Title"
                      className="h-8 max-w-[240px] text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveSection(index, "up")}
                    disabled={index === 0}
                    title="Move up"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveSection(index, "down")}
                    disabled={index === sections.length - 1}
                    title="Move down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => toggleSection(index)} title={section.isEnabled ? "Disable section" : "Enable section"}>
                    {section.isEnabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => duplicateSection(index)} title="Duplicate section">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSection(index)}
                    className="text-destructive hover:text-destructive"
                    title="Delete section"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  >
                    {isExpanded ? "Collapse" : "Edit Content"}
                  </Button>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="border-t pt-4">
                  <SectionContentEditor
                    section={section}
                    index={index}
                    onChange={(field, val) => updateSectionContent(index, field, val)}
                    onUpdateAll={(newContent) => updateSectionAllContent(index, newContent)}
                    onOpenMedia={(field, subIndex) => setActiveMediaTarget({ sectionIndex: index, field, subIndex })}
                  />

                  {/* Section-Specific Save & Publish Action Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 mt-6 border-t bg-muted/20 -mx-6 -mb-6 p-4 rounded-b-lg">
                    <div className="text-xs text-muted-foreground">
                      Finished editing <strong>{section.title || typeLabel}</strong>? Save this section draft or publish it live.
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleSaveSection(index)}
                        disabled={isPending}
                        className="text-xs h-8"
                      >
                        {isPending ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <Save className="h-3.5 w-3.5 mr-1.5" />}
                        Save Section Draft
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => handleSaveAndPublishSection(index)}
                        disabled={isPending}
                        className="bg-[#003d78] hover:bg-[#002a54] text-white text-xs h-8 shadow-xs"
                      >
                        {isPending ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <Send className="h-3.5 w-3.5 mr-1.5" />}
                        Save & Publish Live
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <div className="relative">
        <Button
          type="button"
          variant="outline"
          className="w-full border-dashed"
          onClick={() => setShowAddMenu(!showAddMenu)}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Section
        </Button>

        {showAddMenu && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover text-popover-foreground border rounded-lg shadow-xl p-3 z-50 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {SECTION_TYPES.map((type) => (
              <Button
                key={type.value}
                type="button"
                variant="ghost"
                size="sm"
                className="justify-start text-xs h-auto py-2 px-3"
                onClick={() => addSection(type.value)}
              >
                {type.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      <MediaPicker
        open={!!activeMediaTarget}
        onOpenChange={(open) => !open && setActiveMediaTarget(null)}
        onSelect={handleMediaSelect}
      />

      <ConfirmDialog
        open={confirmPublish}
        onOpenChange={setConfirmPublish}
        title={status === "published" ? "Unpublish Homepage?" : "Save & Publish Homepage?"}
        description={
          status === "published"
            ? "The homepage will revert to draft state."
            : "Your latest section updates will be saved and published live to the homepage."
        }
        onConfirm={handlePublish}
        loading={isPending}
      />
    </div>
  );
}

function SectionContentEditor({
  section,
  index: _index,
  onChange,
  onUpdateAll,
  onOpenMedia,
}: {
  section: HomepageSectionInput;
  index: number;
  onChange: (field: string, val: any) => void;
  onUpdateAll: (newContent: Record<string, any>) => void;
  onOpenMedia: (field: string, subIndex?: number) => void;
}) {
  const content = (section.content || {}) as Record<string, any>;

  switch (section.type) {
    case "hero": {
      // Normalize banners list from content.banners or legacy root fields
      const rawBanners = Array.isArray(content.banners) ? content.banners : [];
      const banners: Array<{
        badge?: string;
        title: string;
        description?: string;
        image: string;
        primaryButtonText?: string;
        primaryButtonUrl?: string;
        secondaryButtonText?: string;
        secondaryButtonUrl?: string;
      }> =
        rawBanners.length > 0
          ? rawBanners.map((b: any, idx: number) => ({
              badge: b?.badge || (idx === 0 ? content.badge : "") || "BE THE LIGHT",
              title: b?.title || (idx === 0 ? content.title : "") || "Saint Lawrence Public School – One of the Best Schools in Jaipur",
              description:
                b?.description ||
                b?.subtitle ||
                (idx === 0 ? content.description || content.subtitle : "") ||
                "Where every child is known by name, nurtured by purpose, and inspired to lead with empathy, integrity, perseverance, and autonomy.",
              image: b?.image || (idx === 0 ? content.backgroundImage : "") || "",
              primaryButtonText: b?.primaryButtonText || b?.buttonText || (idx === 0 ? content.buttonText : "") || "Enquire Now",
              primaryButtonUrl: b?.primaryButtonUrl || b?.buttonUrl || (idx === 0 ? content.buttonUrl : "") || "/admissions",
              secondaryButtonText: b?.secondaryButtonText || (idx === 0 ? content.secondaryButtonText : "") || "Latest News",
              secondaryButtonUrl: b?.secondaryButtonUrl || (idx === 0 ? content.secondaryButtonUrl : "") || "/news",
            }))
          : [
              {
                badge: content.badge || "BE THE LIGHT",
                title: content.title || "Saint Lawrence Public School – One of the Best Schools in Jaipur",
                description:
                  content.subtitle ||
                  content.description ||
                  "Where every child is known by name, nurtured by purpose, and inspired to lead with empathy, integrity, perseverance, and autonomy.",
                image: content.backgroundImage || "",
                primaryButtonText: content.buttonText || content.primaryButtonText || "Enquire Now",
                primaryButtonUrl: content.buttonUrl || content.primaryButtonUrl || "/admissions",
                secondaryButtonText: "Latest News",
                secondaryButtonUrl: "/news",
              },
            ];

      const saveBanners = (updatedBanners: typeof banners) => {
        const first = updatedBanners[0];
        const newContent = {
          ...content,
          banners: updatedBanners,
          backgroundImage: first?.image || "",
          title: first?.title || "",
          subtitle: first?.description || "",
          description: first?.description || "",
          badge: first?.badge || "",
          buttonText: first?.primaryButtonText || "",
          buttonUrl: first?.primaryButtonUrl || "",
          secondaryButtonText: first?.secondaryButtonText || "",
          secondaryButtonUrl: first?.secondaryButtonUrl || "",
        };
        onUpdateAll(newContent);
      };

      const addBanner = () => {
        const newSlide = {
          badge: "BE THE LIGHT",
          title: "Saint Lawrence Public School",
          description: "Nurturing Minds, Building Futures.",
          image: "",
          primaryButtonText: "Enquire Now",
          primaryButtonUrl: "/admissions",
          secondaryButtonText: "Latest News",
          secondaryButtonUrl: "/news",
        };
        saveBanners([...banners, newSlide]);
      };

      const removeBanner = (i: number) => {
        if (banners.length <= 1) {
          toast.info("At least one banner slide is required.");
          return;
        }
        saveBanners(banners.filter((_, idx) => idx !== i));
      };

      const updateBanner = (i: number, field: string, value: any) => {
        const copy = banners.map((b, idx) => (idx === i ? { ...b, [field]: value } : b));
        saveBanners(copy);
      };

      return (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-bold text-foreground">
              Hero Banner Slides ({banners.length})
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addBanner}
              className="text-xs h-7"
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Banner Slide
            </Button>
          </div>

          <div className="space-y-4">
            {banners.map((slide, i) => {
              const isImageMissing = !slide.image || !String(slide.image).trim();

              return (
                <Card
                  key={`hero-slide-editor-${i}`}
                  className={`border transition-all ${
                    isImageMissing ? "border-destructive/60 bg-destructive/5" : "border-border bg-muted/20"
                  }`}
                >
                  <CardHeader className="py-2.5 px-4 flex flex-row items-center justify-between border-b bg-muted/40">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold">Slide {i + 1}</span>
                      {slide.title && (
                        <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                          - {slide.title}
                        </span>
                      )}
                      {isImageMissing && (
                        <span className="text-[10px] bg-destructive/20 text-destructive font-medium px-1.5 py-0.5 rounded">
                          Image Required *
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {banners.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBanner(i)}
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive cursor-pointer"
                          title="Remove slide"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 space-y-3">
                    {/* MANDATORY Banner Image */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-semibold flex items-center gap-1">
                          Banner Background Image <span className="text-destructive font-bold">* (Mandatory)</span>
                        </Label>
                      </div>
                      <ImageSettingInput
                        value={slide.image || ""}
                        onChange={(url) => updateBanner(i, "image", url)}
                        placeholder="Upload or paste banner image URL (Mandatory)"
                        label={`Banner Slide ${i + 1}`}
                        description="High quality school photo or campus building view (Recommended 1920x1080)."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="space-y-1">
                        <Label className="text-xs">Badge / Tagline (Above Title)</Label>
                        <Input
                          value={slide.badge || ""}
                          onChange={(e) => updateBanner(i, "badge", e.target.value)}
                          placeholder="BE THE LIGHT"
                          className="text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Main Title</Label>
                        <Input
                          value={slide.title || ""}
                          onChange={(e) => updateBanner(i, "title", e.target.value)}
                          placeholder="Saint Lawrence Public School – One of the Best Schools in Jaipur"
                          className="text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs">Description / Subtext</Label>
                      <Textarea
                        value={slide.description || ""}
                        onChange={(e) => updateBanner(i, "description", e.target.value)}
                        placeholder="Where every child is known by name, nurtured by purpose..."
                        rows={2}
                        className="text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Primary Button */}
                      <div className="p-2.5 rounded-lg border bg-background/50 space-y-2">
                        <span className="text-[11px] font-semibold text-primary block">
                          Primary Button (Gold/Filled)
                        </span>
                        <div className="space-y-1">
                          <Label className="text-[10px]">Button Label</Label>
                          <Input
                            value={slide.primaryButtonText || ""}
                            onChange={(e) => updateBanner(i, "primaryButtonText", e.target.value)}
                            placeholder="Enquire Now"
                            className="text-xs h-7"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px]">Button URL</Label>
                          <Input
                            value={slide.primaryButtonUrl || ""}
                            onChange={(e) => updateBanner(i, "primaryButtonUrl", e.target.value)}
                            placeholder="/admissions"
                            className="text-xs h-7"
                          />
                        </div>
                      </div>

                      {/* Secondary Button */}
                      <div className="p-2.5 rounded-lg border bg-background/50 space-y-2">
                        <span className="text-[11px] font-semibold text-muted-foreground block">
                          Secondary Button (Outline)
                        </span>
                        <div className="space-y-1">
                          <Label className="text-[10px]">Button Label</Label>
                          <Input
                            value={slide.secondaryButtonText || ""}
                            onChange={(e) => updateBanner(i, "secondaryButtonText", e.target.value)}
                            placeholder="Latest News"
                            className="text-xs h-7"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px]">Button URL</Label>
                          <Input
                            value={slide.secondaryButtonUrl || ""}
                            onChange={(e) => updateBanner(i, "secondaryButtonUrl", e.target.value)}
                            placeholder="/news"
                            className="text-xs h-7"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      );
    }

    case "announcement":
      return (
        <div className="space-y-2 pt-2">
          <Label className="text-xs">Announcement Text</Label>
          <Input value={content.text || ""} onChange={(e) => onChange("text", e.target.value)} placeholder="Admissions open for Academic Session 2025–26!" />
        </div>
      );

    case "introduction":
    case "principal-message":
    case "chairman-message":
      return (
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Author Name</Label>
              <Input value={content.name || ""} onChange={(e) => onChange("name", e.target.value)} placeholder="Dr. R. K. Sharma" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Designation</Label>
              <Input value={content.designation || ""} onChange={(e) => onChange("designation", e.target.value)} placeholder="Principal" />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Subtitle / Tagline</Label>
            <Input value={content.subtitle || ""} onChange={(e) => onChange("subtitle", e.target.value)} placeholder="Message from the Desk" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Detailed Description / Message</Label>
            <Textarea value={content.description || ""} onChange={(e) => onChange("description", e.target.value)} rows={4} placeholder="Write message..." />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Image URL</Label>
            <div className="flex gap-2">
              <Input value={content.image || ""} onChange={(e) => onChange("image", e.target.value)} placeholder="https://..." />
              <Button type="button" variant="outline" size="sm" onClick={() => onOpenMedia("image")}>
                <ImageIcon className="h-4 w-4 mr-1" /> Select
              </Button>
            </div>
          </div>
        </div>
      );

    case "statistics": {
      const items = (content.items || []) as { value: string; label: string }[];
      const addItem = () => onChange("items", [...items, { value: "100+", label: "New Metric" }]);
      const removeItem = (i: number) => onChange("items", items.filter((_, idx) => idx !== i));
      const updateItem = (i: number, f: "value" | "label", v: string) => {
        const copy = [...items];
        if (copy[i]) {
          copy[i] = { ...copy[i]!, [f]: v };
          onChange("items", copy);
        }
      };

      return (
        <div className="space-y-3 pt-2">
          <Label className="text-xs font-semibold">Stats Items</Label>
          <div className="grid grid-cols-2 gap-3">
            {items.map((item, i) => (
              <div key={i} className="p-3 border rounded-md space-y-2 bg-muted/20">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-muted-foreground">Stat #{i + 1}</span>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(i)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                </div>
                <Input value={item.value} onChange={(e) => updateItem(i, "value", e.target.value)} placeholder="Value (e.g. 100%)" />
                <Input value={item.label} onChange={(e) => updateItem(i, "label", e.target.value)} placeholder="Label (e.g. Pass Rate)" />
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addItem}><Plus className="h-3.5 w-3.5 mr-1" /> Add Stat</Button>
        </div>
      );
    }

    case "programs":
    case "facilities":
    case "achievements": {
      const items = (content.items || []) as { title: string; description?: string; image?: string }[];
      const addItem = () => onChange("items", [...items, { title: "New Item", description: "", image: "" }]);
      const removeItem = (i: number) => onChange("items", items.filter((_, idx) => idx !== i));
      const updateItem = (i: number, f: string, v: string) => {
        const copy = [...items];
        if (copy[i]) {
          copy[i] = { ...copy[i]!, [f]: v };
          onChange("items", copy);
        }
      };

      return (
        <div className="space-y-3 pt-2">
          <div className="space-y-1">
            <Label className="text-xs">Section Description</Label>
            <Input value={content.description || ""} onChange={(e) => onChange("description", e.target.value)} placeholder="Description..." />
          </div>
          <Label className="text-xs font-semibold">Cards / Items</Label>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="p-3 border rounded-md space-y-2 bg-muted/20">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-muted-foreground">Item #{i + 1}</span>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(i)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                </div>
                <Input value={item.title} onChange={(e) => updateItem(i, "title", e.target.value)} placeholder="Title" />
                <Textarea value={item.description || ""} onChange={(e) => updateItem(i, "description", e.target.value)} placeholder="Description" rows={2} />
                <div className="flex gap-2">
                  <Input value={item.image || ""} onChange={(e) => updateItem(i, "image", e.target.value)} placeholder="Image URL" />
                  <Button type="button" variant="outline" size="sm" onClick={() => onOpenMedia("image", i)}>
                    <ImageIcon className="h-4 w-4 mr-1" /> Select
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addItem}><Plus className="h-3.5 w-3.5 mr-1" /> Add Card</Button>
        </div>
      );
    }

    case "cta":
    case "contact-cta":
      return (
        <div className="space-y-3 pt-2">
          <div className="space-y-1">
            <Label className="text-xs">Description / Text</Label>
            <Textarea value={content.description || ""} onChange={(e) => onChange("description", e.target.value)} placeholder="Ready to join us?" rows={2} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Button Text</Label>
              <Input value={content.buttonText || ""} onChange={(e) => onChange("buttonText", e.target.value)} placeholder="Get in Touch" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Button URL</Label>
              <Input value={content.buttonUrl || ""} onChange={(e) => onChange("buttonUrl", e.target.value)} placeholder="/contact" />
            </div>
          </div>
        </div>
      );

    case "video":
      return (
        <div className="space-y-2 pt-2">
          <Label className="text-xs">Embed Video URL</Label>
          <Input value={content.videoUrl || ""} onChange={(e) => onChange("videoUrl", e.target.value)} placeholder="https://www.youtube.com/embed/..." />
        </div>
      );

    case "faq": {
      const items = (content.items || []) as { question: string; answer: string }[];
      const addItem = () => onChange("items", [...items, { question: "New Question", answer: "" }]);
      const removeItem = (i: number) => onChange("items", items.filter((_, idx) => idx !== i));
      const updateItem = (i: number, f: "question" | "answer", v: string) => {
        const copy = [...items];
        if (copy[i]) {
          copy[i] = { ...copy[i]!, [f]: v };
          onChange("items", copy);
        }
      };

      return (
        <div className="space-y-3 pt-2">
          <Label className="text-xs font-semibold">FAQ Items</Label>
          {items.map((item, i) => (
            <div key={i} className="p-3 border rounded-md space-y-2 bg-muted/20">
              <div className="flex gap-2">
                <Input value={item.question} onChange={(e) => updateItem(i, "question", e.target.value)} placeholder="Question" className="flex-1" />
                <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(i)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
              </div>
              <Textarea value={item.answer} onChange={(e) => updateItem(i, "answer", e.target.value)} placeholder="Answer" rows={2} />
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addItem}><Plus className="h-3.5 w-3.5 mr-1" /> Add FAQ Item</Button>
        </div>
      );
    }

    default:
      return (
        <div className="space-y-2 pt-2">
          <Label className="text-xs">Description / Content</Label>
          <Textarea value={content.description || ""} onChange={(e) => onChange("description", e.target.value)} rows={3} placeholder="Section text content..." />
        </div>
      );
  }
}

function getDefaultContentForType(type: string): Record<string, any> {
  switch (type) {
    case "hero":
      return {
        banners: [
          {
            badge: "BE THE LIGHT",
            title: "Saint Lawrence Public School – One of the Best Schools in Jaipur",
            description:
              "Where every child is known by name, nurtured by purpose, and inspired to lead with empathy, integrity, perseverance, and autonomy.",
            image: "",
            primaryButtonText: "Enquire Now",
            primaryButtonUrl: "/admissions",
            secondaryButtonText: "Latest News",
            secondaryButtonUrl: "/news",
          },
        ],
      };
    case "announcement":
      return { text: "Admissions open for the upcoming academic session." };
    case "introduction":
      return { subtitle: "About Our Institution", description: "Providing holistic education with high moral standards.", image: "" };
    case "principal-message":
      return { name: "Dr. R. K. Sharma", designation: "Principal", subtitle: "Principal's Message", description: "Welcome to a center of academic excellence.", image: "" };
    case "chairman-message":
      return { name: "Shri V. K. Gupta", designation: "Chairman", subtitle: "Chairman's Message", description: "Guiding future leaders towards global success.", image: "" };
    case "statistics":
      return { items: [{ value: "100%", label: "CBSE Pass Result" }, { value: "50+", label: "Expert Faculty" }, { value: "2000+", label: "Active Students" }, { value: "15+", label: "Sports & Labs" }] };
    case "programs":
      return { description: "Explore our academic offerings from Primary to Senior Secondary levels.", items: [{ title: "Primary School", description: "Classes I to V", image: "" }, { title: "Middle School", description: "Classes VI to VIII", image: "" }, { title: "Senior Secondary", description: "Science, Commerce, Arts", image: "" }] };
    case "facilities":
      return { description: "World-class facilities supporting all-round development.", items: [{ title: "Science & Computer Labs", description: "State of the art practical labs", image: "" }, { title: "Library & E-Resources", description: "Over 10,000 books and digital archives", image: "" }, { title: "Sports Complex", description: "Playgrounds for indoor and outdoor sports", image: "" }] };
    case "cta":
    case "contact-cta":
      return { description: "Take the first step towards your child's bright future.", buttonText: "Get in Touch", buttonUrl: "/contact" };
    case "video":
      return { videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" };
    case "faq":
      return { items: [{ question: "What are the school timings?", answer: "Primary: 8:00 AM – 1:30 PM | Senior: 8:00 AM – 2:30 PM" }, { question: "Is school transport available?", answer: "Yes, GPS-tracked buses cover all major routes in the city." }] };
    default:
      return { description: "" };
  }
}
