import { cn } from "@ui/lib";
import { CSSProperties, PropsWithChildren } from "react";

interface FadeInProps extends PropsWithChildren {
  className?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
}

/**
 * CSS-only entrance animation for above-the-fold content.
 *
 * Unlike `Reveal`, this needs no JavaScript — the hero paints and animates on
 * first frame, so the largest contentful paint never waits for hydration.
 */
export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` } as CSSProperties}
      className={cn("animate-fade-in", className)}
    >
      {children}
    </div>
  );
}
