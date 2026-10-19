import type { Metadata } from "next";
import { htmlLang, locales, type Locale } from "@/lib/i18n";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function pageMeta(locale: Locale, path: string, title: string, description: string): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}${path}`]));
  return {
    title,
    description,
    alternates: { canonical: `/${locale}${path}`, languages: { ...languages, "x-default": `/en${path}` } },
    openGraph: { title, description, url: `/${locale}${path}`, type: "website", locale: htmlLang[locale] },
  };
}
