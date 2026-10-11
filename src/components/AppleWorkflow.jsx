import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  Check,
  Sparkles,
  Recycle,
  Scissors,
  Layers3,
  MousePointer2,
} from 'lucide-react';

import { useProject } from '@/lib/ProjectContext';

import MaterialSelector from '@/components/materials/MaterialSelector';
import SheetConfig from '@/components/sheet/SheetConfig';
import CutListTable from '@/components/cutlist/CutListTable';
import Workspace from '@/components/visualization/Workspace';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import StrategySelector from '@/components/analytics/StrategySelector';
import OptimizationAnimation from '@/components/visualization/OptimizationAnimation';
import CuttingSequence from '@/components/visualization/CuttingSequence';
import ExportBar from '@/components/visualization/ExportBar';


/* =========================================================
   SMALL APPLE-STYLE HELPERS
   ========================================================= */

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


function StorySection({
  number,
  eyebrow,
  title,
  description,
  children,
  dark = false,
  id,
}) {
  const ref = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44 ${
        dark
          ? 'bg-[#050706] text-white'
          : 'bg-[#F5F5F7] text-[#1D1D1F]'
      }`}
    >
      {/* Ambient light */}
      <motion.div
        style={{ y: glowY }}
        className={`pointer-events-none absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full blur-[130px] ${
          dark
            ? 'bg-emerald-500/[0.10]'
            : 'bg-emerald-400/[0.075]'
        }`}
      />

      <div className="relative z-10 mx-auto max-w-[1450px]">
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <Reveal>
            <div
              className={`mb-5 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] ${
                dark ? 'text-emerald-400' : 'text-emerald-600'
              }`}
            >
              <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-current/10 px-2">
                {String(number).padStart(2, '0')}
              </span>

              {eyebrow}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              className={`font-display text-5xl font-bold leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-8xl ${
                dark ? 'text-white' : 'text-[#1D1D1F]'
              }`}
            >
              {title}
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p
              className={`mx-auto mt-7 max-w-2xl text-lg leading-8 sm:text-xl ${
                dark ? 'text-white/55' : 'text-[#6E6E73]'
              }`}
            >
              {description}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>{children}</Reveal>
      </div>
    </section>
  );
}


/* =========================================================
   FLOATING STEP NAVIGATION
   ========================================================= */

function FloatingJourney({ activeStep, onStep }) {
  const items = [
    ['01', 'Material'],
    ['02', 'Sheet'],
    ['03', 'Project'],
    ['04', 'Optimize'],
    ['05', 'Result'],
    ['06', 'Cut'],
  ];

  return (
    <div className="sticky top-4 z-[80] mx-auto mb-[-58px] w-fit max-w-[calc(100vw-24px)]">
      <div className="rounded-full border border-black/[0.06] bg-white/75 p-1.5 shadow-[0_15px_50px_rgba(0,0,0,.10)] backdrop-blur-2xl">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {items.map(([number, label], index) => {
            const selected = activeStep === index + 1;

            return (
              <button
                key={number}
                type="button"
                onClick={() => onStep(index + 1)}
                className={`group flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:py-2.5 sm:text-sm ${
                  selected
                    ? 'bg-[#1D1D1F] text-white shadow-lg'
                    : 'text-[#6E6E73] hover:bg-black/[0.045]'
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold ${
                    selected
                      ? 'bg-white/15 text-white'
                      : 'bg-[#F5F5F7] text-[#86868B]'
                  }`}
                >
                  {index + 1 < activeStep ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    number
                  )}
                </span>

                <span className="hidden sm:inline">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   INTRO BETWEEN SECTIONS
   ========================================================= */

function TransitionMessage({ icon: Icon, children, dark = false }) {
  return (
    <div
      className={`mx-auto flex max-w-2xl items-center justify-center gap-3 px-6 text-center ${
        dark ? 'text-white/50' : 'text-[#6E6E73]'
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="text-sm sm:text-base">{children}</span>
    </div>
  );
}


/* =========================================================
   MATERIAL / SHEET STAGE BACKDROP
   ========================================================= */

function PhysicalStage({ children, dark = false }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[38px] border p-4 shadow-[0_35px_100px_rgba(0,0,0,.08)] sm:p-7 ${
        dark
          ? 'border-white/10 bg-white/[0.045]'
          : 'border-black/[0.06] bg-white/70 backdrop-blur-2xl'
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          dark
            ? 'bg-[radial-gradient(circle_at_50%_20%,rgba(16,185,129,.09),transparent_45%)]'
            : 'bg-[radial-gradient(circle_at_50%_20%,rgba(16,185,129,.06),transparent_45%)]'
        }`}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}


/* =========================================================
   MAIN EXPERIENCE
   ========================================================= */

export default function AppleWorkflow() {
  const {
    step,
    setStep,
    material,
    pieces,
    layout,
    optimizing,
    runOptimization,
  } = useProject();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const goToStep = (nextStep) => {
    setStep(nextStep);

    const ids = {
      1: 'apple-material',
      2: 'apple-sheet',
      3: 'apple-project',
      4: 'apple-optimize',
      5: 'apple-results',
      6: 'apple-cut',
    };

    requestAnimationFrame(() => {
      scrollTo(ids[nextStep]);
    });
  };

  return (
    <main className="apple-story-page overflow-x-hidden bg-[#F5F5F7]">
      {/* =====================================================
          JOURNEY NAV
          ===================================================== */}

      <FloatingJourney
        activeStep={Math.min(Math.max(step || 1, 1), 6)}
        onStep={goToStep}
      />

      {/* =====================================================
          OPENING
          ===================================================== */}

      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-[#F5F5F7] px-6 py-32">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-400/[0.07] blur-[140px]" />

          <motion.div
            animate={{
              scale: [1, 1.04, 1],
              opacity: [0.5, 0.75, 0.5],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-emerald-300/10 blur-3xl"
          />

          <motion.div
            animate={{
              scale: [1.05, 1, 1.05],
              opacity: [0.25, 0.5, 0.25],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-[15%] right-[10%] h-48 w-48 rounded-full bg-blue-300/10 blur-3xl"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <Reveal>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6E6E73] shadow-sm backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
              Your project starts here
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-display text-6xl font-bold leading-[0.88] tracking-[-0.065em] text-[#1D1D1F] sm:text-7xl lg:text-[9rem]">
              Make more.
              <br />
              <span className="text-emerald-500">Waste less.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-9 max-w-2xl text-lg leading-8 text-[#6E6E73] sm:text-xl">
              ScrapSmart takes the material you already have and turns it
              into a smarter cutting plan.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <button
              type="button"
              onClick={() => scrollTo('apple-material')}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#1D1D1F] px-7 py-4 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(0,0,0,.15)] transition hover:scale-[1.025] hover:shadow-[0_20px_55px_rgba(0,0,0,.18)] active:scale-[.98]"
            >
              Start your project
              <ArrowDown className="h-4 w-4" />
            </button>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="mt-20 flex items-center justify-center gap-3 text-xs text-[#86868B]">
              <MousePointer2 className="h-4 w-4" />
              Explore · configure · optimize · create
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          MATERIAL
          ===================================================== */}

      <div id="apple-material">
        <StorySection
          number={1}
          eyebrow="Material"
          title={
            <>
              Start with
              <br />
              what you have.
            </>
          }
          description="Every project begins with something you already own. Choose the material ScrapSmart should help you use."
        >
          <PhysicalStage>
            <MaterialSelector />
          </PhysicalStage>

          <div className="mt-16">
            <TransitionMessage icon={Recycle}>
              Don't buy more material until you've discovered what your
              existing material can do.
            </TransitionMessage>
          </div>

          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="group inline-flex items-center gap-3 rounded-full bg-[#1D1D1F] px-7 py-4 text-sm font-semibold text-white shadow-xl transition hover:scale-[1.025]"
            >
              Tell ScrapSmart about your stock
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </StorySection>
      </div>

      {/* =====================================================
          SHEET
          ===================================================== */}

      <div id="apple-sheet">
        <StorySection
          number={2}
          eyebrow="Your stock"
          title={
            <>
              Show us
              <br />
              what you have.
            </>
          }
          description="Give ScrapSmart the dimensions and properties of your material. From here, everything becomes physical."
        >
          <PhysicalStage>
            <SheetConfig />
          </PhysicalStage>

          <div className="mt-16">
            <TransitionMessage icon={Layers3}>
              The more accurately we understand your stock, the more
              intelligently we can use every millimeter.
            </TransitionMessage>
          </div>

          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => goToStep(3)}
              className="group inline-flex items-center gap-3 rounded-full bg-[#1D1D1F] px-7 py-4 text-sm font-semibold text-white shadow-xl transition hover:scale-[1.025]"
            >
              Build your project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </StorySection>
      </div>

      {/* =====================================================
          PROJECT / PIECES
          ===================================================== */}

      <div id="apple-project">
        <StorySection
          number={3}
          eyebrow="Your project"
          title={
            <>
              Give your
              <br />
              material a purpose.
            </>
          }
          description="Add the pieces you want to create. Watch the project take shape as your parts come together."
        >
          <PhysicalStage>
            <CutListTable />
          </PhysicalStage>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Layers3,
                title: 'Your pieces',
                text: `${pieces?.length || 0} different part${
                  pieces?.length === 1 ? '' : 's'
                } in your project.`,
              },
              {
                icon: Recycle,
                title: 'Use what you have',
                text: 'ScrapSmart looks for opportunities to reuse existing material.',
              },
              {
                icon: Scissors,
                title: 'Cut smarter',
                text: 'The final arrangement is built around efficient cutting.',
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.07}>
                <div className="h-full rounded-[28px] border border-black/[0.06] bg-white p-7 shadow-[0_20px_55px_rgba(0,0,0,.045)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <item.icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-[#1D1D1F]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#6E6E73]">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <button
              type="button"
              onClick={() => goToStep(4)}
              className="group inline-flex items-center gap-3 rounded-full bg-emerald-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(16,185,129,.2)] transition hover:scale-[1.025] hover:bg-emerald-600"
            >
              Find the smartest layout
              <Sparkles className="h-4 w-4" />
            </button>
          </div>
        </StorySection>
      </div>

      {/* =====================================================
          OPTIMIZATION
          ===================================================== */}

      <div id="apple-optimize">
        <StorySection
          number={4}
          eyebrow="Optimization"
          dark
          title={
            <>
              Now let
              <br />
              ScrapSmart think.
            </>
          }
          description="There isn't always one obvious way to cut a sheet. ScrapSmart searches for a layout that makes better use of what you have."
        >
          <div className="rounded-[38px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_35px_100px_rgba(0,0,0,.4)] backdrop-blur-2xl sm:p-8">
            <StrategySelector />

            <div className="my-10 h-px bg-white/10" />

            {optimizing ? (
              <div className="rounded-[28px] border border-emerald-400/10 bg-emerald-400/[0.04] p-6">
                <OptimizationAnimation />
              </div>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
                  <Sparkles className="h-7 w-7 text-emerald-300" />
                </div>

                <h3 className="mt-7 font-display text-3xl font-bold tracking-tight text-white">
                  Ready to find the possibility?
                </h3>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/45">
                  ScrapSmart will arrange your pieces, compare available
                  stock, and calculate the result.
                </p>

                <button
                  type="button"
                  onClick={async () => {
                    await runOptimization();
                    goToStep(5);
                  }}
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#1D1D1F] shadow-xl transition hover:scale-[1.025]"
                >
                  Start optimizing
                  <Sparkles className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div className="mt-16">
            <TransitionMessage dark icon={Sparkles}>
              Watch the pieces move from possibility to plan.
            </TransitionMessage>
          </div>
        </StorySection>
      </div>

      {/* =====================================================
          RESULTS
          ===================================================== */}

      <div id="apple-results">
        <StorySection
          number={5}
          eyebrow="The result"
          title={
            <>
              See what your
              <br />
              material became.
            </>
          }
          description="The plan is no longer just numbers. This is the physical layout ScrapSmart found for your project."
        >
          <PhysicalStage>
            <Workspace />
          </PhysicalStage>

          <div className="mt-12">
            <AnalyticsDashboard />
          </div>

          {layout && (
            <div className="mt-16 rounded-[32px] border border-emerald-500/10 bg-emerald-500/[0.045] p-8 text-center sm:p-12">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                <Check className="h-6 w-6" strokeWidth={3} />
              </div>

              <h3 className="mt-6 font-display text-3xl font-bold tracking-tight text-[#123D26] sm:text-4xl">
                Your material has a plan.
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-[#6E6E73]">
                Less guessing. Less waste. A clearer path from leftover
                material to finished pieces.
              </p>
            </div>
          )}

          <div className="mt-14 flex justify-center">
            <button
              type="button"
              onClick={() => goToStep(6)}
              className="group inline-flex items-center gap-3 rounded-full bg-[#1D1D1F] px-8 py-4 text-sm font-semibold text-white shadow-xl transition hover:scale-[1.025]"
            >
              See how to make it
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </StorySection>
      </div>

      {/* =====================================================
          CUTTING
          ===================================================== */}

      <div id="apple-cut">
        <StorySection
          number={6}
          eyebrow="Make it real"
          dark
          title={
            <>
              From screen
              <br />
              to material.
            </>
          }
          description="Your digital plan becomes a practical cutting sequence you can actually follow."
        >
          <div className="rounded-[38px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_35px_100px_rgba(0,0,0,.4)] backdrop-blur-2xl sm:p-8">
            <CuttingSequence />
          </div>

          <div className="mt-10 rounded-[32px] border border-white/10 bg-white/[0.035] p-5 sm:p-8">
            <ExportBar />
          </div>

          <div className="mt-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300">
              <Check className="h-7 w-7" />
            </div>

            <h3 className="mt-7 font-display text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">
              That's ScrapSmart.
            </h3>

            <p className="mx-auto mt-5 max-w-xl text-white/45">
              Start with what you have. Make something useful. Waste less.
            </p>

            <button
              type="button"
              onClick={() => scrollTo('apple-material')}
              className="mt-9 rounded-full border border-white/10 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.1]"
            >
              Start another project
            </button>
          </div>
        </StorySection>
      </div>

      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="bg-[#050706] px-6 pb-20 pt-8 text-center text-white/30">
        <div className="mx-auto max-w-5xl border-t border-white/[0.07] pt-8 text-xs">
          ScrapSmart · Turn scrap into possibility.
        </div>
      </footer>
    </main>
  );
}