import { getLocale } from "next-intl/server";
import { Montserrat, Inter } from "next/font/google";
import { SchemaOrg } from "@/components/seo/SchemaOrg";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import "@/app/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`scroll-smooth ${montserrat.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <SchemaOrg locale={locale} />
      </head>
      <body className="min-h-screen flex flex-col bg-surface text-text antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
