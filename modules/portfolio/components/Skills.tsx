import type { SkillGroup } from "../types";
import { Code2, Compass, LucideIcon, Server, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

const groupIcons: Record<SkillGroup["icon"], LucideIcon> = {
  code: Code2,
  ai: Sparkles,
  server: Server,
  practice: Compass,
};

interface SkillsProps {
  skillGroups: SkillGroup[];
}

export function Skills({ skillGroups }: SkillsProps) {
  return (
    <Section id="skills" className="bg-muted/30">
      <SectionHeading
        eyebrow="02 — Skills"
        title="The toolkit behind the work"
        description="Deep in React and the modern frontend, with enough backend to own a feature end to end, from the data model and API to the last pixel on screen."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group, index) => {
          const GroupIcon = groupIcons[group.icon];

          return (
            <Reveal key={group.id} delay={index * 90}>
              <div className="border-border bg-card hover:border-primary/40 flex h-full flex-col rounded-2xl border p-6 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-lg">
                    <GroupIcon className="h-[1.1rem] w-[1.1rem]" />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {group.title}
                  </h3>
                </div>

                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {group.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="border-border bg-muted/60 text-foreground/80 rounded-full border px-3 py-1 text-[0.8rem] font-medium"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
