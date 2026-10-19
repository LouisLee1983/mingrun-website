"use client";

import { useEffect, useRef, useState } from "react";
import type { UiStrings } from "@/content/ui";

type Msg = { role: "user" | "assistant"; content: string };

const LEAD_MARK = "<<LEAD";

// The assistant appends <<LEAD{...}>> once a visitor has shared contact details; hide it and forward it.
function splitLead(text: string): { visible: string; lead?: Record<string, string> } {
  const i = text.indexOf(LEAD_MARK);
  if (i === -1) return { visible: text };
  const visible = text.slice(0, i).trimEnd();
  const m = text.slice(i).match(/<<LEAD(\{[\s\S]*?\})>>/);
  if (!m) return { visible };
  try {
    return { visible, lead: JSON.parse(m[1]) };
  } catch {
    return { visible };
  }
}

function renderText(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>,
  );
}

export default function ChatWidget({ t, locale }: { t: UiStrings["chat"]; locale: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const leadSent = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    const history: Msg[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    let full = "";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, locale, page: location.pathname }),
      });
      if (!res.ok || !res.body) throw new Error("chat failed");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        const { visible } = splitLead(full);
        setMessages([...history, { role: "assistant", content: visible }]);
      }
      const { visible, lead } = splitLead(full);
      setMessages([...history, { role: "assistant", content: visible }]);
      if (lead && !leadSent.current) {
        leadSent.current = true;
        const transcript = [...history, { role: "assistant", content: visible }]
          .map((m) => `${m.role === "user" ? "Visitor" : "AI"}: ${m.content}`)
          .join("\n");
        await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...lead, locale, source: "chat", page: location.pathname, transcript }),
        });
        setNotice(t.leadSaved);
      }
    } catch {
      setMessages([...history, { role: "assistant", content: t.error }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed bottom-4 end-4 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[min(560px,calc(100vh-6rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-line bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-ink px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-accent text-ink font-black">
                AI
                <span className="absolute -bottom-0.5 -end-0.5 h-3 w-3 rounded-full border-2 border-ink bg-green-400" />
              </span>
              <div>
                <div className="text-sm font-semibold">{t.title}</div>
                <div className="text-xs text-white/60">{t.subtitle}</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="rounded p-1 hover:bg-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-paper p-4 text-sm">
            <div className="max-w-[85%] rounded-lg rounded-ss-none bg-white p-3 shadow-sm">{t.welcome}</div>
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {t.suggestions.map((s) => (
                  <button key={s} onClick={() => send(s)} className="rounded-full border border-accent/50 bg-white px-3 py-1.5 text-xs text-ink hover:bg-accent/10">
                    {s}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-lg p-3 shadow-sm ${
                    m.role === "user" ? "rounded-se-none bg-steel text-white" : "rounded-ss-none bg-white"
                  }`}
                >
                  {m.content ? renderText(m.content) : <span className="inline-flex gap-1"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:.15s]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:.3s]" /></span>}
                </div>
              </div>
            ))}
            {notice && <div className="rounded-md bg-green-50 p-2 text-center text-xs text-green-700">{notice}</div>}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2 border-t border-line p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-accent"
              maxLength={1000}
            />
            <button disabled={busy || !input.trim()} className="btn btn-accent px-4 py-2 text-sm disabled:opacity-50">
              {t.send}
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-ink shadow-lg transition hover:bg-accent-dark"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {t.open}
      </button>
    </div>
  );
}
