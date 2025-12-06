import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useStore } from "@/lib/store";
import { EditableText } from "@/components/editable-text";
import sealImage from "@assets/generated_images/red_wax_seal.png";
import { cn } from "@/lib/utils";
import { ScrollText, Users, Shield, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { isAdmin, toggleAdmin } = useStore();
  const { toast } = useToast();
  
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleSealClick = () => {
    if (isAdmin) {
      toggleAdmin();
      toast({
        title: "Tome Sealed",
        description: "You have closed the tome. Editing is disabled.",
      });
    } else {
      setShowLoginDialog(true);
      setPasswordInput("");
      setLoginError(false);
    }
  };

  const handleLogin = () => {
    // Simple hardcoded password for static site demonstration
    // In a real app, this would validate against a backend
    if (passwordInput === "dragon") {
      toggleAdmin();
      setShowLoginDialog(false);
      toast({
        title: "Welcome, Grand Maester",
        description: "The quill is yours. You may now chronicle history.",
      });
    } else {
      setLoginError(true);
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "The seal remains unbroken. Incorrect passphrase.",
      });
    }
  };

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
            <EditableText 
              field="siteTitle" 
              as="h1" 
              className="text-4xl md:text-6xl font-heading font-bold text-primary tracking-wide drop-shadow-sm" 
            />
            <EditableText 
              field="siteSubtitle" 
              as="p" 
              className="font-body italic text-xl text-secondary mt-2 tracking-widest uppercase text-xs font-semibold" 
            />
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
          <EditableText 
            field="footerQuote" 
            as="p" 
            className="mb-4 text-sm uppercase tracking-widest opacity-70 italic" 
          />
          
          {/* Admin Toggle Seal */}
          <button 
            onClick={handleSealClick}
            className="relative inline-block group transition-transform hover:scale-105 active:scale-95 focus:outline-none mt-4"
            title={isAdmin ? "Seal the Tome (Logout)" : "Open the Tome (Admin)"}
          >
            <div className={cn(
              "absolute -inset-4 bg-red-500/10 rounded-full blur-xl transition-opacity duration-500",
              isAdmin ? "opacity-100" : "opacity-0 group-hover:opacity-50"
            )} />
            <img 
              src={sealImage} 
              alt="Admin Seal" 
              className={cn(
                "w-12 h-12 relative z-10 drop-shadow-md transition-all duration-500",
                isAdmin ? "grayscale-0" : "grayscale-[0.5] opacity-80"
              )}
            />
            {isAdmin && (
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-heading text-primary font-bold whitespace-nowrap tracking-widest uppercase">
                Master
              </span>
            )}
          </button>
          
          <p className="text-[10px] mt-8 opacity-30 uppercase tracking-widest">
             Static • Secure • Eternal
          </p>
        </footer>
      </div>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-[425px] font-body bg-card border-primary/20">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-center text-primary">Speak Friend and Enter</DialogTitle>
            <DialogDescription className="text-center font-body italic">
              The knowledge within is protected by ancient wards. Speak the passphrase to break the seal.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Passphrase..."
                className={cn("font-body", loginError && "border-destructive focus-visible:ring-destructive")}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            {loginError && (
              <p className="text-xs text-destructive text-center font-body italic">
                The wards flair... that is not the word.
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoginDialog(false)} className="font-heading">Leave</Button>
            <Button onClick={handleLogin} className="bg-primary hover:bg-primary/90 font-heading">Unlock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}