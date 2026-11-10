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
        "bg-muted relative isolate aspect-[4/5] w-full overflow-hidden rounded-2xl",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="(min-width: 1280px) 432px, (min-width: 1024px) 384px, 256px"
          className="object-cover"
          priority
          // An owner-pasted URL may point anywhere; skip the optimizer rather
          // than let next/image throw and break the page.
          unoptimized={!isOptimizableImage(src)}
        />
      ) : (
        <div className="absolute inset-0">
          <div className="from-primary/25 via-primary/5 absolute inset-0 bg-gradient-to-br to-sky-500/20" />
          <div className="bg-dots absolute inset-0 opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-foreground/15 select-none text-[7rem] font-bold tracking-tight sm:text-[8rem]">
              {initials}
            </span>
          </div>
          <div className="from-background/70 absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent" />
        </div>
      )}
    </div>
  );
}
