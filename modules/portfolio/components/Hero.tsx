import type { Profile } from "../types";
import { Button } from "@ui/components/button";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { ProfileImage } from "./ProfileImage";
import { FadeIn } from "./FadeIn";
import { SocialLinks } from "./SocialLinks";

interface HeroProps {
  profile: Profile;
  /** Derived from the current experience entry — drives the floating badge. */
  currentRole?: { title: string; company: string } | null;
}

export function Hero({ profile, currentRole }: HeroProps) {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-36"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="bg-grid mask-fade-bottom absolute inset-0 opacity-70" />
        <div className="absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[128px]" />
        <div className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-sky-500/10 blur-[110px]" />
      </div>

      <div className="container">
        <div className="grid items-center gap-10 pb-16 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:pb-24 xl:gap-16">
          {/* Copy */}
          <div>
            <FadeIn>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/70 py-1.5 pl-2 pr-4 text-xs font-medium text-muted-foreground backdrop-blur">
                <span className="relative flex h-2 w-2">
                  {profile.availability.isAvailable ? (
                    <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-500" />
                  ) : null}
                  <span
                    className={
                      profile.availability.isAvailable
                        ? "relative inline-flex h-2 w-2 rounded-full bg-emerald-500"
                        : "relative inline-flex h-2 w-2 rounded-full bg-amber-500"
                    }
                  />
                </span>
                {profile.availability.label}
              </p>
            </FadeIn>

            <FadeIn delay={80}>
              <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
                {profile.name}
                <span className="block font-normal text-muted-foreground">
                  builds{" "}
                  <span className="text-gradient font-bold">
                    {profile.headline}
                  </span>
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={140}>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {profile.summary}
              </p>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {profile.location}
                </span>
                <span
                  className="hidden h-3 w-px bg-border sm:block"
                  aria-hidden
                />
                <span>{profile.timezone}</span>
                <span
                  className="hidden h-3 w-px bg-border sm:block"
                  aria-hidden
                />
                <span>{profile.role}</span>
              </div>
            </FadeIn>

            <FadeIn delay={260}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button asChild size="lg" className="group whitespace-nowrap">
                    <a href="#work">
                      View selected work
                      <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </Button>

                  {profile.resumeUrl ? (
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="whitespace-nowrap"
                    >
                      <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="mr-1.5 h-4 w-4" />
                        Resume
                      </a>
                    </Button>
                  ) : null}
                </div>

                <SocialLinks
                  links={profile.socials}
                  size="sm"
                  className="sm:ml-1"
                />
              </div>
            </FadeIn>
          </div>

          {/* Portrait */}
          <FadeIn delay={40} className="order-first lg:order-none">
            <div className="relative mx-auto w-full max-w-[13rem] sm:max-w-[16rem] lg:mr-0 lg:max-w-[24rem] xl:max-w-[27rem]">
              <div className="relative rounded-[1.75rem] border border-border bg-card/60 p-2.5 shadow-xl backdrop-blur sm:p-3">
                <ProfileImage
                  name={profile.name}
                  src={profile.avatarUrl}
                  className="rounded-[1.25rem]"
                />

                {currentRole ? (
                  <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-border bg-card p-3 shadow-lg lg:-left-8 lg:block">
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                      Currently
                    </p>
                    <p className="mt-1 line-clamp-2 max-w-[11rem] text-sm font-semibold leading-tight">
                      {currentRole.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      @ {currentRole.company}
                    </p>
                  </div>
                ) : null}
              </div>

              <div
                className="absolute -right-6 -top-6 -z-10 h-24 w-24 rounded-full bg-primary/20 blur-2xl"
                aria-hidden
              />
              {/* Warm glow that picks up the portrait's red and teal tones */}
              <div
                className="absolute -bottom-10 -left-8 -z-10 h-48 w-48 rounded-full bg-rose-500/15 blur-3xl"
                aria-hidden
              />
              <div
                className="absolute -right-10 top-1/3 -z-10 h-40 w-40 rounded-full bg-teal-400/10 blur-3xl"
                aria-hidden
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
