import React from "react";
import { Layout } from "@/components/layout";
import { useStore } from "@/lib/store";
import { EditableText } from "@/components/editable-text";
import { CharacterCard } from "@/components/character-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function NPCsPage() {
  const { npcs, isAdmin, addNPC } = useStore();

  const handleAdd = () => {
    addNPC({
      name: "New Personage",
      role: "Title / Occupation",
      description: "Notes on their allegiance and history...",
    });
  };

  return (
    <Layout>
      <div className="text-center mb-12 flex flex-col items-center">
        <EditableText 
          field="npcsTitle" 
          as="h2" 
          className="text-4xl font-heading mb-4" 
        />
        <EditableText 
          field="npcsSubtitle" 
          as="p" 
          className="text-lg font-body max-w-2xl mx-auto text-muted-foreground" 
          multiline
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {npcs.map(npc => (
          <CharacterCard key={npc.id} character={npc} type="npc" />
        ))}
        
        {/* Add Button (Card Style) */}
        {isAdmin && (
          <button 
            onClick={handleAdd}
            className="group flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-primary/30 rounded-sm hover:bg-primary/5 transition-colors p-8 opacity-70 hover:opacity-100"
          >
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <span className="font-heading text-xl text-primary">Record Person</span>
          </button>
        )}
      </div>
    </Layout>
  );
}