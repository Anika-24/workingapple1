import React from 'react';
import { Percent, Layers, DollarSign } from 'lucide-react';
import { useProject } from '@/lib/ProjectContext';
import { formatLeftoverArea } from '@/lib/geometry';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

function MetricCard({ icon: Icon, label, value, children }) {
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-black/[0.07] bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,.045)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_65px_rgba(0,0,0,.075)] sm:p-6">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-emerald-50/70 blur-2xl transition-transform duration-500 group-hover:scale-125" />

      <div className="relative">
        <div className="flex items-center gap-2 text-sm font-medium text-[#6E6E73]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ECFDF5]">
            <Icon className="h-4 w-4 text-[#15803D]" />
          </span>

          <span>{label}</span>
        </div>

        <div className="mt-4 font-display text-3xl font-bold tracking-[-0.04em] text-[#123D26] sm:text-4xl">
          {value}
        </div>

        <div className="mt-3 text-xs leading-5 text-[#6E6E73]">
          {children}
        </div>
      </div>
    </div>
  );
}

function MaterialDonut({ usedPercent }) {
  const used = Number(usedPercent.toFixed(1));
  const remaining = (100 - used).toFixed(1);

  return (
    <div className="mt-5 rounded-[22px] border border-black/[0.06] bg-[#F8FAF9] p-4">
      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          <svg
            viewBox="0 0 120 120"
            role="img"
            aria-label={`Used material ${used.toFixed(
              1
            )} percent; remaining material ${remaining} percent`}
            className="h-[118px] w-[118px]"
          >
            <circle
              cx="60"
              cy="60"
              r="46"
              fill="none"
              stroke="#E8EEE9"
              strokeWidth="15"
            />

            <circle
              cx="60"
              cy="60"
              r="46"
              fill="none"
              stroke="#16A34A"
              strokeWidth="15"
              pathLength="100"
              strokeLinecap="round"
              strokeDasharray={`${usedPercent} ${100 - usedPercent}`}
              transform="rotate(-90 60 60)"
            />

            <text
              x="60"
              y="55"
              textAnchor="middle"
              fontSize="19"
              fontWeight="700"
              fill="#123D26"
            >
              {used.toFixed(1)}%
            </text>

            <text
              x="60"
              y="72"
              textAnchor="middle"
              fontSize="9"
              fontWeight="500"
              fill="#6E6E73"
            >
              UTILIZED
            </text>
          </svg>
        </div>

        <dl className="min-w-0 flex-1 space-y-4 text-sm">
          <div>
            <dt className="flex items-center gap-2 font-medium text-[#172B21]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#16A34A]" />
              Used
            </dt>

            <dd className="mt-1 pl-[18px] text-base font-semibold text-[#123D26]">
              {used.toFixed(1)}%
            </dd>
          </div>

          <div>
            <dt className="flex items-center gap-2 font-medium text-[#172B21]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#DDE5E0]" />
              Remaining
            </dt>

            <dd className="mt-1 pl-[18px] text-base font-semibold text-[#123D26]">
              {remaining}%
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default function AnalyticsDashboard() {
  const { layout, material, isStale } = useProject();

  if (!layout || isStale) return null;

  const s = layout.stats;
  const finite = Number.isFinite;
  const money = (v) => `$${v.toFixed(2)}`;
  const comparison = layout.avoidedPurchases;

  const validPlan =
    layout.valid && layout.validation?.valid === true;

  const consumedStock = layout.sheets.filter(
    (sheet) => sheet.placements.length > 0
  );

  const purchasedSheets = consumedStock.filter(
    (sheet) => sheet.stockKind !== 'offcut'
  ).length;

  const reusedOffcuts = consumedStock.filter(
    (sheet) => sheet.stockKind === 'offcut'
  ).length;

  const stockPieces = purchasedSheets + reusedOffcuts;

  const countsMatchStats =
    s.sheetsUsed === stockPieces &&
    s.purchasedSheets === purchasedSheets &&
    s.reusedOffcuts === reusedOffcuts;

  const verifiedComparison =
    validPlan &&
    countsMatchStats &&
    layout.status === 'complete' &&
    comparison?.verified === true &&
    comparison.materialType === material.type &&
    comparison.thickness === Number(material.thickness) &&
    comparison.pricePerSheet === Number(material.pricePerSheet) &&
    comparison.sheetWidth === Number(material.sheetWidth) &&
    comparison.sheetHeight === Number(material.sheetHeight) &&
    finite(comparison.baselineCost) &&
    finite(comparison.actualCost) &&
    finite(comparison.cost) &&
    comparison.actualCost === s.totalCost;

  // Keep existing geometry calculations unchanged.
  const stockArea = consumedStock.reduce(
    (sum, sheet) => sum + sheet.width * sheet.height,
    0
  );

  const placedArea = consumedStock.reduce(
    (sum, sheet) =>
      sum +
      sheet.placements.reduce(
        (area, piece) => area + piece.w * piece.h,
        0
      ),
    0
  );

  const validGeometry =
    validPlan &&
    consumedStock.every(
      (sheet) =>
        finite(sheet.width) &&
        sheet.width > 0 &&
        finite(sheet.height) &&
        sheet.height > 0 &&
        sheet.placements.every(
          (piece) =>
            finite(piece.w) &&
            piece.w > 0 &&
            finite(piece.h) &&
            piece.h > 0
        )
    ) &&
    finite(stockArea) &&
    stockArea > 0 &&
    finite(placedArea) &&
    placedArea >= 0 &&
    placedArea <= stockArea + 1e-6;

  const usedPercent = validGeometry
    ? Math.min(100, (placedArea / stockArea) * 100)
    : null;

  const details = [
    [
      'Pieces placed',
      finite(s.placedCount)
        ? `${s.placedCount}${
            finite(s.totalPieces) ? ` of ${s.totalPieces}` : ''
          }`
        : null,
    ],
    [
      'Waste',
      finite(s.waste) ? `${s.waste.toFixed(1)}%` : null,
    ],
    [
      'Cutting operations',
      finite(s.cuttingOperations)
        ? s.cuttingOperations
        : null,
      s.cuttingModel,
    ],
    [
      'Estimated production time',
      finite(s.estimatedCuttingTimeMinutes)
        ? `${s.estimatedCuttingTimeMinutes.toFixed(1)} min`
        : null,
      s.timeExplanation,
    ],
    [
      'Estimated labor cost',
      finite(s.estimatedLaborCost)
        ? money(s.estimatedLaborCost)
        : null,
    ],
    [
      'Estimated job cost',
      finite(s.totalJobCost)
        ? money(s.totalJobCost)
        : null,
      'Purchased material and estimated labor; excludes overhead, electricity, tool wear and taxes.',
    ],
    [
      'Cutting distance',
      finite(s.cutLengthMm)
        ? `${s.cutLengthMm.toFixed(0)} mm`
        : null,
      s.cuttingModel,
    ],
    [
      'Estimated repositioning',
      finite(s.repositioningCount)
        ? s.repositioningCount
        : null,
      s.processExplanation,
    ],
    [
      'Estimated orientation events',
      finite(s.rotationEvents)
        ? s.rotationEvents
        : null,
    ],
    [
      'Geometric leftover',
      finite(s.leftoverArea ?? s.leftoverAreaMm2)
        ? formatLeftoverArea(
            s.leftoverArea ?? s.leftoverAreaMm2,
            material.unit === 'mm' ? 'cm' : material.unit
          )
        : null,
      s.geometricLeftoverExplanation,
    ],
  ].filter(([, value]) => value !== null);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {usedPercent !== null && (
          <MetricCard
            icon={Percent}
            label="Material Utilization"
            value={`${usedPercent.toFixed(1)}%`}
          >
            <MaterialDonut usedPercent={usedPercent} />

            {layout.status !== 'complete' && (
              <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-amber-700">
                Partial plan: areas describe placed pieces and consumed stock
                only.
              </p>
            )}
          </MetricCard>
        )}

        {validPlan && (
          <MetricCard
            icon={Layers}
            label="Material Used"
            value={`${stockPieces} ${
              stockPieces === 1 ? 'stock piece' : 'stock pieces'
            }`}
          >
            <div className="mt-4 space-y-3 rounded-[20px] bg-[#F8FAF9] p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#6E6E73]">
                  New purchased stock
                </span>
                <span className="font-semibold text-[#123D26]">
                  {purchasedSheets}
                </span>
              </div>

              <div className="h-px bg-black/[0.06]" />

              <div className="flex items-center justify-between gap-4">
                <span className="text-[#6E6E73]">
                  Reused offcuts
                </span>
                <span className="font-semibold text-[#123D26]">
                  {reusedOffcuts}
                </span>
              </div>
            </div>

            <p className="mt-3">
              Total stock consumed by this plan; finished pieces are counted
              separately.
            </p>
          </MetricCard>
        )}

        {validPlan &&
          countsMatchStats &&
          finite(s.totalCost) && (
            <MetricCard
              icon={DollarSign}
              label="Material Cost and Savings"
              value={money(s.totalCost)}
            >
              <div className="mt-4 rounded-[20px] bg-[#F8FAF9] p-4">
                <p className="font-medium text-[#172B21]">
                  {layout.status !== 'complete'
                    ? 'New material cost for this partial plan'
                    : 'New Material Cost'}
                </p>
              </div>

              {verifiedComparison &&
                comparison.cost !== 0 && (
                  <div className="mt-4 border-t border-black/[0.06] pt-4">
                    <p className="font-medium text-[#172B21]">
                      {comparison.cost > 0
                        ? 'Money Saved Through Reuse'
                        : 'Additional Material Cost'}
                    </p>

                    <p
                      className={`mt-1 font-display text-3xl font-bold tracking-tight ${
                        comparison.cost > 0
                          ? 'text-[#15803D]'
                          : comparison.cost < 0
                            ? 'text-amber-700'
                            : 'text-[#64748B]'
                      }`}
                    >
                      {money(Math.abs(comparison.cost))}
                    </p>

                    <p className="mt-2 text-xs text-[#6E6E73]">
                      Baseline Cost: {money(comparison.baselineCost)}
                    </p>
                  </div>
                )}

              {!verifiedComparison && (
                <p className="mt-3">
                  {layout.comparisonUnavailableReason ||
                    'No verified new-sheet-only purchasing comparison for these inputs.'}
                </p>
              )}
            </MetricCard>
          )}
      </div>

      {details.length > 0 && (
        <Accordion
          type="single"
          collapsible
          className="overflow-hidden rounded-[26px] border border-black/[0.07] bg-white px-5 shadow-[0_15px_45px_rgba(0,0,0,.035)]"
        >
          <AccordionItem value="details" className="border-0">
            <AccordionTrigger className="py-5 text-sm font-semibold text-[#172B21] hover:no-underline">
              <span>
                Plan details & production estimates
              </span>
            </AccordionTrigger>

            <AccordionContent>
              <div className="border-t border-black/[0.06] pt-5">
                <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                  {details.map(
                    ([label, value, explanation]) => (
                      <div
                        key={label}
                        className="rounded-2xl bg-[#F8FAF9] p-4"
                      >
                        <dt className="text-xs font-medium uppercase tracking-[0.08em] text-[#86868B]">
                          {label}
                        </dt>

                        <dd className="mt-2 font-display text-lg font-bold tracking-tight text-[#172B21]">
                          {value}
                        </dd>

                        {explanation && (
                          <p className="mt-2 text-xs leading-5 text-[#6E6E73]">
                            {explanation}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </dl>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}