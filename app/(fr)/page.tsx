import { Home } from "@/components/Home";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  lang: "fr",
  title: "Sofiane Hammar — Développeur backend, stage de fin d'études",
  description: site.description.fr,
  path: "/",
  alt: "/en/",
});

export default function Page() {
  return <Home lang="fr" />;
}
