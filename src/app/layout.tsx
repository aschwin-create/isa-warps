import { getLocale } from "next-intl/server";
import { SchemaOrg } from "@/components/seo/SchemaOrg";
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <SchemaOrg locale={locale} />
      </head>
      <body className="min-h-screen flex flex-col bg-surface text-text antialiased">
        {children}
      </body>
    </html>
  );
}
