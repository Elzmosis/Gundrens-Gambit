import React from "react";
import { JournalEntry } from "@/lib/store";
import { Calendar } from "lucide-react";

export function JournalEntryItem({ entry }: { entry: JournalEntry }) {
  return (
    <article className="mb-12 relative pl-6 md:pl-0">
      {/* Timeline line for desktop */}
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-primary/20 -ml-8" />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Date Column */}
        <div className="md:w-1/4 flex-shrink-0">
          <div className="sticky top-24">
            <div className="font-heading font-bold text-primary text-lg flex items-center gap-2">
              <Calendar className="w-4 h-4 opacity-60" />
              {entry.date}
            </div>
            <div className="h-px w-12 bg-primary/40 mt-2" />
          </div>
        </div>

        {/* Content Column */}
        <div className="flex-grow relative group">
          {/* Paper background effect for entry */}
          <div className="bg-card/40 backdrop-blur-[2px] p-6 rounded-sm shadow-sm border border-primary/10 relative overflow-hidden">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">{entry.title}</h2>
            
            {entry.imageUrl && (
              <div className="mb-6 rounded-sm overflow-hidden border-4 border-border shadow-md rotate-1 max-w-full md:max-w-lg mx-auto">
                <img src={entry.imageUrl} alt={entry.title} className="w-full h-auto sepia-[.1]" />
              </div>
            )}
            
            <div className="prose prose-stone max-w-none font-body text-lg leading-relaxed text-foreground/90 first-letter:text-5xl first-letter:font-heading first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px] first-letter:text-primary whitespace-pre-wrap">
              {entry.content}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}