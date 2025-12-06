import React from "react";
import { Layout } from "@/components/layout";
import { useStore } from "@/lib/store";
import { CharacterCard } from "@/components/character-card";

export default function PCsPage() {
  const { pcs } = useStore();

  return (
    <Layout>
      <div className="text-center mb-12 flex flex-col items-center">
        <h2 className="text-4xl font-heading mb-4">
          The Fellowship
        </h2>
        <p className="text-lg font-body max-w-2xl mx-auto text-muted-foreground">
          Brave souls who have sworn to protect the realm against the encroaching darkness.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pcs.map(pc => (
          <CharacterCard key={pc.id} character={pc} type="pc" />
        ))}
      </div>
    </Layout>
  );
}