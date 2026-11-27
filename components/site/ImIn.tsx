"use client";

import { useEffect, useRef, useState } from "react";
import { getSource, useMember, type Member } from "@/lib/member";
import { BENEFITS, SITE_URL } from "@/lib/site";
import { track } from "@/lib/track";
import SignupForm from "./SignupForm";
import { Img } from "./bits";

/**
 * The "I'm in" invite (DRAFT, /in). All copy TODO-approve.
 * - A friend opening someone's link (/in?ref=Z<n>) sees "A friend is in. Are you?" and the Circle form.
 * - A member sees their own invite: a story card and a sticker made in the browser, their link,
 *   and share buttons. Nothing is uploaded; the images are drawn on a canvas on the device.
 */

const C = { aubergine: "#4f2536", bone: "#f4f1ea", blush: "#f6e4d8", terracotta: "#c96b4a" };
const INVITE_TEXT = "I'm in. Whatever the plan. Zaflick's first drop opens to the Circle first. Come with me:";

const inviteUrl = (m: Member | null) => `${SITE_URL}/in${m?.number ? `?ref=Z${m.number}` : ""}`;
const shortUrl = (m: Member | null) => inviteUrl(m).replace(/^https:\/\//, "");

function fontFamily(name: "--font-display" | "--font-body") {
  const v = getComputedStyle(document.body).getPropertyValue(name).trim();
  return v || (name === "--font-display" ? "Archivo, Arial, sans-serif" : "system-ui, sans-serif");
}

async function ready(display: string, body: string) {
  try {
    await Promise.all([document.fonts.load(`800 200px ${display}`), document.fonts.load(`500 40px ${body}`)]);
  } catch {}
}

/** 1080×1920 story card. */
async function drawCard(m: Member | null): Promise<Blob | null> {
  const display = fontFamily("--font-display");
  const body = fontFamily("--font-body");
  await ready(display, body);
  const cv = document.createElement("canvas");
  cv.width = 1080;
  cv.height = 1920;
  const x = cv.getContext("2d");
  if (!x) return null;

  x.fillStyle = C.aubergine;
  x.fillRect(0, 0, 1080, 1920);

  // Knit rows: soft wavy threads across the card.
  x.strokeStyle = "rgba(244,241,234,0.07)";
  x.lineWidth = 3;
  for (let y = 60; y < 1920; y += 38) {
    x.beginPath();
    for (let i = 0; i <= 1080; i += 18) {
      const yy = y + Math.sin(i / 18) * 5;
      if (i === 0) x.moveTo(i, yy);
      else x.lineTo(i, yy);
    }
    x.stroke();
  }

  x.textBaseline = "alphabetic";
  x.fillStyle = C.bone;
  x.font = `700 46px ${display}`;
  x.fillText("Z A F L I C K", 96, 170);

  x.font = `800 300px ${display}`;
  x.fillText("I'm", 84, 860);
  x.fillText("in.", 84, 1140);

  x.fillStyle = C.blush;
  x.font = `600 78px ${display}`;
  x.fillText("Whatever the plan.", 96, 1300);

  x.fillStyle = C.terracotta;
  x.fillRect(96, 1420, 120, 8);

  x.fillStyle = C.bone;
  x.font = `500 42px ${body}`;
  x.fillText(m?.number ? `Circle member no. ${m.number}` : "In the Circle", 96, 1510);
  x.font = `500 40px ${body}`;
  x.fillText("Come with me:", 96, 1700);
  x.font = `700 44px ${body}`;
  x.fillText(shortUrl(m), 96, 1764);

  return new Promise((r) => cv.toBlob(r, "image/png"));
}

/** Transparent "I'M IN" sticker for Instagram stories. */
async function drawSticker(): Promise<Blob | null> {
  const display = fontFamily("--font-display");
  const body = fontFamily("--font-body");
  await ready(display, body);
  const cv = document.createElement("canvas");
  cv.width = 900;
  cv.height = 380;
  const x = cv.getContext("2d");
  if (!x) return null;
  const r = 150;
  x.fillStyle = C.terracotta;
  x.beginPath();
  x.moveTo(40 + r, 40);
  x.arcTo(860, 40, 860, 340, r);
  x.arcTo(860, 340, 40, 340, r);
  x.arcTo(40, 340, 40, 40, r);
  x.arcTo(40, 40, 860, 40, r);
  x.closePath();
  x.fill();
  x.fillStyle = C.bone;
  x.textAlign = "center";
  x.font = `800 150px ${display}`;
  x.fillText("I'M IN", 450, 225);
  x.font = `600 34px ${body}`;
  x.fillText("zaflick.com", 450, 292);
  return new Promise((res) => cv.toBlob(res, "image/png"));
}

function MemberInvite({ member }: { member: Member }) {
  const [card, setCard] = useState<{ blob: Blob; url: string } | null>(null);
  const [sticker, setSticker] = useState<{ blob: Blob; url: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const urls = useRef<string[]>([]);

  useEffect(() => {
    let live = true;
    (async () => {
      const [c, s] = await Promise.all([drawCard(member), drawSticker()]);
      if (!live) return;
      if (c) {
        const u = URL.createObjectURL(c);
        urls.current.push(u);
        setCard({ blob: c, url: u });
      }
      if (s) {
        const u = URL.createObjectURL(s);
        urls.current.push(u);
        setSticker({ blob: s, url: u });
      }
    })();
    return () => {
      live = false;
      urls.current.forEach((u) => URL.revokeObjectURL(u));
      urls.current = [];
    };
  }, [member]);

  const link = inviteUrl(member);

  async function shareCard() {
    track("share_click", { form: "invite", via: "card" });
    if (card) {
      const file = new File([card.blob], "zaflick-im-in.png", { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], text: `${INVITE_TEXT} ${link}` });
          return;
        } catch {
          return;
        }
      }
    }
    if (navigator.share) navigator.share({ title: "Zaflick", text: INVITE_TEXT, url: link }).catch(() => {});
  }

  function copyLink() {
    track("share_click", { form: "invite", via: "copy" });
    navigator.clipboard?.writeText(`${INVITE_TEXT} ${link}`).then(() => setCopied(true));
  }

  return (
    <div className="invite">
      <div className="invite-copy">
        <p className="eyebrow mono">Your invite</p>
        <h1 className="display">You&apos;re in. Now bring your people.</h1>
        <p className="page-lede">
          Good times are better with company. Post your card, send your link to the friends you make plans with, and they&apos;re in too.
        </p>
        <p className="mono invite-link">{shortUrl(member)}</p>
        <div className="invite-actions">
          <button type="button" className="btn btn-accent btn-lg" onClick={shareCard} disabled={!card}>
            Share my card
          </button>
          <a
            className="btn btn-ink"
            href={`https://wa.me/?text=${encodeURIComponent(`${INVITE_TEXT} ${link}`)}`}
            target="_blank"
            rel="noopener"
            onClick={() => track("share_click", { form: "invite", via: "whatsapp" })}
          >
            Send on WhatsApp
          </a>
          <button type="button" className="btn btn-ghost" onClick={copyLink}>
            {copied ? "Link copied" : "Copy my link"}
          </button>
        </div>
        <p className="soft invite-small">
          {card ? (
            <a className="text-link" href={card.url} download="zaflick-im-in.png" onClick={() => track("share_click", { form: "invite", via: "download-card" })}>
              Download the card
            </a>
          ) : null}
          {card && sticker ? " · " : null}
          {sticker ? (
            <a className="text-link" href={sticker.url} download="zaflick-im-in-sticker.png" onClick={() => track("share_click", { form: "invite", via: "download-sticker" })}>
              Download the &ldquo;I&apos;m in&rdquo; sticker for your story
            </a>
          ) : null}
        </p>
      </div>
      <div className="invite-card">
        {card ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={card.url} alt={`An "I'm in" story card for the Zaflick Circle, with the link ${shortUrl(member)}.`} width={1080} height={1920} />
        ) : (
          <div className="invite-card-wait" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

function Invited() {
  const [ref, setRef] = useState("");
  useEffect(() => setRef(getSource().ref || ""), []);
  return (
    <div className="early">
      <div className="early-copy">
        <p className="eyebrow mono">{ref ? "You're invited" : "The Circle"}</p>
        <h1 className="display">{ref ? "A friend is in. Are you?" : "Whatever the plan, you're in."}</h1>
        <p className="page-lede">
          The Circle is Zaflick&apos;s list. The first drop opens to the Circle before anyone else, starting in Hyderabad and Bengaluru.
        </p>
        <ul className="ticks early-ticks">
          {BENEFITS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <div className="early-form">
          <SignupForm where="invite" />
        </div>
      </div>
      <div className="early-img">
        <Img name="friends" alt="Four friends in tonal sets talking around a table on a terrace café." eager sizes="(max-width: 900px) 100vw, 50vw" />
      </div>
    </div>
  );
}

export default function ImIn() {
  const member = useMember();
  return member?.email ? <MemberInvite member={member} /> : <Invited />;
}
