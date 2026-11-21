import type { Gender } from "./products";

/** Looks from Drop 1, from the old zaflick.com/looks. The tank-top and shorts looks return with the next drop. */
export type Look = {
  id: string;
  gender: Gender;
  name: string;
  text: string;
  img: string;
  alt: string;
  pieces: string[];
};

export const LOOKS: Look[] = [
  {
    id: "her-layered",
    gender: "her",
    name: "Her layered set",
    text: "The fitted jacket over the sports bra, with the legging shown here in deep forest. Made for travel days and cooler rooms.",
    img: "life-hotel",
    alt: "A woman in a forest green jacket, sports bra and leggings arriving at a small hotel.",
    pieces: ["fitted-jacket", "sports-bra", "active-legging"],
  },
  {
    id: "him-all-day",
    gender: "him",
    name: "His all-day set",
    text: "The tee and the wide-leg pants as a matching set. It sits somewhere between a tracksuit and a pair of trousers.",
    img: "day-him-airport",
    alt: "A man in an olive tee and wide-leg pants walking through an airport.",
    pieces: ["active-tshirt", "wide-leg-pants"],
  },
];
