import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants";

interface SchemaOrgProps {
  locale: string;
}

export function SchemaOrg({ locale }: SchemaOrgProps) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Isa Warps",
    givenName: "Isa",
    familyName: "Warps",
    url: SITE_URL,
    image: `${SITE_URL}/images/isa/profile.jpg`,
    jobTitle: "Professional Footballer",
    nationality: [
      { "@type": "Country", name: "Netherlands" },
      { "@type": "Country", name: "Indonesia" },
    ],
    memberOf: [
      {
        "@type": "SportsTeam",
        name: "VfR Warbeyen Frauen",
        sport: "Football",
        memberOf: {
          "@type": "SportsOrganization",
          name: "2. Bundesliga",
        },
      },
      {
        "@type": "SportsTeam",
        name: "Timnas Putri Indonesia",
        sport: "Football",
        memberOf: {
          "@type": "SportsOrganization",
          name: "PSSI",
        },
      },
    ],
    sameAs: [
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.youtube,
      SOCIAL_LINKS.tiktok,
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Isa Warps",
    url: SITE_URL,
    inLanguage: locale,
    author: personSchema,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
