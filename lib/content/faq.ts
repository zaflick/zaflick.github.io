/**
 * The answer bank: the one source for the site FAQ and, later, the Instagram/Messenger
 * automations, WhatsApp quick replies and the email auto-reply.
 *
 * `live: true` = word for word from zaflick.com (faq + early-list, checked 14 Nov 2026).
 * Everything else is new copy: TODO-approve.
 * Rule: never answer with a fact Zaflick hasn't published (no prices, dates, fabric
 * percentages or cities).
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
        a: "Zaflick is an Indian athleisure brand. Seven pieces for women and men, designed to be worn from a morning session through the rest of the day, not only at the gym.",
        live: true,
      },
      {
        id: "different",
        q: "What makes it different?",
        a: "Most activewear asks you to choose between looking right and performing. These pieces are designed to do both: fabric chosen for heat and humidity, a waistband that stays put, pockets that hold a phone, and cuts you can wear to dinner.",
        live: true,
      },
      {
        id: "men-and-women",
        q: "Is it for men and women?",
        a: "Both. For her: a tank top with built-in support, an active legging with a side pocket, a sports bra and a fitted jacket. For him: an active T-shirt, wide-leg pants and athleisure shorts.",
        live: true,
      },
      {
        id: "how-designed",
        q: "How did you decide what to make?",
        a: "We asked before designing. We surveyed nearly 200 people and interviewed more than a dozen about what goes wrong with activewear in India, then designed the seven pieces around what they told us.",
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
        a: "Zaflick is an Indian brand, from Zaflick Lifestyle Pvt. Ltd. Every piece is designed in India for Indian weather and Indian bodies, with fabric chosen for heat and humidity and sizes graded on Indian measurements rather than a chart borrowed from another market.",
      },
      {
        id: "who-for",
        q: "Who is Zaflick for?",
        a: "Anyone who starts the day with a workout and doesn't want to change straight after. The pieces are built to train in first, then carry on through work, travel, college and dinner. There are pieces for women and for men.",
      },
    ],
  },
  {
    id: "early-list",
    title: "The early list and launch",
    items: [
      {
        id: "buy-yet",
        q: "Can I buy yet?",
        a: "Not yet. Zaflick is in pre-launch. The first drop has not been released and prices have not been announced. Joining the early list is the way in first.",
        live: true,
      },
      {
        id: "early-list",
        q: "What is the early list?",
        a: "It is a free list. Members see the real samples before anyone else, can buy 48 hours before the public launch, and get free shipping on their launch order.",
        live: true,
      },
      {
        id: "launch",
        q: "When does it launch?",
        a: "The date is not public yet. People on the early list hear it first and get in 48 hours early.",
        live: true,
      },
      {
        id: "price",
        q: "What will it cost?",
        a: "Prices will be shared with the early list before launch. Sets will cost less than buying the pieces separately.",
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
        q: "Can I share the early list with a friend?",
        a: "Yes. Once you join, you get a share button with your own link. Anyone who joins through it is added to the early list the same way you were.",
      },
      {
        id: "updates",
        q: "How do I stay updated?",
        a: "Join the early list, and follow @houseofzaflick on Instagram.",
        live: true,
      },
      {
        id: "free",
        q: "Is the early list free?",
        a: "Yes. Joining is free and needs only your email address. You get a member number straight away, a few messages before launch, and you can leave whenever you like from any email we send.",
      },
      {
        id: "member-number",
        q: "What is my member number?",
        a: "It's your place on the Zaflick early list, given the moment you join, so you can see how early you were. The site shows it again whenever you come back on the same device, along with a personal link you can share with friends.",
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
        a: "Fabric chosen for heat and humidity. It is being tested for see-through and pilling before production, and the full fabric details will be shared with the real samples.",
      },
      {
        id: "see-through",
        q: "Is the legging see-through when you squat?",
        a: "The fabric is being tested for see-through and pilling before production. The early list will see the real samples, and what the tests found, before anything goes on sale.",
      },
      {
        id: "pocket",
        q: "Does the legging pocket fit a phone?",
        a: "Yes, that is what it is for. The active legging has a deep side pocket on the thigh that holds a phone.",
      },
      {
        id: "waistband",
        q: "Will the waistband roll down?",
        a: "It is designed not to. The active legging has a wide, flat high-rise waistband, built to stay put through training and the rest of the day.",
      },
      {
        id: "bra-under-tank",
        q: "Do I need a bra under the tank top?",
        a: "No. The tank top has built-in support, so it works on its own without a separate bra.",
      },
      {
        id: "colours",
        q: "What colours will there be?",
        a: "The concepts are shown in aubergine, deep forest, olive and ivory. Final colours will be confirmed with the real samples, and the early list sees them first.",
      },
      {
        id: "work",
        q: "Can I wear Zaflick to work?",
        a: "That's the idea. The pieces are cut to look finished rather than sporty: tonal colours, a fitted jacket to layer over the tank or sports bra, and for men a clean T-shirt with wide-leg pants. Train in the morning, then go straight to the office or to dinner.",
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
        a: "Sizes are still being finalised. They will be graded on Indian body measurements rather than a chart borrowed from another market.",
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
        q: "Are the sizes made for Indian bodies?",
        a: "Yes. Zaflick sizes are being graded on Indian body measurements rather than a chart borrowed from another market, so the fit at the waist, hips and chest matches how people here are actually built.",
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
        a: "Early-list members get free shipping on their launch order. Shipping for everyone else will be shared before launch.",
      },
      {
        id: "returns",
        q: "What is the returns policy?",
        a: "Returns and exchange terms will be published before the first sale, so you can read them before you buy anything.",
      },
      {
        id: "international",
        q: "Do you ship outside India?",
        a: "Not at launch. Zaflick ships within India to start. If you live abroad you can still join the early list to follow the samples and the launch, and members will be the first to hear if we start shipping further.",
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
        id: "club",
        q: "What is the 6am Club?",
        a: "Early-morning sessions for people who train before the day starts, in the kit they will wear for the rest of it. Register your interest on the 6am Club page and we will tell you when a session is planned in your city.",
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
        q: "Can my run club, studio or brand partner with Zaflick?",
        a: "Yes, we'd like to hear from you. Email marketing@zaflick.com or use the contact page with the name of your club, studio or brand, your city and what you have in mind. We reply to every message.",
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
