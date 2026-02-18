import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getUpdateBySlug, getRecentUpdates } from "@/data/updates";
import { updates } from "@/data/updates";
import { UpdateArticle } from "@/components/sections/updates/UpdateArticle";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return updates.map((update) => ({ slug: update.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const update = getUpdateBySlug(slug);

  if (!update) {
    return { title: "Not Found" };
  }

  const t = await getTranslations({ locale, namespace: "Metadata.updates" });

  return {
    title: `${update.title[locale] || update.title.en} | ${t("title")}`,
    description: update.excerpt[locale] || update.excerpt.en,
  };
}

export default async function UpdateDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const update = getUpdateBySlug(slug);

  if (!update) {
    notFound();
  }

  // Get related posts (other updates, excluding current one)
  const relatedUpdates = getRecentUpdates()
    .filter((u) => u.slug !== slug)
    .slice(0, 3);

  return <UpdateArticle update={update} relatedUpdates={relatedUpdates} />;
}
