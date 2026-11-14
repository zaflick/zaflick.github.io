/**
 * The seven pieces of the first drop. Copy is word for word from zaflick.com
 * (product pages, collection pages and meta descriptions, checked 14 Nov 2026).
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
  features: string[];
  /** Model shot used on hover in grids. */
  model: string;
  /** Lifestyle shot, last in the gallery. */
  life: { img: string; alt: string };
  wearWith: [string, string];
};

export const PRODUCTS: Product[] = [
  {
    slug: "tank-top",
    name: "Tank top",
    gender: "her",
    colour: "Aubergine",
    lede: "A fitted tank with built-in support, so it works on its own without a separate bra.",
    description:
      "A fitted tank with built-in support, so it works on its own without a separate bra. Shown in aubergine. Part of the first Zaflick drop.",
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
    features: [
      "Deep side pocket on the thigh",
      "Wide, flat high-rise waistband",
      "Smooth front with no centre seam",
      "Fabric being tested for see-through and pilling before production",
    ],
    model: "m-her-set",
    life: { img: "day-her-home", alt: "The aubergine set worn at home, no layers." },
    wearWith: ["tank-top", "sports-bra"],
  },
  {
    slug: "sports-bra",
    name: "Sports bra",
    gender: "her",
    colour: "Deep forest",
    lede: "Medium support for training, and clean enough to wear under an open jacket.",
    description:
      "Medium-support sports bra, clean enough to wear under an open jacket. Shown in deep forest. Part of the first Zaflick drop.",
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
    features: [
      "Cut to the natural waist",
      "Stand collar and full front zip",
      "Thumbhole cuffs",
      "Curved panels that follow the body, edged with fine piping",
    ],
    model: "m-jacket",
    life: { img: "life-hotel", alt: "A woman in the deep forest jacket, sports bra and legging arriving at a small hotel." },
    wearWith: ["sports-bra", "tank-top"],
  },
  {
    slug: "active-tshirt",
    name: "Active T-shirt",
    gender: "him",
    colour: "Olive",
    lede: "A boxy, drop-shoulder tee with curved side panels.",
    description:
      "A boxy, drop-shoulder tee with curved side panels, made to match the wide-leg pants. Shown in olive. Part of the first Zaflick drop.",
    features: [
      "Relaxed, boxy fit with drop shoulders",
      "Ribbed crew neck",
      "Curved side panels edged with fine piping",
      "Made to match the wide-leg pants as a set",
    ],
    model: "m-him-set",
    life: { img: "hero-him-m", alt: "A man in the olive tee and wide-leg pants." },
    wearWith: ["wide-leg-pants", "athleisure-shorts"],
  },
  {
    slug: "wide-leg-pants",
    name: "Wide-leg pants",
    gender: "him",
    colour: "Olive",
    lede: "A relaxed wide leg with a drawcord waist and side pockets.",
    description:
      "A relaxed wide leg with a drawcord waist and side pockets. Shown in olive. Part of the first Zaflick drop.",
    features: [
      "Relaxed wide-leg cut, full length",
      "Elasticated waist with a metal-tipped drawcord",
      "Two side pockets and one back pocket",
      "Curved lower-leg panels edged with fine piping",
    ],
    model: "m-him-set",
    life: { img: "day-him-airport", alt: "A man in the olive set walking through an airport." },
    wearWith: ["active-tshirt", "athleisure-shorts"],
  },
  {
    slug: "athleisure-shorts",
    name: "Athleisure shorts",
    gender: "him",
    colour: "Ivory",
    lede: "Above-knee shorts with a drawcord waist and a snap placket at the side hem.",
    description:
      "Above-knee shorts with a drawcord waist and a snap placket at the side hem. Shown in ivory. Part of the first Zaflick drop.",
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
export const forGender = (g: Gender) => PRODUCTS.filter((p) => p.gender === g);

export const COLLECTIONS = {
  her: {
    title: "For her",
    lede: "Four pieces: a tank with built-in support, a legging with a pocket, a sports bra and a fitted jacket.",
    description:
      "Four pieces for her in the first Zaflick drop: a tank with built-in support, a legging with a deep side pocket, a sports bra and a fitted jacket.",
    banner: { img: "banner-her", alt: "A woman in an aubergine tank and leggings with ivory piping, against a sunlit plaster wall." },
    crumb: "For her",
  },
  him: {
    title: "For him",
    lede: "Three pieces: a boxy tee, wide-leg pants and shorts, made to be worn as sets.",
    description:
      "Three pieces for him in the first Zaflick drop: a boxy drop-shoulder tee, wide-leg pants and athleisure shorts, made to be worn as sets.",
    banner: { img: "banner-him", alt: "A man in an olive tee and wide-leg pants with ivory piping, against a sunlit plaster wall." },
    crumb: "For him",
  },
} as const;
