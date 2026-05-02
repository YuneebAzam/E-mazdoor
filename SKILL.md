---
name: e-mazdoor-design
description: Use this skill to generate well-branded interfaces and assets for E-Mazdoor, an online home-service booking platform connecting Pakistani households with skilled trades (plumbers, electricians, carpenters, mazdoor, mistri). Use for production code, throwaway prototypes, mocks, slides, marketing visuals, etc. Contains essential design guidelines (workwear / blueprint aesthetic), colors, type, fonts, brand assets, and React UI kit components for the customer mobile app and admin web dashboard.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation
- `README.md` — full system: brand context, content fundamentals (voice, casing, price formatting), visual foundations (color, type, motion, shadows, stamps), iconography, file index.
- `colors_and_type.css` — all design tokens as CSS variables (colors, type scale, spacing, radii, shadows, motion). Always import this; never hand-roll new color values.
- `assets/` — `logo.svg`, `logo-mark.svg`, `blueprint-grid.svg`, illustrations.
- `preview/` — design-system specimen cards. Good reference for how each token is meant to look in practice.
- `ui_kits/customer_app/` — React (JSX in Babel) components for the mobile customer flow. `components.jsx` (Header, Search, ServiceGrid, WorkerCard, TabBar, Stamp, Chips, StarRating) + `screens.jsx` (Home, ServiceList, WorkerDetail, Payment, Confirm, Bookings, Rating).
- `ui_kits/admin_dashboard/` — React components for the web admin (Rail, TopBar, KPI, Overview, Providers tables).

## Hard rules
- **No emoji.** Anywhere.
- **No purple gradients, no soft pastel marketplace look, no rounded-left-border-accent cards.** This brand is workwear/blueprint, not generic-tech.
- **Hi-vis orange (`#F26B1F`) is for the primary CTA only** — one per screen.
- Prices always render as `Rs 1,200` with the `Rs` prefix smaller and ink-60. Tabular numerals.
- Iconography: Lucide, 1.75 stroke, currentColor, no fills. Trade glyphs: wrench / plug-zap / hammer / paint-roller / air-vent / hard-hat.
- Stamps (`VERIFIED`, `BOOKED`, `URGENT`, `COD`) are the signature decorative element — use sparingly.
