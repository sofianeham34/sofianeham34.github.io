import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/ProjectPage";
import { getProject, projects } from "@/content/projects";
import { projectHref, type Lang } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";

const lang: Lang = "fr";

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) return {};
  return pageMeta({
    lang,
    title: `${p.title[lang]} — Sofiane Hammar`,
    description: p.tagline[lang],
    path: projectHref(lang, p.slug),
    alt: projectHref(lang === "fr" ? "en" : "fr", p.slug),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  return <ProjectPage project={p} lang={lang} />;
}
