import { pageMeta } from "@/lib/seo";
import { EMAIL } from "@/lib/site";
import { Crumbs, PageHead } from "@/components/site/bits";

export const metadata = pageMeta({
  title: "Privacy | Zaflick",
  description: "How Zaflick handles your email address, what we send you and how to leave the list at any time.",
  path: "/privacy",
});

const mail = <a className="text-link" href={`mailto:${EMAIL.admin}`}>{EMAIL.admin}</a>;

// Word for word from zaflick.com/privacy (last updated September 2026).
// TODO-approve: the new forms (Founding Testers, 6am Club, contact) collect a little more than
// an email; the "What we collect" section needs a line about them before go-live.
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
          When you join the early list, we collect the email address you submit. We also receive analytics about how the site is used: pages
          viewed, which pieces you opened the join form from, whether you chose the women&apos;s or men&apos;s view, and taps on share and WhatsApp
          links.
        </p>
        <p>
          If you arrive from a campaign or a friend&apos;s referral link, we record the campaign and referral tags in that link so we know where
          sign-ups came from. We do not build advertising profiles and we do not try to identify you across other websites.
        </p>
        <h2>Why we collect it</h2>
        <p>Only to contact you about the launch: the drop date, early access and member benefits.</p>
        <h2>Where it is stored</h2>
        <p>Your email is stored securely in our database and mirrored into a private spreadsheet that only we can access. Data is sent over HTTPS.</p>
        <p>
          Your browser also keeps a copy of your email, your member number and your women&apos;s or men&apos;s preference on your own device, so the site
          remembers you are already on the list. Clearing your browser data for this site removes that local copy. It does not remove you from the
          early list — email {mail} to be taken off.
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
        <p className="soft">Last updated: September 2026.</p>
      </div>
    </main>
  );
}
