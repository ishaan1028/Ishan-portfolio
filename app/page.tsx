import { About } from "@portfolio/components/About";
import { Contact } from "@portfolio/components/Contact";
import { Experience } from "@portfolio/components/Experience";
import { Hero } from "@portfolio/components/Hero";
import { PortfolioFooter } from "@portfolio/components/PortfolioFooter";
import { PortfolioNav } from "@portfolio/components/PortfolioNav";
import { Projects } from "@portfolio/components/Projects";
import { ScrollToTop } from "@portfolio/components/ScrollToTop";
import { Skills } from "@portfolio/components/Skills";
import { portfolioContent } from "@portfolio/lib/content";
import { Metadata } from "next";

const { profile } = portfolioContent;

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.summary,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
    type: "profile",
  },
};

export default function PortfolioPage() {
  const {
    about,
    skillGroups,
    experiences,
    education,
    projects,
  } = portfolioContent;

  const currentExperience = experiences.find(
    (experience) => experience.isCurrent,
  );

  return (
    <>
      <PortfolioNav name={profile.name} role={profile.role} />

      <main>
        <Hero
          profile={profile}
          currentRole={
            currentExperience
              ? {
                  title: currentExperience.role,
                  company: currentExperience.company,
                }
              : null
          }
        />
        <About
          profile={profile}
          about={about}
          currentCompany={currentExperience?.company ?? null}
        />
        <Skills skillGroups={skillGroups} />
        <Experience
          experiences={experiences}
          education={education}
        />
        <Projects projects={projects} />
        <Contact profile={profile} />
      </main>

      <PortfolioFooter profile={profile} />
      <ScrollToTop />
    </>
  );
}
