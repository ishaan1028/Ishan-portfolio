import type { Profile } from "../types";
import { Button } from "@ui/components/button";
import { ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "./Reveal";
import { SocialLinks } from "./SocialLinks";

interface ContactProps {
  profile: Profile;
}

export function Contact({ profile }: ContactProps) {
  return (
    <section
      id="contact"
      className="border-border/60 scroll-mt-28 border-t py-20 sm:py-24 lg:py-32"
    >
      <div className="container">
        <Reveal>
          <div className="border-border bg-card relative isolate overflow-hidden rounded-3xl border px-6 py-14 text-center sm:px-10 sm:py-20">
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              aria-hidden
            >
              <div className="bg-grid absolute inset-0 opacity-60" />
              <div className="bg-primary/25 absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-[100px]" />
              <div className="absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-sky-500/10 blur-[90px]" />
            </div>

            <p className="text-muted-foreground font-mono text-xs uppercase tracking-[0.2em]">
              06 — Contact
            </p>

            <h2 className="mx-auto mt-5 max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1]">
              Let&apos;s build something worth shipping
            </h2>

            <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed sm:text-lg">
              I&apos;m currently taking on a small number of freelance projects
              and always happy to talk about interesting engineering problems.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="group w-full sm:w-auto">
                <a href={`mailto:${profile.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  {profile.email}
                </a>
              </Button>

              {profile.resumeUrl ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group w-full sm:w-auto"
                >
                  <a href={profile.resumeUrl}>
                    Download resume
                    <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </Button>
              ) : null}
            </div>

            <div className="mt-10 flex flex-col items-center gap-4">
              <p className="text-muted-foreground font-mono text-[0.7rem] uppercase tracking-[0.2em]">
                Or find me elsewhere
              </p>
              <SocialLinks links={profile.socials} className="justify-center" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
