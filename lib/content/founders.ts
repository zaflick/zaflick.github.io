/**
 * The founders: one source for the homepage "Who we are" note, the About page and the schema.
 * From Rahul's message of 27 Nov 2026 (bios and photos); cheeky story version asked for by
 * Ayushi the same day. Rules: no titles, British spelling, no "tribe" or fitness talk.
 *
 * Guesses: any line marked `guess: true` is ours, not the founders': the live build leaves it out
 * and the prototype highlights it. 27 Nov 2026: Ayushi confirmed the origin line (2025, "dressed
 * for the wrong half") and "one more photo", and cut "spreadsheets for fun". Blog posts stay
 * credited to Zaflick, not a founder, and only the two founders are named (Ayushi, 27 Nov).
 *
 * Photos: shown as a pair and never captioned one by one. Who is in which photo isn't confirmed,
 * so nothing on the site may tie a face to a name (including schema `image`).
 */

/** One sentence (or a few) of story text. */
export type Line = { t: string; guess?: boolean };

export type Founder = {
  id: string;
  name: string;
  first: string;
  /** First person, built on their own words. */
  bio: Line[];
  /** Plain fact, third person: schema description. */
  summary: string;
  knowsAbout: string[];
  alumniOf?: string;
};

export const FOUNDERS: Founder[] = [
  {
    id: "rahul-raja-dunna",
    name: "Rahul Raja Dunna",
    first: "Rahul",
    bio: [
      { t: "I'm Rahul, from Visakhapatnam, and the first person in my family to go into business. No pressure." },
      {
        t: "I studied computer science, did an MBA at IIM Amritsar, and built a background in data science, with detours through sales, political strategy and product development.",
      },
      { t: "Marketing and sales are the fun part for me, and if there's a new AI tool out, I've probably tried it: I use them every day to work better." },
    ],
    summary:
      "Founder of Zaflick, from Visakhapatnam, and the first person in his family to go into business. Studied computer science and did an MBA at IIM Amritsar; background in data science, with work in sales, political strategy and product development.",
    knowsAbout: ["Data science", "Marketing", "Sales", "Product development"],
    alumniOf: "Indian Institute of Management Amritsar",
  },
  {
    id: "hemanth-kumar-jami",
    name: "Hemanth Kumar Jami",
    first: "Hemanth",
    bio: [
      { t: "I'm Hemanth, also from Visakhapatnam: a traveller and a creative professional." },
      {
        t: "After graduating in computer science engineering, I followed my passion and built a background in photography, capturing weddings and wildlife (both involve a lot of waiting for the perfect moment).",
      },
      { t: "In my free time, I'm out exploring diverse cultures." },
      { t: "I'm also the one who makes everyone stop for one more photo." },
    ],
    summary:
      "Founder of Zaflick, from Visakhapatnam. Graduated in computer science engineering; a traveller and creative professional with a background in photography, capturing weddings and wildlife.",
    knowsAbout: ["Photography", "Travel"],
  },
];

/** The why and the when (confirmed by Ayushi for the founders, 27 Nov 2026; used on both pages). */
const ORIGIN =
  "after one plan too many where one of us turned up dressed for the wrong half: gym clothes at dinner, jeans at the game.";

/** Homepage section 6, "Who we are": a short note from both founders (brief: four or five lines). */
export const FOUNDERS_NOTE = {
  title: "Hi, we're Rahul and Hemanth.",
  text: [
    { t: "Two computer science grads from Vizag who went very different ways." },
    {
      t: "Rahul went into numbers: data science, sales, political strategy and product, an MBA from IIM Amritsar, and the first business in his family.",
    },
    { t: "Hemanth went behind the camera, shooting weddings and wildlife, and spends his free time travelling and exploring diverse cultures." },
    { t: `It started in 2025, ${ORIGIN}` },
    { t: "Before designing a single stitch, we asked nearly 200 people what their activewear gets wrong." },
    { t: "Now we're making clothes for the plans you make with friends." },
  ] as Line[],
  sign: "Rahul and Hemanth, founders of Zaflick",
};

/** About page: the headline and the story above the two bios.  : a surname never starts a line on its own. */
export const FOUNDERS_HEADLINE = "Two computer science grads walk into a clothing brand.";
export const FOUNDERS_STORY: Line[] = [
  { t: "We're Rahul Raja Dunna and Hemanth Kumar Jami. Same city (Visakhapatnam), same degree, wildly different exits." },
  { t: `Zaflick started in 2025, ${ORIGIN} We figured we couldn't be the only ones.` },
  { t: "Before designing a single stitch, we asked around. The numbers are just below." },
];

/** The photo pair (public/assets/img). Not named per person on purpose: see the note above. */
export const FOUNDER_PHOTOS = ["founders-1", "founders-2"] as const;
export const FOUNDER_PHOTOS_ALT = "Zaflick's founders, Rahul Raja Dunna and Hemanth Kumar Jami";
