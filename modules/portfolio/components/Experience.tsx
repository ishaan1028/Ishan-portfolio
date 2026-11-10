import type { Education, Experience as ExperienceEntry } from "../types";
import { GraduationCap } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

interface ExperienceProps {
  experiences: ExperienceEntry[];
  education: Education[];
}

export function Experience({ experiences, education }: ExperienceProps) {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="03 — Experience"
        title="Where I've done the work"
        description="5+ years building SaaS platforms, from a zero-to-one marketplace at Namshi to AI agents and real-time systems at MaxIQ."
      />

      <div className="mt-14">
        <ol className="relative">
          {/* Timeline rail */}
          <span
            className="via-border from-primary absolute left-[7px] top-2 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b to-transparent sm:block"
            aria-hidden
          />

          {experiences.map((experience, index) => (
            <li key={experience.id}>
              <Reveal delay={index * 90}>
                <article className="relative pb-10 sm:pl-10 lg:grid lg:grid-cols-[11.5rem_1fr] lg:gap-10 lg:pl-10">
                  {/* Node */}
                  <span
                    className="border-background bg-primary absolute left-0 top-2 hidden h-[15px] w-[15px] rounded-full border-4 sm:block"
                    aria-hidden
                  />

                  <div className="lg:pt-0.5">
                    <p className="text-muted-foreground whitespace-nowrap font-mono text-xs uppercase tracking-[0.15em]">
                      {experience.startDate} — {experience.endDate ?? "Present"}
                    </p>
                    {experience.isCurrent ? (
                      <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[0.7rem] font-medium text-emerald-600 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Current
                      </span>
                    ) : null}
                  </div>

                  <div className="border-border bg-card hover:border-primary/40 mt-4 rounded-2xl border p-6 transition-colors lg:mt-0 lg:p-7">
                    <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                        {experience.role}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {experience.location}
                      </p>
                    </header>

                    <p className="mt-1 text-sm">
                      <span className="text-primary font-semibold">
                        {experience.company}
                      </span>
                      <span className="text-muted-foreground">
                        {" "}
                        · {experience.focus}
                      </span>
                    </p>

                    <p className="text-muted-foreground mt-4 text-sm leading-relaxed sm:text-base">
                      {experience.summary}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {experience.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="text-muted-foreground flex gap-3 text-sm leading-relaxed"
                        >
                          <span
                            className="bg-primary/60 mt-[0.55rem] h-1 w-1 shrink-0 rounded-full"
                            aria-hidden
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {experience.stack.map((technology) => (
                        <li
                          key={technology}
                          className="border-border bg-muted/60 text-muted-foreground rounded-full border px-2.5 py-1 font-mono text-[0.7rem]"
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      {/* Education */}
      <Reveal>
        <div className="border-border bg-card mt-6 rounded-2xl border p-6 lg:p-7">
          <h3 className="flex items-center gap-2.5 text-base font-semibold">
            <GraduationCap className="text-primary h-[1.15rem] w-[1.15rem]" />
            Education
          </h3>

          <ul className="divide-border/70 mt-5 divide-y">
            {education.map((entry) => (
              <li key={entry.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium">{entry.degree}</p>
                  <p className="text-muted-foreground font-mono text-xs">
                    {entry.period}
                  </p>
                </div>
                <p className="text-primary mt-0.5 text-sm">
                  {entry.institution}
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {entry.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
