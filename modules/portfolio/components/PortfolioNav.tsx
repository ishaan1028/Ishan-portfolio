"use client";

import { ColorModeToggle } from "@shared/components/ColorModeToggle";
import { Button } from "@ui/components/button";
import { Sheet, SheetContent, SheetTrigger } from "@ui/components/sheet";
import { cn } from "@ui/lib";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
];

interface PortfolioNavProps {
  name: string;
  role: string;
}

export function PortfolioNav({ name, role }: PortfolioNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy: highlights the section currently closest to the top of the viewport.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "bg-background/80 border-border/70 shadow-sm backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="container">
          <div className="flex h-16 items-center justify-between gap-4 sm:h-20">
            {/* Wordmark */}
            <a
              href="#top"
              className="group flex items-center gap-3"
              aria-label={`${name} — back to top`}
            >
              <span className="border-border bg-card text-primary group-hover:border-primary/50 flex h-9 w-9 items-center justify-center rounded-xl border font-mono text-sm font-bold transition-colors">
                {initials}
              </span>
              <span className="hidden leading-tight sm:block">
                <span className="block text-sm font-semibold">{name}</span>
                <span className="text-muted-foreground block font-mono text-[0.7rem] uppercase tracking-wider">
                  {role}
                </span>
              </span>
            </a>

            {/* Desktop navigation */}
            <nav className="hidden lg:block" aria-label="Section navigation">
              <ul className="border-border/70 bg-card/50 flex items-center gap-1 rounded-full border p-1 backdrop-blur">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={
                        activeSection === item.id ? "true" : undefined
                      }
                      className={cn(
                        "block rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                        activeSection === item.id
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <ColorModeToggle />

              <Button asChild size="sm" className="hidden sm:inline-flex">
                <a href="#contact">Get in touch</a>
              </Button>

              {/* Mobile navigation */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    aria-label="Open menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-[min(20rem,85vw)]">
                  <div className="mt-8 flex h-full flex-col">
                    <p className="text-muted-foreground font-mono text-xs uppercase tracking-[0.2em]">
                      Navigation
                    </p>

                    <nav className="mt-6" aria-label="Section navigation">
                      <ul className="flex flex-col">
                        {[...navItems, { id: "contact", label: "Contact" }].map(
                          (item, index) => (
                            <li key={item.id}>
                              <a
                                href={`#${item.id}`}
                                onClick={() => setMobileOpen(false)}
                                className="border-border/60 hover:text-primary flex items-baseline gap-3 border-b py-4 text-lg font-medium transition-colors"
                              >
                                <span className="text-muted-foreground font-mono text-xs">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                {item.label}
                              </a>
                            </li>
                          ),
                        )}
                      </ul>
                    </nav>

                    <Button asChild className="mt-8 w-full" size="lg">
                      <a href="#contact" onClick={() => setMobileOpen(false)}>
                        Get in touch
                      </a>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
