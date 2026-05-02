# Admin Dashboard UI Kit

Web admin surface for E-Mazdoor — for managing bookings, providers, customers, and complaints.

## Files
- `index.html` — single-page app, two routes (Overview / Providers) toggled from the rail.
- `app.jsx` — `Rail`, `TopBar`, `KPI`, `StatusPill`, `Overview`, `Providers`, `App` and an `AIcon` helper.
- `styles.css` — admin-specific component styles.

## Screens
- **Overview** — 4 KPI tiles (bookings today, active providers, revenue, open complaints), recent bookings table, pending-approval queue with approve/reject actions.
- **Providers** — full provider directory table with trade / city / years / jobs / rating / status.

Shares the brand tokens from `colors_and_type.css` and the same Lucide icon set as the customer app.
