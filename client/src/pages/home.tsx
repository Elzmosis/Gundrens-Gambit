import React, { useState } from "react";
import { Layout } from "@/components/layout";
import { useStore } from "@/lib/store";
import { JournalEntryItem } from "@/components/journal-entry";
import { Feather } from "lucide-react";
import landscapeImage from "@assets/Sword-Coast-Map_HighRes_1765012076904.jpg";

export default function Home() {
  const { journalEntries } = useStore();

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        {/* Hero / Intro */}
        <div className="mb-16 text-center relative">
          <div className="w-full overflow-hidden rounded-md border-2 border-primary/20 shadow-inner mb-8">
             <img src={landscapeImage} alt="Landscape" className="w-full h-auto" />
          </div>
          <div className="flex justify-center">
            <h2 className="text-3xl font-heading text-center mb-4 inline-block">
              Recent Developments
            </h2>
          </div>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full opacity-50" />
        </div>

        {/* Entries List */}
        <div className="relative">
          {journalEntries.map((entry) => (
            <JournalEntryItem key={entry.id} entry={entry} />
          ))}
          
          {journalEntries.length === 0 && (
            <div className="text-center py-12 opacity-50">
              <Feather className="w-12 h-12 mx-auto mb-4" />
              <p className="font-heading text-xl">The pages are blank...</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}