"use client";

import { motion } from "framer-motion";

/* =====================================================
   ANIMACIÓN GENERAL
===================================================== */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 70,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =====================================================
   ITINERARIO DEL DEMO
===================================================== */

const events = [
  {
    time: "5:00 PM",
    title: "Ceremonia",
    description:
      "Ceremonia religiosa para agradecer por esta nueva etapa en la vida de Carla.",
    icon: "✦",
  },
  {
    time: "7:00 PM",
    title: "Recepción",
    description:
      "Bienvenida a familiares y amigos en el salón de celebración.",
    icon: "✧",
  },
  {
    time: "8:00 PM",
    title: "Presentación",
    description:
      "Presentación especial de Carla y entrada oficial a sus XV años.",
    icon: "♕",
  },
  {
    time: "8:30 PM",
    title: "Vals",
    description:
      "Uno de los momentos más emotivos y esperados de esta noche.",
    icon: "♡",
  },
  {
    time: "9:00 PM",
    title: "Cena",
    description:
      "Compartiremos una cena preparada especialmente para esta celebración.",
    icon: "✦",
  },
  {
    time: "10:00 PM",
    title: "Baile sorpresa",
    description:
      "Carla y sus acompañantes presentarán un baile lleno de alegría y emoción.",
    icon: "✧",
  },
  {
    time: "10:30 PM",
    title: "Fiesta",
    description:
      "La pista estará abierta para celebrar, bailar y crear recuerdos inolvidables.",
    icon: "♡",
  },
  {
    time: "12:00 AM",
    title: "Pastel",
    description:
      "Cerraremos los momentos especiales de la noche con el tradicional pastel.",
    icon: "✦",
  },
];

/* =====================================================
   COMPONENTE PRINCIPAL
===================================================== */

const ItinerarioTimelinePremium = () => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        px-4 py-20
        sm:px-6 sm:py-24
        md:py-28
        lg:px-10 lg:py-32
      "
      style={{
        background: `
          radial-gradient(
            circle at top left,
            rgba(122,24,56,0.10),
            transparent 26%
          ),
          radial-gradient(
            circle at bottom right,
            rgba(213,183,106,0.16),
            transparent 30%
          ),
          linear-gradient(
            145deg,
            #fffafa 0%,
            #f8edef 46%,
            #ead7dc 100%
          )
        `,
      }}
    >
      {/* =================================================
          GLOW SUPERIOR
      ================================================= */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-36 -top-40
          h-[390px] w-[390px]
          rounded-full
          bg-[#7A1838]/10
          blur-3xl
          sm:h-[500px] sm:w-[500px]
        "
        animate={{
          scale: [1, 1.13, 1],
          opacity: [0.12, 0.25, 0.12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =================================================
          GLOW INFERIOR
      ================================================= */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -bottom-40 -left-36
          h-[390px] w-[390px]
          rounded-full
          bg-[#D5B76A]/15
          blur-3xl
          sm:h-[520px] sm:w-[520px]
        "
        animate={{
          scale: [1.08, 1, 1.08],
          opacity: [0.12, 0.24, 0.12],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =================================================
          TEXTURA
      ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.025]
        "
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(91,16,43,0.15) 0px,
              rgba(91,16,43,0.15) 1px,
              transparent 1px,
              transparent 7px
            )
          `,
        }}
      />

      {/* =================================================
          DESTELLOS
      ================================================= */}

      <motion.span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-[8%] top-[16%]
          text-lg text-[#D5B76A]/65
        "
        animate={{
          opacity: [0.25, 1, 0.25],
          scale: [0.85, 1.2, 0.85],
          rotate: [0, 35, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ✦
      </motion.span>

      <motion.span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute right-[9%] top-[38%]
          text-sm text-[#7A1838]/45
        "
        animate={{
          opacity: [0.2, 0.85, 0.2],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ✧
      </motion.span>

      {/* =================================================
          ENCABEZADO
      ================================================= */}

      <div className="relative z-10 mx-auto mb-14 max-w-4xl text-center sm:mb-16 md:mb-20">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
          }}
          viewport={{ once: true }}
          className="
            flex items-center
            justify-center
            gap-3
            sm:gap-5
          "
        >
          <div
            className="
              h-px w-8
              bg-gradient-to-r
              from-transparent to-[#D5B76A]
              sm:w-16
            "
          />

          <motion.p
            className="
              whitespace-nowrap
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[#7A1838]
              sm:text-[11px]
              sm:tracking-[0.45em]
            "
            animate={{
              opacity: [0.75, 1, 0.75],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Itinerario
          </motion.p>

          <div
            className="
              h-px w-8
              bg-gradient-to-l
              from-transparent to-[#D5B76A]
              sm:w-16
            "
          />
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.1,
          }}
          viewport={{ once: true }}
          className="
            mt-5
            font-cursiveDancing
            text-[45px]
            leading-[0.95]
            sm:text-[62px]
            md:text-[78px]
            lg:text-[92px]
          "
          style={{
            background: `
              linear-gradient(
                180deg,
                #9A3155 0%,
                #7A1838 45%,
                #4A0E23 100%
              )
            `,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter:
              "drop-shadow(0 9px 20px rgba(122,24,56,0.12))",
          }}
        >
          Una noche inolvidable
        </motion.h1>

        {/* ORNAMENTO */}

        <motion.div
          className="
            relative
            my-8
            flex items-center
            justify-center
            sm:my-10
          "
          animate={{
            opacity: [0.75, 1, 0.75],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(181,143,63,0.8))",
            }}
            animate={{
              width: ["45px", "82px", "45px"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="relative mx-4 sm:mx-5"
            animate={{
              rotate: [0, 6, -6, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              aria-hidden="true"
              className="
                absolute inset-0
                scale-150 rounded-full
                bg-[#D5B76A]/25
                blur-xl
              "
            />

            <div
              className="
                relative
                h-3 w-3
                rotate-45
              "
              style={{
                background: `
                  linear-gradient(
                    135deg,
                    #F7E7BA 0%,
                    #D5B76A 35%,
                    #A77C25 70%,
                    #664408 100%
                  )
                `,
                boxShadow: `
                  0 0 14px rgba(213,183,106,0.4),
                  inset 0 1px 0 rgba(255,255,255,0.5)
                `,
              }}
            />
          </motion.div>

          <motion.div
            className="h-px"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(181,143,63,0.8))",
            }}
            animate={{
              width: ["45px", "82px", "45px"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.2,
          }}
          viewport={{ once: true }}
          className="
            mx-auto
            max-w-2xl
            font-playfair
            text-[15px]
            leading-relaxed
            text-[#72505D]
            sm:text-[17px]
            md:text-[18px]
          "
        >
          Hemos preparado cada momento con mucha ilusión. Acompáñame
          a disfrutar de una celebración llena de alegría, emoción y
          recuerdos especiales.
        </motion.p>
      </div>

      {/* =================================================
          TIMELINE
      ================================================= */}

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Línea central en escritorio */}

        <div
          aria-hidden="true"
          className="
            absolute left-1/2 top-0
            hidden h-full w-[2px]
            -translate-x-1/2
            md:block
          "
          style={{
            background: `
              linear-gradient(
                to bottom,
                transparent,
                rgba(181,143,63,0.5) 8%,
                rgba(122,24,56,0.25) 50%,
                rgba(181,143,63,0.5) 92%,
                transparent
              )
            `,
          }}
        />

        {/* Línea móvil */}

        <div
          aria-hidden="true"
          className="
            absolute left-[17px] top-0
            h-full w-px
            md:hidden
          "
          style={{
            background: `
              linear-gradient(
                to bottom,
                transparent,
                rgba(181,143,63,0.55) 8%,
                rgba(122,24,56,0.28) 50%,
                rgba(181,143,63,0.55) 92%,
                transparent
              )
            `,
          }}
        />

        <div className="flex flex-col gap-8 sm:gap-10 md:gap-20">
          {events.map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={`${event.time}-${event.title}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{
                  once: true,
                  amount: 0.18,
                }}
                className={`
                  relative flex w-full
                  pl-11
                  md:pl-0
                  ${
                    isLeft
                      ? "md:justify-start"
                      : "md:justify-end"
                  }
                `}
              >
                {/* Punto móvil */}

                <motion.div
                  className="
                    absolute left-[8px] top-10 z-20
                    flex md:hidden
                  "
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.75, 1, 0.75],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="relative">
                    <div
                      className="
                        absolute inset-0
                        scale-150 rounded-full
                        bg-[#D5B76A]/30
                        blur-xl
                      "
                    />

                    <div
                      className="
                        relative
                        h-[18px] w-[18px]
                        rounded-full
                        border border-white/50
                      "
                      style={{
                        background: `
                          linear-gradient(
                            135deg,
                            #F1D89C,
                            #D5B76A 45%,
                            #9C7020
                          )
                        `,
                        boxShadow: `
                          0 0 18px rgba(213,183,106,0.4),
                          inset 0 1px 0 rgba(255,255,255,0.5)
                        `,
                      }}
                    />
                  </div>
                </motion.div>

                {/* Punto central desktop */}

                <motion.div
                  className="
                    absolute left-1/2 top-1/2 z-20
                    hidden -translate-x-1/2 -translate-y-1/2
                    md:flex
                  "
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.75, 1, 0.75],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="relative">
                    <div
                      className="
                        absolute inset-0
                        scale-150 rounded-full
                        bg-[#D5B76A]/30
                        blur-xl
                      "
                    />

                    <div
                      className="
                        relative
                        flex h-10 w-10
                        items-center justify-center
                        rounded-full
                        border border-white/50
                        text-sm
                        text-[#7A1838]
                      "
                      style={{
                        background: `
                          linear-gradient(
                            135deg,
                            #fffaf1,
                            #ead6a4 55%,
                            #c69a3b
                          )
                        `,
                        boxShadow: `
                          0 0 22px rgba(213,183,106,0.42),
                          inset 0 1px 0 rgba(255,255,255,0.65)
                        `,
                      }}
                    >
                      {event.icon}
                    </div>
                  </div>
                </motion.div>

                {/* CARD */}

                <motion.article
                  whileHover={{
                    y: -7,
                    scale: 1.015,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="
                    relative
                    w-full
                    overflow-hidden
                    rounded-[26px]
                    border border-white/65
                    bg-white/55
                    px-5 py-8
                    shadow-[0_22px_55px_rgba(84,17,42,0.12)]
                    backdrop-blur-xl
                    sm:rounded-[32px]
                    sm:px-7 sm:py-9
                    md:w-[46%]
                    md:px-8 md:py-10
                  "
                >
                  {/* Glow interno */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute inset-0
                      bg-gradient-to-br
                      from-white/85
                      via-transparent
                      to-[#7A1838]/7
                    "
                  />

                  {/* Brillo lateral */}

                  <motion.div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute top-0
                      h-full w-24
                      -skew-x-12
                      bg-gradient-to-r
                      from-transparent
                      via-white/35
                      to-transparent
                    "
                    animate={{
                      left: ["-40%", "135%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Contenido */}

                  <div className="relative z-10">
                    <motion.p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.3em]
                        text-[#9A3155]
                        sm:text-[11px]
                        sm:tracking-[0.4em]
                      "
                      animate={{
                        opacity: [0.72, 1, 0.72],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {event.time}
                    </motion.p>

                    <div className="mt-4 flex items-center gap-3 md:block">
                      <span
                        className="
                          flex h-9 w-9
                          flex-shrink-0
                          items-center justify-center
                          rounded-full
                          bg-[#7A1838]/8
                          text-base text-[#7A1838]
                          md:hidden
                        "
                      >
                        {event.icon}
                      </span>

                      <h2
                        className="
                          font-cursiveDancing
                          text-[34px]
                          leading-none
                          sm:text-[42px]
                          md:text-[46px]
                        "
                        style={{
                          background: `
                            linear-gradient(
                              180deg,
                              #9A3155 0%,
                              #7A1838 48%,
                              #4A0E23 100%
                            )
                          `,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {event.title}
                      </h2>
                    </div>

                    <motion.div
                      className="
                        my-5 h-px
                        bg-gradient-to-r
                        from-[#D5B76A]
                        to-transparent
                      "
                      animate={{
                        width: ["55px", "88px", "55px"],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    <p
                      className="
                        text-[14px]
                        leading-relaxed
                        text-[#72505D]
                        sm:text-[15px]
                        md:text-base
                      "
                    >
                      {event.description}
                    </p>
                  </div>
                </motion.article>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* =================================================
          MENSAJE FINAL
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          delay: 0.2,
        }}
        viewport={{ once: true }}
        className="
          relative z-10
          mx-auto mt-14
          flex max-w-2xl
          flex-col items-center
          text-center
          sm:mt-18
          md:mt-24
        "
      >
        <div
          className="
            mb-5 h-px w-24
            bg-gradient-to-r
            from-transparent via-[#D5B76A] to-transparent
            sm:w-36
          "
        />

        <p
          className="
            font-cursiveDancing
            text-[25px]
            leading-relaxed
            text-[#7A1838]
            sm:text-[31px]
          "
        >
          Cada momento será aún más especial al compartirlo contigo.
        </p>
      </motion.div>
    </section>
  );
};

export default ItinerarioTimelinePremium;