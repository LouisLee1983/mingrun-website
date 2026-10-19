import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import SectionHeading from "@/components/SectionHeading";
import { cases, getContent, getUi, isLocale, products, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getUi(locale);
  const c = getContent(locale).company;
  return pageMeta(locale, "", `${c.shortName} | ${t.hero.title}`, t.hero.subtitle);
}

const categoryImage: Record<string, string> = {
  grinding: "/images/products/mr-main.jpg",
  sand: "/images/products/sf-main.jpg",
  screening: "/images/products/yx-main.jpg",
  packing: "/images/products/pack-main.jpg",
};

export default async function Home({ params }: Params) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = getUi(locale);
  const c = getContent(locale);

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -end-40 -top-40 h-[480px] w-[480px] rounded-full bg-accent/20 blur-3xl" />
        <div className="container-x relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="eyebrow mb-4 !text-accent">{c.company.slogan}</div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">{t.hero.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{t.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/products`} className="btn btn-accent">{t.hero.ctaProducts}</Link>
              <Link href={`/${locale}/contact`} className="btn btn-ghost">{t.hero.ctaQuote}</Link>
            </div>
          </div>
          <ProductImage src={products[0].images.main} alt={c.products["mr-grinding-mill"].name} label={t.photoPending} className="aspect-[4/3] rounded-xl shadow-2xl" priority />
        </div>
        <div className="relative border-t border-white/10 bg-white/5">
          <div className="container-x grid grid-cols-2 divide-white/10 md:grid-cols-4 md:divide-x rtl:md:divide-x-reverse">
            {t.stats.map((s) => (
              <div key={s.label} className="px-4 py-6 text-center">
                <div className="text-2xl font-extrabold text-accent md:text-3xl">{s.value}</div>
                <div className="mt-1 text-sm text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="container-x">
          <SectionHeading eyebrow={t.nav.products} title={t.sections.products} sub={t.sections.productsSub} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((p) => (
              <ProductCard key={p.id} locale={locale} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <SectionHeading eyebrow={c.company.shortName} title={t.sections.why} sub={t.sections.whySub} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.why.map((w, i) => (
              <div key={w.title} className="rounded-lg border border-line p-6">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded bg-accent/15 font-extrabold text-accent-dark">0{i + 1}</div>
                <h3 className="font-bold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-steel py-20 text-white">
        <div className="container-x">
          <SectionHeading eyebrow={t.nav.solutions} title={t.sections.solutions} sub={t.sections.solutionsSub} light />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(c.caseCategories).map(([key, name]) => (
              <Link key={key} href={`/${locale}/solutions#${key}`} className="group overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/10 hover:ring-accent">
                <ProductImage src={categoryImage[key]} alt={name} label={t.photoPending} className="aspect-[4/3]" />
                <div className="p-4">
                  <h3 className="font-semibold group-hover:text-accent">{name}</h3>
                  <p className="mt-1 text-xs text-white/60">
                    {cases.filter((x) => x.category === key).length} {t.sections.cases}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="EPC" title={t.sections.epc} sub={c.services.epc.intro} />
            <ol className="grid gap-3 sm:grid-cols-2">
              {c.services.epc.steps.map((s, i) => (
                <li key={s} className="flex items-center gap-3 rounded-md bg-paper px-4 py-3 text-sm font-medium">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-white">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col justify-center rounded-xl bg-ink p-8 text-white md:p-10">
            <h3 className="text-2xl font-bold">{t.sections.contact}</h3>
            <p className="mt-3 leading-relaxed text-white/70">{t.sections.contactSub}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/${locale}/contact`} className="btn btn-accent">{t.hero.ctaQuote}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
