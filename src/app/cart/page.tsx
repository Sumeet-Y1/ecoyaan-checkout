// Server Component — demonstrates SSR data fetching
import { CartData } from "@/context/CheckoutContext";
import CartClient from "./CartClient";

async function getCartData(): Promise<CartData> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/cart`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}

export default async function CartPage() {
  const cartData = await getCartData();
  return <CartClient initialCartData={cartData} />;
}