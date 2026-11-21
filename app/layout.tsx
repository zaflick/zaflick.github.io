import type { Metadata, Viewport } from "next";
import { Archivo, Rethink_Sans } from "next/font/google";
import "./globals.css";
import "./site.css";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ThreadRail from "@/components/site/ThreadRail";
import JoinDrawer from "@/components/site/JoinDrawer";
import StickyJoin from "@/components/site/StickyJoin";
import SiteRuntime from "@/components/site/SiteRuntime";
import { BASE, BRAND, GTM_ID, IS_LIVE, SITE_URL } from "@/lib/site";

// Same families as zaflick.com. Archivo is variable in width, so the big
// headings can run wide (Davaris-style) without another font file.
const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-display", display: "swap" });
const body = Rethink_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Zaflick",
  description: BRAND.oneLine,
  // Prototype: kept out of search. Each page sets the same via pageMeta().
  robots: IS_LIVE ? { index: true, follow: true } : { index: false, follow: false },
  icons: {
    icon: `${BASE}/assets/zaflick-icon.png`,
    apple: `${BASE}/assets/zaflick-touch.png`,
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F1EA",
  width: "device-width",
  initialScale: 1,
};

// Runs before first paint: marks JS as available, for fade-ins.
const bootScript = `document.documentElement.classList.add('js');`;

const gtmScript = (id: string) =>
  `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`;

const useGtm = IS_LIVE && GTM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        {useGtm ? <script dangerouslySetInnerHTML={{ __html: gtmScript(GTM_ID) }} /> : null}
      </head>
      <body>
        {useGtm ? (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
          </noscript>
        ) : null}
        <Header />
        <ThreadRail />
        {children}
        <Footer />
        <JoinDrawer />
        <StickyJoin />
        <SiteRuntime />
        {IS_LIVE ? null : (
          <p className="proto-badge mono" role="note">
            Prototype · forms don&apos;t send
          </p>
        )}
      </body>
    </html>
  );
}
