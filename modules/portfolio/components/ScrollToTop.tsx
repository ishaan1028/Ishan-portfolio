"use client";

import { Button } from "@ui/components/button";
import { cn } from "@ui/lib";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/** Distance scrolled (px) before the button appears. */
const SHOW_AFTER = 400;

/** Floating button that fades in once the visitor leaves the top of the page. */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > SHOW_AFTER);

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label="Scroll to top"
      title="Scroll to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      // No `behavior` here: the html `scroll-behavior` rule smooths it and
      // turns it off for visitors who prefer reduced motion.
      onClick={(event) => {
        window.scrollTo({ top: 0 });
        event.currentTarget.blur();
      }}
      className={cn(
        "fixed bottom-6 right-6 z-40 h-11 w-11 bg-card/80 text-foreground shadow-lg backdrop-blur transition-all duration-300 hover:text-primary sm:bottom-8 sm:right-8",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}
