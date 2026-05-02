# E-Mazdoor Design System

E-Mazdoor is a prototype platform that connects households in Pakistan with skilled service providers — *mazdoor* (laborers), *mistri* (craftsmen), plumbers, electricians, and carpenters. The product digitizes a hiring process that is today driven by word-of-mouth, walk-up markets, and informal local references.

This design system codifies the visual language, content rules, and UI components for the E-Mazdoor prototype. It is meant to be used by designers and AI agents to produce consistent, on-brand interfaces.

## Source materials

The only source provided was the **Software Project Proposal** (group assignment for a Software Engineering course at the team's university). It is a written document — no codebase, no Figma, no screenshots, no logos, no existing UI to reference. This means **the visual language in this system was originated here**, anchored in the brand's domain (South Asian trades, working households, trust + transparency) rather than copied from an existing product.

If existing brand assets emerge later (logo, typography lockup, app screens), they should override the choices made here and this README should be updated accordingly.

## Products represented

The proposal defines three actor surfaces:

1. **Customer mobile app** — browse services, pick a worker, book an appointment, pay (COD / card), rate.
2. **Service Provider mobile app** — set up profile, list skills, accept/reject jobs, update status. *(Not yet built — same visual system, mirrored flows.)*
3. **Admin web dashboard** — manage users, approve providers, monitor bookings, handle complaints.

This system ships UI kits for surfaces **(1)** and **(3)**. Provider-side screens reuse customer-app components and can be added later.

---

## Content fundamentals

**Voice.** Direct, plainspoken, helpful. The product talks to people who need a leaking pipe fixed today — not to startup readers. Sentences are short. We say what something is and what it costs. We do not market.

**Person.** Second person ("you") for the customer. Workers are referred to by their trade ("plumber", "electrician") or their name when known ("Imran K."), never as "service provider" in user-facing copy — that's an internal/system term.

**Casing.** Sentence case everywhere — buttons, headers, nav labels. Title Case is reserved for proper nouns (E-Mazdoor, names of people, names of cities). No ALL CAPS except for tiny eyebrow labels and stamps (e.g. `URGENT`, `VERIFIED`).

**Numbers and price.** Always show price in Pakistani Rupees with the `Rs` prefix and a thin space — `Rs 1,200`. Show ranges with an en dash — `Rs 800 – 1,500`. Never abbreviate to "k". Time is 12-hour with lowercase `am`/`pm` — `3:30 pm`. Distance in km with one decimal — `2.4 km away`.

**Trade vocabulary.** We embrace local terms where they're clearer than English:
- *Mazdoor* — general laborer (preferred over "handyman")
- *Mistri* — skilled craftsman
- *Plumber, electrician, carpenter, painter, AC technician* — kept in English, the standard trade names
- *Bookings* (not "appointments" in casual UI; "appointment" is for confirmation/legal copy)

**Examples — do this:**
- "Book a plumber for tomorrow morning"
- "Imran arrives in about 25 min"
- "Pay Rs 800 in cash when the job is done"
- "Rate your mistri"

**Don't do this:**
- ~~"Schedule your service appointment with our verified professional"~~
- ~~"Unlock premium home solutions"~~
- ~~"🔧 Plumber 🚰" (emoji-as-icon)~~

**Emoji.** Not used. Trade icons carry the visual weight; emoji feels off for a working-class, trust-driven product.

**Tone shifts.**
- *Empty states* — practical, not cute. "No bookings yet. Browse plumbers →"
- *Errors* — own it, give a next step. "Couldn't reach our servers. Try again."
- *Success* — short, confirm the fact. "Booked. Imran will call you."
- *Urgent / safety* — explicit. "This is an emergency request. Extra Rs 300 applies."

---

## Visual foundations

The system is built around a **workwear / blueprint** aesthetic — borrowed from the visual world of the trades themselves: hi-vis safety orange, ink-blue technical drawings, kraft paper, stamped marks, rule-lined layouts. It is deliberately **not** a soft pastel "marketplace" UI and deliberately **not** a sleek minimalist "fintech" UI. It looks like a thing the trades would recognize.

### Color
- **Primary — Hi-Vis Orange `#F26B1F`** (`--brand-orange`). Used for the primary CTA, the active state, and the brand mark. It's the safety-vest color — high attention, easy to spot.
- **Ink — `#0E1A2B`** (`--ink`). Deep blueprint navy. Default text color and dark surface. Replaces pure black everywhere.
- **Kraft — `#F4EAD5`** (`--kraft`). Warm off-white background — feels like work-order paper, not a white screen.
- **Slate scale** — `--slate-50 … --slate-900` for neutrals and chrome.
- **Semantic** — `--success #2F8A3E` (work complete), `--warn #E5A00D` (urgent / on the way), `--danger #C0392B` (cancelled / failed payment), `--info #2B6CB0` (informational).

Color is used sparingly. A typical screen is 80% kraft + ink, with one orange CTA and one semantic accent. Never two orange CTAs on the same screen.

### Typography
- **Display / headlines — `Archivo Narrow`** (Google Fonts, 600/700). Industrial, slightly condensed — reads like stencil paint and signage. Used for big numbers (price), screen titles, eyebrow labels.
- **Body — `Inter`** (400/500/600). Humanist sans for everything readable: paragraphs, list items, form labels.
- **Mono — `JetBrains Mono`** (400/600). Booking IDs, timestamps, technical details on receipts.
- **Urdu fallback** — `Noto Naskh Arabic` for any Urdu strings we render. (No Urdu copy ships in v1, but the stack is wired.)

Numbers in the display face are **tabular** — important for prices lining up in lists.

### Spacing & layout
- 4px base grid. Spacing scale: `4, 8, 12, 16, 20, 24, 32, 48, 64`.
- Card padding: 16px on mobile, 20–24 on web.
- Mobile gutters: 20px. Web gutters: 32px.
- **Rule lines** — 1px ink-tinted hairlines (`#0E1A2B at 10%`) are used liberally to separate rows in lists, rather than card-on-card layering. This echoes paper forms.

### Corner radius
Restrained. `--r-sm 4px`, `--r-md 8px`, `--r-lg 12px`, `--r-pill 999px`. **No 24px+ "pillowy" cards.** Buttons are pill-shaped (`--r-pill`); cards are 8–12px; inputs are 8px.

### Borders
1px solid `--slate-200` (light) or `--ink at 10%` is the default container border. A 2px ink border with 4px offset becomes a "stamp" treatment for verification badges and receipts.

### Shadows
Two-layer, low-elevation, ink-tinted — never grey-black gradients.
- `--shadow-sm` — `0 1px 0 rgba(14,26,43,.06), 0 1px 2px rgba(14,26,43,.06)`
- `--shadow-md` — `0 2px 4px rgba(14,26,43,.06), 0 8px 16px rgba(14,26,43,.08)`
- `--shadow-lg` — `0 4px 8px rgba(14,26,43,.08), 0 16px 32px rgba(14,26,43,.10)`

Cards rest on `--shadow-sm`. Modals and the persistent booking sheet use `--shadow-md`. We do **not** stack shadows for "depth" effects.

### Backgrounds
- Default app surface is **kraft** (`#F4EAD5`) on mobile, **slate-50** on web admin.
- **Blueprint grid** — a subtle 24px ink grid at 4% opacity is used on hero/empty-state surfaces (`assets/blueprint-grid.svg`). Never on dense list screens.
- No full-bleed photography in v1 (we don't have stock that fits the brand). Trade icons + flat color blocks instead.
- No gradients except a single **kraft → ink** protection gradient at the bottom of map views, used to keep the floating booking sheet legible.

### Iconography
See [Iconography](#iconography) below. Short version: **Lucide** at 1.75px stroke, ink color, no fills.

### Hover, press, focus
- **Hover** (web only) — primary buttons darken to `#D85A14`; secondary buttons get a `--slate-100` background; rows get a `--slate-50` background.
- **Press** — scale to 0.98 over 80ms; primary button background goes one step darker again.
- **Focus** — 2px ink ring with 2px offset (`outline: 2px solid var(--ink); outline-offset: 2px`). Visible, not subtle. Accessibility-first.
- **Disabled** — 40% opacity, no pointer events. We don't grey out — we fade.

### Motion
Restrained and functional, never decorative.
- Standard easing — `cubic-bezier(0.2, 0.8, 0.2, 1)` ("ease-out-quart")
- Standard duration — 180ms for state changes, 240ms for sheets/modals, 320ms for full-screen route transitions.
- **No bounces**, no spring physics, no parallax. The booking sheet slides up; the map nudges. That's it.
- **Stamp animation** — the "Booked" / "Verified" stamp uses a 1-frame rotate-in (`-6deg → 0deg`) with a subtle scale, evoking a hand-stamp on paper. This is the only "branded" motion.

### Transparency & blur
- The persistent **booking sheet** on the map screen uses `backdrop-filter: blur(16px)` over a `kraft at 85%` background, so the map shows through faintly.
- Modals use a solid `ink at 50%` scrim — no blur. (Blur on modal scrims feels too "consumer-app-y" for this brand.)

### Cards
- 1px `--slate-200` border, 12px radius, 16px padding, `--shadow-sm` rest, `--shadow-md` on hover.
- A card never sits on another card — we use rule lines to subdivide.
- **Worker cards** (the platform's hero unit) carry a left-edge 4px hi-vis stripe to call out availability — orange = available now, slate-400 = busy, success = on a job for you.

### Layout rules (fixed elements)
- **Mobile** — bottom tab bar (4 tabs: Home, Bookings, Messages, Profile), 64px tall, kraft background, 1px top hairline. Top header is sticky on scroll, 56px tall.
- **Web admin** — left rail 240px (collapses to 64px), top bar 56px with search + admin avatar.
- The booking confirmation flow uses a **persistent summary footer** (88px) with the price on the left and the primary CTA on the right.

### Stamps & marks
A signature treatment: a 2px ink-bordered, slightly rotated rectangular badge with all-caps display type — used for `VERIFIED`, `URGENT`, `BOOKED`, `COD`, `CARD`. They feel like ink stamps on a work order. Used sparingly — one per screen max.

---

## Iconography

**System used: [Lucide](https://lucide.dev) icons**, served from CDN. Stroke 1.75px, currentColor, no fills, 24px default size.

**Why Lucide.** It's open-source, has the trade-relevant glyphs we need (Wrench, Hammer, Plug, PaintRoller, Scissors), is consistent in stroke metrics, and gives us a stable visual vocabulary without us hand-rolling SVGs.

**Substitution flag.** We do **not** have a custom E-Mazdoor icon set. Lucide is a placeholder until the team commissions a custom set. **Action for the user:** if you want a bespoke icon family (chai-cup, toolbox-with-handle, Pakistani-style trade glyphs), say so and we'll commission or design one. Until then, Lucide stands in.

**Trade glyph mapping** (used in the service grid):
- Plumber → `wrench`
- Electrician → `plug-zap`
- Carpenter → `hammer`
- Painter → `paint-roller`
- AC technician → `air-vent`
- General mazdoor → `hard-hat`
- Cleaner → `spray-can`

**System glyphs.** `home`, `calendar-clock`, `message-circle`, `user`, `search`, `map-pin`, `star`, `chevron-right`, `phone`, `credit-card`, `banknote`, `shield-check`, `clock`, `check`, `x`.

**No emoji.** Anywhere.

**No flag/country glyphs.** We render Pakistani Rupee as the literal string `Rs`, not a flag or symbol — keeps it accessible across fonts.

**Logo.** A wordmark + a hard-hat-inside-a-stamp glyph. See `assets/logo.svg` and `assets/logo-mark.svg`.

---

## Index — what's in this system

```
README.md                  ← you are here
SKILL.md                   ← agent-skill manifest (for Claude Code)
colors_and_type.css        ← CSS variables (color, type, spacing, radius, shadow, motion)
fonts/                     ← (Google Fonts; loaded via @import in CSS)
assets/                    ← logo, icons, blueprint grid, illustrations
preview/                   ← design-system cards (rendered in the Design System tab)
ui_kits/
  customer_app/            ← mobile customer app — Home, Service list, Booking, Confirm, Rating
    index.html
    *.jsx
  admin_dashboard/         ← web admin — Bookings, Providers, Users, Detail
    index.html
    *.jsx
```

There is no `slides/` directory — no slide template was provided.
