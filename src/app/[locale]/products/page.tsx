import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { getUi, isLocale, products, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getUi(locale);
  return pageMeta(locale, "/products", t.sections.products, t.sections.productsSub);
}

export default async function ProductsPage({ params }: Params) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = getUi(locale);
  return (
    <section className="bg-paper py-16">
      <div className="container-x">
        <SectionHeading eyebrow={t.nav.products} title={t.sections.products} sub={t.sections.productsSub} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} locale={locale} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
