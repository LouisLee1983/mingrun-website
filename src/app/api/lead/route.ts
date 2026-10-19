export const runtime = "nodejs";

const FIELDS = ["name", "company", "country", "contact", "message", "need", "product", "locale", "source", "page", "transcript"] as const;

function format(lead: Record<string, string>) {
  const labels: Record<string, string> = {
    name: "姓名", company: "公司", country: "国家", contact: "联系方式", message: "需求", need: "需求摘要",
    product: "产品", locale: "语言", source: "来源", page: "页面",
  };
  const head = Object.entries(labels)
    .filter(([k]) => lead[k])
    .map(([k, label]) => `${label}: ${lead[k]}`)
    .join("\n");
  return `【新询盘】\n${head}${lead.transcript ? `\n\n对话记录:\n${lead.transcript}` : ""}`;
}

// Leads go to a group-bot webhook (WeCom / Feishu / DingTalk / any JSON endpoint) and always to the server log.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return Response.json({ ok: false }, { status: 400 });
  const lead: Record<string, string> = {};
  for (const k of FIELDS) if (typeof body[k] === "string") lead[k] = body[k].slice(0, k === "transcript" ? 6000 : 1000);
  if (!lead.contact && !lead.name) return Response.json({ ok: false }, { status: 400 });

  const text = format(lead);
  console.log(text);

  const url = process.env.LEAD_WEBHOOK_URL;
  if (url) {
    const type = process.env.LEAD_WEBHOOK_TYPE ?? "wecom";
    const payload =
      type === "feishu" ? { msg_type: "text", content: { text } }
      : type === "dingtalk" ? { msgtype: "text", text: { content: text } }
      : type === "json" ? { ...lead, text }
      : { msgtype: "text", text: { content: text } };
    try {
      await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } catch (e) {
      console.error("Lead webhook failed", e);
    }
  }
  return Response.json({ ok: true });
}
