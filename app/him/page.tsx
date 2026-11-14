import Collection from "@/components/site/Collection";
import { pageMeta } from "@/lib/seo";
import { COLLECTIONS } from "@/lib/content/products";

export const metadata = pageMeta({
  title: "Men's athleisure sets, designed in India | Zaflick", // TODO-approve
  description: COLLECTIONS.him.description,
  path: "/him",
  image: "/assets/img/og-him.jpg",
});

export default function Page() {
  return <Collection g="him" />;
}
