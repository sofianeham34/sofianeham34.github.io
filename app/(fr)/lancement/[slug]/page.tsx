import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Launcher } from "@/components/Launch";
import { getProject, projects } from "@/content/projects";
import { projectHref, type Lang } from "@/lib/i18n";

const lang: Lang = "fr";

export const dynamicParams = false;
export const generateStaticParams = () => projects.filter((p) => p.demo.kind === "live").map((p) => ({ slug: p.slug }));

export const metadata: Metadata = { title: "Chargement de l'application — Sofiane Hammar", robots: { index: false } };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p || p.demo.kind !== "live") notFound();
  return <Launcher url={p.demo.url} title={p.title[lang]} back={projectHref(lang, p.slug)} lang={lang} />;
}
