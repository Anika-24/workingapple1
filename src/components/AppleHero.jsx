// src/components/RealMaterialStage.jsx

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MATERIALS } from "@/lib/materials";

const MATERIAL_IMAGES = {
  wood: "/materials/wood-real.jpg",
  metal: "/materials/metal-real.jpg",
  acrylic: "/materials/acrylic-real.jpg",
  mdf: "/materials/mdf-real.jpg",
  cardboard: "/materials/cardboard-real.jpg",
};

const MATERIAL_STORIES = {
  wood: {
    eyebrow: "Natural material",
    title: "Warm. Real. Crafted.",
    body: "Wood brings natural grain, warmth, and a tactile surface to the finished piece.",
  },
  metal: {
    eyebrow: "Precision material",
    title: "Clean. Strong. Precise.",
    body: "Metal gives the project a refined industrial surface with a crisp, engineered character.",
  },
  acrylic: {
    eyebrow: "Light-catching material",
    title: "Clear. Brilliant. Modern.",
    body: "Acrylic lets light travel through the material, creating a clean contemporary finish.",
  },
  mdf: {
    eyebrow: "Engineered material",
    title: "Smooth. Stable. Reliable.",
    body: "MDF gives you a consistent surface that is especially useful for painted or finished parts.",
  },
  cardboard: {
    eyebrow: "Reuse material",
    title: "Simple. Light. Useful.",
    body: "Cardboard turns an everyday leftover into another usable piece instead of sending it to waste.",
  },
};

function getKind(material) {
  return (
    material?.three?.kind ||
    material?.kind ||
    material?.id ||
    "wood"
  );
}

function MaterialObject({ material }) {
  const ref = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const kind = getKind(material);
  const image = MATERIAL_IMAGES[kind] || MATERIAL_IMAGES.wood;

  const handleMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();

    if (!rect) return;

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setRotation({
      x: (0.5 - y) * 14,
      y: (x - 0.5) * 18,
    });
  };

  const handleLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative h-[480px] sm:h-[560px] flex items-center justify-center"
      style={{ perspective: "1400px" }}
    >
      {/* Realistic floor shadow */}
      <motion.div
        className="absolute bottom-[65px] left-1/2 w-[68%] h-[55px] -translate-x-1/2 rounded-[50%] bg-black/20 blur-2xl"
        animate={{
          scaleX: 1 + Math.abs(rotation.y) / 120,
          opacity: 0.18 + Math.abs(rotation.x) / 100,
        }}
      />

      {/* Material */}
      <motion.div
        className="relative w-[76%] max-w-[620px]"
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          y: -Math.abs(rotation.y) * 0.35,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 22,
          mass: 0.8,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Thickness */}
        <div
          className="absolute inset-0 rounded-[26px] bg-black/25"
          style={{
            transform: "translateZ(-18px) translateY(18px)",
            filter: "blur(1px)",
          }}
        />

        {/* Actual photographed material */}
        <div
          className="relative aspect-[1.45/1] overflow-hidden rounded-[26px]"
          style={{
            transformStyle: "preserve-3d",
            boxShadow:
              "0 45px 80px rgba(0,0,0,.22), 0 12px 25px rgba(0,0,0,.12)",
          }}
        >
          <img
            src={image}
            alt={`${material?.name || kind} material`}
            draggable="false"
            className="absolute inset-0 h-full w-full object-cover select-none"
          />

          {/* Physical light reflection */}
          <motion.div
            className="absolute inset-y-0 -left-1/2 w-[45%] skew-x-[-18deg] bg-white/20 blur-2xl pointer-events-none"
            animate={{
              x: ["0%", "330%"],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: "easeInOut",
            }}
          />

          {/* Subtle glass-free highlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,.18), transparent 35%, transparent 72%, rgba(0,0,0,.12))",
            }}
          />
        </div>

        {/* Physical edge */}
        <div
          className="absolute left-0 right-0 bottom-0 h-[18px] rounded-b-[20px] bg-black/20"
          style={{
            transform: "translateZ(-8px) translateY(17px)",
          }}
        />
      </motion.div>
    </div>
  );
}

export default function RealMaterialStage({
  material,
  setMaterial,
}) {
  const kind = getKind(material);
  const story = MATERIAL_STORIES[kind] || MATERIAL_STORIES.wood;

  return (
    <section className="relative overflow-hidden bg-[#f5f5f7]">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16 py-20 lg:py-28">

        <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-20 items-center">

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-sm font-semibold tracking-[.14em] uppercase text-[#16a34a]">
              {story.eyebrow}
            </div>

            <h2 className="mt-5 text-[clamp(3rem,6vw,6.5rem)] leading-[.92] tracking-[-.065em] font-semibold text-[#1d1d1f]">
              {story.title}
            </h2>

            <p className="mt-7 max-w-xl text-xl leading-8 text-[#6e6e73]">
              {story.body}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {MATERIALS.map((item) => {
                const itemKind = getKind(item);
                const active =
                  material?.type === item.id ||
                  kind === itemKind;

                return (
                  <button
                    key={item.id}
                    onClick={() =>
                      setMaterial((prev) => ({
                        ...prev,
                        type: item.id,
                      }))
                    }
                    className={`
                      px-5 py-3 rounded-full text-sm font-semibold
                      border transition-all duration-300
                      ${
                        active
                          ? "bg-[#1d1d1f] text-white border-[#1d1d1f]"
                          : "bg-white text-[#1d1d1f] border-black/10 hover:border-black/25 hover:-translate-y-0.5"
                      }
                    `}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Real material */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <MaterialObject material={material} />
          </motion.div>
        </div>
      </div>
    </section>
  );