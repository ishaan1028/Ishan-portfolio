import { cn } from "@ui/lib";
import Image from "next/image";
import { isOptimizableImage } from "../lib/images";

interface ProfileImageProps {
  name: string;
  /** Image path or URL; null renders the fallback. */
  src: string | null;
  className?: string;
}

/**
 * Profile image with a designed fallback.
 *
 * Without an image, a monogram on a soft gradient is
 * rendered — no broken image states, and the layout never shifts.
 */
export function ProfileImage({ name, src, className }: ProfileImageProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div
      className={cn(
        "relative isolate aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted",
        className,
      )}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={name}
            fill
            sizes="(min-width: 1280px) 432px, (min-width: 1024px) 384px, 256px"
            // Portraits keep the head in frame; dark mode tones down bright artwork.
            className="object-cover object-top transition-[filter] duration-300 dark:brightness-[0.9] dark:saturate-[0.95]"
            priority
            // An owner-pasted URL may point anywhere; skip the optimizer rather
            // than let next/image throw and break the page.
            unoptimized={!isOptimizableImage(src)}
          />
          {/* Blend the photo into the card: soft base fade, faint vignette, inner edge. */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute inset-x-0 bottom-0 hidden h-2/5 bg-gradient-to-t from-card/70 via-card/15 to-transparent dark:block" />
            <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_30%,transparent_60%,rgb(0_0_0/0.18))]" />
            <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/5 dark:ring-white/10" />
          </div>
        </>
      ) : (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-primary/5 to-sky-500/20" />
          <div className="bg-dots absolute inset-0 opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="select-none text-[7rem] font-bold tracking-tight text-foreground/15 sm:text-[8rem]">
              {initials}
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/70 to-transparent" />
        </div>
      )}
    </div>
  );
}
