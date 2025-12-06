import React, { useState, useEffect } from "react";
import { useStore, SiteConfig } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  field: keyof SiteConfig;
  className?: string;
  as?: React.ElementType;
  multiline?: boolean;
}

export function EditableText({ field, className, as: Component = "div", multiline = false }: EditableTextProps) {
  const { config, updateConfig } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(config[field]);

  useEffect(() => {
    setValue(config[field]);
  }, [config, field]);

  const handleSave = () => {
    updateConfig({ [field]: value });
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      handleSave();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 max-w-full">
        {multiline ? (
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={cn("bg-card/50 border-primary/50 min-h-[100px]", className)}
            autoFocus
          />
        ) : (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn("bg-card/50 border-primary/50 h-auto py-1 px-2", className)}
            autoFocus
          />
        )}
        <Button size="icon" variant="secondary" onClick={handleSave} className="h-8 w-8 shrink-0">
          <Check className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="relative group inline-block max-w-full">
      <Component className={cn("break-words", className)}>
        {config[field]}
      </Component>
      
      <button 
        onClick={() => setIsEditing(true)}
        className="absolute -right-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-primary/50 hover:text-primary"
        title="Edit text"
      >
        <Edit2 className="w-3 h-3" />
      </button>
    </div>
  );
}