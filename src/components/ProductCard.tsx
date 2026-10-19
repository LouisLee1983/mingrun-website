import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { productText, getContent, getUi, type Locale, type ProductMeta } from "@/lib/i18n";

export default function ProductCard({ locale, product }: { locale: Locale; product: ProductMeta }) {
  const t = productText(locale, product.id);
  const ui = getUi(locale);
  const labels = getContent(locale).specLabels as Record<string, string>;
  const specs = Object.entries(product.specs).slice(0, 2);
  return (
    <Link href={`/${locale}/products/${product.id}`} className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-xl">
      <ProductImage src={product.images.main} alt={t.name} label={ui.photoPending} className="aspect-[4/3]" />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold group-hover:text-accent-dark">{t.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t.short}</p>
        {specs.length > 0 && (
          <dl className="mt-4 grid grid-cols-2 gap-2 border-t border-line pt-4 text-xs">
            {specs.map(([k, v]) => (
              <div key={k}>
                <dt className="text-muted">{labels[k]}</dt>
                <dd className="font-semibold" dir="ltr">{v}</dd>
              </div>
            ))}
          </dl>
        )}
        <span className="mt-4 text-sm font-semibold text-accent-dark">{ui.product.viewDetails} <span className="inline-block rtl:rotate-180">→</span></span>
      </div>
    </Link>
  );
}
