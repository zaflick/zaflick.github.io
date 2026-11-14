import ScrollRoot from "@/components/ScrollRoot";
import StoryCanvas from "@/components/three/StoryCanvas";
import Hero from "@/components/story/Hero";
import Statement from "@/components/story/Statement";
import CutStitch from "@/components/story/CutStitch";
import WearReveal from "@/components/story/WearReveal";
import DayTimeline from "@/components/story/DayTimeline";
import SplitHerHim from "@/components/story/SplitHerHim";
import StatStack from "@/components/story/StatStack";
import StoryJoin from "@/components/story/StoryJoin";
import { JsonLd } from "@/components/site/bits";
import { pageMeta, orgSchema, websiteSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Zaflick: athleisure you can wear all day, designed in India", // TODO-approve
  description:
    "Seven pieces of athleisure for women and men, designed in India to be worn from morning to dinner. The first drop opens to the early list first.",
  path: "/",
});

export default function Page() {
  return (
    <>
      <StoryCanvas />
      <main id="content" className="story">
        <Hero />
        <Statement />
        <CutStitch />
        <WearReveal />
        <DayTimeline />
        <SplitHerHim />
        <StatStack />
        <StoryJoin />
      </main>
      <ScrollRoot />
      <JsonLd data={[orgSchema(), websiteSchema()]} />
    </>
  );
}
