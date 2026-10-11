import React from 'react';
import { Check } from 'lucide-react';
import { MATERIALS } from '@/lib/materials';
import { useProject } from '@/lib/ProjectContext';

function MaterialPreview({ mat }) {
  const kind = mat.three?.kind;

  const surfaceStyle = (() => {
    switch (kind) {
      case 'wood':
        return {
          background: `
            linear-gradient(
              105deg,
              ${mat.base} 0%,
              ${mat.edge} 8%,
              ${mat.base} 18%,
              #9A633C 31%,
              ${mat.base} 43%,
              #C99A69 57%,
              ${mat.base} 72%,
              ${mat.edge} 86%,
              ${mat.base} 100%
            )
          `,
        };

      case 'mdf':
        return {
          background: `
            linear-gradient(
              145deg,
              #D8B887 0%,
              ${mat.base} 35%,
              #A98256 68%,
              #C7A16C 100%
            )
          `,
        };

      case 'acrylic':
        return {
          background: `
            linear-gradient(
              135deg,
              rgba(255,255,255,.82) 0%,
              ${mat.base} 22%,
              #BFE4FA 52%,
              rgba(255,255,255,.9) 78%,
              ${mat.base} 100%
            )
          `,
        };

      case 'cardboard':
        return {
          background: `
            repeating-linear-gradient(
              92deg,
              ${mat.base} 0px,
              ${mat.edge} 3px,
              ${mat.base} 7px,
              #B7834D 11px,
              ${mat.base} 16px
            )
          `,
        };

      case 'metal':
        return {
          background: `
            linear-gradient(
              100deg,
              #737A82 0%,
              ${mat.base} 18%,
              #F1F3F4 38%,
              #8D949B 52%,
              #E4E7E9 71%,
              #727981 100%
            )
          `,
        };

      default:
        return {
          background: `linear-gradient(135deg, ${mat.base}, ${mat.edge})`,
        };
    }
  })();

  return (
    <div className="relative h-32 overflow-hidden rounded-2xl">
      {/* Main 3D slab */}
      <div
        className="absolute left-3 right-3 top-3 h-[84px] rounded-xl"
        style={{
          ...surfaceStyle,
          transform: 'perspective(700px) rotateX(8deg) rotateY(-5deg)',
          transformOrigin: 'center',
          boxShadow: `
            0 18px 24px rgba(0,0,0,.14),
            0 5px 8px rgba(0,0,0,.08),
            inset 0 1px 1px rgba(255,255,255,.55),
            inset 0 -8px 14px rgba(0,0,0,.12)
          `,
        }}
      >
        {/* Realistic surface highlight */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              'linear-gradient(125deg, rgba(255,255,255,.38), transparent 32%, transparent 72%, rgba(0,0,0,.12))',
          }}
        />

        {/* Fine material grain */}
        <div
          className="absolute inset-0 rounded-xl opacity-30"
          style={{
            background:
              kind === 'wood'
                ? 'repeating-linear-gradient(90deg, transparent 0px, rgba(70,35,15,.28) 1px, transparent 3px, transparent 10px)'
                : kind === 'metal'
                  ? 'repeating-linear-gradient(90deg, rgba(255,255,255,.22) 0px, transparent 1px, transparent 5px)'
                  : 'repeating-linear-gradient(0deg, rgba(255,255,255,.1) 0px, transparent 2px, transparent 6px)',
          }}
        />
      </div>

      {/* Thickness / bottom edge */}
      <div
        className="absolute left-4 right-4 top-[88px] h-3 rounded-b-lg"
        style={{
          background: mat.edge,
          transform: 'perspective(700px) rotateX(8deg) rotateY(-5deg)',
          boxShadow: '0 7px 10px rgba(0,0,0,.12)',
          filter: 'brightness(.78)',
        }}
      />

      {/* Soft reflection */}
      <div
        className="absolute bottom-0 left-8 right-8 h-5 rounded-full"
        style={{
          background: 'rgba(0,0,0,.13)',
          filter: 'blur(10px)',
        }}
      />
    </div>
  );
}

export default function MaterialSelector() {
  const { material, setMaterial } = useProject();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#172B21]">
              Choose your material
            </h2>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#64748B]">
              Pick the material you are cutting. ScrapSmart will match the
              optimization surface to your real stock.
            </p>
          </div>

          <div className="hidden rounded-full border border-black/[0.06] bg-white px-3 py-1.5 text-xs font-medium text-[#64748B] shadow-sm sm:block">
            {MATERIALS.length} materials
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {MATERIALS.map((m) => {
          const active = material.type === m.id;

          return (
            <button
              key={m.id}
              type="button"
              onClick={() =>
                setMaterial((prev) => ({
                  ...prev,
                  type: m.id,
                }))
              }
              className={`group relative overflow-hidden rounded-[26px] border bg-white p-3 text-left transition-all duration-300 ${
                active
                  ? 'border-[#16A34A] ring-4 ring-[#16A34A]/10 shadow-[0_20px_50px_rgba(22,163,74,.14)]'
                  : 'border-black/[0.07] shadow-[0_12px_35px_rgba(0,0,0,.045)] hover:-translate-y-1 hover:border-[#16A34A]/30 hover:shadow-[0_22px_55px_rgba(0,0,0,.09)]'
              }`}
            >
              <div
                className={`rounded-[20px] p-1 transition-transform duration-500 ${
                  active ? 'scale-[1.015]' : 'group-hover:scale-[1.02]'
                }`}
              >
                <MaterialPreview mat={m} />
              </div>

              <div className="mt-3 flex items-start justify-between gap-3 px-1 pb-1">
                <div className="min-w-0">
                  <div className="text-sm font-semibold tracking-tight text-[#172B21]">
                    {m.name}
                  </div>

                  <div className="mt-0.5 text-[11px] leading-4 text-[#64748B]">
                    {m.tagline}
                  </div>
                </div>

                {active && (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#16A34A] text-white shadow-[0_5px_14px_rgba(22,163,74,.28)]">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                )}
              </div>

              {active && (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#16A34A] to-transparent" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}