import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { company, dir, getContent, getUi, htmlLang, isLocale, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = { metadataBase: new URL(siteUrl) };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getUi(locale);
  const languages = locales.map((code) => ({ code, name: getUi(code).langName }));
  return (
    <html lang={htmlLang[locale]} dir={dir(locale)}>
      <body className="min-h-screen">
        <Header locale={locale} t={t} brand={getContent(locale).company.shortName} phone={company.phone} languages={languages} />
        <main>{children}</main>
        <Footer locale={locale} />
        <ChatWidget t={t.chat} locale={locale} />
      </body>
    </html>
  );
}
