import meta from "@/content/meta.json";
import en from "@/content/en.json";
import zh from "@/content/zh.json";
import ru from "@/content/ru.json";
import ar from "@/content/ar.json";
import vi from "@/content/vi.json";
import { ui } from "@/content/ui";

export const locales = ["en", "zh", "ru", "ar", "vi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dir(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

export const htmlLang: Record<Locale, string> = { en: "en", zh: "zh-CN", ru: "ru", ar: "ar", vi: "vi" };

const content = { en, zh, ru, ar, vi };
export type Content = typeof en;
export type ProductText = Content["products"][keyof Content["products"]];

export function getContent(locale: Locale): Content {
  return content[locale] as Content;
}

export function getUi(locale: Locale) {
  return ui[locale];
}

export type ProductMeta = (typeof meta.products)[number] & { specs: Record<string, string>; images: Record<string, string> };

export const products = meta.products as ProductMeta[];
export const cases = meta.cases;
export const company = meta.company;

export function productText(locale: Locale, id: string): ProductText {
  return (getContent(locale).products as Record<string, ProductText>)[id];
}
