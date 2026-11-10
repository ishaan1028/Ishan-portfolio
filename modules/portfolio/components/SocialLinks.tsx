import type { SocialLink, SocialPlatform } from "../types";
import { cn } from "@ui/lib";
import { Github, Globe, Linkedin, Mail, Twitter } from "lucide-react";
import { ComponentType } from "react";

const platformIcons: Record<
  SocialPlatform,
  ComponentType<{ className?: string }>
> = {
  github: Github,
  linkedin: Linkedin,
  x: Twitter,
  dribbble: Globe,
  website: Globe,
  email: Mail,
};

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  size?: "sm" | "default";
}

export function SocialLinks({
  links,
  className,
  size = "default",
}: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {links.map((link) => {
        const LinkIcon = platformIcons[link.platform] ?? Globe;

        return (
          <li key={link.id}>
            <a
              href={link.url}
              target={link.platform === "email" ? undefined : "_blank"}
              rel="noreferrer noopener"
              aria-label={link.label}
              title={link.label}
              className={cn(
                "border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground flex items-center justify-center rounded-full border transition-all duration-200 hover:-translate-y-0.5",
                size === "sm" ? "h-9 w-9" : "h-10 w-10",
              )}
            >
              <LinkIcon
                className={
                  size === "sm" ? "h-4 w-4" : "h-[1.05rem] w-[1.05rem]"
                }
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
