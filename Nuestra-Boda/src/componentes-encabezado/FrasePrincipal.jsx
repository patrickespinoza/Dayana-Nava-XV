"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function FrasePremium() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative flex flex-col items-center justify-center py-32 px-6 text-center overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at top left, rgba(255,255,255,0.06), transparent 20%),
          radial-gradient(circle at bottom right, rgba(255,255,255,0.04), transparent 25%),
          linear-gradient(
            145deg,
            #3a1f1f 0%,
            #241212 40%,
            #120909 100%
          )
        `,
      }}
    >

      {/* PARTÍCULAS GLOW */}
      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full blur-3xl opacity-20"
        style={{
          background: "rgba(212,175,55,0.25)",
          top: "-120px",
          left: "-120px",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.18, 0.28, 0.18],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[320px] h-[320px] rounded-full blur-3xl opacity-10"
        style={{
          background: "rgba(255,255,255,0.15)",
          bottom: "-80px",
          right: "-80px",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* TEXTURA */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(255,255,255,0.12) 0px,
              rgba(255,255,255,0.12) 1px,
              transparent 1px,
              transparent 6px
            )
          `,
        }}
      />

      {/* BORDE SUPERIOR */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

      {/* CONTENIDO */}
      <div className="relative z-10 max-w-4xl">

        {/* COMILLAS */}
        <motion.div
          className="mb-6"
          animate={{
            opacity: [0.6, 1, 0.6],
            y: [0, -4, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span
            className="text-[70px] md:text-[90px] leading-none"
            style={{
              color: "rgba(212,175,55,0.22)",
              fontFamily: "serif",
            }}
          >
            “
          </span>
        </motion.div>

        {/* FRASE */}
        <motion.p
          className="text-[24px] sm:text-[32px] md:text-[42px] leading-relaxed font-light"
          style={{
            background: `
              linear-gradient(
                180deg,
                #fffdf8 0%,
                #f4dfb8 35%,
                #d4af37 65%,
                #8f6b1d 100%
              )
            `,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: `
              0 2px 10px rgba(212,175,55,0.08),
              0 8px 30px rgba(0,0,0,0.2)
            `,
          }}
          animate={{
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Te quiero no por quien eres,
          <br />
          sino por quien soy
          <br />
          cuando estoy contigo.
        </motion.p>

        {/* LÍNEA ELEGANTE */}
        <motion.div
          className="w-32 h-[1px] mx-auto my-10"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(212,175,55,0.7), transparent)",
          }}
          animate={{
            width: ["90px", "130px", "90px"],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* AUTOR */}
        <motion.p
          className="text-[11px] md:text-[13px] uppercase tracking-[0.5em]"
          style={{
            color: "#c8a96b",
            textShadow: "0 2px 10px rgba(0,0,0,0.35)",
          }}
          animate={{
            letterSpacing: ["0.45em", "0.55em", "0.45em"],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Gabriel García Márquez
        </motion.p>

      </div>

      {/* BORDE INFERIOR */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

    </motion.div>
  );
}