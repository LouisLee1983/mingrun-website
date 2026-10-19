import type { MetadataRoute } from "next";
import { locales, products } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/products", "/solutions", "/about", "/contact", ...products.map((p) => `/products/${p.id}`)];
  return locales.flatMap((l) => paths.map((p) => ({ url: `${siteUrl}/${l}${p}`, changeFrequency: "monthly" as const })));
}
