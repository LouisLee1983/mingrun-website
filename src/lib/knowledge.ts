import { company, getContent, products, type Locale } from "@/lib/i18n";
import { cell, specTables } from "@/content/specs";

// The demo knowledge base is the site content itself, rendered as plain text for the system prompt.
function renderKnowledge(locale: Locale) {
  const c = getContent(locale);
  const lines: string[] = [];
  lines.push(`# ${c.company.name} (founded ${company.founded})`, c.company.intro, `${c.company.philosophy}. ${c.company.promise}`, `Address: ${c.company.address}`);
  for (const p of products) {
    const t = (c.products as Record<string, { name: string; intro: string; principle: string; features: { title: string; text: string }[]; applications: string; materials: string }>)[p.id];
    lines.push(`\n## ${t.name}`, t.intro);
    const specs = Object.entries(p.specs).map(([k, v]) => `${(c.specLabels as Record<string, string>)[k] ?? k}: ${v}`);
    if (specs.length) lines.push(specs.join("; "));
    if (t.principle) lines.push(t.principle);
    lines.push(t.features.map((f) => `- ${f.title}: ${f.text}`).join("\n"));
    if (t.applications) lines.push(`Applications: ${t.applications}`);
    if (t.materials) lines.push(`Materials: ${t.materials}`);
    const table = specTables[p.id];
    if (table) {
      const head = table.columns.map((col) => `${col.label[locale]}${col.unit ? ` (${cell(col.unit, locale)})` : ""}`);
      lines.push(head.join(" | "), ...table.rows.map((r) => table.columns.map((col) => cell(r[col.key], locale)).join(" | ")));
    }
  }
  lines.push(`\n## Services`, ...c.services.pre, ...c.services.during, ...c.services.after, c.services.epc.intro);
  lines.push(`\n## Project cases`, Object.values(c.cases).join("; "));
  return lines.join("\n");
}

let cached: string | null = null;

export function systemPrompt(locale: Locale, page: string) {
  cached ??= `${renderKnowledge("en")}\n\n---\n\n${renderKnowledge("zh")}`;
  return `You are the online sales assistant of Mingrun Machinery (Guilin Mingrun Mining Machinery Co., Ltd.), a Chinese manufacturer of grinding mills, sand making machines, tumbler and vibrating screens, and automatic packing & palletizing lines.

Rules:
- Always reply in the same language the visitor writes in. If unclear, use the site language "${locale}".
- Be concise and helpful: at most about 120 words, short paragraphs or a short list.
- Use only the facts in the knowledge base below. If something is not covered (exact prices, delivery time, certificates, specific model numbers), say a sales engineer will confirm it, and never invent numbers.
- Help the visitor choose equipment: ask about material, required capacity (t/h), feed size, required fineness or product size, and their country.
- After you understand the need, invite the visitor to leave their name and phone/WhatsApp/email so an engineer can send a solution and quotation.
- When the visitor has given a name AND at least one contact method, thank them and append exactly one line at the very end of that reply, in this format and nothing after it:
<<LEAD{"name":"...","contact":"...","country":"...","company":"...","need":"short summary in English"}>>
  Use empty strings for unknown fields. Only output this line once per conversation.
- Company contact: sales/WhatsApp/WeChat ${company.phone}, after-sales ${company.afterSalesPhone}, email ${company.email}.
- The visitor is currently on page: ${page}

Knowledge base:
${cached}`;
}
