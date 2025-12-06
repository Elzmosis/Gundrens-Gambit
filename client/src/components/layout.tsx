import React from "react";
import { Link, useLocation } from "wouter";
import { useStore } from "@/lib/store";
import parchmentTexture from "@assets/generated_images/aged_parchment_paper_texture.png";
import sealImage from "@assets/generated_images/red_wax_seal.png";
import { cn } from "@/lib/utils";
import { ScrollText, Users, Skull, Shield } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { isAdmin, toggleAdmin } = useStore();

  // Use generated texture for background, ensuring it repeats or covers nicely
  const bgStyle = {
    backgroundImage: `url(${parchmentTexture})`,
    backgroundBlendMode: 'multiply',
  };

  const NavLink = ({ href, icon: Icon, children }: { href: string, icon: any, children: React.ReactNode }) => {
    const isActive = location === href;
    return (
      <Link href={href} className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-sm font-heading text-lg transition-all duration-300 border-b-2 cursor-pointer",
          isActive 
            ? "text-primary border-primary bg-primary/5" 
            : "text-muted-foreground border-transparent hover:text-foreground hover:border-primary/30"
        )}>
          <Icon className={cn("w-5 h-5", isActive ? "opacity-100" : "opacity-70")} />
          {children}
      </Link>
    );
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#f4e4bc]" style={bgStyle}>
      {/* Overlay texture for grain */}
      <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none z-50 mix-blend-overlay" />
      
      {/* Top Border Decoration */}
      <div className="h-2 w-full bg-primary/80 fixed top-0 z-50 shadow-md" />

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Header / Navigation */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-16 border-b border-primary/20 pb-8">
          <div className="text-center md:text-left mb-6 md:mb-0 relative group">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary tracking-wide drop-shadow-sm">
              The Chronicler's Tome
            </h1>
            <p className="font-body italic text-xl text-secondary mt-2">
              Legends of the Shattered Realm
            </p>
          </div>

          <nav className="flex gap-2 bg-white/30 p-2 rounded-md backdrop-blur-sm border border-white/40 shadow-sm">
            <NavLink href="/" icon={ScrollText}>Journal</NavLink>
            <NavLink href="/pcs" icon={Shield}>Heroes</NavLink>
            <NavLink href="/npcs" icon={Users}>Faces</NavLink>
          </nav>
        </header>

        {/* Main Content */}
        <main className="min-h-[60vh] animate-in fade-in duration-700 slide-in-from-bottom-4">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-primary/20 text-center font-body text-muted-foreground relative">
          <p className="mb-4">"History is written by the victors, but preserved by the scribes."</p>
          
          {/* Admin Toggle Seal */}
          <button 
            onClick={toggleAdmin}
            className="relative inline-block group transition-transform hover:scale-105 active:scale-95 focus:outline-none"
            title={isAdmin ? "Seal the Tome (Logout)" : "Open the Tome (Admin)"}
          >
            <div className={cn(
              "absolute -inset-4 bg-red-500/20 rounded-full blur-xl transition-opacity duration-500",
              isAdmin ? "opacity-100" : "opacity-0 group-hover:opacity-50"
            )} />
            <img 
              src={sealImage} 
              alt="Admin Seal" 
              className="w-16 h-16 relative z-10 drop-shadow-md"
            />
            {isAdmin && (
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-heading text-primary font-bold whitespace-nowrap">
                Grand Maester
              </span>
            )}
          </button>
          
          <p className="text-xs mt-8 opacity-50">
            Static Site Generator • Mockup Mode • Persisted Locally
          </p>
        </footer>
      </div>
    </div>
  );
}