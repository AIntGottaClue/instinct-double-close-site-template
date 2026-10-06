# instinct-double-close-site-template

The Atlanta Wholesale Double Close site as a reusable template. All
metro-specific copy lives in a single data file; the layout, components, fee
table, form logic, and schema plumbing are fixed. Hand-built by Instinct to
Javier's double-close site spec (no AI-builder origin, hence the instinct-
prefix).

Source: the Atlanta WDC Astro project (live at
atlanta.wholesaledoubleclose.click). The repo preview renders the placeholder
data file so every token is visible.

## How it works

- `src/data/cities/<slug>.json` holds one metro: a `site` block (brand, domain,
  niche, metro/state names, form name, GA4, airchatty tracker, trust bar, fee
  schedule, guide links, UI strings), a `home` block (homepage copy), a
  `cities` array (one entry per service-area city with its full copy), and a
  `pages` block (guide/fees/legal meta and FAQs).
- The root `city.config.mjs` picks which data file builds:
  ```js
  export const ACTIVE_CITY = '_placeholder';
  ```
- Two data files ship in the repo:
  - `_placeholder.json` - token skeleton (`{Biz Name}`, `{Main Service}`,
    `{City One}`-`{City Six}`, `{County One}`-`{County Three}`, `{Metro}`,
    `{State}`, `{ST}`, plus per-slot hint tokens). This is what the preview
    renders.
  - `atlanta-ga.json` - the filled Atlanta metro reference (33 service-area
    cities).

## Spin up a new metro

1. Duplicate the data file: `cp src/data/cities/atlanta-ga.json src/data/cities/houston-tx.json`
2. Rewrite it for that metro (copy rules below).
3. If the metro is not in Georgia, rename the state-specific guide
   (`src/pages/how-double-closing-works-in-georgia.astro`) and update the guide
   paths in the data file (`site.guideLinks`, internal prose links) to match.
4. Point `city.config.mjs` at it: `export const ACTIVE_CITY = 'houston-tx';`
5. Build and ship.

## Copy rules for new data files

- Genuinely local: real county and city names, real housing stock, real closing
  practice for the state. No metro-name swap.
- No em dashes. Plain sentences. First person "we/our program".
- Never invent credentials, guarantees, or specific facts.
- Fee numbers come from the program's published schedule in the data file's
  `site.fees`; keep them in sync everywhere.
- Timing claims ("as little as 24 hours") describe qualifying transactions;
  keep the disclaimers.
- Never describe what the site is for (no "lead generation" phrasing).

## Build

```bash
npm install
npm run build    # static site in dist/
npm run preview
```

GitHub Pages deploys `dist/` on pushes to `main` (workflow sets
`BASE=/instinct-double-close-site-template`). Pages previews are noindex.

## Structure

```
city.config.mjs              <- the one per-metro edit
src/data/cities/*.json       <- all metro copy (one file per metro)
src/data/city.ts             <- data loading + named exports for components
src/components/CityContent.astro  <- home + city page body (form in hero)
src/components/DealForm.astro     <- the deal form (brand from data)
src/pages/[slug].astro            <- service-area city pages
src/pages/                      <- index, 2 guides, fees, privacy, terms
```

The deal form posts through the airchatty tracking script into GHL (no
backend). Hidden attribution fields (`page_site`, `page_code`, `page_location`)
and the honeypot are part of the fixed shell.
