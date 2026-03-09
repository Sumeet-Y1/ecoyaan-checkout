# Ecoyaan Checkout Flow

A full checkout flow built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, and **React Context API** — developed as part of the Ecoyaan Frontend Engineering Interview Assignment.

---

## Live Demo

> Deploy to Vercel: push this repo and connect at [vercel.com](https://vercel.com)

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR via Server Components, file-based routing |
| Language | TypeScript | Type safety across the whole flow |
| Styling | Tailwind CSS + custom CSS | Utility-first with a custom eco design system |
| State | React Context API | Lightweight, sufficient for a 3-step form flow |
| Fonts | Playfair Display + DM Sans | Distinctive eco-premium look |

---

## Architecture

### SSR Data Fetching
`/app/cart/page.tsx` is a **Server Component** that fetches cart data from `/api/cart` at request time using `cache: "no-store"`. This data is passed as props to the client component (`CartClient.tsx`), which hydrates the shared Context.

### State Management
`CheckoutContext` (Context API) maintains:
- `cartData` — items, shipping fee, discount
- `shippingAddress` — user-entered address
- `orderPlaced` — flag for the success page guard

Data flows: Cart → (context hydration) → Shipping → (form submit to context) → Payment → Success

### Mock API
`/api/cart/route.ts` is a Next.js Route Handler that returns the mock JSON data with a simulated 100ms delay to mimic a real network call.

### Form Validation
Shipping form uses:
- Inline validation on blur per field
- Full validation on submit
- Regex checks: valid email format, 10-digit phone, 6-digit PIN code
- All fields required

---

## Project Structure

```
src/
├── app/
│   ├── api/cart/route.ts     # Mock API endpoint
│   ├── cart/
│   │   ├── page.tsx          # Server Component (SSR)
│   │   └── CartClient.tsx    # Client Component
│   ├── shipping/page.tsx     # Shipping form
│   ├── payment/page.tsx      # Review + Pay
│   ├── success/page.tsx      # Order success
│   ├── layout.tsx            # Root layout (wraps with Context)
│   └── globals.css           # Tailwind + custom design tokens
├── components/
│   └── Stepper.tsx           # Step progress indicator
└── context/
    └── CheckoutContext.tsx   # Global checkout state
```

---

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:3000
```

No environment variables are needed for local development. For Vercel deployment, the app auto-detects `VERCEL_URL`.

---

## Design Decisions

- **Eco theme** — Forest greens, earth tones, cream backgrounds. Custom CSS design tokens (`--leaf`, `--earth`, `--cream`) keep colors consistent.
- **Sticky order summary** on cart page for easy reference while scrolling.
- **Page guard on payment & success** — if context is lost (page refresh), the user is redirected to cart rather than seeing a broken state.
- **Simulated payment delay** with a spinner for realistic UX feedback.
- **Mobile-first responsive layout** — stacks vertically on small screens, side-by-side on desktop.
