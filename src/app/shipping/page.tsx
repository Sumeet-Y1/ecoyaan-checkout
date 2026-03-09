"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout, ShippingAddress } from "@/context/CheckoutContext";
import Stepper from "@/components/Stepper";

type FormErrors = Partial<Record<keyof ShippingAddress, string>>;

const INDIA_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu",
  "Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry",
];

function validate(form: ShippingAddress): FormErrors {
  const errors: FormErrors = {};
  if (!form.fullName.trim()) errors.fullName = "Full name is required";
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!form.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^(\+91[\-\s]?)?[6-9]\d{9}$/.test(form.phone)) {
    errors.phone = "Enter a valid 10-digit phone number";
  }
  if (!form.pinCode.trim()) {
    errors.pinCode = "PIN code is required";
  } else if (!/^\d{6}$/.test(form.pinCode)) {
    errors.pinCode = "Enter a valid 6-digit PIN code";
  }
  if (!form.city.trim()) errors.city = "City is required";
  if (!form.state) errors.state = "Please select a state";
  return errors;
}

export default function ShippingPage() {
  const router = useRouter();
  const { setShippingAddress } = useCheckout();

  const [form, setForm] = useState<ShippingAddress>({
    fullName: "",
    email: "",
    phone: "",
    pinCode: "",
    city: "",
    state: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ShippingAddress, boolean>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof ShippingAddress]) {
      const newErrors = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof ShippingAddress] }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof ShippingAddress] }));
  };

  const handleSubmit = () => {
    const allTouched = Object.keys(form).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {} as typeof touched
    );
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setShippingAddress(form);
      router.push("/payment");
    }
  };

  const fields: {
    name: keyof ShippingAddress;
    label: string;
    type?: string;
    placeholder: string;
  }[] = [
    { name: "fullName", label: "Full Name", placeholder: "Priya Sharma" },
    { name: "email", label: "Email Address", type: "email", placeholder: "priya@example.com" },
    { name: "phone", label: "Phone Number", type: "text", placeholder: "9876543210" },
    { name: "pinCode", label: "PIN Code", placeholder: "400001" },
    { name: "city", label: "City", placeholder: "Mumbai" },
  ];

  return (
    <div className="animate-fadeUp">
      <Stepper current={2} />

      <h1 className="font-heading text-3xl font-bold text-[#2d672d] mb-2 text-center">
      Shipping Address
      </h1>
      <p className="text-[#9a6133] mb-6 text-sm text-center">
      Where should we deliver your eco-friendly goodies?
      </p>

      <div className="max-w-xl mx-auto">
        <div className="eco-card p-6 space-y-5">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-[#3d2b1f] mb-1">
                {f.label} <span className="text-red-400">*</span>
              </label>
              <input
                name={f.name}
                type={f.type ?? "text"}
                placeholder={f.placeholder}
                value={form[f.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3d2b1f] bg-white transition-all ${
                  errors[f.name] && touched[f.name]
                    ? "border-red-400 bg-red-50"
                    : "border-[#e5d0b0]"
                }`}
              />
              {errors[f.name] && touched[f.name] && (
                <p className="text-red-500 text-xs mt-1">{errors[f.name]}</p>
              )}
            </div>
          ))}

          {/* State select */}
          <div>
            <label className="block text-sm font-medium text-[#3d2b1f] mb-1">
              State <span className="text-red-400">*</span>
            </label>
            <select
              name="state"
                title="state"
              value={form.state}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded-xl px-4 py-2.5 text-sm text-[#3d2b1f] bg-white transition-all ${
                errors.state && touched.state
                  ? "border-red-400 bg-red-50"
                  : "border-[#e5d0b0]"
              }`}
            >
              <option value="">Select a state</option>
              {INDIA_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.state && touched.state && (
              <p className="text-red-500 text-xs mt-1">{errors.state}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => router.push("/cart")}
            className="flex-1 py-3 rounded-full border-2 border-[#e5d0b0] text-[#9a6133] font-semibold text-sm hover:border-[#2d672d] hover:text-[#2d672d] transition-all"
          >
            ← Back to Cart
          </button>
          <button
            onClick={handleSubmit}
            className="btn-primary flex-1 py-3 rounded-full text-base"
          >
            Review Order →
          </button>
        </div>
      </div>
    </div>
  );
}