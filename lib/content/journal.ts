/**
 * Blog (served at /blog): question-led articles (AEO format: the question is the H1, a direct
 * 40–60-word answer comes first, then detail). All new copy: TODO-approve.
 * Zaflick product facts used here are only ones already published on zaflick.com.
 * 21 Nov: brand facts updated for the 15 Nov brand update (five pieces, the Circle, claims wording).
 */

import { IS_LIVE } from "@/lib/site";

export const TOPICS = ["Fit and sizing", "Fabric and weather", "Outfits", "Men"] as const;
export type Topic = (typeof TOPICS)[number];

export type Block = string | { list: string[] } | { steps: string[] };
export type Section = { h: string; body: Block[] };
export type Article = {
  slug: string;
  title: string;
  /** Short title for cards and the browser tab. */
  short: string;
  dek: string;
  answer: string;
  date: string;
  /** Last real content change (shown as "Updated …" and used for dateModified). */
  updated?: string;
  /** Blog topic, used for the filter chips on /blog. */
  topic: Topic;
  img: string;
  alt: string;
  sections: Section[];
  related: string[];
  cta?: { label: string; href: string };
  /** New post waiting for approval: shown in the local preview, left out of the live site. */
  draft?: boolean;
};

const POSTS: Article[] = [
  {
    slug: "weekend-plans-hyderabad-what-to-wear",
    title: "What should you wear for a weekend plan with friends in Hyderabad?",
    short: "Weekend plans in Hyderabad: what to wear",
    dek: "A morning walk at KBR Park, a game, a café in Banjara Hills, the lake at night. How to dress once for a Hyderabad weekend and not think about it again.",
    answer:
      "Wear one comfortable outfit that works for all of it: a breathable top or sports bra, a light jacket you can take off or zip up, relaxed wide-leg pants or a high-waisted legging, and clean sneakers. Hyderabad mornings from November to February are cool and afternoons warm, so a light layer matters more than anything else.",
    date: "2026-11-24",
    topic: "Outfits",
    img: "friends",
    alt: "Four friends in tonal sets talking around a table on a terrace café.",
    sections: [
      {
        h: "What do friends in Hyderabad actually do on a weekend?",
        body: [
          "Most weekends are a mix of a walk, a game and food, often in the same day.",
          {
            list: [
              "A morning walk at KBR National Park in Jubilee Hills, or along Necklace Road by Hussain Sagar.",
              "A game: badminton, pickleball or padel at a court near you, or a Sunday cricket match.",
              "A long breakfast or coffee in Banjara Hills or Jubilee Hills, or an evening at Lamakaan.",
              "The evening by Durgam Cheruvu, when the cable bridge is lit up.",
            ],
          },
        ],
      },
      {
        h: "How do you dress for a walk, a game and a café in one day?",
        body: [
          "Pick pieces that move with you and still look put together when you sit down.",
          {
            list: [
              "A breathable top or sports bra as the base.",
              "A light, fitted jacket you can zip up at the café and take off for the game.",
              "Wide-leg pants or a high-waisted legging with a pocket for your phone.",
              "Clean sneakers that work on a court and at a table.",
              "One or two colours, so it reads as an outfit and not as gym kit.",
            ],
          },
        ],
      },
      {
        h: "What does Hyderabad weather mean for your outfit?",
        body: [
          "From November to February, mornings are cool and afternoons warm and dry, so a light layer does most of the work. From March to June it gets very hot: choose loose, breathable fabric and plan outdoor time early or late. In the monsoon months, carry a light layer and shoes that don't mind a puddle.",
        ],
      },
      {
        h: "What should you carry for the day?",
        body: [{ list: ["Water", "A light layer", "Sunscreen", "A pocket or small bag for your phone and keys", "A spare T-shirt if the game runs long"] }],
      },
      {
        h: "Can one outfit really last the whole plan?",
        body: [
          "That's the idea behind Zaflick: whatever the plan, you're in. Our first drop is five pieces made to be worn from a walk to a game to dinner, with no changing in between. We're starting in Hyderabad and Bengaluru, and the Circle sees the real samples first.",
        ],
      },
    ],
    related: ["wide-leg-pants", "fitted-jacket"],
    cta: { label: "Join the Circle", href: "/circle" },
    draft: true,
  },
  {
    slug: "game-and-dinner-outfit-bengaluru",
    title: "What should you wear for a game and dinner after in Bengaluru?",
    short: "A game, then dinner: Bengaluru outfits",
    dek: "Badminton or pickleball after work, then dinner in Indiranagar. How to dress for both without going home to change.",
    answer:
      "Wear a breathable top, a relaxed or high-waisted bottom that lets you move, and clean sneakers, then add a light jacket when the game is over. Bengaluru evenings are mild and often cool, so a layer you can zip up covers dinner. Keep to one or two colours so the outfit still looks put together at the table.",
    date: "2026-11-26",
    topic: "Outfits",
    img: "hero-both",
    alt: "A man in an olive set and a woman in an aubergine set talking at a coffee bar.",
    sections: [
      {
        h: "Why is a game and then dinner such a common Bengaluru plan?",
        body: [
          "Courts are close to where people live and work, and the evenings are mild most of the year. So a lot of plans look the same: badminton, pickleball or football after work, then dinner nearby in Indiranagar, Koramangala or HSR Layout.",
        ],
      },
      {
        h: "What works for the game and still works at dinner?",
        body: [
          {
            list: [
              "A breathable T-shirt or sports bra that doesn't look like gym kit.",
              "Wide-leg pants or a high-waisted legging with a pocket for your phone.",
              "A fitted jacket to zip up when you sit down.",
              "Clean sneakers, not muddy court shoes. Keep a second pair in your bag if you can.",
              "Tonal colours: one colour top to bottom reads as an outfit.",
            ],
          },
        ],
      },
      {
        h: "How do you freshen up between the court and the table?",
        body: [
          {
            steps: [
              "Cool down for five minutes before you leave the court.",
              "Use a towel and deodorant from your bag.",
              "Swap the T-shirt if you've played hard.",
              "Zip up the jacket, and change shoes if you carried a pair.",
              "Go straight to dinner.",
            ],
          },
        ],
      },
      {
        h: "What about Bengaluru rain?",
        body: [
          "In the monsoon months, showers often arrive in the evening. Carry a light jacket, keep your phone in a zipped pocket or bag, and pick shoes that can handle a wet road.",
        ],
      },
      {
        h: "Can one outfit do both?",
        body: [
          "That's what Zaflick is making: whatever the plan, you're in. Our first drop is five pieces for a game, a walk or dinner with no changing in between. We're starting in Hyderabad and Bengaluru, and the Circle sees the real samples first.",
        ],
      },
    ],
    related: ["active-tshirt", "wide-leg-pants"],
    cta: { label: "Join the Circle", href: "/circle" },
    draft: true,
  },
  {
    slug: "how-to-check-leggings-see-through",
    title: "How do you check if leggings are see-through?",
    short: "How to check leggings aren't see-through",
    dek: "The squat test, the light test and what actually makes leggings go sheer, so you can check a pair before it lets you down.",
    answer:
      "Do the squat test: stand with your back to a mirror in bright daylight and squat deep. If you can see skin or the colour of your underwear, they're see-through. Thin fabric and leggings a size too small go sheer first, so check the fit as well as the fabric.",
    date: "2026-11-21",
    topic: "Fabric and weather",
    img: "day-her-yoga",
    alt: "A woman in the deep forest sports bra and legging stretching in a studio.",
    sections: [
      {
        h: "Why do leggings go see-through?",
        body: [
          "Stretch fabric is made of loops. When you bend, the loops open up, and light passes through the gaps. The thinner the fabric and the looser the knit, the more it opens.",
          {
            list: [
              "Thin or lightweight fabric shows through first.",
              "A size too small stretches the fabric further, so it thins out exactly where you bend.",
              "Light colours and bright, direct light make it more obvious.",
              "Washing hot, tumble-drying and fabric softener wear the fibres down over time.",
            ],
          },
        ],
      },
      {
        h: "How do you do the squat test?",
        body: [
          {
            steps: [
              "Put the leggings on with the underwear you'd normally train in.",
              "Stand with your back to a mirror in daylight or bright white light.",
              "Squat as deep as you would in a workout and hold it for a few seconds.",
              "Look at the seat, the back of the thighs and just under the waistband.",
              "Bend forward and touch your toes, then check again.",
              "For a stricter test, ask a friend to take a photo with the flash on.",
            ],
          },
        ],
      },
      {
        h: "What else should you check before you buy?",
        body: [
          {
            list: [
              "Weight: the fabric should feel substantial, not like a stocking.",
              "Finish: matte fabric hides more than shiny fabric.",
              "Gusset: a gusset panel at the crotch adds coverage and stops the seam pulling.",
              "Fit: choose your size by waist measurement and don't size down for a tighter look.",
            ],
          },
        ],
      },
      {
        h: "How do you stop them going sheer over time?",
        body: [
          "Wash them cold and inside out, skip fabric softener, and dry them in the shade instead of a dryer or direct sun. Heat and softener break down the stretch fibres that keep the fabric dense.",
        ],
      },
      {
        h: "What is Zaflick doing about it?",
        body: [
          "We are testing every Zaflick fabric for see-through and pilling before production. The Circle sees the real samples, and what the tests found, before anything goes on sale.",
        ],
      },
    ],
    related: ["active-legging", "sports-bra"],
    cta: { label: "See the active legging", href: "/active-legging" },
  },
  {
    slug: "travel-outfits-indian-flights-trains",
    title: "What should you wear for long flights and train journeys in India?",
    short: "Travel outfits for Indian flights and trains",
    dek: "Hot platforms, freezing AC coaches, security queues and arriving straight into plans. How to dress once for the whole journey.",
    answer:
      "Wear a soft, stretchy set with a waistband that doesn't dig in when you sit, and add a light layer for the cold cabin or AC coach. Choose shoes that slip on and off for security, and keep a spare top and socks in your bag. A matching set still looks put together when you land.",
    date: "2026-11-21",
    topic: "Outfits",
    img: "day-him-airport",
    alt: "A man in an olive T-shirt and wide-leg pants walking through an airport with a suitcase.",
    sections: [
      {
        h: "Why is travelling in India hard on an outfit?",
        body: [
          "A single journey can take you from a hot, humid platform or security queue into a cabin or AC coach that feels like winter, then out into the heat again. Add hours of sitting and you need clothes that breathe, stretch and layer.",
        ],
      },
      {
        h: "What should you wear on a flight?",
        body: [
          {
            list: [
              "A stretchy set with a wide waistband that stays comfortable sitting down.",
              "A light jacket or overshirt for the cabin. Take it off for the queue.",
              "Slip-on shoes, so security is quicker.",
              "Pockets that hold a phone and a boarding pass.",
              "Little metal: skip heavy belts and chunky jewellery.",
            ],
          },
        ],
      },
      {
        h: "What about overnight trains?",
        body: [
          {
            list: [
              "Something you can sleep in on a berth without it twisting or riding up.",
              "A warm layer and socks: 2AC and 3AC coaches run cold at night.",
              "A light scarf or shawl that doubles as a blanket.",
              "Keep valuables in a bag you can keep close, not in loose pockets.",
            ],
          },
        ],
      },
      {
        h: "What should be in your carry-on?",
        body: [{ list: ["A spare top and socks", "Deodorant and wipes", "A light jacket", "A phone charger", "A zip bag for anything damp"] }],
      },
      {
        h: "How do you look put together when you land?",
        body: [
          "Travel in a matching set in one tonal colour, so it reads as an outfit rather than pyjamas. When you land, add the overshirt, swap to clean sneakers and you can go straight to a meeting or a family dinner.",
        ],
      },
    ],
    related: ["wide-leg-pants", "fitted-jacket"],
    cta: { label: "See the wide-leg pants", href: "/wide-leg-pants" },
  },
  {
    slug: "gym-to-office-outfits-mumbai",
    title: "What should you wear for a gym-to-office day in Mumbai?",
    short: "Gym-to-office outfits for a Mumbai day",
    dek: "Humidity, a packed commute and an office cold enough to need a layer. How to dress once at 6am and still look put together at your 10am meeting.",
    answer:
      "Wear one tonal set built to train in, with real support, a waistband that stays put and fabric that dries quickly, then add a layer instead of changing. An open shirt or a light jacket covers the office and the air-conditioning, and a dry spare top in your bag handles the commute.",
    date: "2026-11-15",
    updated: "2026-11-21",
    topic: "Outfits",
    img: "day-her-cafe",
    alt: "A woman in an aubergine set and an open white shirt at a café table with a laptop and coffee.",
    sections: [
      {
        h: "Why is a gym-to-office day harder in Mumbai?",
        body: [
          "Mumbai is humid for most of the year, and the monsoon adds rain on top. You sweat on the way to the gym, during the session and again on the commute, then walk into an office where the air-conditioning is set for people in suits.",
          "So the outfit has three jobs: get through the workout, dry out on the way to work, and look finished at your desk.",
        ],
      },
      {
        h: "What should you train in?",
        body: [
          {
            list: [
              "Support that stays put: a sports bra, or a tank with built-in support.",
              "A wide, high-rise waistband that doesn't roll when you bend.",
              "Fabric chosen for heat and humidity, so it dries instead of staying damp.",
              "A darker tonal colour such as aubergine or deep forest, which shows sweat less than grey or pastels.",
            ],
          },
        ],
      },
      {
        h: "How do you turn it into office wear?",
        body: [
          "Don't change the set; change the layer. A crisp open shirt over a tank and legging reads as smart-casual, and a fitted jacket does the same job when the office is cold.",
          "Matching colours do most of the work. One colour from top to bottom looks like an outfit rather than gym kit. For men, the same rule works with a clean T-shirt and wide-leg pants in one colour and an overshirt for meetings.",
        ],
      },
      {
        h: "What about the monsoon?",
        body: [
          {
            list: [
              "Keep a spare top and socks in a zip bag so they stay dry.",
              "Wear quick-drying shoes, or carry a second pair for the office.",
              "Pick a layer that dries fast rather than a heavy cotton hoodie.",
              "Hang wet kit up as soon as you can. Leaving it rolled up in a bag is what makes it smell.",
            ],
          },
        ],
      },
      {
        h: "What should be in your bag?",
        body: [{ list: ["An open shirt or a light jacket", "A spare top and socks", "Deodorant and a small towel", "Office shoes, if your trainers won't pass", "A zip bag for anything damp"] }],
      },
      {
        h: "What does the day look like?",
        body: [
          {
            steps: [
              "6:00 am: train in the set.",
              "7:30 am: cool down, change your top if you need to, and put the shirt on.",
              "8:15 am: commute with the layer on or in your bag.",
              "10:00 am: walk into the meeting in the same set, shirt on, cleaner shoes.",
            ],
          },
        ],
      },
    ],
    related: ["active-legging", "fitted-jacket"],
    cta: { label: "See the looks", href: "/looks" },
  },
  {
    slug: "mens-athleisure-for-work-india",
    title: "Can men wear athleisure to work in India?",
    short: "Men's athleisure for work in India",
    dek: "Where the line is between smart-casual and gym kit, which pieces cross it well, and how to dress for the heat outside and the air-conditioning inside.",
    answer:
      "Yes, in most smart-casual offices, as long as it looks deliberate. Choose a structured T-shirt without big logos, straight or wide-leg pants with a clean waistband and clean sneakers, all in muted tonal colours. Add an overshirt or a light jacket for meetings and cold rooms, and save shorts for days at home.",
    date: "2026-11-15",
    updated: "2026-11-21",
    topic: "Men",
    img: "day-him-dinner",
    alt: "A man in an olive T-shirt and wide-leg pants with a light overshirt, walking past a lit café in the evening.",
    sections: [
      {
        h: "Where is the line between athleisure and gym kit?",
        body: [
          "Fit, fabric and finish. Athleisure that works at the office fits close without clinging, is matte rather than shiny, and has no oversized logos. If it looks like it belongs on a treadmill, it stays at the gym.",
          "Check your office first. Startups, creative teams and hybrid offices are usually relaxed; client-facing roles and formal workplaces may not be.",
        ],
      },
      {
        h: "Which pieces work best?",
        body: [
          {
            list: [
              "A structured T-shirt with a clean neckline that holds its shape.",
              "Straight or wide-leg pants with a flat waistband. Tuck the drawstring in.",
              "An overshirt or a light jacket to layer for meetings.",
              "Clean white or neutral sneakers, not your running shoes.",
            ],
          },
        ],
      },
      {
        h: "Which colours look most professional?",
        body: [
          "Muted, tonal colours: olive, navy, charcoal, black and ivory. A T-shirt and pants in the same colour look intentional, and an overshirt in a contrasting neutral adds structure.",
        ],
      },
      {
        h: "How do you handle the heat and the AC?",
        body: [
          "Most Indian workdays mean a commute through heat and humidity, then a cold office. Breathable fabric that dries quickly handles the first; a light layer you can take on and off handles the second.",
          "Avoid heavy cotton joggers and hoodies. They stay damp and look slouchy by midday.",
        ],
      },
      {
        h: "What should you avoid?",
        body: [{ list: ["Shiny technical fabrics and big logos", "Anything faded, pilled or stretched out", "Shorts, unless your office is genuinely relaxed", "Running shoes that have seen a lot of mud"] }],
      },
      {
        h: "What's the quick formula?",
        body: [{ steps: ["A T-shirt and pants in one colour.", "An overshirt or a light jacket on top.", "Clean sneakers.", "One accessory: a watch or a simple bag."] }],
      },
    ],
    related: ["active-tshirt", "wide-leg-pants"],
    cta: { label: "See the pieces for him", href: "/him" },
  },
  {
    slug: "leggings-that-dont-roll-down",
    title: "How do you stop leggings rolling down?",
    short: "Leggings that don't roll down",
    dek: "Why waistbands fold over when you bend, and what to look for so yours stays put from the first squat to the last meeting.",
    answer:
      "Leggings roll down when the waistband is too narrow, too soft or the wrong size, so it folds over as you bend. Look for a wide, flat, high-rise waistband that sits at your natural waist, choose your size by waist measurement rather than sizing up, and pick fabric that springs back after a squat.",
    date: "2026-11-14",
    updated: "2026-11-21",
    topic: "Fit and sizing",
    img: "day-her-gym",
    alt: "A woman in an aubergine set training with a dumbbell.",
    sections: [
      {
        h: "Why do waistbands roll?",
        body: [
          "Every time you bend, the fabric at your stomach has to go somewhere. A narrow band concentrates that pressure into one thin line, and the easiest thing for it to do is fold over. Once it has folded once, it keeps folding.",
          "Three things make it worse: a band that is soft and thin, so it has no structure; fabric with poor recovery, so it stretches and doesn't come back; and a size that is slightly too big at the waist, which is common when people size up for comfort around the hips.",
        ],
      },
      {
        h: "What should you look for in a waistband?",
        body: [
          {
            list: [
              "Width. A wide band spreads pressure over a larger area instead of a single line.",
              "Height. A high rise that sits at your natural waist anchors on the narrowest part of your body, so it has less room to slide.",
              "Flat construction. A flat, smooth band lies against the body. A thick elastic channel can roll over itself.",
              "The right waist size. Choose by your waist measurement. If you are between sizes, check the hip measurement too before sizing up.",
              "Recovery. The fabric should snap back when you stretch it. If it stays stretched in the shop, it will stay stretched on you.",
            ],
          },
        ],
      },
      {
        h: "How can you test a pair before you commit?",
        body: [
          {
            steps: [
              "Do three deep squats in front of a mirror and check the waistband from the side.",
              "Bend forward and reach for your toes. The band should stay flat across your stomach.",
              "Sit down for ten minutes. A band that digs in now will roll later.",
              "Put your phone in the pocket and walk. A heavy pocket on a weak waistband pulls it down.",
            ],
          },
        ],
      },
      {
        h: "How is the Zaflick legging designed?",
        body: [
          "The Zaflick active legging is built around a wide, flat high-rise waistband, a smooth front with no centre seam, and a deep side pocket on the thigh that holds a phone. We are testing the fabric for see-through and pilling before production.",
          "It is a concept for now. People in the Circle see the real samples, and can try the squat test themselves, before anything goes on sale.",
        ],
      },
    ],
    related: ["active-legging", "sports-bra"],
  },
  {
    slug: "athleisure-for-indian-humidity",
    title: "What should you wear to train in Indian humidity?",
    short: "Athleisure for Indian humidity",
    dek: "Sweat doesn't dry the same way in Mumbai in July as it does in a gym brochure. How to choose fabric, fit and colour for humid weather.",
    answer:
      "In humid weather, choose fabric made to move sweat away from your skin and dry quickly, a fit close enough not to rub but not so tight it traps heat, and mid or deep colours that don't show sweat marks. Keep heavy cotton for after training: it soaks up sweat and stays wet.",
    date: "2026-11-14",
    updated: "2026-11-21",
    topic: "Fabric and weather",
    img: "training-both-2",
    alt: "A man and a woman walking through a park after a workout.",
    sections: [
      {
        h: "Why is humidity harder than heat?",
        body: [
          "Sweat cools you by evaporating. When the air is already full of moisture, it evaporates slowly, so you sweat more and your clothes stay damp for longer. A top that feels fine on a dry 35° day can feel heavy and clingy on a humid 30° one.",
          "That's why kit made for cooler, drier places often feels wrong here. The fabric and the fit have to cope with sweat that doesn't go away.",
        ],
      },
      {
        h: "Which fabrics work best?",
        body: [
          "Look for fabric described as quick-drying or sweat-wicking, usually a synthetic blend with some stretch. It pulls sweat off your skin and spreads it out so it dries faster.",
          "Cotton is comfortable at rest but absorbs sweat and holds on to it, which is why a cotton tee gets heavy halfway through a run. Wear it after you train, not during.",
          "Check the weight too. In humid months a lighter fabric is easier to live in, as long as it isn't so thin that it turns see-through when it stretches.",
        ],
      },
      {
        h: "What about fit?",
        body: [
          {
            list: [
              "Close, not tight. Fabric that touches the skin can wick sweat; fabric squeezed onto it traps heat.",
              "Watch the rub points: inner thighs, underarms and under the bra band. Flat seams and a smooth front help.",
              "For him, a relaxed tee with drop shoulders lets air move. A boxy fit is cooler than a compression top for anything except hard training.",
            ],
          },
        ],
      },
      {
        h: "Does colour matter?",
        body: [
          "Yes. Deep and mid tones such as aubergine, forest green and olive hide sweat marks far better than light grey. If you are going straight from training to the rest of your day, that matters more than anything on the label.",
        ],
      },
      {
        h: "How does Zaflick approach it?",
        body: [
          "Before designing, we surveyed nearly 200 people and interviewed more than a dozen about what goes wrong with activewear in India. Heat and humidity came up again and again. The fabric for the first drop was chosen for heat and humidity, and is being tested for see-through and pilling before production.",
        ],
      },
    ],
    related: ["active-tshirt", "sports-bra"],
  },
  {
    slug: "one-set-6am-to-dinner",
    title: "Can you wear one athleisure set from a 6am workout to dinner?",
    short: "6am to dinner in one set",
    dek: "How to choose one set that carries a long day, from an early session to dinner, and what to change along the way.",
    answer:
      "Yes, if the set is built to train in first and cut to look finished. Choose pieces with real support, a waistband that stays put and fabric that dries quickly, in one tonal colour. Then change the layer, not the set: an open shirt for work, a jacket for travel, cleaner shoes for dinner.",
    date: "2026-11-14",
    updated: "2026-11-21",
    topic: "Outfits",
    img: "hero-both",
    alt: "A man in an olive set and a woman in an aubergine set talking at a coffee bar.",
    sections: [
      {
        h: "Why start with training?",
        body: [
          "If the set can't handle the 6am session, nothing else matters. Support that stays put, a waistband that doesn't roll and fabric that dries are the foundation. Everything after that is styling.",
        ],
      },
      {
        h: "Why does a matching set look more finished?",
        body: [
          "One colour from top to bottom reads as an outfit, not as gym kit. A sports bra and legging in the same colour under a fitted jacket, or a tee and wide-leg pants in the same olive, looks deliberate in a café in a way that mismatched training clothes don't.",
        ],
      },
      {
        h: "What should you change through the day?",
        body: [
          {
            list: [
              "Morning to work: add an open shirt over the tank or tee.",
              "Travel or air-conditioned rooms: add a light jacket.",
              "Evening: swap the training shoes for clean sneakers or sandals.",
              "Keep the set the same. That's the point.",
            ],
          },
        ],
      },
      {
        h: "What should you pack for a long day?",
        body: [
          { list: ["A spare top if you train hard", "Deodorant and a small towel", "A light layer for cold rooms", "A second pair of shoes if you're going out"] },
        ],
      },
    ],
    related: ["active-legging", "wide-leg-pants"],
    cta: { label: "See the looks", href: "/looks" },
  },
  {
    slug: "size-guide-for-indian-bodies",
    title: "How should you choose athleisure sizes for Indian bodies?",
    short: "A size guide for Indian bodies",
    dek: "Why the same letter size fits differently from brand to brand, how to measure yourself properly, and how to choose when you're between sizes.",
    answer:
      "Many size charts are graded on measurements from other markets, so an M can fit very differently from one brand to the next. Measure your bust or chest, underbust, waist, hips and inseam with a soft tape, compare the numbers to each brand's own chart instead of your usual letter, and choose bottoms by waist.",
    date: "2026-11-14",
    updated: "2026-11-21",
    topic: "Fit and sizing",
    img: "banner-her",
    alt: "A woman in an aubergine tank and leggings with ivory piping, against a sunlit plaster wall.",
    sections: [
      {
        h: "Why don't letter sizes travel?",
        body: [
          "A size chart is a set of assumptions about how bodies are proportioned: how waist relates to hip, how long a leg is for a given height. If those assumptions come from another market, the sizes can be right in one place and wrong in another, often at the waist, the hip or the length.",
          "That's why Zaflick's sizing is built on Indian measurements rather than a chart borrowed from another market.",
        ],
      },
      {
        h: "How do you measure yourself?",
        body: [
          "Use a soft tape, wear thin clothing, and keep the tape level and snug, not tight.",
          {
            steps: [
              "Bust or chest: around the fullest part, under the arms.",
              "Underbust: straight around, just below the bust. This is the number for sports bras.",
              "Waist: around the narrowest part, usually just above the belly button.",
              "Hips: around the fullest part of the hips and seat, feet together.",
              "Inseam: from the top of the inner thigh to where you want the hem, standing straight.",
            ],
          },
        ],
      },
      {
        h: "What if you're between sizes?",
        body: [
          {
            list: [
              "Leggings: go by waist first, then check the hip. If the hip is the bigger number, size for the hip.",
              "Sports bras: go by underband. The band does most of the supporting.",
              "Tees: check whether the style is meant to be fitted or boxy before sizing up or down.",
              "Wide-leg pants and shorts: a drawcord waist gives some room, so size for the hip.",
            ],
          },
        ],
      },
      {
        h: "When is the Zaflick size chart published?",
        body: [
          "With the real samples. Sizes are still being finalised, and the Circle will see the chart before anything goes on sale. Take your measurements now and you'll be ready.",
        ],
      },
    ],
    related: ["active-legging", "sports-bra"],
    cta: { label: "Open the size guide", href: "/size-guide" },
  },
  {
    slug: "phone-pockets-that-work",
    title: "Do leggings with phone pockets actually work?",
    short: "Phone pockets that actually work",
    dek: "Most pockets on activewear are too small, too loose or in the wrong place. What makes one that holds a phone through a whole day.",
    answer:
      "They work when the pocket sits on the side of the thigh, is deep enough to take the whole phone, and is made from stretch fabric that holds it flat against the leg. Shallow pockets and pockets at the back of the waistband are the ones where phones bounce, drag or slide out.",
    date: "2026-11-14",
    updated: "2026-11-21",
    topic: "Outfits",
    img: "p-active-legging-detail",
    alt: "A close-up of the active legging, concept image.",
    sections: [
      {
        h: "Where should the pocket be?",
        body: [
          "On the side of the thigh. The thigh is a broad, flat surface that moves less than the hip or lower back, so a phone stays put there. A back waistband pocket puts the weight on the waistband, which is one of the reasons waistbands get pulled down.",
        ],
      },
      {
        h: "How deep is deep enough?",
        body: [
          "The whole phone should disappear into it, with the top edge of the pocket above the top of the phone. If the top of the phone sticks out, it will work its way out when you sit, squat or run.",
        ],
      },
      {
        h: "What holds the phone in place?",
        body: [
          "Tension. A pocket made from the same stretch fabric as the leg presses the phone flat against you. A loose patch pocket lets it swing. Check a pocket by running on the spot for thirty seconds with your phone in it.",
        ],
      },
      {
        h: "What about pockets for him?",
        body: [
          "Shorts and pants for everyday wear work best with proper side pockets and a back pocket. Zaflick's wide-leg pants have two side pockets and one back pocket, and the athleisure shorts, coming in the next drop, have side pockets and one back pocket.",
        ],
      },
      {
        h: "How is the Zaflick legging pocket designed?",
        body: [
          "The active legging has a deep side pocket on the thigh that holds a phone, paired with a wide, flat high-rise waistband so the weight doesn't drag it down. It's a concept until the samples arrive, and the Circle sees them first.",
        ],
      },
    ],
    related: ["active-legging", "wide-leg-pants"],
  },
  {
    slug: "athleisure-for-wedding-season",
    title: "What athleisure works for wedding season in India?",
    short: "Athleisure for wedding season",
    dek: "It won't replace the lehenga or the sherwani, but it carries everything around them: the flights, the 6am sessions, the hours of getting ready.",
    answer:
      "Athleisure won't replace the outfits, but it carries everything around them: early flights and long drives, a morning workout to keep your routine, rehearsals and the long hours of getting ready. Pack a matching set that looks put together, a layer for cold venues and travel, and pieces you can sit in for hours.",
    date: "2026-11-14",
    updated: "2026-11-21",
    topic: "Outfits",
    img: "life-hotel",
    alt: "A woman in a forest green jacket, sports bra and leggings arriving at a small hotel.",
    sections: [
      {
        h: "What should you wear on travel days?",
        body: [
          "A matching set you can sit in for hours and still walk into a hotel lobby in. For him, a tee and wide-leg pants in one colour sits somewhere between a tracksuit and a pair of trousers. For her, a fitted jacket over a sports bra and legging works for flights and cold rooms.",
        ],
      },
      {
        h: "How do you keep your routine through a week of functions?",
        body: [
          "Train early, before the day takes over. A short session at 6am is often the only time that's yours during a wedding week. Wear a set that can go straight from the workout to breakfast with the family.",
        ],
      },
      {
        h: "What should you wear while getting ready?",
        body: [
          "Anything with a front zip or an open front, so you never pull something over hair and make-up. A zip jacket over a bra or tank is easy to slip out of when it's time to change.",
        ],
      },
      {
        h: "What about sangeet rehearsals?",
        body: [
          "You'll be dancing for hours, often in a hot room. Wear a supportive bra or a tank with built-in support, leggings with a waistband that stays put, and fabric that copes with sweat.",
        ],
      },
      {
        h: "What's the wedding-season packing list?",
        body: [
          {
            list: [
              "One matching set for travel days",
              "A layer for air-conditioned venues",
              "Training kit for early sessions",
              "Something with a front zip for getting-ready hours",
              "Clean sneakers that work with all of it",
            ],
          },
        ],
      },
    ],
    related: ["fitted-jacket", "active-tshirt"],
  },
];

export const ARTICLES = POSTS.filter((a) => !a.draft || !IS_LIVE);

export const article = (slug: string) => ARTICLES.find((a) => a.slug === slug);

export const readMins = (a: Article) => {
  const words = [a.answer, ...a.sections.flatMap((s) => s.body.map((b) => (typeof b === "string" ? b : "list" in b ? b.list.join(" ") : b.steps.join(" "))))]
    .join(" ")
    .split(/\s+/).length;
  return Math.max(2, Math.round(words / 220));
};
