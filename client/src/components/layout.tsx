import React from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { ScrollText, Users, Shield } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const NavLink = ({ href, icon: Icon, children }: { href: string, icon: any, children: React.ReactNode }) => {
    const isActive = location === href;
    return (
      <Link href={href}>
        <a className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-sm font-heading text-lg transition-all duration-300 border-b-2 cursor-pointer",
          isActive 
            ? "text-primary border-primary bg-primary/5" 
            : "text-muted-foreground border-transparent hover:text-foreground hover:border-primary/30"
        )}>
          <Icon className={cn("w-4 h-4", isActive ? "opacity-100" : "opacity-70")} />
          {children}
        </a>
      </Link>
    );
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Top Border Decoration */}
      <div className="h-1 w-full bg-primary/60 fixed top-0 z-50 shadow-sm" />

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Header / Navigation */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-16 border-b border-border pb-8">
          <div className="text-center md:text-left mb-6 md:mb-0 relative group w-full md:w-auto">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary tracking-wide drop-shadow-sm">
              The Chronicler's Tome
            </h1>
            <p className="font-body italic text-xl text-secondary mt-2 tracking-widest uppercase text-xs font-semibold">
              Legends of the Shattered Realm
            </p>
          </div>

          <nav className="flex gap-2 bg-card/20 p-1 rounded-md backdrop-blur-sm border border-border shadow-sm mt-4 md:mt-0">
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
        <footer className="mt-20 pt-8 border-t border-border text-center font-body text-muted-foreground relative pb-12">
          <p className="mb-4 text-sm uppercase tracking-widest opacity-70 italic">
            "History is written by the victors, but preserved by the scribes."
          </p>
          
          <p className="text-[10px] mt-8 opacity-30 uppercase tracking-widest">
             Static • Secure • Eternal
          </p>
        </footer>
      </div>
    </div>
  );
}