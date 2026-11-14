import type { Gender } from "./products";

/** The four looks, word for word from zaflick.com/looks. */
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
    id: "her-everyday",
    gender: "her",
    name: "Her everyday set",
    text: "The tank and the legging in one colour. Add an open shirt and it carries from the morning through a working lunch.",
    img: "day-her-cafe",
    alt: "A woman in an aubergine tank and leggings with an open striped shirt, working at a café table.",
    pieces: ["tank-top", "active-legging"],
  },
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
  {
    id: "him-weekend",
    gender: "him",
    name: "His weekend set",
    text: "The shorts with the T-shirt, shown here in ivory. An open linen shirt is all it needs.",
    img: "life-veranda",
    alt: "A man in an ivory tee and shorts on a shaded veranda.",
    pieces: ["athleisure-shorts", "active-tshirt"],
  },
];
