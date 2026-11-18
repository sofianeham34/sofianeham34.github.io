import { Home } from "@/components/Home";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  lang: "en",
  title: "Sofiane Hammar — Backend developer, end-of-studies internship",
  description: site.description.en,
  path: "/en/",
  alt: "/",
});

export default function Page() {
  return <Home lang="en" />;
}
