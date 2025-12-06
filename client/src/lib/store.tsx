import React, { createContext, useContext, useEffect, useState } from "react";

// Types
export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  content: string;
  imageUrl?: string;
}

export interface Character {
  id: string;
  name: string;
  role: string; // Class/Race or Title
  description: string;
  imageUrl?: string;
}

export interface SiteConfig {
  siteTitle: string;
  siteSubtitle: string;
  footerQuote: string;
  homeHeroTitle: string;
  pcsTitle: string;
  pcsSubtitle: string;
  npcsTitle: string;
  npcsSubtitle: string;
}

interface StoreContextType {
  config: SiteConfig;
  updateConfig: (updates: Partial<SiteConfig>) => void;

  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, "id">) => void;
  updateJournalEntry: (id: string, entry: Partial<JournalEntry>) => void;
  deleteJournalEntry: (id: string) => void;
  
  pcs: Character[];
  addPC: (char: Omit<Character, "id">) => void;
  updatePC: (id: string, char: Partial<Character>) => void;
  deletePC: (id: string) => void;
  
  npcs: Character[];
  addNPC: (char: Omit<Character, "id">) => void;
  updateNPC: (id: string, char: Partial<Character>) => void;
  deleteNPC: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Initial Mock Data
const INITIAL_CONFIG: SiteConfig = {
  siteTitle: "The Chronicler's Tome",
  siteSubtitle: "Legends of the Shattered Realm",
  footerQuote: "\"History is written by the victors, but preserved by the scribes.\"",
  homeHeroTitle: "Recent Developments",
  pcsTitle: "The Fellowship",
  pcsSubtitle: "Brave souls who have sworn to protect the realm against the encroaching darkness.",
  npcsTitle: "Dramatis Personae",
  npcsSubtitle: "Friends, foes, and those whose loyalties remain in the shadows.",
};

const INITIAL_JOURNAL: JournalEntry[] = [
  {
    id: "1",
    title: "Arrival at Blackwood",
    date: "Spring, Era 4",
    content: "We arrived at the edge of the Blackwood forest just as the sun began to set. The trees here are twisted, their bark dark as charcoal. There is a strange silence in the air, broken only by the occasional caw of a raven. Kaelen believes the old ruins lie somewhere to the north.",
  },
];

const INITIAL_PCS: Character[] = [
  {
    id: "1",
    name: "Nynral Liora",
    role: "Aasimar Sorcerer",
    description: "A pale and soft-spoken aasimar from a distant farming hamlet, Nynral carries a quiet power he barely understands. Strange magic has guided him since childhood, pushing him to leave home and follow a path he cannot name. Calm in danger and comfortable in shadow, he seems touched by something otherworldly… though he rarely speaks of it.",
    imageUrl: `${import.meta.env.BASE_URL}images/nynral-liora.jpg`
  },
  {
    id: "3",
    name: "Renard",
    role: "Human Rogue",
    description: "After years serving in the war, Renard returned home expecting peace—only to find his family farm seized by Neverwinter officials over unpaid taxes. With nothing left to return to and no patience for the city's bureaucracy, he took to the road, living by his wits and the skills the army never meant to teach him.",
    imageUrl: `${import.meta.env.BASE_URL}images/renard.jpg`
  }
];

const INITIAL_NPCS: Character[] = [
  {
    id: "1",
    name: "Madame Zora",
    role: "Fortune Teller",
    description: "An elderly woman with milky white eyes who claims to see the threads of fate. She warned us against entering the crypts beneath the city.",
  }
];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Helper for localStorage
  const usePersistedState = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [state, setState] = useState<T>(() => {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    });

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
  };

  const [config, setConfig] = usePersistedState<SiteConfig>("siteConfig", INITIAL_CONFIG);
  const [journalEntries, setJournalEntries] = usePersistedState<JournalEntry[]>("journalEntries", INITIAL_JOURNAL);
  const [pcs, setPcs] = usePersistedState<Character[]>("pcs", INITIAL_PCS);
  const [npcs, setNpcs] = usePersistedState<Character[]>("npcs", INITIAL_NPCS);

  const updateConfig = (updates: Partial<SiteConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  // Journal Actions
  const addJournalEntry = (entry: Omit<JournalEntry, "id">) => {
    const newEntry = { ...entry, id: Math.random().toString(36).substr(2, 9) };
    setJournalEntries([newEntry, ...journalEntries]);
  };

  const updateJournalEntry = (id: string, updates: Partial<JournalEntry>) => {
    setJournalEntries(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const deleteJournalEntry = (id: string) => {
    setJournalEntries(prev => prev.filter(e => e.id !== id));
  };

  // PC Actions
  const addPC = (char: Omit<Character, "id">) => {
    const newChar = { ...char, id: Math.random().toString(36).substr(2, 9) };
    setPcs([...pcs, newChar]);
  };
  
  const updatePC = (id: string, updates: Partial<Character>) => {
    setPcs(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deletePC = (id: string) => {
    setPcs(prev => prev.filter(c => c.id !== id));
  };

  // NPC Actions
  const addNPC = (char: Omit<Character, "id">) => {
    const newChar = { ...char, id: Math.random().toString(36).substr(2, 9) };
    setNpcs([...npcs, newChar]);
  };

  const updateNPC = (id: string, updates: Partial<Character>) => {
    setNpcs(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteNPC = (id: string) => {
    setNpcs(prev => prev.filter(c => c.id !== id));
  };

  return (
    <StoreContext.Provider value={{
      config, updateConfig,
      journalEntries, addJournalEntry, updateJournalEntry, deleteJournalEntry,
      pcs, addPC, updatePC, deletePC,
      npcs, addNPC, updateNPC, deleteNPC
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}