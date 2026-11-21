/**
 * Weekend plans with friends, by city (pages /plans, /plans/hyderabad, /plans/bengaluru).
 * DRAFT: all copy is new and TODO-approve. Places are well-known public spots only; no prices,
 * timings or events that can go out of date. Outfits use only Drop 1 pieces and facts already
 * on zaflick.com (no claims on hold).
 */

export type Wear = { her: string[]; him: string[] };
export type Plan = {
  id: string;
  title: string;
  where: string;
  text: string;
  wear: Wear;
  tip: string;
};
export type City = {
  slug: "hyderabad" | "bengaluru";
  name: string;
  title: string;
  description: string;
  lede: string;
  weather: string;
  /** Blog post with the outfit detail for this city (linked only if it is published). */
  post: string;
  plans: Plan[];
};

// Drop 1 outfits. Slugs match lib/content/products.ts.
const HER_LAYERED = ["sports-bra", "active-legging", "fitted-jacket"];
const HER_PANTS = ["sports-bra", "wide-leg-pants", "fitted-jacket"];
const HIM_SET = ["active-tshirt", "wide-leg-pants"];

export const CITIES: City[] = [
  {
    slug: "hyderabad",
    name: "Hyderabad",
    title: "Weekend plans with friends in Hyderabad",
    description:
      "Six weekend plans with friends in Hyderabad, from a morning walk at KBR Park to sunset at Golconda Fort, and one outfit that works for all of them.",
    lede: "A walk, a game, a fort at sunset, chai in the Old City. Six plans for this weekend, and one outfit for all of them.",
    weather:
      "From November to February, Hyderabad mornings are cool and afternoons warm and dry, so a light layer does most of the work.",
    post: "weekend-plans-hyderabad-what-to-wear",
    plans: [
      {
        id: "kbr",
        title: "A morning walk at KBR Park",
        where: "KBR National Park, Jubilee Hills",
        text: "A track runs around the edge of the park, under the trees. Walk a lap or two, talk the whole way, and go for breakfast after.",
        wear: { her: HER_LAYERED, him: HIM_SET },
        tip: "Go early. It gets busy and warm by mid-morning at weekends.",
      },
      {
        id: "game",
        title: "A game, then a long breakfast",
        where: "A badminton, pickleball or padel court near you",
        text: "Book a court for an hour, play doubles, then take the conversation to breakfast in Jubilee Hills or Banjara Hills.",
        wear: { her: HER_LAYERED, him: HIM_SET },
        tip: "Zip up the jacket when you sit down. Court sweat and café air-conditioning don't mix.",
      },
      {
        id: "golconda",
        title: "Sunset at Golconda Fort",
        where: "Golconda Fort, west Hyderabad",
        text: "Climb to the top in the late afternoon for the view over the city, then stay on for the evening light show.",
        wear: { her: HER_PANTS, him: HIM_SET },
        tip: "There are a lot of steps. Wear shoes with grip and keep your phone in a pocket, not your hand.",
      },
      {
        id: "old-city",
        title: "A food walk in the Old City",
        where: "Charminar and Laad Bazaar",
        text: "Start at Charminar, walk through Laad Bazaar, and stop for Irani chai and Osmania biscuits along the way.",
        wear: { her: HER_PANTS, him: HIM_SET },
        tip: "Streets are crowded. Keep your hands free and your phone in a deep pocket.",
      },
      {
        id: "durgam",
        title: "An evening by Durgam Cheruvu",
        where: "Durgam Cheruvu, near Madhapur",
        text: "Walk across the cable bridge after dark, when it's lit up, then find dinner nearby.",
        wear: { her: HER_LAYERED, him: HIM_SET },
        tip: "Evenings by the lake can be breezy. Bring the jacket.",
      },
      {
        id: "shilparamam",
        title: "An afternoon at Shilparamam",
        where: "Shilparamam crafts village, Madhapur",
        text: "Wander the craft stalls and food counters, pick up something handmade, and stay for whatever's on that evening.",
        wear: { her: HER_PANTS, him: HIM_SET },
        tip: "It's a lot of walking on open ground. Go after the midday heat.",
      },
    ],
  },
  {
    slug: "bengaluru",
    name: "Bengaluru",
    title: "Weekend plans with friends in Bengaluru",
    description:
      "Six weekend plans with friends in Bengaluru, from sunrise at Nandi Hills to a board-game café in Indiranagar, and one outfit that works for all of them.",
    lede: "Sunrise at Nandi Hills, a walk in Cubbon Park, a game and dinner after. Six plans for this weekend, and one outfit for all of them.",
    weather: "Bengaluru is mild most of the year, with cool mornings and evenings, so a light layer covers most plans.",
    post: "game-and-dinner-outfit-bengaluru",
    plans: [
      {
        id: "nandi",
        title: "Sunrise at Nandi Hills",
        where: "Nandi Hills, about 60 km north of the city",
        text: "Leave before dawn, watch the sun come up over the clouds, and stop for breakfast on the way back.",
        wear: { her: HER_LAYERED, him: HIM_SET },
        tip: "It's cold at the top before sunrise. The jacket earns its place here.",
      },
      {
        id: "cubbon",
        title: "A morning walk in Cubbon Park",
        where: "Cubbon Park, central Bengaluru",
        text: "Shaded paths right in the middle of the city. Walk, sit on the grass, then go for coffee nearby.",
        wear: { her: HER_LAYERED, him: HIM_SET },
        tip: "Mornings are the best time, before the city gets going.",
      },
      {
        id: "game",
        title: "A game after work, then dinner",
        where: "A court near you, then Indiranagar or Koramangala",
        text: "Badminton, pickleball or a game of football, then straight to dinner without going home to change.",
        wear: { her: HER_LAYERED, him: HIM_SET },
        tip: "Keep a spare T-shirt and clean sneakers in your bag for the table.",
      },
      {
        id: "lalbagh",
        title: "Lalbagh, then breakfast in Basavanagudi",
        where: "Lalbagh Botanical Garden",
        text: "Walk past the glass house and around the lake, then head to Basavanagudi next door for a South Indian breakfast.",
        wear: { her: HER_PANTS, him: HIM_SET },
        tip: "Breakfast places nearby get queues at weekends. Go early or go hungry.",
      },
      {
        id: "board-games",
        title: "A board-game café evening",
        where: "Indiranagar, Koramangala or HSR Layout",
        text: "Pick a café with a game library, order too much food, and play until someone sulks.",
        wear: { her: HER_PANTS, him: HIM_SET },
        tip: "You'll be sitting for hours. Choose a waistband you forget about.",
      },
      {
        id: "church-street",
        title: "A café crawl on Church Street",
        where: "Church Street, off MG Road",
        text: "Cafés, bookshops and a lot of walking between them. Make it a slow afternoon.",
        wear: { her: HER_PANTS, him: HIM_SET },
        tip: "Evening showers are common in the monsoon months. Bring the jacket.",
      },
    ],
  },
];

export const city = (slug: string) => CITIES.find((c) => c.slug === slug);
