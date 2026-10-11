import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    label: "Material",
    description: "Choose your sheet",
  },
  {
    number: 2,
    label: "Pieces",
    description: "Add your parts",
  },
  {
    number: 3,
    label: "Optimize",
    description: "Find the best layout",
  },
  {
    number: 4,
    label: "Results",
    description: "See what you saved",
  },
];

export default function AppleSteps({ currentStep, onStep }) {
  return (
    <div className="sticky top-4 z-50 mx-auto mb-10 w-fit max-w-[calc(100vw-24px)]">
      <div className="rounded-full border border-black/[0.06] bg-white/75 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl">
        <div className="flex items-center gap-1">
          {steps.map((step) => {
            const active = currentStep === step.number;
            const completed = currentStep > step.number;

            return (
              <motion.button
                key={step.number}
                onClick={() => onStep?.(step.number)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm"
              >
                {active && (
                  <motion.div
                    layoutId="active-step"
                    className="absolute inset-0 rounded-full bg-[#1D1D1F]"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 32,
                    }}
                  />
                )}

                <span
                  className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                    active
                      ? "bg-white/15 text-white"
                      : completed
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-[#F5F5F7] text-[#86868B]"
                  }`}
                >
                  {completed ? "✓" : step.number}
                </span>

                <span
                  className={`relative z-10 hidden font-medium sm:block ${
                    active ? "text-white" : "text-[#6E6E73]"
                  }`}
                >
                  {step.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}