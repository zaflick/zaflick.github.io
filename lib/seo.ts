import type { Metadata } from "next";
import { BRAND, IS_LIVE, SITE_URL, SOCIAL, EMAIL } from "./site";
import { FOUNDERS } from "./content/founders";

type MetaInput = {
  /** Full <title>. Keep under ~60 characters. */
  title: string;
  description: string;
  /** Path on zaflick.com, e.g. "/her". */
  path: string;
  /** Path to a 1200×630 image under /assets. */
  image?: string;
  type?: "website" | "article";
};

/** Title, description, canonical and Open Graph for one page. */
export function pageMeta({ title, description, path, image = "/assets/img/og-image.jpg", type = "website" }: MetaInput): Metadata {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: BRAND.name,
      locale: "en_IN",
      images: [{ url: `${SITE_URL}${image}`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}${image}`] },
    robots: IS_LIVE ? { index: true, follow: true } : { index: false, follow: false },
  };
}

/* ---------- schema.org ---------- */

export const orgSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: BRAND.name,
  legalName: BRAND.legal,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/zaflick-mark.png`,
  description: BRAND.oneLine,
  slogan: BRAND.tagline,
  foundingLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "IN" } },
  founder: FOUNDERS.map((f) => ({ "@type": "Person", "@id": `${SITE_URL}/about#${f.id}`, name: f.name })),
  email: EMAIL.marketing,
  areaServed: [
    { "@type": "City", name: "Hyderabad" },
    { "@type": "City", name: "Bengaluru" },
  ],
  sameAs: SOCIAL.map((s) => s.url),
  contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: EMAIL.admin, areaServed: "IN", availableLanguage: ["en"] }],
});

/** One Person per founder, for the About page. No `image`: who is in which photo isn't confirmed. */
export const founderSchema = () =>
  FOUNDERS.map((f) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/about#${f.id}`,
    name: f.name,
    url: `${SITE_URL}/about#${f.id}`,
    description: f.summary,
    worksFor: { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: BRAND.name },
    knowsAbout: f.knowsAbout,
    ...(f.alumniOf ? { alumniOf: { "@type": "CollegeOrUniversity", name: f.alumniOf } } : {}),
  }));

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: BRAND.name,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#org` },
  inLanguage: "en-IN",
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE_URL}${it.path}`,
  })),
});

export const faqSchema = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  })),
});
