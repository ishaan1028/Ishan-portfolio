import { cn } from "@ui/lib";
import { PropsWithChildren } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  /** Small monospace eyebrow, e.g. "02 — Experience". */
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("flex flex-col gap-4", className)}>
      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span className="h-px w-6 bg-primary" aria-hidden />
        {eyebrow}
      </span>

      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>

      {description ? (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

/** Consistent vertical rhythm + anchor target for every portfolio section. */
export function Section({
  id,
  className,
  children,
}: PropsWithChildren<{ id: string; className?: string }>) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 border-t border-border/60 py-20 sm:py-24 lg:py-32",
        className,
      )}
    >
      <div className="container">{children}</div>
    </section>
  );
}
