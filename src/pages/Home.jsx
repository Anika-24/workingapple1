import React, { useRef, useState } from "react";
import {
  ArrowRight,
  ArrowDown,
  Check,
  Layers,
  Loader2,
  PlayCircle,
  Sparkles,
  MousePointer2,
  Recycle,
  BarChart3,
  Box,
  Wand2,
  Move3D,
  Ruler,
  Rotate3D,
  Download,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";

import { useProject } from "@/lib/ProjectContext";
import { MATERIALS } from "@/lib/materials";

import MaterialSelector from "@/components/materials/MaterialSelector";
import SheetConfig from "@/components/sheet/SheetConfig";
import CutListTable from "@/components/cutlist/CutListTable";
import Workspace from "@/components/visualization/Workspace";
import PieceInspector from "@/components/visualization/PieceInspector";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import BeforeAfter from "@/components/visualization/BeforeAfter";
import OptimizationAnimation from "@/components/visualization/OptimizationAnimation";
import ExportBar from "@/components/visualization/ExportBar";
import StrategySelector, {
  STRATEGY_NAMES,
} from "@/components/analytics/StrategySelector";
import CuttingSequence from "@/components/visualization/CuttingSequence";
import ReuseStockPanel from "@/components/reuse/ReuseStockPanel";
import OffcutCapture from "@/components/reuse/OffcutCapture";

import { areaInUnit } from "@/lib/geometry";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/* =========================================================
   APPLE HERO
   SOLID / NO GLASS / NO HAZE
========================================================= */

function AppleHero({ onStart }) {
  const [selectedMaterial, setSelectedMaterial] =
    useState("Plywood");

  const [hoveredMaterial, setHoveredMaterial] =
    useState(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 70,
    damping: 18,
    mass: 0.6,
  });

  const springY = useSpring(mouseY, {
    stiffness: 70,
    damping: 18,
    mass: 0.6,
  });

  const rotateX = useTransform(
    springY,
    [-0.5, 0.5],
    [9, -9]
  );

  const rotateY = useTransform(
    springX,
    [-0.5, 0.5],
    [-12, 12]
  );

  const handleMouseMove = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    mouseX.set(
      (event.clientX - rect.left) /
        rect.width -
        0.5
    );

    mouseY.set(
      (event.clientY - rect.top) /
        rect.height -
        0.5
    );
  };

  const materials = [
    {
      name: "Plywood",
      subtitle: "Warm · Versatile",
    },
    {
      name: "MDF",
      subtitle: "Smooth · Affordable",
    },
    {
      name: "Acrylic",
      subtitle: "Clear · Modern",
    },
  ];

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#F5F5F7]"
    >
      <nav className="relative z-50 mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{
              rotate: 8,
              scale: 1.05,
            }}
            className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#1D1D1F] text-sm font-bold text-white shadow-lg"
          >
            S
          </motion.div>

          <span className="text-[17px] font-semibold tracking-[-0.03em] text-[#1D1D1F]">
            ScrapSmart
          </span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {[
            ["Home", "#home"],
            ["Features", "#features"],
            ["How it works", "#how-it-works"],
            ["Impact", "#impact"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-[13px] font-medium text-[#86868B] transition hover:text-[#1D1D1F]"
            >
              {label}
            </a>
          ))}
        </div>

        <motion.button
          onClick={onStart}
          whileHover={{
            scale: 1.05,
            y: -2,
          }}
          whileTap={{
            scale: 0.96,
          }}
          className="group flex items-center gap-2 rounded-full bg-[#168A5B] px-5 py-3 text-[13px] font-semibold text-white shadow-[0_12px_35px_rgba(22,138,91,0.25)]"
        >
          Start optimizing
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </nav>

      <div className="relative z-20 mx-auto grid min-h-[calc(100vh-80px)] max-w-[1400px] items-center px-6 pb-24 pt-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-30 max-w-[650px]"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-4 py-2 text-[12px] font-medium text-[#4A4A4F] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#10B981]" />
            Smarter material planning
          </div>

          <h1 className="text-[clamp(4rem,7vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-[#1D1D1F]">
            Turn scrap
            <br />
            into{" "}
            <span className="text-[#24A66A]">
              possibility.
            </span>
          </h1>

          <p className="mt-8 max-w-[500px] text-[18px] leading-[1.55] text-[#6E6E73] sm:text-[20px]">
            Design smarter cutting plans, reuse what you
            already have, and make every sheet count.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <motion.button
              onClick={onStart}
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="group flex items-center gap-3 rounded-full bg-[#1D1D1F] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_20px_45px_rgba(0,0,0,0.18)]"
            >
              Start optimizing
              <ArrowRight className="h-5 w-5" />
            </motion.button>

            <div className="flex items-center gap-3 text-[12px] text-[#86868B]">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.07] bg-white">
                <MousePointer2 className="h-3.5 w-3.5" />
              </div>
              Move to explore
            </div>
          </div>
        </motion.div>

        <div className="relative mt-10 h-[580px] lg:mt-0 lg:h-[700px]">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.08] lg:h-[610px] lg:w-[610px]"
          />

          <motion.div
            style={{
              rotateX,
              rotateY,
              perspective: 1200,
            }}
            className="absolute inset-0"
          >
            {[
              {
                name: "Plywood",
                top: "8%",
                left: "10%",
                width: "76%",
                height: 175,
                rotate: -5,
                gradient:
                  "from-[#F5D7A8] via-[#E4BB83] to-[#B87D46]",
                edge: "#85572F",
              },
              {
                name: "MDF",
                top: "34%",
                left: "4%",
                width: "80%",
                height: 185,
                rotate: 3,
                gradient:
                  "from-[#CBA983] via-[#A77D57] to-[#705035]",
                edge: "#5A3E2A",
              },
              {
                name: "Acrylic",
                top: "57%",
                left: "15%",
                width: "78%",
                height: 170,
                rotate: 9,
                gradient:
                  "from-[#F8FAFC] via-[#E2E8F0] to-[#94A3B8]",
                edge: "#CBD5E1",
              },
            ].map((mat) => {
              const active =
                selectedMaterial === mat.name;

              return (
                <motion.button
                  key={mat.name}
                  type="button"
                  onClick={() =>
                    setSelectedMaterial(mat.name)
                  }
                  onMouseEnter={() =>
                    setHoveredMaterial(mat.name)
                  }
                  onMouseLeave={() =>
                    setHoveredMaterial(null)
                  }
                  animate={{
                    y: active ? -20 : [0, -8, 0],
                    rotate: mat.rotate,
                    scale: active
                      ? 1.08
                      : hoveredMaterial === mat.name
                        ? 1.04
                        : 1,
                  }}
                  transition={{
                    y: active
                      ? { duration: 0.45 }
                      : {
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                    scale: {
                      duration: 0.3,
                    },
                  }}
                  style={{
                    top: mat.top,
                    left: mat.left,
                    width: mat.width,
                    height: mat.height,
                  }}
                  className={`absolute overflow-hidden rounded-[9px] bg-gradient-to-br ${mat.gradient} shadow-[0_40px_80px_rgba(0,0,0,0.25)] ${
                    active
                      ? "ring-2 ring-[#10B981]/70"
                      : ""
                  }`}
                >
                  <div className="absolute inset-0 opacity-35 [background-image:repeating-linear-gradient(7deg,transparent_0px,transparent_7px,rgba(50,30,15,0.16)_8px,transparent_10px)]" />

                  <div
                    className="absolute inset-x-0 bottom-0 h-3"
                    style={{
                      background: mat.edge,
                    }}
                  />

                  <div className="absolute bottom-5 left-6 rounded-full bg-white px-3 py-1 text-[10px] font-bold">
                    {mat.name.toUpperCase()}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          <div className="absolute bottom-[0%] left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-black/[0.06] bg-white p-1.5 shadow-xl">
            {materials.map((mat) => (
              <button
                key={mat.name}
                onClick={() =>
                  setSelectedMaterial(mat.name)
                }
                className={`rounded-full px-4 py-2.5 text-xs font-semibold ${
                  selectedMaterial === mat.name
                    ? "bg-[#1D1D1F] text-white"
                    : "text-[#6E6E73] hover:bg-[#F5F5F7]"
                }`}
              >
                {mat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] text-[#86868B]">
        Scroll to explore
        <ArrowDown className="h-4 w-4" />
      </div>
    </section>
  );
}

/* =========================================================
   SCROLL PROGRESS
========================================================= */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "0%",
      }}
      className="fixed left-0 right-0 top-0 z-[200] h-[3px] bg-[#10B981]"
    />
  );
}

/* =========================================================
   STORY SECTION
========================================================= */

function StorySection({
  number,
  eyebrow,
  title,
  description,
  children,
  dark = false,
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [80, 0, -80]
  );

  return (
    <section
      ref={ref}
      className={`relative min-h-screen overflow-hidden px-5 py-28 sm:px-8 lg:px-12 lg:py-40 ${
        dark
          ? "bg-[#050706] text-white"
          : "bg-[#F5F5F7] text-[#1D1D1F]"
      }`}
    >
      <motion.div
        style={{ y }}
        className="relative z-10 mx-auto max-w-[1400px]"
      >
        <div className="mx-auto mb-20 max-w-[900px] text-center">
          <div
            className={`mb-5 text-xs font-bold uppercase tracking-[0.25em] ${
              dark
                ? "text-emerald-400"
                : "text-emerald-600"
            }`}
          >
            {number} · {eyebrow}
          </div>

          <h2
            className={`text-[clamp(3.2rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.065em] ${
              dark
                ? "text-white"
                : "text-[#1D1D1F]"
            }`}
          >
            {title}
          </h2>

          <p
            className={`mx-auto mt-8 max-w-2xl text-lg leading-8 sm:text-xl ${
              dark
                ? "text-white/50"
                : "text-[#6E6E73]"
            }`}
          >
            {description}
          </p>
        </div>

        {children}
      </motion.div>
    </section>
  );
}

/* =========================================================
   MATERIAL SHOWROOM
   SOLID / NO HAZE
========================================================= */

function MaterialShowroom({
  material,
  setMaterial,
}) {
  const [hovered, setHovered] = useState(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 100,
    damping: 20,
  });

  const springY = useSpring(mouseY, {
    stiffness: 100,
    damping: 20,
  });

  const rotateX = useTransform(
    springY,
    [-0.5, 0.5],
    [7, -7]
  );

  const rotateY = useTransform(
    springX,
    [-0.5, 0.5],
    [-10, 10]
  );

  const selected =
    MATERIALS.find(
      (m) => m.id === material.type
    ) || MATERIALS[0];

  const handleMove = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    mouseX.set(
      (event.clientX - rect.left) /
        rect.width -
        0.5
    );

    mouseY.set(
      (event.clientY - rect.top) /
        rect.height -
        0.5
    );
  };

  const getSurface = (mat) => {
    const kind = mat?.three?.kind;

    if (kind === "wood") {
      return `repeating-linear-gradient(92deg, ${mat.base} 0px, ${mat.edge} 2px, ${mat.base} 7px, #C99A69 12px, ${mat.base} 18px)`;
    }

    if (kind === "mdf") {
      return `linear-gradient(135deg, #D9B984, ${mat.base}, #8F6846)`;
    }

    if (kind === "acrylic") {
      return `linear-gradient(120deg, #F8FAFC, ${mat.base}, #B8E1F8, #F8FAFC)`;
    }

    if (kind === "cardboard") {
      return `repeating-linear-gradient(90deg, ${mat.base} 0px, ${mat.edge} 3px, ${mat.base} 8px)`;
    }

    if (kind === "metal") {
      return `linear-gradient(105deg, #686F76, ${mat.base}, #F4F6F7, #858C93, #DDE1E4, #747B82)`;
    }

    return `linear-gradient(135deg, ${mat.base}, ${mat.edge})`;
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
      <div
        onMouseMove={handleMove}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
        className="relative flex min-h-[560px] items-center justify-center"
        style={{
          perspective: 1400,
        }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative h-[330px] w-[80%] max-w-[720px]"
        >
          <div
            className="absolute left-5 right-[-6px] top-7 h-[315px] rounded-[28px]"
            style={{
              background:
                selected.edge || "#6B4A32",
              transform:
                "translateZ(-35px)",
              filter:
                "brightness(.52)",
            }}
          />

          <motion.div
            animate={{
              y: hovered ? -10 : 0,
              scale: hovered ? 1.025 : 1,
            }}
            className="absolute inset-0 overflow-hidden rounded-[28px]"
            style={{
              background:
                getSurface(selected),
              boxShadow:
                "0 55px 100px rgba(0,0,0,.22), inset 0 2px 3px rgba(255,255,255,.7), inset 0 -30px 45px rgba(0,0,0,.12)",
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  selected.three?.kind ===
                  "metal"
                    ? "repeating-linear-gradient(90deg,rgba(255,255,255,.28) 0px,transparent 1px,transparent 5px)"
                    : "repeating-linear-gradient(0deg,rgba(255,255,255,.08) 0px,transparent 2px,transparent 7px)",
              }}
            />

            <div className="absolute left-8 right-8 top-6 h-px bg-white/60" />

            <div className="absolute bottom-7 left-7 rounded-full border border-white/30 bg-white px-4 py-2 text-xs font-bold tracking-[0.16em]">
              {selected.name?.toUpperCase()}
            </div>
          </motion.div>

          <div
            className="absolute bottom-[-12px] left-4 right-4 h-7 rounded-b-xl"
            style={{
              background: `linear-gradient(180deg, ${
                selected.edge || "#6B4A32"
              }, #222)`,
            }}
          />
        </motion.div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-xs font-semibold shadow-xl">
          Move your cursor to inspect
        </div>
      </div>

      <div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-4 py-2 text-xs font-semibold shadow-sm">
          <Move3D className="h-3.5 w-3.5 text-emerald-600" />
          Interactive material
        </div>

        <h3 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
          Your material
          <br />
          has a personality.
        </h3>

        <p className="mt-6 max-w-xl text-base leading-7 text-[#6E6E73]">
          ScrapSmart doesn't treat every sheet like an
          anonymous rectangle. Choose the material you're
          actually working with and the rest of the
          experience adapts around it.
        </p>

        <div className="mt-9 grid gap-3 sm:grid-cols-2">
          {MATERIALS.map((mat) => {
            const active =
              material.type === mat.id;

            return (
              <motion.button
                key={mat.id}
                type="button"
                onClick={() => {
                  setMaterial((prev) => ({
                    ...prev,
                    type: mat.id,
                  }));
                  setHovered(mat.id);
                }}
                onMouseEnter={() =>
                  setHovered(mat.id)
                }
                onMouseLeave={() =>
                  setHovered(null)
                }
                whileHover={{
                  y: -5,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className={`group relative overflow-hidden rounded-[24px] border bg-white p-4 text-left transition-all ${
                  active
                    ? "border-emerald-400 shadow-[0_25px_60px_rgba(16,185,129,.12)]"
                    : "border-black/[0.06] hover:border-emerald-300"
                }`}
              >
                <div
                  className="mb-4 h-20 rounded-[16px] shadow-inner"
                  style={{
                    background:
                      getSurface(mat),
                  }}
                />

                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">
                      {mat.name}
                    </div>

                    <div className="mt-1 text-xs text-[#86868B]">
                      {mat.tagline}
                    </div>
                  </div>

                  {active && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981] text-white">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>

                {active && (
                  <div className="mt-3 text-xs leading-5 text-[#6E6E73]">
                    Selected because your actual
                    material determines the available
                    sheet, cost, kerf, and optimization
                    possibilities.
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            ["Surface", selected.name],
            ["Type", selected.three?.kind || "material"],
            ["Status", "Ready"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-[20px] bg-white p-4"
            >
              <div className="text-[10px] uppercase tracking-[0.14em] text-[#86868B]">
                {label}
              </div>

              <div className="mt-2 truncate text-sm font-semibold">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   STEP NAV
========================================================= */

function AppleStepNav({
  currentStep,
  onStep,
}) {
  const steps = [
    {
      number: 1,
      title: "Material",
      icon: Box,
    },
    {
      number: 2,
      title: "Pieces",
      icon: Layers,
    },
    {
      number: 3,
      title: "Optimize",
      icon: Wand2,
    },
    {
      number: 4,
      title: "Results",
      icon: BarChart3,
    },
  ];

  return (
    <div className="sticky top-4 z-[150] mx-auto mb-[-30px] w-fit max-w-[calc(100vw-24px)]">
      <div className="rounded-full border border-black/[0.06] bg-white p-1.5 shadow-[0_20px_60px_rgba(0,0,0,.08)]">
        <div className="flex items-center gap-1">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const active =
              currentStep === item.number;
            const complete =
              currentStep > item.number;

            return (
              <React.Fragment key={item.number}>
                <motion.button
                  type="button"
                  onClick={() =>
                    onStep(item.number)
                  }
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  className={`relative flex items-center gap-2 rounded-full px-3 py-2.5 sm:px-4 ${
                    active
                      ? "bg-[#1D1D1F] text-white"
                      : "text-[#6E6E73] hover:bg-[#F5F5F7]"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      active
                        ? "bg-white/10"
                        : complete
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-[#F5F5F7]"
                    }`}
                  >
                    {complete ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Icon className="h-3.5 w-3.5" />
                    )}
                  </span>

                  <span className="hidden text-xs font-semibold sm:block">
                    {item.title}
                  </span>
                </motion.button>

                {index <
                  steps.length - 1 && (
                  <div className="h-px w-3 bg-black/[0.08]" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MATERIAL PAGE
========================================================= */

function MaterialPage({
  material,
  setMaterial,
  setStep,
}) {
  return (
    <div>
      <StorySection
        number="01"
        eyebrow="Material"
        title={
          <>
            Start with
            <br />
            what you have.
          </>
        }
        description="Before ScrapSmart plans a single cut, it understands the physical material in front of you."
      >
        <MaterialShowroom
          material={material}
          setMaterial={setMaterial}
        />
      </StorySection>

      <StorySection
        number="01.2"
        eyebrow="The canvas"
        title={
          <>
            Every sheet
            <br />
            starts somewhere.
          </>
        }
        description="Define the sheet you actually have. Width, height, thickness and cutting constraints become part of the plan."
      >
        <div className="mx-auto max-w-5xl rounded-[40px] border border-black/[0.06] bg-white p-6 shadow-[0_40px_100px_rgba(0,0,0,.07)] sm:p-10">
          <SheetConfig />
        </div>
      </StorySection>

      <StorySection
        number="01.3"
        eyebrow="Reuse"
        title={
          <>
            And maybe
            <br />
            you already have enough.
          </>
        }
        description="Existing offcuts can become the first pieces of the next project instead of becoming waste."
      >
        <div className="mx-auto max-w-5xl rounded-[40px] border border-black/[0.06] bg-white p-6 shadow-[0_40px_100px_rgba(0,0,0,.07)] sm:p-10">
          <ReuseStockPanel />
        </div>

        <div className="mt-16 flex justify-center">
          <motion.button
            onClick={() => setStep(2)}
            whileHover={{
              scale: 1.04,
              y: -3,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="flex items-center gap-3 rounded-full bg-[#1D1D1F] px-8 py-4 text-sm font-semibold text-white shadow-[0_25px_60px_rgba(0,0,0,.18)]"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </StorySection>
    </div>
  );
}

/* =========================================================
   PIECES PAGE
========================================================= */

function PiecesPage({
  pieces,
  totalPieces,
  totalArea,
  unit,
  setStep,
}) {
  return (
    <div>
      <StorySection
        number="02"
        eyebrow="Pieces"
        title={
          <>
            Now give the
            <br />
            material a purpose.
          </>
        }
        description="Every part you add becomes another constraint the optimizer can solve."
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
                Your project
              </div>

              <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
                Build the pieces.
              </h3>
            </div>

            <div className="rounded-full bg-white px-5 py-3 text-sm shadow-[0_15px_40px_rgba(0,0,0,.06)]">
              <span className="text-[#86868B]">
                {totalPieces} pieces
              </span>
            </div>
          </div>

          <div className="overflow-hidden rounded-[40px] border border-black/[0.06] bg-white p-6 shadow-[0_40px_100px_rgba(0,0,0,.07)] sm:p-10">
            <CutListTable />
          </div>
        </div>
      </StorySection>

      <StorySection
        number="02.2"
        eyebrow="Spatial thinking"
        title={
          <>
            You describe
            <br />
            the result.
            <br />
            ScrapSmart solves
            <br />
            the space.
          </>
        }
        description="You don't need to manually place every rectangle. That's what the optimization engine is for."
      >
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
          {[
            [
              Ruler,
              "Dimensions",
              "Exact width and height.",
            ],
            [
              Layers,
              "Quantity",
              "Every required piece.",
            ],
            [
              Rotate3D,
              "Orientation",
              "Rotation constraints.",
            ],
          ].map(
            ([Icon, title, text]) => (
              <motion.div
                key={title}
                whileHover={{
                  y: -8,
                }}
                className="rounded-[30px] bg-white p-7 shadow-[0_25px_70px_rgba(0,0,0,.06)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F5F7]">
                  <Icon className="h-5 w-5 text-emerald-600" />
                </div>

                <h3 className="mt-7 text-lg font-semibold">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6E6E73]">
                  {text}
                </p>
              </motion.div>
            )
          )}
        </div>
      </StorySection>

      <StorySection
        number="02.3"
        eyebrow="Ready"
        title={
          <>
            The material knows
            <br />
            what it needs.
          </>
        }
        description={`Your project currently needs approximately ${areaInUnit(
          totalArea,
          unit === "mm"
            ? "cm"
            : unit
        )?.toFixed(0) || "—"} ${unit === "in" ? "in²" : "cm²"} of material.`}
      >
        <div className="flex justify-center">
          <motion.button
            disabled={pieces.length === 0}
            onClick={() => setStep(3)}
            whileHover={{
              scale: 1.04,
              y: -3,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="flex items-center gap-3 rounded-full bg-[#1D1D1F] px-8 py-4 text-sm font-semibold text-white shadow-[0_25px_60px_rgba(0,0,0,.18)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Let ScrapSmart think
            <Sparkles className="h-4 w-4 text-emerald-400" />
          </motion.button>
        </div>
      </StorySection>
    </div>
  );
}

/* =========================================================
   OPTIMIZE PAGE
========================================================= */

function OptimizePage({
  material,
  matDef,
  totalPieces,
  strategy,
  optimizing,
  optimizationError,
  runOptimization,
}) {
  return (
    <div>
      <StorySection
        number="03"
        eyebrow="Optimize"
        dark
        title={
          <>
            There is more
            <br />
            than one way
            <br />
            to use a sheet.
          </>
        }
        description="ScrapSmart searches the available material and finds a layout according to the strategy you choose."
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["Material", matDef.name],
              [
                "Sheet",
                `${material.sheetWidth} × ${material.sheetHeight} mm`,
              ],
              ["Pieces", totalPieces],
              ["Kerf", `${material.kerf} mm`],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5"
              >
                <div className="text-xs text-white/35">
                  {label}
                </div>

                <div className="mt-2 truncate font-semibold text-white">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-6">
              <div className="mb-5 flex items-center gap-3">
                <Recycle className="h-5 w-5 text-emerald-400" />

                <div>
                  <div className="text-sm font-semibold text-white">
                    Existing material
                  </div>

                  <div className="text-xs text-white/35">
                    Reuse it before buying more.
                  </div>
                </div>
              </div>

              <ReuseStockPanel />
            </div>

            <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-6">
              <div className="mb-5 flex items-center gap-3">
                <Wand2 className="h-5 w-5 text-emerald-400" />

                <div>
                  <div className="text-sm font-semibold text-white">
                    Strategy
                  </div>

                  <div className="text-xs text-white/35">
                    Decide what matters most.
                  </div>
                </div>
              </div>

              <StrategySelector settings />
            </div>
          </div>

          {optimizationError && (
            <div className="mt-5 rounded-[24px] border border-red-400/20 bg-red-500/10 p-5 text-sm text-red-300">
              {optimizationError}
            </div>
          )}

          <div className="mt-8 text-center">
            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() =>
                runOptimization(strategy)
              }
              disabled={optimizing}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-9 py-5 text-base font-semibold text-[#1D1D1F] shadow-[0_30px_80px_rgba(0,0,0,.3)] disabled:opacity-50"
            >
              {optimizing ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Sparkles className="h-5 w-5 text-emerald-500" />
              )}

              {optimizing
                ? "Thinking about your material…"
                : "Optimize this material"}

              {!optimizing && (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </motion.button>

            {optimizing && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mt-7 text-sm text-white/35"
              >
                Exploring possible layouts…
              </motion.div>
            )}
          </div>
        </div>
      </StorySection>
    </div>
  );
}

/* =========================================================
   RESULTS PAGE
========================================================= */

function ResultsPage({
  layout,
  strategy,
  matDef,
  totalPieces,
  projectId,
  setStep,
}) {
  if (!layout) {
    return (
      <StorySection
        number="04"
        eyebrow="Results"
        title={
          <>
            Your material
            <br />
            is waiting.
          </>
        }
        description="Run the optimizer and ScrapSmart will turn your inputs into a real cutting plan."
      >
        <div className="flex justify-center">
          <button
            onClick={() => setStep(3)}
            className="rounded-full bg-[#1D1D1F] px-8 py-4 text-sm font-semibold text-white"
          >
            Back to Optimize
          </button>
        </div>
      </StorySection>
    );
  }

  return (
    <div>
      <StorySection
        number="04"
        eyebrow="Results"
        dark
        title={
          <>
            This is what
            <br />
            your material
            <br />
            can become.
          </>
        }
        description={`${matDef.name} · ${totalPieces} pieces · ${layout.status}`}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
                <Check className="h-4 w-4" />
                Optimization complete
              </div>

              <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {strategy === "fastest" &&
                layout.status ===
                  "complete"
                  ? "Fastest Valid Plan Found"
                  : STRATEGY_NAMES[
                      strategy
                    ]}
              </h3>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10">
              <Check className="h-7 w-7 text-emerald-400" />
            </div>
          </div>

          {layout.additionalSheetsFound !== null && (
            <div className="mb-5 rounded-[24px] border border-amber-400/20 bg-amber-400/10 p-5 text-sm text-amber-200">
              A complete plan was found with{" "}
              {layout.additionalSheetsFound}{" "}
              additional sheet(s).
            </div>
          )}

          {layout.validation &&
            !layout.validation.valid && (
              <div className="mb-5 rounded-[24px] border border-red-400/20 bg-red-500/10 p-5 text-sm text-red-300">
                Layout validation found issues:{" "}
                {layout.validation.errors
                  .slice(0, 2)
                  .join("; ")}
              </div>
            )}

          {layout.unplaced?.length > 0 && (
            <div className="mb-5 rounded-[24px] border border-amber-400/20 bg-amber-400/10 p-5 text-sm text-amber-200">
              {layout.unplaced.length} piece(s)
              could not be placed:{" "}
              {layout.unplaced
                .map((p) => p.name)
                .join(", ")}
            </div>
          )}

          {layout.rejectedStock?.length > 0 && (
            <div className="mb-5 rounded-[24px] border border-amber-400/20 bg-amber-400/10 p-5 text-sm text-amber-200">
              <p className="font-semibold">
                Some selected offcuts were excluded.
              </p>

              <ul className="mt-2 space-y-1">
                {layout.rejectedStock.map(
                  (stock, index) => (
                    <li
                      key={`${stock.id}-${index}`}
                    >
                      {stock.id}: {stock.reason}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {layout.valid && (
            <div className="overflow-hidden rounded-[38px] bg-white p-4 shadow-[0_40px_120px_rgba(0,0,0,.3)] sm:p-7">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-[#86868B]">
                    Physical layout
                  </div>

                  <h3 className="mt-1 text-xl font-semibold">
                    Every piece has a place.
                  </h3>
                </div>

                <Move3D className="h-5 w-5 text-emerald-500" />
              </div>

              <Workspace />
            </div>
          )}
        </div>
      </StorySection>

      <StorySection
        number="04.2"
        eyebrow="The numbers"
        title={
          <>
            Better use
            <br />
            you can measure.
          </>
        }
        description="The visual result is only half the story. Here's what the plan means in material, waste, cost and production terms."
      >
        <div className="mx-auto max-w-6xl rounded-[40px] border border-black/[0.06] bg-white p-6 shadow-[0_40px_100px_rgba(0,0,0,.07)] sm:p-10">
          <AnalyticsDashboard />
        </div>
      </StorySection>

      <StorySection
        number="04.3"
        eyebrow="Reuse"
        title={
          <>
            Today's leftover
            <br />
            is tomorrow's material.
          </>
        }
        description="Save useful offcuts so the next project starts with material you already own."
      >
        <div className="mx-auto max-w-6xl rounded-[40px] border border-black/[0.06] bg-white p-6 shadow-[0_40px_100px_rgba(0,0,0,.07)] sm:p-10">
          <OffcutCapture
            key={projectId + strategy}
          />
        </div>
      </StorySection>

      <StorySection
        number="04.4"
        eyebrow="Transformation"
        title={
          <>
            From a sheet
            <br />
            to something useful.
          </>
        }
        description="See the difference between starting with raw material and ending with a purposeful set of pieces."
      >
        <div className="mx-auto max-w-6xl rounded-[40px] border border-black/[0.06] bg-white p-6 shadow-[0_40px_100px_rgba(0,0,0,.07)] sm:p-10">
          <BeforeAfter />
        </div>
      </StorySection>

      <StorySection
        number="04.5"
        eyebrow="Make it real"
        dark
        title={
          <>
            Now watch
            <br />
            the material move.
          </>
        }
        description="The plan becomes a sequence of physical actions."
      >
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.04] p-5">
          <Accordion
            type="multiple"
            className="w-full"
          >
            <AccordionItem
              value="animation"
              className="border-0"
            >
              <AccordionTrigger className="px-4 text-white">
                <span className="flex items-center gap-3">
                  <PlayCircle className="h-5 w-5 text-emerald-400" />
                  {strategy === "fastest"
                    ? "Watch the validated cutting sequence"
                    : "Watch pieces move into position"}
                </span>
              </AccordionTrigger>

              <AccordionContent className="px-4">
                {layout.valid &&
                  (strategy === "fastest" ? (
                    <CuttingSequence />
                  ) : (
                    <OptimizationAnimation
                      height={420}
                    />
                  ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </StorySection>

      <StorySection
        number="04.6"
        eyebrow="Take it with you"
        title={
          <>
            Your plan.
            <br />
            Ready to make.
          </>
        }
        description="Export the validated result produced by your existing optimization engine."
      >
        <div className="mx-auto max-w-6xl rounded-[40px] bg-[#1D1D1F] p-7 text-white shadow-[0_40px_100px_rgba(0,0,0,.2)] sm:p-12">
          <div className="flex items-start gap-4">
            <Download className="mt-1 h-6 w-6 text-emerald-400" />

            <div>
              <h3 className="text-3xl font-semibold tracking-tight">
                Take the plan into production.
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/45">
                Export exactly what ScrapSmart calculated.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <ExportBar />
          </div>
        </div>
      </StorySection>

      <StorySection
        number="04.7"
        eyebrow="Inspect"
        title={
          <>
            Every piece
            <br />
            has a story.
          </>
        }
        description="Explore individual pieces and understand exactly how they fit into the final plan."
      >
        <div className="mx-auto max-w-6xl rounded-[40px] border border-black/[0.06] bg-white p-5 shadow-[0_40px_100px_rgba(0,0,0,.07)]">
          <Accordion
            type="single"
            collapsible
          >
            <AccordionItem
              value="inspector"
              className="border-0"
            >
              <AccordionTrigger className="px-5">
                <span className="flex items-center gap-3">
                  <Box className="h-5 w-5 text-emerald-500" />
                  Explore individual pieces
                </span>
              </AccordionTrigger>

              <AccordionContent className="px-5">
                <PieceInspector />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </StorySection>

      <section className="relative overflow-hidden bg-[#F5F5F7] px-6 py-40 text-center">
        <div className="relative mx-auto max-w-4xl">
          <motion.div
            initial={{
              scale: 0.7,
              opacity: 0,
            }}
            whileInView={{
              scale: 1,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0_25px_70px_rgba(0,0,0,.08)]"
          >
            <Recycle className="h-8 w-8 text-[#159C62]" />
          </motion.div>

          <h2 className="mt-9 text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
            Less waste.
            <br />
            <span className="text-[#24A66A]">
              More possibility.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-[#6E6E73]">
            The material was already valuable.
            ScrapSmart simply helped you see what it
            could become.
          </p>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   MAIN HOME
========================================================= */

export default function Home() {
  const {
    projectId,
    step,
    setStep,
    material,
    setMaterial,
    pieces,
    layout,
    optimizing,
    runOptimization,
    matDef,
    strategy,
    optimizationError,
  } = useProject();

  const [showLanding, setShowLanding] =
    useState(true);

  const totalPieces = pieces.reduce(
    (sum, piece) =>
      sum +
      Math.max(
        1,
        Math.round(piece.quantity || 1)
      ),
    0
  );

  const totalArea = pieces.reduce(
    (sum, piece) =>
      sum +
      piece.width *
        piece.height *
        Math.max(
          1,
          Math.round(piece.quantity || 1)
        ),
    0
  );

  const unit = material.unit;

  if (showLanding) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-[#F5F5F7]">
        <AppleHero
          onStart={() => {
            setShowLanding(false);
            setStep(1);

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        />

        <section
          id="how-it-works"
          className="relative overflow-hidden bg-white px-6 py-40"
        >
          <div className="mx-auto max-w-6xl text-center">
            <div className="apple-eyebrow">
              The idea
            </div>

            <h2 className="mt-5 text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.065em]">
              Your material
              <br />
              is already there.
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#6E6E73]">
              Instead of starting with what you need to
              buy, ScrapSmart starts with what you already
              have.
            </p>

            <div className="mt-24 grid gap-5 md:grid-cols-3">
              {[
                [
                  "01",
                  "Understand",
                  "See your real material as a physical object.",
                ],
                [
                  "02",
                  "Think",
                  "Explore layouts before you waste a cut.",
                ],
                [
                  "03",
                  "Make",
                  "Turn the plan into real pieces.",
                ],
              ].map(([number, title, text], i) => (
                <motion.div
                  key={number}
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.7,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="rounded-[34px] bg-[#F5F5F7] p-8 text-left"
                >
                  <div className="text-xs font-bold tracking-[0.2em] text-emerald-600">
                    {number}
                  </div>

                  <h3 className="mt-16 text-2xl font-semibold tracking-tight">
                    {title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#6E6E73]">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="impact"
          className="relative overflow-hidden bg-[#050706] px-6 py-40 text-white"
        >
          <div className="relative mx-auto max-w-6xl text-center">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
              ScrapSmart
            </div>

            <h2 className="mt-6 text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-[0.88] tracking-[-0.07em]">
              Use more.
              <br />
              Waste less.
              <br />
              <span className="text-emerald-400">
                Make more.
              </span>
            </h2>

            <motion.button
              onClick={() => {
                setShowLanding(false);
                setStep(1);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="mt-12 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#1D1D1F]"
            >
              Enter ScrapSmart
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F5F5F7] p-4 sm:p-6">
      <ScrollProgress />

      <header className="fixed left-0 right-0 top-0 z-[140] border-b border-black/[0.04] bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-3.5 sm:px-8">
          <button
            type="button"
            onClick={() => {
              setShowLanding(true);

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#1D1D1F] text-sm font-bold text-white">
              S
            </div>

            <span className="font-semibold tracking-tight">
              ScrapSmart
            </span>
          </button>

          <div className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-xs text-[#6E6E73] shadow-sm sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Building your material story
          </div>
        </div>
      </header>

      <main className="pt-[64px]">
        <AppleStepNav
          currentStep={step}
          onStep={(next) => {
            setStep(next);

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        />

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="material"
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -40,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <MaterialPage
                material={material}
                setMaterial={setMaterial}
                setStep={setStep}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="pieces"
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -40,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <PiecesPage
                pieces={pieces}
                totalPieces={totalPieces}
                totalArea={totalArea}
                unit={unit}
                setStep={setStep}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="optimize"
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -40,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <OptimizePage
                material={material}
                matDef={matDef}
                totalPieces={totalPieces}
                strategy={strategy}
                optimizing={optimizing}
                optimizationError={
                  optimizationError
                }
                runOptimization={
                  runOptimization
                }
              />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="results"
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -40,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ResultsPage
                layout={layout}
                strategy={strategy}
                matDef={matDef}
                totalPieces={totalPieces}
                projectId={projectId}
                setStep={setStep}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
