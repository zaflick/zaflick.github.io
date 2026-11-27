import { pageMeta } from "@/lib/seo";
import { CLARITY_ID, EMAIL } from "@/lib/site";
import { Crumbs, PageHead } from "@/components/site/bits";

export const metadata = pageMeta({
  title: "Privacy | Zaflick",
  description: "How Zaflick handles your email address and form answers, the analytics tools we use, and how to leave the list at any time.",
  path: "/privacy",
});

const mail = <a className="text-link" href={`mailto:${EMAIL.admin}`}>{EMAIL.admin}</a>;

// Based on the September 2026 policy. Updated November 2026: the application and contact
// forms, and the analytics and advertising tools now on the site (GA4 and the Meta Pixel). 27 Nov: Cast your crew
// and the "I'm in" invite card.
export default function Page() {
  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }]} />
      <div className="prose">
        <PageHead title="Privacy" />
        <p>
          <strong>The short version:</strong> we collect your email so we can tell you when Zaflick launches. We do not sell it, share it with
          advertisers, or send you anything you did not sign up for.
        </p>
        <h2>What we collect</h2>
        <p>
          When you join the Circle (our early list), we collect the email address you submit. We also receive analytics about how the site is used: pages
          viewed, which pieces you opened the join form from, whether you chose the women&apos;s or men&apos;s view, and taps on share and WhatsApp
          links.
        </p>
        {CLARITY_ID ? (
          <p>
            We use Microsoft Clarity to see, in aggregate, how people scroll and tap on the site (heatmaps and session replays), so we can fix
            what is confusing. Clarity hides what you type, such as your email address. Microsoft processes this data under its own privacy
            statement.
          </p>
        ) : null}
        <p>
          The &ldquo;I&apos;m in&rdquo; invite card and sticker are drawn on your own device. Nothing about them is uploaded to us.
        </p>
        <p>
          If you arrive from a campaign or a friend&apos;s referral link, we record the campaign and referral tags in that link so we know where
          sign-ups came from.
        </p>
        <p>
          If you apply to be a Founding Tester, apply with your friends on the Cast your crew page, or write to us through the contact page, we
          collect what you type into that form, such as your name, email, city, Instagram handle and your answers. For Cast your crew that includes
          the first names and handles of the friends you list, so please only add friends who are happy to be included. We use it only to reply
          to you and to run that programme or shoot.
        </p>
        <h2>Analytics and advertising tools</h2>
        <p>
          We use Google Analytics to understand how the site is used, and the Meta Pixel to measure sign-ups from Instagram and Facebook and to
          show Zaflick to people who have visited the site. These tools use cookies and similar technology, and Google and Meta process that data
          under their own privacy policies. You can block or clear these cookies in your browser settings at any time; the site works without
          them.
        </p>
        <h2>Why we collect it</h2>
        <p>Only to contact you about the launch: the drop date, early access and member benefits.</p>
        <h2>Where it is stored</h2>
        <p>Your email is stored securely in our database and mirrored into a private spreadsheet that only we can access. Data is sent over HTTPS.</p>
        <p>
          Your browser also keeps a copy of your email, your member number and your women&apos;s or men&apos;s preference on your own device, so the site
          remembers you are already on the list. Clearing your browser data for this site removes that local copy. It does not remove you from the
          Circle — email {mail} to be taken off.
        </p>
        <h2>What we never do</h2>
        <ul>
          <li>We never sell or rent your data</li>
          <li>We never share it with advertisers or data brokers</li>
          <li>We never send you spam, only the launch updates you signed up for</li>
        </ul>
        <h2>Your choices and rights</h2>
        <p>
          You can ask us to access, correct or delete your data at any time, including under India’s Digital Personal Data Protection Act, 2023,
          and the GDPR and CCPA where they apply. Every email we send includes an unsubscribe option, and you can reach us to opt out or request
          deletion at {mail}.
        </p>
        <h2>Changes</h2>
        <p>If this policy changes we will update it here. Material changes to how we use your data will be communicated to members directly.</p>
        <h2>Contact</h2>
        <p>Questions about your data? Email {mail}.</p>
        <p className="soft">Last updated: November 2026.</p>
      </div>
    </main>
  );
}
