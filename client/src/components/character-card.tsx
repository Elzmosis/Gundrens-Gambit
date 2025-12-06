import React, { useState, useRef } from "react";
import { useStore, Character } from "@/lib/store";
import { Trash2, Upload, Edit2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CharacterCardProps {
  character: Character;
  type: "pc" | "npc";
}

export function CharacterCard({ character, type }: CharacterCardProps) {
  const { isAdmin, updatePC, deletePC, updateNPC, deleteNPC } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(character.name);
  const [editedRole, setEditedRole] = useState(character.role);
  const [editedDesc, setEditedDesc] = useState(character.description);
  const [editedImage, setEditedImage] = useState(character.imageUrl);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const updates = {
      name: editedName,
      role: editedRole,
      description: editedDesc,
      imageUrl: editedImage
    };
    
    if (type === "pc") updatePC(character.id, updates);
    else updateNPC(character.id, updates);
    
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to banish this soul?")) {
      if (type === "pc") deletePC(character.id);
      else deleteNPC(character.id);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative group perspective-1000">
      <div className="bg-card border-2 border-primary/30 p-4 rounded-sm shadow-parchment transition-all hover:shadow-lg hover:-translate-y-1 relative overflow-hidden">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary opacity-50 rounded-tl-sm" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary opacity-50 rounded-tr-sm" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary opacity-50 rounded-bl-sm" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary opacity-50 rounded-br-sm" />

        {/* Image Area */}
        <div className="aspect-[3/4] w-full bg-muted/20 mb-4 border border-border/50 relative overflow-hidden rounded-sm group-hover:sepia-[.2] transition-all">
          {(isEditing ? editedImage : character.imageUrl) ? (
            <img 
              src={isEditing ? editedImage : character.imageUrl} 
              alt={character.name}
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-heading italic opacity-50">
              No Portrait
            </div>
          )}
          
          {isEditing && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
               <Button 
                 variant="outline" 
                 className="text-white border-white hover:bg-white/20"
                 onClick={() => fileInputRef.current?.click()}
               >
                 <Upload className="w-4 h-4 mr-2" /> Change
               </Button>
               <input 
                 type="file" 
                 ref={fileInputRef} 
                 className="hidden" 
                 accept="image/*"
                 onChange={handleImageUpload}
               />
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="space-y-2 text-center">
          {isEditing ? (
            <>
              <Input 
                value={editedName} 
                onChange={(e) => setEditedName(e.target.value)} 
                className="font-heading font-bold text-xl text-center bg-transparent border-b border-primary/50 rounded-none focus:ring-0 h-auto p-1"
              />
              <Input 
                value={editedRole} 
                onChange={(e) => setEditedRole(e.target.value)} 
                className="font-body italic text-muted-foreground text-center bg-transparent border-b border-primary/30 rounded-none focus:ring-0 h-auto p-1"
              />
              <Textarea 
                value={editedDesc}
                onChange={(e) => setEditedDesc(e.target.value)}
                className="font-body text-sm min-h-[100px] bg-card/30 resize-none"
              />
              <div className="flex gap-2 justify-center pt-2">
                <Button size="sm" onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Check className="w-4 h-4 mr-1" /> Save
                </Button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-heading font-bold text-primary leading-none">{character.name}</h3>
              <p className="text-secondary font-body italic border-b border-primary/10 pb-2 mx-4">{character.role}</p>
              <p className="text-foreground/80 font-body leading-relaxed text-sm">{character.description}</p>
            </>
          )}
        </div>

        {/* Admin Controls */}
        {isAdmin && !isEditing && (
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 p-1 rounded-sm shadow-sm backdrop-blur-sm">
            <Button variant="ghost" size="icon" className="h-6 w-6 text-primary hover:text-primary hover:bg-primary/10" onClick={() => setIsEditing(true)}>
              <Edit2 className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleDelete}>
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}