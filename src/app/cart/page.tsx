// Server Component — demonstrates SSR data fetching
import { CartData } from "@/context/CheckoutContext";
import CartClient from "./CartClient";

async function getCartData(): Promise<CartData> {
  // SSR fetch from our own API route (absolute URL required in server components)
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  const res = await fetch(`${baseUrl}/api/cart`, {
    cache: "no-store", // Always fresh — simulates real-time cart
  });

  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}

export default async function CartPage() {
  const cartData = await getCartData();
  return <CartClient initialCartData={cartData} />;
}
