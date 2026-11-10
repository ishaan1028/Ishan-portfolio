import type { Project, ProjectFeature } from "../types";
import { Button } from "@ui/components/button";
import { cn } from "@ui/lib";
import {
  ArrowUpRight,
  Bell,
  Github,
  Heart,
  KeyRound,
  LucideIcon,
  MessagesSquare,
  PlayCircle,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import { ProjectGallery } from "./ProjectGallery";
import { getYouTubeId } from "../lib/video";
import { ProjectVideo } from "./ProjectVideo";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

const featureIcons: Record<ProjectFeature["icon"], LucideIcon> = {
  chat: MessagesSquare,
  heart: Heart,
  bell: Bell,
  key: KeyRound,
  phone: Smartphone,
  shield: ShieldCheck,
};

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <Section id="work" className="bg-muted/30">
      <SectionHeading
        eyebrow="04 — Featured project"
        title="Built end to end, shipped to production"
        description="Designed, built, tested and deployed by me — from the Postgres security policies to the last pixel, with perfect Lighthouse scores in production."
      />

      <div className="mt-12 space-y-10">
        {projects.map((project) => (
          <Reveal key={project.id}>
            <ProjectShowcase project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ProjectShowcase({ project }: { project: Project }) {
  // Non-YouTube links fall back to a plain external link.
  const videoId = project.videoUrl ? getYouTubeId(project.videoUrl) : null;

  return (
    <article className="relative isolate overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      {/* Warm glow that echoes the project's own artwork */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 right-0 h-[24rem] w-[24rem] rounded-full bg-pink-500/10 blur-[120px]" />
      </div>

      <div className="grid gap-8 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-10 lg:p-8">
        <ProjectGallery images={project.images} />

        <div className="flex flex-col px-1 pb-2 sm:px-0 lg:py-1">
          <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground">
            <span className="text-primary">{project.category}</span>
            <span className="h-3 w-px bg-border" aria-hidden />
            <span>{project.year}</span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            {project.logoUrl ? (
              <Image
                src={project.logoUrl}
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 rounded-xl shadow-md"
              />
            ) : null}
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {project.title}
            </h3>
          </div>

          <p className="mt-3 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-lg font-semibold text-transparent">
            {project.tagline}
          </p>

          <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            {project.description}
          </p>

          {project.scores.length > 0 ? (
            <div className="mt-7">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground">
                Lighthouse · production
              </p>
              <ul className="mt-3 grid grid-cols-4 gap-3">
                {project.scores.map((score) => (
                  <li
                    key={score.label}
                    className="flex flex-col items-center gap-1.5 text-center"
                  >
                    <ScoreRing value={score.value} />
                    <span className="text-[0.625rem] leading-tight text-muted-foreground sm:text-[0.7rem]">
                      {score.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-auto lg:pt-8">
            {videoId && project.videoUrl ? (
              <ProjectVideo
                videoId={videoId}
                url={project.videoUrl}
                title={`${project.title} — product walkthrough`}
                className="sm:col-span-2"
              />
            ) : (
              <ProjectLink
                href={project.videoUrl}
                label="Watch video"
                icon={PlayCircle}
                className="sm:col-span-2"
              />
            )}
            <ProjectLink
              href={project.liveUrl}
              label="Live demo"
              icon={ArrowUpRight}
              variant="outline"
            />
            <ProjectLink
              href={project.repoUrl}
              label="View code"
              icon={Github}
              variant="outline"
            />
          </div>
        </div>
      </div>

      <ul className="grid gap-px border-t border-border/70 bg-border/70 sm:grid-cols-2 lg:grid-cols-3">
        {project.features.map((feature) => {
          const Icon = featureIcons[feature.icon];

          return (
            <li key={feature.title} className="bg-card p-6 lg:p-8">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-[1.125rem] w-[1.125rem]" />
              </span>
              <h4 className="mt-4 font-semibold tracking-tight">
                {feature.title}
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col gap-3 border-t border-border/70 p-6 sm:flex-row sm:items-center sm:gap-5 lg:px-8">
        <span className="shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground">
          Built with
        </span>
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((technology) => (
            <li
              key={technology}
              className="rounded-full border border-border bg-muted/60 px-2.5 py-1 font-mono text-[0.7rem] text-muted-foreground"
            >
              {technology}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** Lighthouse-style score ring, colored by the same thresholds Lighthouse uses. */
function ScoreRing({ value }: { value: number }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const tone =
    value >= 90
      ? "text-emerald-600 dark:text-emerald-400"
      : value >= 50
        ? "text-amber-500"
        : "text-red-500";

  return (
    <span className={`relative inline-flex h-14 w-14 ${tone}`}>
      <svg viewBox="0 0 52 52" className="h-full w-full -rotate-90" aria-hidden>
        <circle
          cx="26"
          cy="26"
          r={radius}
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="3.5"
        />
        <circle
          cx="26"
          cy="26"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - value / 100)}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
        {value}
      </span>
    </span>
  );
}

function ProjectLink({
  href,
  label,
  icon: Icon,
  variant = "default",
  className,
}: {
  href: string | null;
  label: string;
  icon: LucideIcon;
  variant?: "default" | "outline";
  className?: string;
}) {
  const content = (
    <>
      <Icon className="mr-1.5 h-4 w-4" />
      {label}
    </>
  );

  if (!href) {
    return (
      <Button
        type="button"
        variant={variant}
        size="lg"
        aria-disabled
        title="Link coming soon"
        className={cn("cursor-default whitespace-nowrap px-4", className)}
      >
        {content}
        <span className="ml-2 rounded-full bg-foreground/10 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider">
          Soon
        </span>
      </Button>
    );
  }

  return (
    <Button
      asChild
      variant={variant}
      size="lg"
      className={cn("whitespace-nowrap px-4", className)}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    </Button>
  );
}
