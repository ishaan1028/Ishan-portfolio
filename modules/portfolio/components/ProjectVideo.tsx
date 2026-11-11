"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@ui/components/button";
import { cn } from "@ui/lib";
import { ArrowUpRight, Loader2, PlayCircle, X } from "lucide-react";

interface ProjectVideoProps {
  videoId: string;
  /** Watch page URL, used for the "Open on YouTube" link. */
  url: string;
  title: string;
  className?: string;
}

/**
 * "Watch video" button that plays a YouTube video in a modal. The iframe
 * only mounts while the modal is open, so it costs nothing on page load
 * and the video stops as soon as the modal closes.
 */
export function ProjectVideo({
  videoId,
  url,
  title,
  className,
}: ProjectVideoProps) {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          type="button"
          size="lg"
          className={cn("group whitespace-nowrap px-4", className)}
        >
          <PlayCircle className="mr-1.5 h-4 w-4 transition-transform group-hover:scale-110" />
          Watch video
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-1.5rem)] max-w-[min(64rem,calc((100dvh-7rem)*16/9))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl duration-200 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 py-2.5 pl-4 pr-2 sm:pl-5">
            <Dialog.Title className="truncate text-sm font-semibold text-white">
              {title}
            </Dialog.Title>

            <div className="flex shrink-0 items-center gap-1">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span className="hidden sm:inline">Open on</span> YouTube
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <Dialog.Close className="inline-flex h-8 w-8 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
                <X className="h-4 w-4" />
                <span className="sr-only">Close video</span>
              </Dialog.Close>
            </div>
          </div>

          <div className="relative aspect-video bg-black">
            <Loader2
              className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-spin text-white/40"
              aria-hidden
            />
            <iframe
              src={embedUrl}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
