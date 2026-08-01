import React from "react";
import { motion } from "framer-motion";

const DressCodePremium = () => {
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative flex items-center justify-center px-5 py-24 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at top left, rgba(255,255,255,0.05), transparent 18%),
          radial-gradient(circle at bottom right, rgba(255,255,255,0.04), transparent 22%),
          linear-gradient(
            145deg,
            #f8f4ee 0%,
            #efe4d2 38%,
            #dcc4a3 100%
          )
        `,
      }}
    >

      {/* GLOW 1 */}
      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full blur-3xl opacity-20"
        style={{
          background: "rgba(212,175,55,0.18)",
          top: "-120px",
          left: "-120px",
        }}
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* GLOW 2 */}
      <motion.div
        className="absolute w-[320px] h-[320px] rounded-full blur-3xl opacity-10"
        style={{
          background: "rgba(255,255,255,0.3)",
          bottom: "-100px",
          right: "-100px",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.18, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* TEXTURA */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(0,0,0,0.08) 0px,
              rgba(0,0,0,0.08) 1px,
              transparent 1px,
              transparent 6px
            )
          `,
        }}
      />

      {/* CARD */}
      <motion.div
        className="relative overflow-hidden rounded-[38px] px-8 py-14 md:px-14 md:py-16 max-w-xl w-full text-center"
        style={{
          background: `
            linear-gradient(
              145deg,
              rgba(255,255,255,0.72),
              rgba(255,255,255,0.35)
            )
          `,
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.4)",
          boxShadow: `
            0 25px 60px rgba(0,0,0,0.12),
            inset 0 1px 0 rgba(255,255,255,0.6)
          `,
        }}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >

        {/* BRILLO */}
        <motion.div
          className="absolute top-0 left-[-120%] w-[120%] h-full bg-white/10 skew-x-12"
          animate={{
            left: ["-120%", "140%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* TITULO PEQUEÑO */}
        <motion.p
          className="uppercase text-[11px] tracking-[0.3em] md:tracking-[0.5em]"
          style={{
            color: "#9b7b52",
          }}
          animate={{
            letterSpacing: ["0.3em", "0.45em", "0.3em"],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        >
          DETALLES
        </motion.p>

        {/* TITULO */}
        <motion.h1
          className="mt-6 text-[42px] md:text-[60px] font-cormorant leading-none font-semibold"
          style={{
            color: "#5b3d24",
            textShadow: `
              0 2px 10px rgba(255,255,255,0.45),
              0 4px 20px rgba(0,0,0,0.08)
            `,
            letterSpacing: "0.02em",
          }}
          animate={{
            y: [0, -2, 0],
            opacity: [0.92, 1, 0.92],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Código de Vestimenta
        </motion.h1>

        {/* DIVISOR */}
        <motion.div
          className="relative flex justify-center items-center my-10"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        >

          <motion.div
            className="h-[1px]"
            style={{
              width: "90px",
              background:
                "linear-gradient(to right, transparent, rgba(180,140,80,0.7))",
            }}
            animate={{
              width: ["70px", "95px", "70px"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />

          <motion.div
            className="relative mx-5"
            animate={{
              rotate: [0, 4, -4, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
          >

            <div className="absolute inset-0 blur-xl bg-[#d4af37]/20 scale-150 rounded-full" />

            <div
              className="relative w-3 h-3 rotate-45"
              style={{
                background: `
                  linear-gradient(
                    135deg,
                    #d4af37 0%,
                    #b38728 45%,
                    #7a5a16 100%
                  )
                `,
              }}
            />

          </motion.div>

          <motion.div
            className="h-[1px]"
            style={{
              width: "90px",
              background:
                "linear-gradient(to left, transparent, rgba(180,140,80,0.7))",
            }}
            animate={{
              width: ["70px", "95px", "70px"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />

        </motion.div>

        {/* FORMAL */}
        <motion.div
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          <p
            className="uppercase text-[11px] tracking-[0.45em]"
            style={{
              color: "#9b7b52",
            }}
          >
            FORMAL
          </p>

          <p
            className="mt-4 text-[15px] md:text-[17px] leading-relaxed max-w-md mx-auto"
            style={{
              color: "#6f5a40",
            }}
          >
            Elegante y acorde a la ocasión.
            Evita colores demasiado claros.
          </p>
        </motion.div>

        {/* ICONOS PREMIUM */}
        <div className="flex justify-center items-center gap-10 mt-14">

          {/* HOMBRE */}
          <motion.div
            whileHover={{
              y: -10,
              scale: 1.08,
            }}
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center"
          >

            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: `
                  linear-gradient(
                    145deg,
                    rgba(255,255,255,0.8),
                    rgba(255,255,255,0.35)
                  )
                `,
                border: "1px solid rgba(255,255,255,0.45)",
                boxShadow: `
                  0 12px 30px rgba(0,0,0,0.08),
                  inset 0 1px 0 rgba(255,255,255,0.7)
                `,
                backdropFilter: "blur(12px)",
              }}
            >
              <img src="/dresscodeh.png" alt="traje" />
            </div>

            <p
              className="mt-4 uppercase tracking-[0.3em] text-[11px]"
              style={{
                color: "#7b5b37",
              }}
            >
              Caballeros
            </p>

          </motion.div>

          {/* MUJER */}
          <motion.div
            whileHover={{
              y: -10,
              scale: 1.08,
            }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center"
          >

            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: `
                  linear-gradient(
                    145deg,
                    rgba(255,255,255,0.8),
                    rgba(255,255,255,0.35)
                  )
                `,
                border: "1px solid rgba(255,255,255,0.45)",
                boxShadow: `
                  0 12px 30px rgba(0,0,0,0.08),
                  inset 0 1px 0 rgba(255,255,255,0.7)
                `,
                backdropFilter: "blur(12px)",
              }}
            >
              <img src="./dresscodem.png" alt="vestido" />
            </div>

            <p
              className="mt-4 uppercase tracking-[0.3em] text-[11px]"
              style={{
                color: "#7b5b37",
              }}
            >
              Damas
            </p>

          </motion.div>

        </div>

        {/* DIVISOR FINAL */}
        <motion.div
          className="w-32 h-[1px] mx-auto my-12"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(180,140,80,0.7), transparent)",
          }}
          animate={{
            width: ["90px", "130px", "90px"],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* EVENTO */}
        <motion.div
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >

          <p
            className="uppercase text-[11px] tracking-[0.45em]"
            style={{
              color: "#9b7b52",
            }}
          >
            EVENTO
          </p>

          <p
            className="mt-5 text-[22px] md:text-[28px] font-cursiveDancing"
            style={{
              color: "#4a3422",
            }}
          >
            Solo para adultos
          </p>

        </motion.div>

      </motion.div>

    </motion.div>
  );
};

export default DressCodePremium;