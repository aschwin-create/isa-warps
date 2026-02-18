import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/shared/PageHero";
import { ContactPageContent } from "@/components/sections/contact/ContactPageContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.contact" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Contact.hero" });

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        backgroundImage="/images/hero/54850393411_1bebc69b53_o.jpg"
        height="medium"
      />
      <ContactPageContent />
    </>
  );
}
