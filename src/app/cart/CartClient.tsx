"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CartData, useCheckout } from "@/context/CheckoutContext";
import Stepper from "@/components/Stepper";

interface Props {
  initialCartData: CartData;
}

export default function CartClient({ initialCartData }: Props) {
  const router = useRouter();
  const { cartData, setCartData } = useCheckout();

  useEffect(() => {
    setCartData(initialCartData);
  }, [initialCartData, setCartData]);

  const data = cartData ?? initialCartData;

  const subtotal = data.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const total = subtotal + data.shipping_fee - data.discount_applied;

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="animate-fadeUp">
      <Stepper current={1} />

      <h1 className="font-heading text-3xl lg:text-4xl font-bold text-[#2d672d] mb-6">
        Your Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {data.cartItems.map((item) => (
            <div key={item.product_id} className="eco-card p-5 lg:p-6 flex gap-5">
              <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-xl overflow-hidden flex-shrink-0 bg-[#f0f7f0]">
                <Image
                  src={item.image}
                  alt={item.product_name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 128px, 96px"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-[#3d2b1f] text-base lg:text-lg leading-snug">
                  {item.product_name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="leaf-badge text-xs">🌱 Eco Pick</span>
                </div>
                <p className="text-xs text-[#9a6133] mt-2">
                  ₹{item.product_price} per item
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 border border-[#e5d0b0] rounded-full px-4 py-1.5 text-sm">
                    <span className="text-[#9a6133] font-medium">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="font-bold text-[#2d672d] text-xl lg:text-2xl">
                    {formatINR(item.product_price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mt-2">
            {[
              { icon: "🌿", text: "100% Eco Friendly" },
              { icon: "🚚", text: "Fast Delivery" },
              { icon: "♻️", text: "Sustainable Packaging" },
            ].map((badge) => (
              <div
                key={badge.text}
                className="eco-card p-3 text-center"
              >
                <div className="text-2xl mb-1">{badge.icon}</div>
                <p className="text-xs text-[#7e4d2b] font-medium">{badge.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="eco-card p-6 sticky top-24">
            <h2 className="font-heading text-xl font-bold text-[#3d2b1f] mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#7e4d2b]">
                <span>
                  Subtotal ({data.cartItems.reduce((s, i) => s + i.quantity, 0)} items)
                </span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#7e4d2b]">
                <span>Shipping</span>
                <span>{formatINR(data.shipping_fee)}</span>
              </div>
              {data.discount_applied > 0 && (
                <div className="flex justify-between text-[#2d672d] font-medium">
                  <span>Discount</span>
                  <span>-{formatINR(data.discount_applied)}</span>
                </div>
              )}
              <div className="border-t border-[#e5d0b0] pt-3 flex justify-between font-bold text-base text-[#3d2b1f]">
                <span>Total</span>
                <span className="text-[#2d672d] text-2xl font-heading">
                  {formatINR(total)}
                </span>
              </div>
            </div>

            <button
              onClick={() => router.push("/shipping")}
              className="btn-primary w-full mt-5 py-3.5 rounded-full text-base"
            >
              Proceed to Checkout →
            </button>

            <p className="text-center text-xs text-[#9a6133] mt-3 flex items-center justify-center gap-1">
              <span>🔒</span> Secure & encrypted checkout
            </p>

            <div className="mt-4 pt-4 border-t border-[#f2e9d8]">
              <p className="text-xs text-center text-[#9a6133]">
                🌍 Every purchase supports a greener planet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}