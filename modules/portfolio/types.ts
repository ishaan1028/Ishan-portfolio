/**
 * Content model for the portfolio.
 *
 * `content/portfolio.json` must match `PortfolioContent`. Components only
 * receive these shapes as props.
 */

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "x"
  | "dribbble"
  | "email"
  | "website";

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  label: string;
  url: string;
}

export interface Profile {
  id: string;
  name: string;
  /** Shown in the hero as the primary role, e.g. "Senior Software Engineer". */
  role: string;
  /** Short punchy headline, rendered as the hero H1 tail. */
  headline: string;
  /** 1–2 sentence hero paragraph. */
  summary: string;
  location: string;
  timezone: string;
  email: string;
  /** Path in /public or a URL; null shows a monogram. */
  avatarUrl: string | null;
  resumeUrl: string | null;
  availability: {
    isAvailable: boolean;
    label: string;
  };
  socials: SocialLink[];
}

export interface AboutHighlight {
  /** Icon key resolved in `About.tsx`. */
  icon: "sparkles" | "radio" | "layers" | "gauge";
  title: string;
  description: string;
  tags: string[];
}

/** The About section. Location, timezone and email come from `profile`. */
export interface About {
  title: string;
  /** Quick fact, e.g. "5+ years". */
  experience: string;
  /** Quick fact, e.g. "AI interfaces & real-time UI". */
  focus: string;
  /** One string per paragraph; the first is styled as the lead. */
  bio: string[];
  highlights: AboutHighlight[];
}

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  /** Lucide-style icon key resolved in `Skills.tsx`. */
  icon: "code" | "ai" | "server" | "practice";
  skills: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  /** Short focus line shown after the company, e.g. "Architecture, AI SaaS". */
  focus: string;
  location: string;
  startDate: string;
  /** `null` means "Present". */
  endDate: string | null;
  summary: string;
  highlights: string[];
  stack: string[];
  isCurrent: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  detail: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  /** Short label on the gallery thumbnail, e.g. "Real-time chat". */
  caption: string;
}

export interface ProjectFeature {
  /** Icon key resolved in `Projects.tsx`. */
  icon: "chat" | "heart" | "bell" | "key" | "phone" | "shield";
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  category: string;
  logoUrl: string | null;
  /** Gallery images; the first one is shown first. At least one. */
  images: ProjectImage[];
  /** Lighthouse scores, 0–100. */
  scores: { label: string; value: number }[];
  features: ProjectFeature[];
  stack: string[];
  /** Null renders the button as "Soon". */
  videoUrl: string | null;
  liveUrl: string | null;
  repoUrl: string | null;
}

export interface PortfolioContent {
  profile: Profile;
  about: About;
  skillGroups: SkillGroup[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
}
