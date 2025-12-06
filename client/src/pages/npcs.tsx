import React from "react";
import { Layout } from "@/components/layout";
import { useStore } from "@/lib/store";
import { CharacterCard } from "@/components/character-card";

export default function NPCsPage() {
  const { npcs } = useStore();

  return (
    <Layout>
      <div className="text-center mb-12 flex flex-col items-center">
        <h2 className="text-4xl font-heading mb-4">
          Dramatis Personae
        </h2>
        <p className="text-lg font-body max-w-2xl mx-auto text-muted-foreground">
          Friends, foes, and those whose loyalties remain in the shadows.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {npcs.map(npc => (
          <CharacterCard key={npc.id} character={npc} type="npc" />
        ))}
      </div>
    </Layout>
  );
}