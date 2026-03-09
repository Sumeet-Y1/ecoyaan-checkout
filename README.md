# Ecoyaan Checkout Flow

A simplified checkout flow built as part of the Ecoyaan Frontend Engineering Interview Assignment.

## Live Demo

🔗 [Live on Vercel](https://ecoyaan-checkout-three.vercel.app/cart) 

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State Management | React Context API |
| Fonts | Playfair Display + DM Sans |

---

## Features

- **Cart Screen** - Lists products with image, name, price and quantity. Shows subtotal, shipping fee and grand total with a "Proceed to Checkout" button.
- **Shipping Address Screen** - Form with Full Name, Email, Phone Number, PIN Code, City and State. Includes validation for email format, 10-digit phone number, 6-digit PIN code and required fields.
- **Payment / Confirmation Screen** - Displays final order summary and entered shipping address. Simulated "Pay Securely" button with a loading state that leads to an Order Successful page.

---

## Architectural Choices

### SSR Data Fetching
`/app/cart/page.tsx` is a **Next.js Server Component** that fetches cart data from `/api/cart` at request time using `cache: "no-store"`. This demonstrates SSR best practices data is fetched on the server before the page is sent to the browser.

### Mock API
`/app/api/cart/route.ts` is a Next.js Route Handler that returns the mock cart JSON with a simulated network delay.

### State Management
`CheckoutContext` (React Context API) maintains cart data and shipping address across all steps. Data flows from Cart → Shipping → Payment → Success without prop drilling.

### Form Validation
Shipping form validates on blur per field and on submit:
- Required fields check
- Valid email format (regex)
- 10-digit Indian phone number (supports +91 prefix)
- 6-digit PIN code

---

## Project Structure

```
src/
├── app/
│   ├── api/cart/route.ts     # Mock API endpoint (SSR data source)
│   ├── cart/
│   │   ├── page.tsx          # Server Component SSR data fetching
│   │   └── CartClient.tsx    # Client Component renders cart UI
│   ├── shipping/page.tsx     # Shipping address form
│   ├── payment/page.tsx      # Order review + payment
│   ├── success/page.tsx      # Order success screen
│   ├── layout.tsx            # Root layout with Context Provider
│   └── globals.css           # Tailwind + custom design tokens
├── components/
│   └── Stepper.tsx           # Step progress indicator
└── context/
    └── CheckoutContext.tsx   # Global checkout state
```

---

## Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/Sumeet-Y1/ecoyaan-checkout.git

# 2. Navigate into the project
cd ecoyaan-checkout

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev

# 5. Open in browser
http://localhost:3000
```

No environment variables required for local development.

---

## Deployment

Deployed on **Vercel**. To deploy your own:
1. Push the repo to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Click Deploy no configuration needed