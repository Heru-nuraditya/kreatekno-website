---
paths:
  - "site/content/**"
  - "site/messages/**"
  - "COPY.md"
---

# Copy and Solusi content

- Voice: "Anda", short sentences, no em dash, no time promises, no AI-sounding filler.
- Visible copy never names a platform, except on Solusi pages, which may name the apps the client sees (WhatsApp, Google Sheets, Instagram, Gmail, Google Calendar, Google Drive).
- Never name backend tools (n8n, WAHA, Supabase...) or AI models, and never describe workflow mechanics a competitor could copy (failover numbers, price/route matching, auto-cancel rules).
- "Sudah berjalan" solutions are fictionalised client projects, labelled "Disamarkan atas permintaan klien". `metrics` only for figures the client approved. Ragamuda: fully anonymous, no figures.
- Solusi data is checked by zod (`site/lib/solusi/schema.ts`); a bad entry fails the build. New solution: a file in `site/content/solusi/items/`, registered in `site/content/solusi/index.ts`.
