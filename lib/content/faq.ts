/**
 * The answer bank: the one source for the site FAQ and, later, the Instagram/Messenger
 * automations, WhatsApp quick replies and the email auto-reply.
 *
 * `live: true` = started word for word from the old zaflick.com (checked 14 Nov 2026).
 * Rewritten 21 Nov for the 15 Nov brand update ("Whatever the plan, you're in"; the early
 * list is now the Circle; five pieces). All changed answers: TODO-approve.
 * Rule: never answer with a fact Zaflick hasn't published. Published in the brand update:
 * the launch cities (Hyderabad and Bengaluru), a December launch, men's pieces from
 * mid-December and women's from 1 January. Still unpublished: prices, the booking amount,
 * the exchange policy and fabric percentages. Claims on hold: no-pilling, keeps its shape,
 * "sized for Indian bodies" (say "sizing built on Indian measurements").
 */

import { IS_LIVE } from "@/lib/site";

/** `draft: true` = new copy waiting for approval: shown in the local preview, left out of the live site. */
export type QA = { id: string; q: string; a: string; live?: boolean; draft?: boolean };
export type Group = { id: string; title: string; items: QA[] };

const BANK: Group[] = [
  {
    id: "about",
    title: "About Zaflick",
    items: [
      {
        id: "what-is-zaflick",
        q: "What is Zaflick?",
        a: "Zaflick is an Indian athleisure brand for good times with friends. Five pieces for women and men: one outfit for a walk, a game or a coffee, with no changing in between. We are starting in Hyderabad and Bengaluru.",
        live: true,
      },
      {
        id: "different",
        q: "What makes it different?",
        a: "Jeans can't do the game, and gym wear looks wrong at the coffee after. Zaflick is one outfit that is ready for any plan and looks good the whole way through: designed style-first, with fabric chosen for heat and humidity and pockets that hold a phone.",
        live: true,
      },
      {
        id: "men-and-women",
        q: "Is it for men and women?",
        a: "Both. For her: a sports bra, an active legging with a side pocket and a fitted jacket. For him: an active T-shirt. The wide-leg pants are unisex. A tank top and shorts follow in the next drop, in March–April.",
        live: true,
      },
      {
        id: "how-designed",
        q: "How did you decide what to make?",
        a: "We asked before designing. We surveyed nearly 200 people and interviewed more than a dozen about what goes wrong with activewear in India, then designed the first drop around what they told us.",
      },
      {
        id: "photos-real",
        q: "Are the photos on this site real products?",
        a: "No. Every product image on this site is a conceptual representation. The designs are still being finalised and the final pieces may differ. You will see photographs of the real samples before you are asked to buy anything.",
        live: true,
      },
      {
        id: "where-from",
        q: "Where is Zaflick from?",
        a: "Zaflick is an Indian brand, from Zaflick Lifestyle Pvt. Ltd. Every piece is designed in India for Indian weather, with fabric chosen for heat and humidity and sizing built on Indian measurements rather than a chart borrowed from another market. We are starting in Hyderabad and Bengaluru.",
      },
      {
        id: "who-for",
        q: "Who is Zaflick for?",
        a: "Anyone who makes plans with friends and wants to look good through all of them: a walk, a game, a coffee, a day out. There are pieces for women and for men, and the wide-leg pants are unisex.",
      },
    ],
  },
  {
    id: "early-list",
    title: "The Circle and launch",
    items: [
      {
        id: "buy-yet",
        q: "Can I buy yet?",
        a: "Not yet. Zaflick is in pre-launch. The first drop opens in December, to the Circle first, and prices have not been announced yet. Joining the Circle is the way in first.",
        live: true,
      },
      {
        id: "early-list",
        q: "What is the Circle?",
        a: "The Circle is Zaflick's free early list. Members see the real samples before anyone else, can buy 48 hours before the public launch, and get free shipping on their launch order.",
        live: true,
      },
      {
        id: "launch",
        q: "When does it launch?",
        a: "The first drop launches in December, starting with Hyderabad and Bengaluru, and opens to the Circle first. Men's pieces are expected from mid-December and women's from 1 January. Circle members hear the exact date first and get in 48 hours early.",
        live: true,
      },
      {
        id: "price",
        q: "What will it cost?",
        a: "Prices will be shared with the Circle before launch. Sets will cost less than buying the pieces separately.",
        live: true,
      },
      {
        id: "messages",
        q: "How often will you message me?",
        a: "A few times before launch: when the samples are ready, and when early access opens. You can leave at any time.",
        live: true,
      },
      {
        id: "share",
        q: "Can I bring a friend into the Circle?",
        a: "Yes. Once you join, you get a Bring a friend button with your own link. Anyone who joins through it is in the Circle the same way you were. Good times are better with company.",
      },
      {
        id: "updates",
        q: "How do I stay updated?",
        a: "Join the Circle, and follow @houseofzaflick on Instagram.",
        live: true,
      },
      {
        id: "free",
        q: "Is the Circle free?",
        a: "Yes. Joining is free and needs only your email address. You get a member number straight away, a few messages before launch, and you can leave whenever you like from any email we send.",
      },
      {
        id: "member-number",
        q: "What is my member number?",
        a: "It's your place in the Zaflick Circle, given the moment you join, so you can see how early you were. The site shows it again whenever you come back on the same device, along with a personal link you can share with friends.",
      },
      {
        id: "after-joining",
        q: "What happens after I join?",
        a: "You see your member number on screen and get a confirmation by email. Before launch we send a few updates: the real samples, the launch date and your early-access window. Members can buy 48 hours before everyone else and get free shipping on their launch order.",
      },
    ],
  },
  {
    id: "pieces",
    title: "The pieces and fabric",
    items: [
      {
        id: "fabric",
        q: "What is the fabric?",
        a: "Fabric chosen for heat and humidity. We are testing it for see-through, pilling and shape before production, and the full fabric details will be shared with the real samples.",
      },
      {
        id: "see-through",
        q: "Is the legging see-through when you squat?",
        a: "We are testing the fabric for see-through and pilling before production. The Circle will see the real samples, and what the tests found, before anything goes on sale.",
      },
      {
        id: "pocket",
        q: "Does the legging pocket fit a phone?",
        a: "Yes, that is what it is for. The active legging has a deep side pocket on the thigh that holds a phone.",
      },
      {
        id: "waistband",
        q: "Will the waistband roll down?",
        a: "It is designed not to. The active legging has a wide, flat high-rise waistband, designed to stay put through a walk, a game and the rest of the day. We are testing it on real people before launch.",
      },
      {
        id: "bra-under-tank",
        q: "Do I need a bra under the tank top?",
        a: "No. The tank top, coming in the next drop in March–April, has built-in support, so it works on its own without a separate bra.",
      },
      {
        id: "colours",
        q: "What colours will there be?",
        a: "The concepts are shown in aubergine, deep forest, olive and ivory. Final colours will be confirmed with the real samples, and the Circle sees them first.",
      },
      {
        id: "work",
        q: "Can I wear Zaflick to work?",
        a: "That's the idea. The pieces are cut to look finished rather than sporty: tonal colours, a fitted jacket to layer over the sports bra, and for men a clean T-shirt with wide-leg pants. Go from a game to the office or to dinner without changing.",
      },
      {
        id: "care",
        q: "How should I wash activewear?",
        a: "Wash it cold and inside out with similar colours, and skip fabric softener, which clogs stretch fabric. Dry it in the shade rather than in a dryer or direct sun. Every Zaflick piece will come with its own care label when it ships.",
      },
    ],
  },
  {
    id: "sizing",
    title: "Sizing and fit",
    items: [
      {
        id: "sizes",
        q: "What sizes will there be?",
        a: "Sizes are still being finalised. Sizing is built on Indian measurements rather than a chart borrowed from another market.",
        live: true,
      },
      {
        id: "size-chart",
        q: "Is there a size chart yet?",
        a: "Not yet. The chart is published with the real samples. Until then, the size guide explains how to measure yourself so you are ready when it goes up.",
      },
      {
        id: "choose-size",
        q: "How do I choose my size?",
        a: "Measure your waist, hips and chest with a soft tape, then compare them with the size chart when it is published. For leggings, choose by your waist rather than sizing up for the hips. The size guide shows exactly where to measure.",
      },
      {
        id: "indian-sizing",
        q: "Is Zaflick sizing built on Indian measurements?",
        a: "Yes. Sizing is built on Indian measurements rather than a chart borrowed from another market. We are checking the fit on real people across every size before launch.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping and returns",
    items: [
      {
        id: "ship",
        q: "Where do you ship?",
        a: "India to start. The pieces are designed for Indian weather and Indian cities.",
        live: true,
      },
      {
        id: "shipping-cost",
        q: "Is shipping free?",
        a: "Circle members get free shipping on their launch order. Shipping for everyone else will be shared before launch.",
      },
      {
        id: "returns",
        q: "What is the returns policy?",
        a: "Returns and exchange terms will be published before the first sale, so you can read them before you buy anything.",
      },
      {
        id: "international",
        q: "Do you ship outside India?",
        a: "Not at launch. Zaflick ships within India to start. If you live abroad you can still join the Circle to follow the samples and the launch, and members will be the first to hear if we start shipping further.",
      },
    ],
  },
  {
    id: "community",
    title: "Community, collabs and press",
    items: [
      {
        id: "testers",
        q: "How do I become a Founding Tester?",
        a: "Apply on the Founding Testers page. We are choosing a small group to wear the samples before launch and tell us honestly what to change.",
      },
      {
        id: "sessions",
        q: "Does Zaflick host sessions?",
        a: "We are starting sessions in Hyderabad. Join the Circle and you will hear first when one is planned.",
      },
      {
        id: "collab",
        q: "I'm a creator. How do I collaborate?",
        a: "Email marketing@zaflick.com with your handle, city and a line about what you make, or message @houseofzaflick on Instagram. We reply to every message.",
      },
      {
        id: "press",
        q: "I'm a journalist. Who do I contact?",
        a: "Email marketing@zaflick.com with your publication and deadline, and we will come back to you quickly.",
      },
      {
        id: "contact",
        q: "How do I reach you?",
        a: "Message @houseofzaflick on Instagram, or use the contact page. Questions about your data go to admin@zaflick.com.",
      },
      {
        id: "partners",
        q: "Can my club, café, court or studio partner with Zaflick?",
        a: "Yes, we'd like to hear from you. Email marketing@zaflick.com or use the contact page with the name of your club, café, court, studio or brand, your city and what you have in mind. We reply to every message.",
      },
    ],
  },
  {
    id: "data",
    title: "Your data",
    items: [
      {
        id: "data-use",
        q: "What do you do with my email?",
        a: "We use it only to contact you about the launch: the drop date, early access and member benefits. We never sell it or share it with advertisers.",
      },
      {
        id: "leave",
        q: "How do I leave the list?",
        a: "Every email has an unsubscribe link, or email admin@zaflick.com and we will remove you.",
      },
    ],
  },
];

export const FAQ: Group[] = BANK.map((g) => ({ ...g, items: g.items.filter((x) => !x.draft || !IS_LIVE) }));
export const ALL_QA = FAQ.flatMap((g) => g.items);
export const qa = (id: string) => {
  const f = ALL_QA.find((x) => x.id === id);
  if (!f) throw new Error(`Unknown FAQ id: ${id}`);
  return f;
};
