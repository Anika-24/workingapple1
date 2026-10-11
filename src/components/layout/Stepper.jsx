import React from 'react';
import { Check, Package, Scissors, Zap } from 'lucide-react';
import { useProject } from '@/lib/ProjectContext';

const steps = [
  {
    id: 1,
    label: 'Material',
    description: 'Choose material & sheet',
    icon: Package,
  },
  {
    id: 2,
    label: 'Pieces',
    description: 'Add your cut list',
    icon: Scissors,
  },
  {
    id: 3,
    label: 'Optimize',
    description: 'Create your layout',
    icon: Zap,
  },
];

export default function Stepper() {
  const { step, setStep, pieces } = useProject();

  const canVisit = (id) => {
    // Always allow going backwards.
    if (id < step) return true;

    // Material -> Pieces
    if (id === 2) return true;

    // Optimize requires at least one piece.
    if (id === 3) return pieces.length > 0;

    return true;
  };

  const handleClick = (id) => {
    if (!canVisit(id)) return;

    // If the user clicks a step while viewing results,
    // go back to the actual workflow step.
    setStep(id);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-0 w-full max-w-3xl mx-auto">
        {steps.map((item, index) => {
          const Icon = item.icon;
          const active = step === item.id;
          const completed = step > item.id;
          const enabled = canVisit(item.id);

          return (
            <React.Fragment key={item.id}>
              <button
                type="button"
                onClick={() => handleClick(item.id)}
                disabled={!enabled}
                className={[
                  'group flex items-center gap-2 sm:gap-3 text-left transition-all',
                  enabled
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed opacity-45',
                ].join(' ')}
              >
                <div
                  className={[
                    'relative flex items-center justify-center',
                    'w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2',
                    'transition-all duration-200 shrink-0',
                    active
                      ? 'bg-[#123D26] border-[#123D26] text-white shadow-md shadow-[#123D26]/20'
                      : completed
                        ? 'bg-[#DCFCE7] border-[#16A34A] text-[#15803D]'
                        : 'bg-white border-[#CBD5D1] text-[#64748B]',
                    enabled && !active
                      ? 'group-hover:border-[#16A34A] group-hover:text-[#15803D]'
                      : '',
                  ].join(' ')}
                >
                  {completed ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                <div className="hidden sm:block min-w-0">
                  <div
                    className={[
                      'text-sm font-bold leading-tight',
                      active
                        ? 'text-[#123D26]'
                        : completed
                          ? 'text-[#15803D]'
                          : 'text-[#64748B]',
                    ].join(' ')}
                  >
                    {item.label}
                  </div>

                  <div className="text-xs text-[#94A3B8] mt-0.5 whitespace-nowrap">
                    {item.description}
                  </div>
                </div>
              </button>

              {index < steps.length - 1 && (
                <div
                  className={[
                    'h-[2px] flex-1 mx-2 sm:mx-4 max-w-28 transition-colors',
                    step > item.id
                      ? 'bg-[#16A34A]'
                      : 'bg-[#E2E8E4]',
                  ].join(' ')}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}