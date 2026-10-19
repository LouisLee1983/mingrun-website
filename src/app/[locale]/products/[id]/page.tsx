import Link from "next/link";
import { notFound } from "next/navigation";
import InquiryForm from "@/components/InquiryForm";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import { getContent, getUi, isLocale, locales, productText, products, type Locale } from "@/lib/i18n";
import { imageExists } from "@/lib/images";
import { cell, specTables } from "@/content/specs";
import { pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ locale: string; id: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => products.map((p) => ({ locale, id: p.id })));
}

export async function generateMetadata({ params }: Params) {
  const { locale, id } = await params;
  if (!isLocale(locale) || !products.some((p) => p.id === id)) return {};
  const t = productText(locale, id);
  return pageMeta(locale, `/products/${id}`, `${t.name} | ${getContent(locale).company.shortName}`, t.short);
}

export default async function ProductPage({ params }: Params) {
  const { locale: l, id } = await params;
  const locale = l as Locale;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();
  const t = productText(locale, id);
  const ui = getUi(locale);
  const labels = getContent(locale).specLabels as Record<string, string>;
  const specs = Object.entries(product.specs);

  return (
    <>
      <section className="bg-ink text-white">
        <div className="container-x grid gap-10 py-14 lg:grid-cols-2 lg:items-center">
          <div>
            <Link href={`/${locale}/products`} className="text-sm text-white/60 hover:text-accent">
              <span className="inline-block rtl:rotate-180">←</span> {ui.product.allProducts}
            </Link>
            <h1 className="mt-4 text-3xl font-extrabold md:text-4xl">{t.name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-white/75">{t.intro}</p>
            {specs.length > 0 && (
              <dl className="mt-8 grid grid-cols-2 gap-4">
                {specs.map(([k, v]) => (
                  <div key={k} className="rounded-md bg-white/5 p-4 ring-1 ring-white/10">
                    <dt className="text-xs text-white/60">{labels[k]}</dt>
                    <dd className="mt-1 text-xl font-bold text-accent" dir="ltr">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            <a href="#inquiry" className="btn btn-accent mt-8">{ui.product.askQuote}</a>
          </div>
          <ProductImage src={product.images.main} alt={t.name} label={ui.photoPending} className="aspect-[4/3] rounded-xl" priority />
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="space-y-12">
            <div>
              <h2 className="mb-6 text-2xl font-bold">{ui.product.features}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {t.features.map((f) => (
                  <div key={f.title} className="rounded-lg border border-line p-5">
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{f.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {t.principle && (
              <div>
                <h2 className="mb-4 text-2xl font-bold">{ui.product.principle}</h2>
                <p className="leading-relaxed text-muted">{t.principle}</p>
                {imageExists(product.images.principle) && (
                  <ProductImage src={product.images.principle} alt={`${t.name} – ${ui.product.principle}`} label="" fit="contain" className="mt-6 aspect-[16/9] rounded-lg border border-line" />
                )}
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              {t.applications && (
                <div className="rounded-lg bg-paper p-6">
                  <h2 className="mb-2 font-bold">{ui.product.applications}</h2>
                  <p className="text-sm leading-relaxed text-muted">{t.applications}</p>
                </div>
              )}
              {t.materials && (
                <div className="rounded-lg bg-paper p-6">
                  <h2 className="mb-2 font-bold">{ui.product.materials}</h2>
                  <p className="text-sm leading-relaxed text-muted">{t.materials}</p>
                </div>
              )}
            </div>

            {specTables[id] ? (
              <div>
                <h2 className="mb-4 text-2xl font-bold">{ui.product.paramsTable}</h2>
                <div className="overflow-x-auto rounded-lg border border-line">
                  <table className="w-full min-w-[640px] text-sm">
                    <thead className="bg-ink text-white">
                      <tr>
                        {specTables[id].columns.map((c) => (
                          <th key={c.key} className="px-3 py-3 text-start font-semibold">
                            {c.label[locale]}
                            {c.unit && <span className="block text-xs font-normal text-white/60">({cell(c.unit, locale)})</span>}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {specTables[id].rows.map((r, i) => (
                        <tr key={i} className="border-t border-line even:bg-paper">
                          {specTables[id].columns.map((c) => (
                            <td key={c.key} className={`px-3 py-2.5 ${c.key === "model" ? "font-semibold" : ""}`} dir={c.key === "model" ? "ltr" : undefined}>
                              {cell(r[c.key], locale)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-muted">{ui.product.paramsNote}</p>
              </div>
            ) : product.featureImages ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {t.features.map((f, i) =>
                  product.featureImages?.[i] ? (
                    <div key={f.title} className="overflow-hidden rounded-lg border border-line">
                      <ProductImage src={product.featureImages[i]} alt={f.title} label="" fit="contain" className="aspect-[4/3] bg-white" />
                      <div className="p-3 text-sm font-semibold">{f.title}</div>
                    </div>
                  ) : null,
                )}
              </div>
            ) : null}
          </div>

          <aside id="inquiry" className="h-fit scroll-mt-24 rounded-xl border border-line p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="mb-4 text-xl font-bold">{ui.contact.formTitle}</h2>
            <InquiryForm t={ui.contact} locale={locale} product={t.name} />
          </aside>
        </div>
      </section>

      <section className="bg-paper py-16">
        <div className="container-x">
          <h2 className="mb-8 text-2xl font-bold">{ui.product.related}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.filter((p) => p.id !== id).slice(0, 3).map((p) => (
              <ProductCard key={p.id} locale={locale} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
