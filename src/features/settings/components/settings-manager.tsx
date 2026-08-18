/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateSetting, createSetting } from "@/actions/settings.actions";
import { toast } from "sonner";
import { Save, Plus, Settings2 } from "lucide-react";

interface Props {
  settings: any[];
  groups: string[];
}

export function SettingsManager({ settings, groups }: Props) {
  const [isPending, startTransition] = useTransition();
  const [editedValues, setEditedValues] = useState<Record<string, unknown>>({});
  const [activeGroup, setActiveGroup] = useState(groups[0] || "general");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newGroup, setNewGroup] = useState("general");
  const [newLabel, setNewLabel] = useState("");
  const [newType, setNewType] = useState("text");

  const filtered = settings.filter((s) => s.group === activeGroup);

  const handleChange = (key: string, value: unknown) => {
    setEditedValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (key: string) => {
    const value = editedValues[key];
    if (value === undefined) return;
    startTransition(async () => {
      const result = await updateSetting({ key, value });
      if (result.error) toast.error(result.error);
      else {
        toast.success(result.success);
        setEditedValues((prev) => { const next = { ...prev }; delete next[key]; return next; });
      }
    });
  };

  const handleCreate = () => {
    startTransition(async () => {
      const result = await createSetting({ key: newKey, value: newValue, group: newGroup, label: newLabel, type: newType });
      if (result.error) toast.error(result.error);
      else {
        toast.success(result.success);
        setDialogOpen(false);
        setNewKey(""); setNewValue(""); setNewLabel("");
      }
    });
  };

  const renderSettingInput = (setting: any) => {
    const currentValue = editedValues[setting.key] ?? setting.value;
    const isEdited = editedValues[setting.key] !== undefined;

    switch (setting.type) {
      case "boolean":
        return (
          <div className="flex items-center gap-3">
            <Switch checked={!!currentValue} onCheckedChange={(v) => handleChange(setting.key, v)} />
            <span className="text-sm text-muted-foreground">{currentValue ? "Enabled" : "Disabled"}</span>
            {isEdited && <Button size="sm" onClick={() => handleSave(setting.key)} disabled={isPending}><Save className="h-3 w-3 mr-1" /> Save</Button>}
          </div>
        );
      case "textarea":
      case "json":
        return (
          <div className="space-y-2">
            <Textarea
              value={typeof currentValue === "object" ? JSON.stringify(currentValue, null, 2) : String(currentValue ?? "")}
              onChange={(e) => handleChange(setting.key, setting.type === "json" ? JSON.parse(e.target.value || "null") : e.target.value)}
              rows={4}
              className="font-mono text-sm"
            />
            {isEdited && <Button size="sm" onClick={() => handleSave(setting.key)} disabled={isPending}><Save className="h-3 w-3 mr-1" /> Save</Button>}
          </div>
        );
      case "color":
        return (
          <div className="flex items-center gap-3">
            <input type="color" value={String(currentValue ?? "#000000")} onChange={(e) => handleChange(setting.key, e.target.value)} className="h-9 w-14 rounded border cursor-pointer" />
            <Input value={String(currentValue ?? "")} onChange={(e) => handleChange(setting.key, e.target.value)} className="max-w-[140px] font-mono text-sm" />
            {isEdited && <Button size="sm" onClick={() => handleSave(setting.key)} disabled={isPending}><Save className="h-3 w-3 mr-1" /> Save</Button>}
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <Input
              value={String(currentValue ?? "")}
              onChange={(e) => handleChange(setting.key, e.target.value)}
              placeholder={setting.type === "url" ? "https://..." : "Value..."}
              type={setting.type === "url" ? "url" : "text"}
              className="flex-1"
            />
            {isEdited && <Button size="sm" onClick={() => handleSave(setting.key)} disabled={isPending} className="shrink-0"><Save className="h-3 w-3 mr-1" /> Save</Button>}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex border-b gap-2 flex-1">
          {groups.map((group) => (
            <Button
              key={group}
              variant="ghost"
              size="sm"
              className={`rounded-none border-b-2 capitalize ${activeGroup === group ? "border-primary text-primary font-semibold" : "border-transparent text-muted-foreground"}`}
              onClick={() => setActiveGroup(group)}
            >
              {group}
              <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded">{settings.filter((s) => s.group === group).length}</span>
            </Button>
          ))}
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger><Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-1" /> Add Setting</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Setting</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Key</Label><Input value={newKey} onChange={(e) => setNewKey(e.target.value)} placeholder="site_name" className="font-mono" /></div>
                <div className="space-y-2"><Label>Label</Label><Input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Site Name" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Group</Label><Input value={newGroup} onChange={(e) => setNewGroup(e.target.value)} placeholder="general" /></div>
                <div className="space-y-2"><Label>Type</Label>
                  <Select value={newType} onValueChange={(v) => setNewType(v || "text")}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="textarea">Textarea</SelectItem>
                      <SelectItem value="image">Image URL</SelectItem>
                      <SelectItem value="boolean">Boolean</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="color">Color</SelectItem>
                      <SelectItem value="url">URL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2"><Label>Value</Label><Input value={newValue} onChange={(e) => setNewValue(e.target.value)} /></div>
              <Button onClick={handleCreate} disabled={isPending} className="w-full">{isPending ? "Creating..." : "Create Setting"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {filtered.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">No settings in this group. Click &quot;Add Setting&quot; to create one.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((setting: any) => (
            <Card key={setting._id || setting.key}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Settings2 className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{setting.label || setting.key}</span>
                      <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono text-muted-foreground">{setting.key}</code>
                    </div>
                    {renderSettingInput(setting)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
