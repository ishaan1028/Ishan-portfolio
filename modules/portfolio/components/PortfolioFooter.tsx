import type { Profile } from "../types";
import { ArrowUp } from "lucide-react";
import { SocialLinks } from "./SocialLinks";

const footerLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export function PortfolioFooter({ profile }: { profile: Profile }) {
  return (
    <footer className="border-border/60 border-t py-12">
      <div className="container">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight">
              {profile.name}
            </p>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {profile.role} based in {profile.location}. Currently{" "}
              {profile.availability.isAvailable
                ? "open to new work"
                : "fully booked"}
              .
            </p>
            <SocialLinks links={profile.socials} size="sm" className="mt-5" />
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3 lg:grid-cols-2">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-border/60 mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-muted-foreground text-center font-mono text-xs sm:text-left">
            © {new Date().getFullYear()} {profile.name}. Built with Next.js &
            Tailwind CSS.
          </p>

          <a
            href="#top"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
