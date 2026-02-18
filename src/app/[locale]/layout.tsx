import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: {
      template: "%s | Isa Warps",
      default: t("home.title"),
    },
    description: t("home.description"),
    metadataBase: new URL("https://www.isawarps.com"),
    openGraph: {
      title: t("home.title"),
      description: t("home.description"),
      url: `https://www.isawarps.com/${locale}`,
      siteName: "Isa Warps",
      locale: locale === "nl" ? "nl_NL" : locale === "id" ? "id_ID" : locale === "de" ? "de_DE" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/og/default.jpg",
          width: 1200,
          height: 630,
          alt: "Isa Warps - Professional Footballer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("home.title"),
      description: t("home.description"),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </NextIntlClientProvider>
  );
}
