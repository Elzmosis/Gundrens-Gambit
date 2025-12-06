import React, { useState } from "react";
import { Layout } from "@/components/layout";
import { useStore } from "@/lib/store";
import { EditableText } from "@/components/editable-text";
import { JournalEntryItem } from "@/components/journal-entry";
import { Button } from "@/components/ui/button";
import { Plus, Feather } from "lucide-react";
import landscapeImage from "@assets/Sword-Coast-Map_HighRes_1765012076904.jpg";

export default function Home() {
  const { journalEntries, isAdmin, addJournalEntry } = useStore();

  const handleCreateNew = () => {
    addJournalEntry({
      title: "New Entry",
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      content: "Record the events of the day here...",
    });
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        {/* Hero / Intro */}
        <div className="mb-16 text-center relative">
          <div className="w-full h-48 md:h-64 overflow-hidden rounded-md border-2 border-primary/20 shadow-inner mb-8 mask-image-gradient">
             <img src={landscapeImage} alt="Landscape" className="w-full h-full object-contain object-center" />
          </div>
          <div className="flex justify-center">
            <EditableText 
              field="homeHeroTitle" 
              as="h2" 
              className="text-3xl font-heading text-center mb-4 inline-block" 
            />
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

        {/* Add Button */}
        {isAdmin && (
          <div className="fixed bottom-8 right-8 z-50">
            <Button 
              size="lg" 
              onClick={handleCreateNew}
              className="h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-white/20"
            >
              <Plus className="w-6 h-6" />
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}