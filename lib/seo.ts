import type { Metadata } from "next";
import { BRAND, IS_LIVE, SITE_URL, SOCIAL, EMAIL } from "./site";

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
  sameAs: SOCIAL.map((s) => s.url),
  contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: EMAIL.admin, areaServed: "IN", availableLanguage: ["en"] }],
});

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

/** One 6am Club morning as a free, in-person Event (Google event results). Times are India time. */
export const eventSchema = (m: { city: string; venue: string; address: string; date: string; start: string; end: string; activity: string }) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name: `Zaflick 6am Club: ${m.activity}, ${m.city}`,
  description: `A free early-morning ${m.activity.toLowerCase()} session with Zaflick in ${m.city}. Register on the 6am Club page.`,
  startDate: `${m.date}T${m.start}:00+05:30`,
  endDate: `${m.date}T${m.end}:00+05:30`,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: { "@type": "Place", name: m.venue, address: { "@type": "PostalAddress", streetAddress: m.address, addressLocality: m.city, addressCountry: "IN" } },
  image: [`${SITE_URL}/assets/img/day-him-run.webp`],
  organizer: { "@id": `${SITE_URL}/#org`, "@type": "Organization", name: BRAND.name, url: SITE_URL },
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR", availability: "https://schema.org/InStock", url: `${SITE_URL}/6am-club` },
  isAccessibleForFree: true,
});
