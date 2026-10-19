import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import SectionHeading from "@/components/SectionHeading";
import { cases, getContent, getUi, isLocale, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getUi(locale);
  return pageMeta(locale, "/solutions", t.sections.solutions, t.sections.solutionsSub);
}

export default async function SolutionsPage({ params }: Params) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = getUi(locale);
  const c = getContent(locale);
  const caseNames = c.cases as Record<string, string>;

  return (
    <>
      <section className="bg-ink py-16 text-white">
        <div className="container-x">
          <SectionHeading eyebrow={t.nav.solutions} title={t.sections.solutions} sub={t.sections.solutionsSub} light />
        </div>
      </section>

      {Object.entries(c.caseCategories).map(([key, name], idx) => (
        <section key={key} id={key} className={`scroll-mt-20 py-16 ${idx % 2 ? "bg-paper" : ""}`}>
          <div className="container-x">
            <h2 className="mb-8 text-2xl font-bold">{name}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cases
                .filter((x) => x.category === key)
                .map((x) => (
                  <div key={x.id} className="overflow-hidden rounded-lg border border-line bg-white">
                    <ProductImage src={`/images/cases/${x.id}.jpg`} alt={caseNames[x.id]} label={t.photoPending} className="aspect-[16/10]" />
                    <div className="p-4 font-semibold">{caseNames[x.id]}</div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-steel py-16 text-white">
        <div className="container-x">
          <SectionHeading eyebrow="EPC" title={t.sections.epc} sub={c.services.epc.intro} light />
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {c.services.epc.steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 rounded-md bg-white/5 px-4 py-3 text-sm ring-1 ring-white/10">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-ink">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <Link href={`/${locale}/contact`} className="btn btn-accent mt-10">{t.hero.ctaQuote}</Link>
        </div>
      </section>
    </>
  );
}
