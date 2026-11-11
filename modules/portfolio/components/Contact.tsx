import type { Profile } from "../types";
import { Button } from "@ui/components/button";
import { ArrowUpRight, Mail } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { SocialLinks } from "./SocialLinks";

interface ContactProps {
  profile: Profile;
}

export function Contact({ profile }: ContactProps) {
  return (
    <section
      id="contact"
      className="scroll-mt-28 border-t border-border/60 py-20 sm:py-24 lg:py-32"
    >
      <div className="container">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-card px-5 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              aria-hidden
            >
              <div className="bg-grid absolute inset-0 opacity-60" />
              <div className="absolute -top-32 left-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-[100px]" />
              <div className="absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-sky-500/10 blur-[90px]" />
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
              <div className="text-center lg:text-left">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  05 — Contact
                </p>

                <h2 className="mx-auto mt-5 max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:mx-0 lg:text-5xl lg:leading-[1.1]">
                  Let&apos;s build something worth shipping
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
                  I&apos;m open to senior frontend roles and always happy to
                  talk about interesting engineering problems. Send a message,
                  or reach me directly.
                </p>

                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full whitespace-nowrap px-5 text-sm sm:w-auto sm:px-8 sm:text-base"
                  >
                    <a href={`mailto:${profile.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      {profile.email}
                    </a>
                  </Button>

                  {profile.resumeUrl ? (
                    <Button
                      asChild
                      size="lg"
                      variant="ghost"
                      className="group w-full whitespace-nowrap sm:w-auto"
                    >
                      <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download resume
                        <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </Button>
                  ) : null}
                </div>

                <div className="mt-10 flex flex-col items-center gap-4 lg:items-start">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Or find me elsewhere
                  </p>
                  <SocialLinks
                    links={profile.socials}
                    className="justify-center lg:justify-start"
                  />
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
