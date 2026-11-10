"use client";

import { cn } from "@ui/lib";
import { Maximize2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { ProjectImage } from "../types";

interface ProjectGalleryProps {
  images: ProjectImage[];
}

/** Large preview with a thumbnail strip; images cross-fade on select. */
export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div className="flex flex-col gap-3">
      <div className="border-border/70 group/preview relative aspect-[16/10] overflow-hidden rounded-2xl border bg-black shadow-xl">
        {images.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            aria-hidden={index !== active}
            fill
            sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
            className={cn(
              "object-cover transition-opacity duration-500",
              index === active ? "opacity-100" : "opacity-0",
            )}
          />
        ))}

        <a
          href={current.src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the ${current.caption} image full size`}
          className="absolute right-3 top-3 rounded-full bg-black/55 p-2 text-white opacity-0 backdrop-blur transition-opacity focus-visible:opacity-100 group-hover/preview:opacity-100"
        >
          <Maximize2 className="h-4 w-4" />
        </a>
      </div>

      <ul className="grid grid-cols-4 gap-2 sm:gap-3">
        {images.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={index === active}
              aria-label={`Show ${image.caption}`}
              className={cn(
                "bg-card focus-visible:ring-ring w-full overflow-hidden rounded-xl border text-left transition focus-visible:outline-none focus-visible:ring-2",
                index === active
                  ? "border-primary/70 ring-primary/30 ring-1"
                  : "border-border/70 opacity-60 hover:opacity-100",
              )}
            >
              <span className="relative block aspect-[16/10] bg-black">
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </span>
              <span className="hidden truncate px-2.5 py-1.5 text-[0.7rem] font-medium sm:block">
                {image.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
