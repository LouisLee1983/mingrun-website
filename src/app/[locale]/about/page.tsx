import ProductImage from "@/components/ProductImage";
import SectionHeading from "@/components/SectionHeading";
import { company, getContent, getUi, isLocale, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getContent(locale).company;
  return pageMeta(locale, "/about", getUi(locale).sections.about, c.intro.slice(0, 160));
}

export default async function AboutPage({ params }: Params) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = getUi(locale);
  const c = getContent(locale);
  const groups = [
    { title: t.sections.pre, items: c.services.pre },
    { title: t.sections.during, items: c.services.during },
    { title: t.sections.after, items: c.services.after },
  ];

  return (
    <>
      <section className="py-16">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow={t.nav.about} title={t.sections.about} />
            <h3 className="text-lg font-semibold">{c.company.name}</h3>
            <p className="mt-1 text-sm font-medium text-accent-dark">{t.founded} {company.founded}</p>
            <p className="mt-4 leading-relaxed text-muted">{c.company.intro}</p>
            <p className="mt-4 leading-relaxed text-muted">{c.company.promise}</p>
          </div>
          <div className="grid gap-3">
            <ProductImage src="/images/site/company-campus.jpg" alt={c.company.name} label={t.photoPending} className="aspect-[5/3] rounded-xl" />
            <div className="grid grid-cols-2 gap-3">
              <ProductImage src="/images/site/about-machining.jpg" alt={c.company.shortName} label="" className="aspect-[16/9] rounded-lg" />
              <ProductImage src="/images/site/about-shipping.jpg" alt={c.company.shortName} label="" className="aspect-[16/9] rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="container-x">
          <SectionHeading title={t.sections.culture} light />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              [t.culture.philosophy, c.company.philosophy],
              [t.culture.spirit, c.company.spirit],
              [t.culture.policy, c.company.policy],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10">
                <div className="eyebrow !text-accent">{k}</div>
                <p className="mt-3 text-lg font-semibold">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <SectionHeading title={t.sections.services} />
          <div className="grid gap-6 md:grid-cols-3">
            {groups.map((g) => (
              <div key={g.title} className="rounded-lg border border-line p-6">
                <h3 className="mb-4 text-lg font-bold text-accent-dark">{g.title}</h3>
                <ul className="space-y-3 text-sm">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span className="leading-relaxed text-muted">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
