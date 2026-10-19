import InquiryForm from "@/components/InquiryForm";
import SectionHeading from "@/components/SectionHeading";
import { company, getContent, getUi, isLocale, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getUi(locale);
  return pageMeta(locale, "/contact", t.sections.contact, t.sections.contactSub);
}

export default async function ContactPage({ params }: Params) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = getUi(locale);
  const c = getContent(locale).company;
  const rows = [
    { label: t.contact.phone, value: company.phone, href: `https://wa.me/${company.phone.replace(/\D/g, "")}`, ltr: true },
    { label: t.contact.afterSales, value: company.afterSalesPhone, href: `tel:${company.afterSalesPhone.replace(/\s/g, "")}`, ltr: true },
    { label: t.contact.email, value: company.email, href: `mailto:${company.email}`, ltr: true },
    { label: t.contact.address, value: c.address },
  ];

  return (
    <section className="py-16">
      <div className="container-x">
        <SectionHeading eyebrow={t.nav.contact} title={t.sections.contact} sub={t.sections.contactSub} />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            {rows.map((r) => (
              <div key={r.label} className="rounded-lg bg-paper p-5">
                <div className="text-xs text-muted">{r.label}</div>
                {r.href ? (
                  <a href={r.href} className="mt-1 block text-lg font-semibold hover:text-accent-dark" dir={r.ltr ? "ltr" : undefined}>{r.value}</a>
                ) : (
                  <div className="mt-1 font-semibold">{r.value}</div>
                )}
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-line p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-xl font-bold">{t.contact.formTitle}</h2>
            <InquiryForm t={t.contact} locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
