"use client";

import { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getMedia } from "@/actions/media.actions";
import { Search, Image as ImageIcon } from "lucide-react";

interface MediaPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string) => void;
  mimeFilter?: string;
}

export function MediaPicker({ open, onOpenChange, onSelect, mimeFilter = "image" }: MediaPickerProps) {
  const [items, setItems] = useState<{ _id: string; url: string; originalName: string; mimeType: string }[]>([]);
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    startTransition(async () => {
      const result = await getMedia({ search: search || undefined, type: mimeFilter, limit: "24" });
      setItems(result.data as never);
    });
  }, [open, search, mimeFilter]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8" />
        </div>
        <div className="flex-1 overflow-y-auto grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
          {items.map((item) => (
            <button
              key={item._id}
              onClick={() => { onSelect(item.url); onOpenChange(false); }}
              className="aspect-square relative rounded border overflow-hidden hover:ring-2 ring-primary transition-all bg-muted flex items-center justify-center"
            >
              {item.mimeType.startsWith("image/") ? (
                <Image src={item.url} alt={item.originalName} fill className="object-cover" sizes="150px" />
              ) : (
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
              )}
            </button>
          ))}
          {items.length === 0 && !isPending && (
            <p className="col-span-full text-center text-sm text-muted-foreground py-8">No media found</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
