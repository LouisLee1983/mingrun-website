import { isLocale, defaultLocale } from "@/lib/i18n";
import { systemPrompt } from "@/lib/knowledge";

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) return new Response("DEEPSEEK_API_KEY is not set", { status: 500 });

  const body = await req.json().catch(() => null);
  const locale = isLocale(body?.locale) ? body.locale : defaultLocale;
  const page = typeof body?.page === "string" ? body.page.slice(0, 200) : "/";
  const messages: Msg[] = Array.isArray(body?.messages)
    ? body.messages
        .filter((m: Msg) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
        .slice(-20)
        .map((m: Msg) => ({ role: m.role, content: m.content.slice(0, 2000) }))
    : [];
  if (!messages.length) return new Response("No messages", { status: 400 });

  const upstream = await fetch(`${process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com"}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_MODEL ?? "deepseek-chat",
      stream: true,
      temperature: 0.4,
      max_tokens: 800,
      messages: [{ role: "system", content: systemPrompt(locale, page) }, ...messages],
    }),
  });
  if (!upstream.ok || !upstream.body) {
    console.error("DeepSeek error", upstream.status, await upstream.text().catch(() => ""));
    return new Response("Upstream error", { status: 502 });
  }

  // Convert DeepSeek's SSE stream into a plain text stream of content deltas.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  const stream = upstream.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const data = line.trim();
          if (!data.startsWith("data:")) continue;
          const payload = data.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const delta = JSON.parse(payload).choices?.[0]?.delta?.content;
            if (delta) controller.enqueue(encoder.encode(delta));
          } catch {
            // ignore keep-alive or partial lines
          }
        }
      },
    }),
  );

  return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}
