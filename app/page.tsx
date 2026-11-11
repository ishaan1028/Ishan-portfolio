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
import { siteUrl } from "@portfolio/lib/site";
import { Metadata } from "next";

const { profile } = portfolioContent;
const title = `${profile.name} — ${profile.role}`;
const [firstName, ...lastNames] = profile.name.split(" ");

// The share image comes from app/opengraph-image.tsx; Next adds it to openGraph.
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description: profile.metaDescription,
  alternates: { canonical: "/" },
  authors: [{ name: profile.name, url: siteUrl.href }],
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    locale: "en_US",
    title,
    description: profile.metaDescription,
    firstName,
    lastName: lastNames.join(" "),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.metaDescription,
  },
};

export default function PortfolioPage() {
  const { about, skillGroups, experiences, education, projects } =
    portfolioContent;

  const currentExperience = experiences.find(
    (experience) => experience.isCurrent,
  );

  // schema.org Person, so search engines can show a rich profile result.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.metaDescription,
    url: siteUrl.href,
    image: profile.avatarUrl
      ? new URL(profile.avatarUrl, siteUrl).href
      : undefined,
    email: `mailto:${profile.email}`,
    homeLocation: { "@type": "Place", name: profile.location },
    worksFor: currentExperience
      ? { "@type": "Organization", name: currentExperience.company }
      : undefined,
    sameAs: profile.socials
      .filter((social) => social.platform !== "email")
      .map((social) => social.url),
    knowsAbout: skillGroups.flatMap((group) => group.skills),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so content can never close the script tag early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
        <Experience experiences={experiences} education={education} />
        <Projects projects={projects} />
        <Contact profile={profile} />
      </main>

      <PortfolioFooter profile={profile} />
      <ScrollToTop />
    </>
  );
}
