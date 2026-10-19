"use client";

import { useState } from "react";
import type { UiStrings } from "@/content/ui";

export default function InquiryForm({ t, locale, product }: { t: UiStrings["contact"]; locale: string; product?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale, product, source: "form", page: location.pathname }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-green-800">{t.success}</div>;
  }

  const input = "w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30";
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder={t.name} className={input} />
        <input name="company" placeholder={t.company} className={input} />
        <input name="country" placeholder={t.country} className={input} />
        <input name="contact" required placeholder={t.contactInfo} title={t.contactInfoHint} className={input} />
      </div>
      <textarea name="message" required rows={4} placeholder={t.message} className={input} />
      <button disabled={state === "sending"} className="btn btn-accent w-full sm:w-auto">
        {state === "sending" ? t.sending : t.submit}
      </button>
      {state === "error" && <p className="text-sm text-red-600">{t.error}</p>}
    </form>
  );
}
