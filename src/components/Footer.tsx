import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { company, getContent, getUi } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getUi(locale);
  const c = getContent(locale).company;
  return (
    <footer className="bg-ink text-white/70">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-bold text-white">
            <span className="grid h-9 w-9 place-items-center rounded bg-accent text-ink font-black">M</span>
            {c.shortName}
          </div>
          <p className="mt-4 text-sm leading-relaxed">{c.slogan}</p>
          <p className="mt-2 text-sm leading-relaxed">{c.name}</p>
        </div>
        <div>
          <h3 className="mb-4 font-semibold text-white">{t.footer.quickLinks}</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-white" href={`/${locale}/products`}>{t.nav.products}</Link></li>
            <li><Link className="hover:text-white" href={`/${locale}/solutions`}>{t.nav.solutions}</Link></li>
            <li><Link className="hover:text-white" href={`/${locale}/about`}>{t.nav.about}</Link></li>
            <li><Link className="hover:text-white" href={`/${locale}/contact`}>{t.nav.contact}</Link></li>
          </ul>
        </div>
        <div className="space-y-2 text-sm">
          <h3 className="mb-4 font-semibold text-white">{t.nav.contact}</h3>
          <p>{t.contact.phone}: <span dir="ltr">{company.phone}</span></p>
          <p>{t.contact.afterSales}: <span dir="ltr">{company.afterSalesPhone}</span></p>
          <p>{t.contact.email}: {company.email}</p>
          <p>{c.address}</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs">
        © {new Date().getFullYear()} {c.name}. {t.footer.rights}
        {locale === "zh" && <span className="ms-2">{company.icp}</span>}
      </div>
    </footer>
  );
}
