import { getLocale } from "next-intl/server";
import { SchemaOrg } from "@/components/seo/SchemaOrg";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import "@/app/globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <SchemaOrg locale={locale} />
      </head>
      <body className="min-h-screen flex flex-col bg-surface text-text antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
