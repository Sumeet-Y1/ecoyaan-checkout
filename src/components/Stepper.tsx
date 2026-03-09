"use client";

interface StepperProps {
  current: 1 | 2 | 3;
}

const steps = [
  { num: 1, label: "Cart" },
  { num: 2, label: "Shipping" },
  { num: 3, label: "Payment" },
];

export default function Stepper({ current }: StepperProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, i) => {
        const isDone = step.num < current;
        const isActive = step.num === current;
        return (
          <div key={step.num} className="flex items-center">
            {/* Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 ${
                  isDone
                    ? "bg-[#2d672d] border-[#2d672d] text-white"
                    : isActive
                    ? "bg-white border-[#2d672d] text-[#2d672d]"
                    : "bg-white border-[#e5d0b0] text-[#c4925a]"
                }`}
              >
                {isDone ? "✓" : step.num}
              </div>
              <span
                className={`text-xs mt-1 font-medium ${
                  isActive ? "text-[#2d672d]" : isDone ? "text-[#2d672d]" : "text-[#c4925a]"
                }`}
              >
                {step.label}
              </span>
            </div>
            {/* Connector */}
            {i < steps.length - 1 && (
              <div
                className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 transition-all duration-500 ${
                  isDone ? "bg-[#2d672d]" : "bg-[#e5d0b0]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
