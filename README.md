# Mingrun Machinery multilingual website

Next.js 15 site for Guilin Mingrun Mining Machinery in English (default), Chinese, Russian, Arabic (RTL) and Vietnamese, with a DeepSeek-powered AI sales assistant.

## Content
- `src/content/{en,zh,ru,ar,vi}.json`: page text per language (same structure)
- `src/content/meta.json`: products, specs, image paths, cases, contact info
- `src/content/ui.ts`: interface strings
- `public/images/...`: product, case and company photos. Missing images render a placeholder.

## AI chat
`/api/chat` streams answers from DeepSeek. The knowledge base is built from the site content (`src/lib/knowledge.ts`), so editing the JSON updates the assistant too. When a visitor leaves contact details, the lead is posted to `/api/lead`, which logs it and forwards it to `LEAD_WEBHOOK_URL` (WeCom, Feishu or DingTalk group bot).

## Environment variables
See `.env.example`. Set them in Vercel → Project → Settings → Environment Variables.

## Develop
```bash
npm install
npm run dev
```
