# Customer App UI Kit

Mobile customer-facing flows for E-Mazdoor. Built as React components inside an iOS device frame.

## Files
- `index.html` — renders all six screens side-by-side, plus a 7th interactive click-thru phone that walks through the booking flow end-to-end.
- `ios-frame.jsx` — iPhone bezel + status bar (starter component).
- `components.jsx` — `Header`, `Search`, `ServiceGrid`, `WorkerCard`, `TabBar`, `Stamp`, `Chips`, `StarRating`, `Icon` + the `WORKERS` and `SERVICES` data.
- `screens.jsx` — `HomeScreen`, `ServiceListScreen`, `WorkerDetailScreen`, `PaymentScreen`, `ConfirmScreen`, `BookingsScreen`, `RatingScreen`.
- `styles.css` — kit-specific component styles. Pulls tokens from `../../colors_and_type.css`.

## Screens covered
1. **Home** — greeting, search, service grid, pros near you, bottom tab bar.
2. **Pro detail** — ink hero with blueprint grid, stats, job-type chips, time slot chips, sticky CTA.
3. **Payment** — receipt summary, COD vs Card radio cards, total CTA.
4. **Confirmation** — `BOOKED` stamp on kraft-paper background, booking ID, call/message actions.
5. **Bookings list** — date-stamped rows with status pills.
6. **Rating** — large stars, what-stood-out chips, optional notes.

## Click-thru flow (last phone)
home → service tile → pro detail → book → payment → confirm → bookings.
