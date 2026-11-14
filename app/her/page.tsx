import Collection from "@/components/site/Collection";
import { pageMeta } from "@/lib/seo";
import { COLLECTIONS } from "@/lib/content/products";

export const metadata = pageMeta({
  title: "Women's athleisure sets, designed in India | Zaflick", // TODO-approve
  description: COLLECTIONS.her.description,
  path: "/her",
  image: "/assets/img/og-her.jpg",
});

export default function Page() {
  return <Collection g="her" />;
}
