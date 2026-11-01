# How This Website Code Works

A simple guide for **everyone** — temple staff who only need to change words, and developers who maintain the site.

---

## For non-technical people (start here)

### What you usually need

| I want to… | Open this file |
| --- | --- |
| Change any Marathi / Hindi wording on the site | `src/content/messages.ts` |
| Change photos | `src/assets/` (ask a developer to wire a new photo) |
| Change colours / fonts / look | Ask a developer — that lives in `src/styles.css` |

### How to change text safely

1. Open **`src/content/messages.ts`**.
2. Find the section for the page (example: `home`, `darshan`, `pilgrimage`).
3. Change **only** the text inside quotes:  
   `"दर्शन व आरती"` → `"दर्शन आणि आरती"`
4. Do **not** delete brackets `{ }` `[ ]`, commas `,`, or quote marks `" "`.
5. Save the file. Refresh the website to see the change.

### Which section controls which page?

| Section in `messages.ts` | Website page |
| --- | --- |
| `brand`, `nav` | Header, footer, menu |
| `home` | Home page (`/`) |
| `darshan` | Darshan & Aarti (`/darshan`) |
| `pilgrimage` | How to reach (`/pilgrimage`) |
| `connect` | Puja & contact (`/connect`) |
| `heritage` | Temple history (`/heritage`) |
| `templeShowcase` | Photo info boxes on home |
| `errors` | “Page not found” screens |

### Simple mental model

Think of the website like a temple notice board:

- **`messages.ts`** = the notices (words)
- **`routes/`** = each room / page
- **`components/`** = reusable pieces (header, cards, hero banner)
- **`assets/`** = photos
- **`styles.css`** = colours and decoration

You almost never need to open anything except `messages.ts`.

---

## For technical people

### Stack

- **TanStack Start** (file-based routes) + **React 19** + **Vite**
- **Tailwind CSS v4** for styling
- **TypeScript**
- Connected to **Lovable** (avoid rewriting published git history)

### Run locally

```bash
npm install --legacy-peer-deps
npm run dev
```

Open: [http://localhost:8080/](http://localhost:8080/)

Other scripts: `npm run build`, `npm run test`, `npm run lint`

---

## Folder structure

```
yogeshwari-darshan-dham/
├── CODE_GUIDE.md          ← this file
├── README.md              ← project intro / Lovable links
├── AGENTS.md              ← rules for AI / coding agents
├── package.json           ← dependencies & scripts
├── vite.config.ts         ← Vite + TanStack Start config
├── public/                ← static files (favicon, robots.txt)
└── src/
    ├── content/
    │   └── messages.ts    ← ALL site wording (single source of truth)
    ├── routes/            ← one file = one URL page
    │   ├── __root.tsx     ← app shell (header, footer, HTML document)
    │   ├── index.tsx      ← /
    │   ├── darshan.tsx    ← /darshan
    │   ├── pilgrimage.tsx ← /pilgrimage
    │   ├── connect.tsx    ← /connect
    │   └── heritage.tsx   ← /heritage
    ├── components/        ← shared UI building blocks
    │   ├── HtmlDocument.tsx   ← global <html>/<head>/<body>
    │   ├── SiteChrome.tsx     ← header + footer + nav
    │   ├── Section.tsx        ← PageHero, SectionBand, CardGrid, etc.
    │   ├── TempleShowcase.tsx ← home photo showcase
    │   └── ui/                ← low-level shadcn/ui primitives
    ├── lib/
    │   ├── seo.ts         ← shared pageHead() meta helper
    │   └── utils.ts       ← cn() and small helpers
    ├── assets/            ← images (jpg + .asset.json)
    ├── styles.css         ← global / semantic design tokens
    ├── router.tsx         ← router setup
    ├── routeTree.gen.ts   ← AUTO-GENERATED — do not edit by hand
    ├── start.ts           ← TanStack Start entry
    └── server.ts          ← server entry
```

---

## How a page is built

Every inner page follows the same pattern:

```
1. Import text from messages.ts
2. Set SEO with pageHead(...)
3. Render:
     PageHero
     SectionBand (content blocks)
     CardGrid / ScheduleList / TimelineList / etc.
```

Example flow for `/darshan`:

```
messages.ts (darshan text)
        ↓
routes/darshan.tsx (assembles the page)
        ↓
components/Section.tsx (PageHero, SectionBand, ScheduleList…)
        ↓
Browser shows the page
```

Home (`routes/index.tsx`) is richer (hero, shortcuts, TempleShowcase, travel cards) but still pulls copy from `messages.ts`.

---

## Global components (use these — don’t reinvent)

| Component | File | Purpose |
| --- | --- | --- |
| `HtmlDocument` | `components/HtmlDocument.tsx` | Site-wide HTML document shell |
| `SiteHeader` / `SiteFooter` | `components/SiteChrome.tsx` | Navigation chrome |
| `PageHero` | `components/Section.tsx` | Inner-page hero banner |
| `SectionBand` | `components/Section.tsx` | Section + optional muted background |
| `Card` / `CardGrid` | `components/Section.tsx` | Info cards |
| `ScheduleList` | `components/Section.tsx` | Name + time rows |
| `PhotoGrid` | `components/Section.tsx` | Image gallery |
| `TimelineList` | `components/Section.tsx` | Heritage timeline |
| `DateList` | `components/Section.tsx` | Important dates |
| `PointList` | `components/Section.tsx` | Travel bullet points |
| `StatusPage` | `components/Section.tsx` | 404 / error screens |
| `TempleShowcase` | `components/TempleShowcase.tsx` | Home photo strip + details |
| `pageHead()` | `lib/seo.ts` | Shared SEO / Open Graph meta |

**Rule of thumb:** put shared look-and-feel in `Section.tsx` / `SiteChrome.tsx` / `styles.css`. Put shared wording in `messages.ts`. Keep route files thin.

---

## Routing notes (TanStack Start)

- Routes live only under `src/routes/` (no `src/pages/`).
- `__root.tsx` wraps every page — keep `<Outlet />`.
- `routeTree.gen.ts` is generated automatically; never hand-edit it.
- More route conventions: `src/routes/README.md`.

| File | URL |
| --- | --- |
| `index.tsx` | `/` |
| `darshan.tsx` | `/darshan` |
| `pilgrimage.tsx` | `/pilgrimage` |
| `connect.tsx` | `/connect` |
| `heritage.tsx` | `/heritage` |

---

## Design system reminders

From project rules:

- Keep shared styling in **semantic CSS tokens** + **SiteChrome / Section** so all pages stay consistent.
- Navigation gradients and section reveal motion live in shared CSS; honor **reduced motion**.
- Keep tap targets readable; primary nav stays visible (no hamburger-only menu).
- `TempleShowcase`: selection and details are separate; stacked photos on mobile, expanding strip on desktop; photos stay uncropped / unobscured.

---

## What not to touch (unless you know why)

| Path | Why |
| --- | --- |
| `src/routeTree.gen.ts` | Auto-generated |
| `src/components/ui/*` | Low-level UI kit; prefer editing higher-level Section/SiteChrome |
| `.lovable/` | Lovable project metadata |
| Published git history | Force-push / rebase of pushed commits can break Lovable sync |

---

## Quick checklist

**Non-tech**

- [ ] Edit words only in `src/content/messages.ts`
- [ ] Keep quotes and punctuation intact
- [ ] Refresh browser after save

**Tech**

- [ ] Add new shared UI to `Section.tsx` (or SiteChrome), not copy-paste into routes
- [ ] Add new copy keys to `messages.ts`, then use them in the route
- [ ] Use `pageHead(meta)` for SEO on new pages
- [ ] Keep route files as composition only
- [ ] Don’t edit `routeTree.gen.ts`

---

## Need help?

1. Text change → `src/content/messages.ts`
2. Layout / shared look → `src/components/Section.tsx` or `SiteChrome.tsx`
3. New page → add `src/routes/your-page.tsx` + messages section + `pageHead`
4. Colours / motion → `src/styles.css`
