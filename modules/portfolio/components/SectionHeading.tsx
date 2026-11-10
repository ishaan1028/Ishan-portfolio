import { cn } from "@ui/lib";
import { PropsWithChildren } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  /** Small monospace eyebrow, e.g. "02 — Experience". */
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <span className="text-muted-foreground inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
        <span className="bg-primary h-px w-6" aria-hidden />
        {eyebrow}
      </span>

      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "text-muted-foreground max-w-2xl text-pretty text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
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
        "border-border/60 scroll-mt-28 border-t py-20 sm:py-24 lg:py-32",
        className,
      )}
    >
      <div className="container">{children}</div>
    </section>
  );
}
