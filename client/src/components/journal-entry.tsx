import React, { useState, useRef } from "react";
import { useStore, JournalEntry } from "@/lib/store";
import { Trash2, Edit2, Check, Upload, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function JournalEntryItem({ entry }: { entry: JournalEntry }) {
  const { isAdmin, updateJournalEntry, deleteJournalEntry } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(entry.title);
  const [editedDate, setEditedDate] = useState(entry.date);
  const [editedContent, setEditedContent] = useState(entry.content);
  const [editedImage, setEditedImage] = useState(entry.imageUrl);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    updateJournalEntry(entry.id, {
      title: editedTitle,
      date: editedDate,
      content: editedContent,
      imageUrl: editedImage
    });
    setIsEditing(false);
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
    <article className="mb-12 relative pl-6 md:pl-0">
      {/* Timeline line for desktop */}
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-primary/20 -ml-8" />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Date Column */}
        <div className="md:w-1/4 flex-shrink-0">
           {isEditing ? (
             <Input 
               value={editedDate} 
               onChange={(e) => setEditedDate(e.target.value)}
               className="font-heading font-bold text-primary bg-transparent border-b border-primary/50 mb-4"
             />
           ) : (
             <div className="sticky top-24">
               <div className="font-heading font-bold text-primary text-lg flex items-center gap-2">
                 <Calendar className="w-4 h-4 opacity-60" />
                 {entry.date}
               </div>
               <div className="h-px w-12 bg-primary/40 mt-2" />
             </div>
           )}
        </div>

        {/* Content Column */}
        <div className="flex-grow relative group">
          {/* Paper background effect for entry */}
          <div className="bg-white/40 backdrop-blur-[2px] p-6 rounded-sm shadow-sm border border-primary/10 relative overflow-hidden">
             {/* Admin Controls */}
            {isAdmin && !isEditing && (
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditing(true)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteJournalEntry(entry.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}

            {isEditing ? (
              <div className="space-y-4">
                <Input 
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="font-heading text-2xl font-bold bg-transparent border-b border-primary/50"
                  placeholder="Entry Title"
                />
                
                <div className="relative min-h-[200px] border-2 border-dashed border-primary/20 rounded-md flex flex-col items-center justify-center p-4 bg-white/50">
                  {editedImage ? (
                    <div className="relative w-full">
                      <img src={editedImage} className="w-full rounded-sm max-h-[400px] object-cover" />
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="absolute bottom-2 right-2"
                        onClick={() => setEditedImage(undefined)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                      <Upload className="w-4 h-4 mr-2" /> Upload Sketch/Image
                    </Button>
                  )}
                   <input 
                     type="file" 
                     ref={fileInputRef} 
                     className="hidden" 
                     accept="image/*"
                     onChange={handleImageUpload}
                   />
                </div>

                <Textarea 
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="font-body text-lg min-h-[200px] bg-transparent resize-y"
                />
                <Button onClick={handleSave} className="w-full">Save Entry</Button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-heading font-bold text-foreground mb-4">{entry.title}</h2>
                
                {entry.imageUrl && (
                  <div className="mb-6 rounded-sm overflow-hidden border-4 border-white shadow-md rotate-1 max-w-full md:max-w-lg mx-auto">
                    <img src={entry.imageUrl} alt={entry.title} className="w-full h-auto sepia-[.1]" />
                  </div>
                )}
                
                <div className="prose prose-stone max-w-none font-body text-lg leading-relaxed text-foreground/90 first-letter:text-5xl first-letter:font-heading first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px] first-letter:text-primary whitespace-pre-wrap">
                  {entry.content}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}