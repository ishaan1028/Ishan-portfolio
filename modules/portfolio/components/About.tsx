import type { About as AboutContent, AboutHighlight, Profile } from "../types";
import { Gauge, Layers, LucideIcon, Radio, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

const highlightIcons: Record<AboutHighlight["icon"], LucideIcon> = {
  sparkles: Sparkles,
  radio: Radio,
  layers: Layers,
  gauge: Gauge,
};

interface AboutProps {
  profile: Profile;
  about: AboutContent;
  /** Company of the current role, from the experience list. */
  currentCompany: string | null;
}

export function About({ profile, about, currentCompany }: AboutProps) {
  const [lead, ...paragraphs] = about.bio;

  const facts = [
    { label: "Experience", value: about.experience },
    ...(currentCompany ? [{ label: "Currently", value: currentCompany }] : []),
    { label: "Focus", value: about.focus },
    { label: "Based in", value: profile.location },
    { label: "Timezone", value: profile.timezone },
  ];

  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow="01 — About" title={about.title} />

          <Reveal delay={120}>
            <dl className="mt-8 divide-y divide-border/70 border-y border-border/70 text-sm">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="text-right font-medium">{fact.value}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Email
                </dt>
                <dd className="min-w-0 text-right font-medium">
                  <a
                    href={`mailto:${profile.email}`}
                    className="break-all underline-offset-4 transition-colors hover:text-primary hover:underline"
                  >
                    {profile.email}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div>
          <div className="space-y-5">
            {lead ? (
              <Reveal>
                <p className="text-pretty text-lg font-medium leading-relaxed text-foreground sm:text-xl">
                  {lead}
                </p>
              </Reveal>
            ) : null}
            {paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={(index + 1) * 80}>
                <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {about.highlights.map((highlight, index) => {
              const Icon = highlightIcons[highlight.icon];

              return (
                <Reveal key={highlight.title} delay={index * 90}>
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold tracking-tight">
                      {highlight.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {highlight.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {highlight.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-border bg-muted/60 px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
