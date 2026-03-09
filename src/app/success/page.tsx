"use client";

import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const router = useRouter();
  const { shippingAddress, orderPlaced } = useCheckout();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!orderPlaced) {
      router.replace("/cart");
      return;
    }
    // Trigger animation
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, [orderPlaced, router]);

  const orderId = `ECO-${Math.floor(100000 + Math.random() * 900000)}`;

  if (!show) return null;

  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-fadeUp">
      <div className="text-center max-w-md w-full">
        {/* Success icon */}
        <div className="animate-success inline-flex items-center justify-center w-24 h-24 bg-[#dceddc] rounded-full mb-6">
          <span className="text-5xl">🌿</span>
        </div>

        <h1 className="font-heading text-4xl font-bold text-[#2d672d] mb-2">
          Order Placed!
        </h1>
        <p className="text-[#9a6133] mb-6">
          Thank you{shippingAddress ? `, ${shippingAddress.fullName.split(" ")[0]}` : ""}! Your eco-friendly order is confirmed.
        </p>

        <div className="eco-card p-5 text-left mb-6">
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-[#9a6133]">Order ID</span>
            <span className="font-mono font-bold text-[#2d672d]">{orderId}</span>
          </div>
          {shippingAddress && (
            <>
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-[#9a6133]">Delivering to</span>
                <span className="font-medium text-[#3d2b1f]">
                  {shippingAddress.city}, {shippingAddress.state}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#9a6133]">Confirmation sent to</span>
                <span className="font-medium text-[#3d2b1f] text-right max-w-[180px] truncate">
                  {shippingAddress.email}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="bg-[#f0f7f0] border border-[#bcdabc] rounded-2xl p-4 mb-6 text-sm text-[#2d672d]">
          🌍 You just made a greener choice. Your order helps reduce plastic waste and supports sustainable living.
        </div>

        <button
          onClick={() => router.push("/cart")}
          className="btn-primary px-8 py-3 rounded-full text-base"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
