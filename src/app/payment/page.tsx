"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCheckout } from "@/context/CheckoutContext";
import Stepper from "@/components/Stepper";

export default function PaymentPage() {
  const router = useRouter();
  const { cartData, shippingAddress, setOrderPlaced } = useCheckout();
  const [loading, setLoading] = useState(false);

  // Guard: if context lost (e.g. page refresh), redirect
  if (!cartData || !shippingAddress) {
    if (typeof window !== "undefined") router.replace("/cart");
    return null;
  }

  const subtotal = cartData.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const total = subtotal + cartData.shipping_fee - cartData.discount_applied;

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  const handlePay = async () => {
    setLoading(true);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 1800));
    setOrderPlaced(true);
    router.push("/success");
  };

  return (
    <div className="animate-fadeUp">
      <Stepper current={3} />

      <h1 className="font-heading text-3xl font-bold text-[#2d672d] mb-6">
        Review & Pay
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Summary */}
        <div className="eco-card p-5">
          <h2 className="font-heading text-lg font-bold text-[#3d2b1f] mb-4 flex items-center gap-2">
            <span>🛒</span> Order Summary
          </h2>
          <div className="space-y-3">
            {cartData.cartItems.map((item) => (
              <div key={item.product_id} className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#f0f7f0] flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.product_name}
                    fill
                    className="object-cover"
                    sizes="48px"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#3d2b1f] truncate">
                    {item.product_name}
                  </p>
                  <p className="text-xs text-[#9a6133]">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-semibold text-[#2d672d]">
                  {formatINR(item.product_price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#e5d0b0] mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-[#7e4d2b]">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#7e4d2b]">
              <span>Shipping</span>
              <span>{formatINR(cartData.shipping_fee)}</span>
            </div>
            <div className="flex justify-between font-bold text-[#3d2b1f] pt-2 border-t border-[#f2e9d8]">
              <span>Total</span>
              <span className="text-[#2d672d] font-heading text-xl">
                {formatINR(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Address + Pay */}
        <div className="space-y-4">
          {/* Shipping address */}
          <div className="eco-card p-5">
            <h2 className="font-heading text-lg font-bold text-[#3d2b1f] mb-3 flex items-center gap-2">
              <span>📦</span> Delivering To
            </h2>
            <div className="text-sm text-[#7e4d2b] space-y-1">
              <p className="font-semibold text-[#3d2b1f] text-base">
                {shippingAddress.fullName}
              </p>
              <p>{shippingAddress.email}</p>
              <p>{shippingAddress.phone}</p>
              <p>
                {shippingAddress.city}, {shippingAddress.state} - {" "}
                {shippingAddress.pinCode}
              </p>
            </div>
            <button
              onClick={() => router.push("/shipping")}
              className="text-[#2d672d] text-xs font-semibold mt-3 hover:underline"
            >
              ✏️ Edit Address
            </button>
          </div>

          {/* Payment method */}
          <div className="eco-card p-5">
            <h2 className="font-heading text-lg font-bold text-[#3d2b1f] mb-3 flex items-center gap-2">
              <span>💳</span> Payment
            </h2>
            <div className="flex items-center gap-3 bg-[#f0f7f0] border border-[#bcdabc] rounded-xl px-4 py-3">
              <span className="text-xl">💳</span>
              <div>
                <p className="text-sm font-semibold text-[#2d672d]">
                  Secure Card Payment
                </p>
                <p className="text-xs text-[#9a6133]">
                  256-bit SSL encrypted
                </p>
              </div>
              <span className="ml-auto text-[#2d672d]">✓</span>
            </div>
          </div>

          {/* Pay button */}
          <button
            onClick={handlePay}
            disabled={loading}
            className="btn-primary w-full py-4 rounded-full text-base flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Processing…
              </>
            ) : (
              <>🔒 Pay Securely — {formatINR(total)}</>
            )}
          </button>

          <p className="text-center text-xs text-[#9a6133]">
            By placing the order, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>

      <button
        onClick={() => router.push("/shipping")}
        className="mt-6 text-sm text-[#9a6133] hover:text-[#2d672d] transition-colors"
      >
        ← Back to Shipping
      </button>
    </div>
  );
}
