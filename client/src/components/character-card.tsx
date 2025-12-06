import React from "react";
import { Character } from "@/lib/store";

interface CharacterCardProps {
  character: Character;
  type: "pc" | "npc";
}

export function CharacterCard({ character, type }: CharacterCardProps) {
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
          {character.imageUrl ? (
            <img 
              src={character.imageUrl} 
              alt={character.name}
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-heading italic opacity-50">
              No Portrait
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="space-y-2 text-center">
          <h3 className="text-2xl font-heading font-bold text-primary leading-none">{character.name}</h3>
          <p className="text-secondary font-body italic border-b border-primary/10 pb-2 mx-4">{character.role}</p>
          <p className="text-foreground/80 font-body leading-relaxed text-sm">{character.description}</p>
        </div>
      </div>
    </div>
  );
}