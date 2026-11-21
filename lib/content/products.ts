/**
 * Drop 1 is five pieces (brand update, 15 Nov 2026): sports bra, active legging and fitted
 * jacket for her, the active T-shirt for him, and unisex wide-leg pants. The tank top and
 * shorts move to the next drop (March–April); their pages stay up, marked as next drop.
 * Product copy started word for word from the old zaflick.com (checked 14 Nov 2026).
 */

export type Gender = "her" | "him";

export type Product = {
  slug: string;
  name: string;
  gender: Gender;
  colour: string;
  /** Lead line on the product page. */
  lede: string;
  /** Meta description, also used in schema. */
  description: string;
  /** One plain line for the homepage list: what the piece is good for. TODO-approve. */
  goodFor: string;
  features: string[];
  /** Coming in the March–April drop, not Drop 1: hidden from collections, homepage and menus. */
  nextDrop?: true;
  /** Shown in both collections (the wide-leg pants). */
  unisex?: true;
  /** Model shot used on hover in grids. */
  model: string;
  /** Lifestyle shot, last in the gallery. */
  life: { img: string; alt: string };
  wearWith: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "tank-top",
    name: "Tank top",
    gender: "her",
    colour: "Aubergine",
    lede: "A fitted tank with built-in support, so it works on its own without a separate bra.",
    description:
      "A fitted tank with built-in support, so it works on its own without a separate bra. Shown in aubergine. Coming in the next Zaflick drop, March–April.",
    goodFor: "A fitted tank with built-in support.",
    nextDrop: true,
    features: [
      "Built-in support",
      "Longline hem that stays put under a shirt or jacket",
      "Square neckline and wide straps",
      "Curved side panels edged with fine piping",
    ],
    model: "m-her-set",
    life: { img: "hero-her-m", alt: "A woman in the aubergine tank and legging leaving a coffee shop." },
    wearWith: ["active-legging", "fitted-jacket"],
  },
  {
    slug: "active-legging",
    name: "Active legging",
    gender: "her",
    colour: "Aubergine",
    lede: "High-waisted and full length, with a deep side pocket that holds a phone.",
    description:
      "High-waisted, full-length legging with a deep side pocket that holds a phone. Shown in aubergine. Part of the first Zaflick drop.",
    goodFor: "High-waisted, with a pocket that holds your phone, from the walk to the café.",
    features: [
      "Deep side pocket on the thigh",
      "Wide, flat high-rise waistband",
      "Smooth front with no centre seam",
      "We are testing the fabric for see-through, pilling and shape",
    ],
    model: "m-her-set",
    life: { img: "day-her-home", alt: "The aubergine set worn at home, no layers." },
    wearWith: ["sports-bra", "fitted-jacket"],
  },
  {
    slug: "sports-bra",
    name: "Sports bra",
    gender: "her",
    colour: "Deep forest",
    lede: "Medium support for a game or a run, and clean enough to wear under an open jacket.",
    description:
      "Medium-support sports bra, clean enough to wear under an open jacket. Shown in deep forest. Part of the first Zaflick drop.",
    goodFor: "Medium support for the game, clean enough to wear under an open jacket after.",
    features: [
      "Medium support",
      "Wide straps and a wide, flat underband",
      "Scoop neck",
      "Curved side panels edged with fine piping",
    ],
    model: "m-bra",
    life: { img: "day-her-yoga", alt: "A woman in the deep forest sports bra and legging stretching in a studio." },
    wearWith: ["fitted-jacket", "active-legging"],
  },
  {
    slug: "fitted-jacket",
    name: "Fitted jacket",
    gender: "her",
    colour: "Deep forest",
    lede: "A fitted zip jacket cut to the waist, with a stand collar and thumbhole cuffs.",
    description:
      "A fitted zip jacket cut to the waist, with a stand collar and thumbhole cuffs. Shown in deep forest. Part of the first Zaflick drop.",
    goodFor: "Zip it up when the game is over and the plan moves to coffee.",
    features: [
      "Cut to the natural waist",
      "Stand collar and full front zip",
      "Thumbhole cuffs",
      "Curved panels that follow the body, edged with fine piping",
    ],
    model: "m-jacket",
    life: { img: "life-hotel", alt: "A woman in the deep forest jacket, sports bra and legging arriving at a small hotel." },
    wearWith: ["sports-bra", "active-legging"],
  },
  {
    slug: "active-tshirt",
    name: "Active T-shirt",
    gender: "him",
    colour: "Olive",
    lede: "A boxy, drop-shoulder tee with curved side panels.",
    description:
      "A boxy, drop-shoulder tee with curved side panels, made to match the wide-leg pants. Shown in olive. Part of the first Zaflick drop.",
    goodFor: "Boxy and relaxed, for a game in the evening and dinner after.",
    features: [
      "Relaxed, boxy fit with drop shoulders",
      "Ribbed crew neck",
      "Curved side panels edged with fine piping",
      "Made to match the wide-leg pants as a set",
    ],
    model: "m-him-set",
    life: { img: "hero-him-m", alt: "A man in the olive tee and wide-leg pants." },
    wearWith: ["wide-leg-pants"],
  },
  {
    slug: "wide-leg-pants",
    name: "Wide-leg pants",
    gender: "him",
    colour: "Olive",
    lede: "A relaxed wide leg with a drawcord waist and side pockets, for women and men.",
    description:
      "Unisex wide-leg pants with a drawcord waist and side pockets. Shown in olive. Part of the first Zaflick drop.",
    goodFor: "Unisex, with a drawcord waist and side pockets. Easy on a walk, fine at dinner.",
    unisex: true,
    features: [
      "Relaxed wide-leg cut, full length",
      "Elasticated waist with a metal-tipped drawcord",
      "Two side pockets and one back pocket",
      "Curved lower-leg panels edged with fine piping",
    ],
    model: "m-him-set",
    life: { img: "day-him-airport", alt: "A man in the olive set walking through an airport." },
    wearWith: ["active-tshirt", "fitted-jacket"],
  },
  {
    slug: "athleisure-shorts",
    name: "Athleisure shorts",
    gender: "him",
    colour: "Ivory",
    lede: "Above-knee shorts with a drawcord waist and a snap placket at the side hem.",
    description:
      "Above-knee shorts with a drawcord waist and a snap placket at the side hem. Shown in ivory. Coming in the next Zaflick drop, March–April.",
    goodFor: "Above-knee shorts with a drawcord waist.",
    nextDrop: true,
    features: [
      "Above-knee length",
      "Elasticated waist with a metal-tipped drawcord",
      "Snap placket at the side hem",
      "Side pockets and one back pocket",
    ],
    model: "m-shorts",
    life: { img: "life-veranda", alt: "A man in an ivory tee and shorts on a shaded veranda." },
    wearWith: ["active-tshirt", "wide-leg-pants"],
  },
];

export const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
/** The five pieces of Drop 1. */
export const DROP1 = PRODUCTS.filter((p) => !p.nextDrop);
/** Drop 1 pieces in a collection; the unisex pants are in both. */
export const forGender = (g: Gender) => DROP1.filter((p) => p.gender === g || p.unisex);

export const COLLECTIONS = {
  her: {
    title: "For her",
    lede: "Four pieces: a sports bra, a legging with a phone pocket, a fitted jacket and the unisex wide-leg pants. One outfit, whatever the plan.", // TODO-approve
    description:
      "Four pieces for her in the first Zaflick drop: a sports bra, a high-waisted legging with a deep side pocket, a fitted jacket and unisex wide-leg pants.",
    banner: { img: "banner-her", alt: "A woman in an aubergine tank and leggings with ivory piping, against a sunlit plaster wall." },
    crumb: "For her",
  },
  him: {
    title: "For him",
    lede: "Two pieces: a boxy active T-shirt and the unisex wide-leg pants, made to be worn as a set. One outfit, whatever the plan.", // TODO-approve
    description:
      "Two pieces for him in the first Zaflick drop: a boxy drop-shoulder active T-shirt and unisex wide-leg pants, made to be worn as a set.",
    banner: { img: "banner-him", alt: "A man in an olive tee and wide-leg pants with ivory piping, against a sunlit plaster wall." },
    crumb: "For him",
  },
} as const;
