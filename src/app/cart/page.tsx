import { CartData } from "@/context/CheckoutContext";
import CartClient from "./CartClient";

async function getCartData(): Promise<CartData> {
  await new Promise((r) => setTimeout(r, 100));

  return {
    cartItems: [
      {
        product_id: 101,
        product_name: "Bamboo Toothbrush (Pack of 4)",
        product_price: 299,
        quantity: 2,
        image: "https://placehold.co/150x150/dceddc/2d672d?text=Toothbrush",
      },
      {
        product_id: 102,
        product_name: "Reusable Cotton Produce Bags",
        product_price: 450,
        quantity: 1,
        image: "https://placehold.co/150x150/f2e9d8/9a6133?text=Bags",
      },
    ],
    shipping_fee: 50,
    discount_applied: 0,
  };
}

export default async function CartPage() {
  const cartData = await getCartData();
  return <CartClient initialCartData={cartData} />;
}