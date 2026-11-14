/** zaflick.com/the-day: times, captions and photos, word for word. */
export type Moment = { m: number; t: string; title: string; img: string; alt: string };

export const HER_DAY: Moment[] = [
  { m: 390, t: "6:30 am", title: "Studio session", img: "day-her-gym", alt: "A woman in an aubergine set training with a dumbbell." },
  { m: 495, t: "8:15 am", title: "The coffee run", img: "hero-her-m", alt: "A woman in an aubergine set leaving a coffee shop." },
  { m: 690, t: "11:30 am", title: "Working from a café", img: "day-her-cafe", alt: "The same set with an open striped shirt at a café table." },
  { m: 1150, t: "7:10 pm", title: "Evening stretch", img: "day-her-yoga", alt: "A woman in a forest green bra and leggings stretching in a studio." },
  { m: 540, t: "Sunday, 9:00 am", title: "At home", img: "day-her-home", alt: "The same set at home, no layers." },
];

export const HIS_DAY: Moment[] = [
  { m: 360, t: "6:00 am", title: "A run in the park", img: "day-him-run", alt: "A man in an olive tee and shorts pausing mid-run in a park." },
  { m: 400, t: "6:40 am", title: "An early flight", img: "day-him-airport", alt: "A man in an olive set in an airport." },
  { m: 600, t: "10:00 am", title: "Coffee with a friend", img: "hero-both-m", alt: "The same set at a coffee bar." },
  { m: 1230, t: "8:30 pm", title: "Dinner nearby", img: "day-him-dinner", alt: "The same set with a light jacket at dusk." },
];
