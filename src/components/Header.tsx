"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { UiStrings } from "@/content/ui";

type Props = {
  locale: Locale;
  t: UiStrings;
  brand: string;
  phone: string;
  languages: { code: Locale; name: string }[];
};

export default function Header({ locale, t, brand, phone, languages }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const links = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/products`, label: t.nav.products },
    { href: `/${locale}/solutions`, label: t.nav.solutions },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];

  const switchTo = (code: Locale) => {
    const parts = pathname.split("/");
    parts[1] = code;
    return parts.join("/") || `/${code}`;
  };

  const isActive = (href: string) => (href === `/${locale}` ? pathname === href : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 text-white backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold">
          <span className="grid h-9 w-9 place-items-center rounded bg-accent text-ink text-lg font-black">M</span>
          <span className="text-lg tracking-tight">{brand}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded px-3 py-2 text-sm font-medium transition-colors ${isActive(l.href) ? "text-accent" : "text-white/80 hover:text-white"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="hidden text-sm text-white/80 hover:text-white xl:block" dir="ltr">
            {phone}
          </a>
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1 rounded border border-white/20 px-3 py-1.5 text-sm hover:border-white/50"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
              </svg>
              {languages.find((l) => l.code === locale)?.name}
            </button>
            {langOpen && (
              <ul className="absolute end-0 mt-2 w-40 overflow-hidden rounded-md bg-white py-1 text-ink shadow-xl" role="listbox">
                {languages.map((l) => (
                  <li key={l.code}>
                    <Link
                      href={switchTo(l.code)}
                      onClick={() => setLangOpen(false)}
                      className={`block px-4 py-2 text-sm hover:bg-paper ${l.code === locale ? "font-semibold text-accent-dark" : ""}`}
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="rounded p-2 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-white/10 lg:hidden">
          <div className="container-x flex flex-col py-2">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-white/90">
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
