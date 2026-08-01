"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/* =====================================================
   ANIMACIÓN GENERAL
===================================================== */

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

/* =====================================================
   INFORMACIÓN DE REGALOS
===================================================== */

const DATOS_REGALOS = {
  numeroEvento: "12345678",
  imagenRegalo: "/regalo1.png",

  mensaje:
    "Tu presencia será mi mejor regalo, pero si deseas tener un detalle conmigo, he preparado una mesa de regalos en Liverpool.",

  mensajeLiverpool:
    "He seleccionado algunas opciones que me encantaría recibir. Puedes consultar la mesa de regalos utilizando el número de evento o el botón inferior.",
};

/* =====================================================
   COMPONENTE PRINCIPAL
===================================================== */

const Regalos = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [numeroCopiado, setNumeroCopiado] = useState(false);

  const linkLiverpool = `https://www.liverpool.com.mx/tienda/giftregistry/giftRegistryDetail.jsp?eventNo=${DATOS_REGALOS.numeroEvento}`;

  /* =====================================================
     BLOQUEAR SCROLL Y CERRAR CON ESCAPE
  ===================================================== */

  useEffect(() => {
    const cerrarConEscape = (event) => {
      if (event.key === "Escape") {
        setMostrarModal(false);
      }
    };

    if (mostrarModal) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", cerrarConEscape);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", cerrarConEscape);
    };
  }, [mostrarModal]);

  /* =====================================================
     COPIAR NÚMERO DE EVENTO
  ===================================================== */

  const copiarNumeroEvento = async () => {
    try {
      await navigator.clipboard.writeText(
        DATOS_REGALOS.numeroEvento
      );

      setNumeroCopiado(true);

      window.setTimeout(() => {
        setNumeroCopiado(false);
      }, 2200);
    } catch (error) {
      console.error(
        "No se pudo copiar el número de evento:",
        error
      );
    }
  };

  return (
    <>
      {/* =================================================
          SECCIÓN PRINCIPAL
      ================================================= */}

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.12,
        }}
        className="
          relative
          flex w-full
          items-center
          justify-center
          overflow-hidden
          px-4 py-20
          sm:px-6 sm:py-24
          lg:px-10 lg:py-32
        "
        style={{
          background: `
            radial-gradient(
              circle at top left,
              rgba(122,24,56,0.11),
              transparent 27%
            ),
            radial-gradient(
              circle at bottom right,
              rgba(213,183,106,0.17),
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
        {/* GLOW VINO */}

        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -left-36 -top-40
            h-[380px] w-[380px]
            rounded-full
            bg-[#7A1838]/10
            blur-3xl
            sm:h-[500px] sm:w-[500px]
          "
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.25, 0.12],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* GLOW DORADO */}

        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -bottom-40 -right-36
            h-[390px] w-[390px]
            rounded-full
            bg-[#D5B76A]/16
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

        {/* TEXTURA */}

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

        {/* DESTELLOS */}

        <motion.span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute left-[9%] top-[18%]
            text-lg text-[#D5B76A]/65
          "
          animate={{
            opacity: [0.25, 1, 0.25],
            scale: [0.8, 1.2, 0.8],
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
            absolute right-[9%] top-[40%]
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
            TARJETA PRINCIPAL
        ================================================= */}

        <motion.div
          whileHover={{
            y: -5,
          }}
          transition={{
            duration: 0.35,
          }}
          className="
            relative z-10
            w-full max-w-3xl
            overflow-hidden
            rounded-[30px]
            border border-white/70
            bg-white/55
            px-5 py-12
            text-center
            shadow-[0_26px_70px_rgba(84,17,42,0.14)]
            backdrop-blur-xl
            sm:rounded-[38px]
            sm:px-10 sm:py-16
            md:px-16
          "
        >
          {/* GLOW INTERIOR */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-0
              bg-gradient-to-br
              from-white/85
              via-transparent
              to-[#7A1838]/8
            "
          />

          {/* BRILLO */}

          <motion.div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute top-0
              h-full w-32
              -skew-x-12
              bg-gradient-to-r
              from-transparent
              via-white/35
              to-transparent
            "
            animate={{
              left: ["-45%", "135%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />

          {/* BORDE INTERIOR */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-[8px]
              rounded-[22px]
              border border-white/45
              sm:inset-[11px]
              sm:rounded-[29px]
            "
          />

          <div className="relative z-10">
            {/* ETIQUETA */}

            <div
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
                  sm:tracking-[0.42em]
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
                Un detalle especial
              </motion.p>

              <div
                className="
                  h-px w-8
                  bg-gradient-to-l
                  from-transparent to-[#D5B76A]
                  sm:w-16
                "
              />
            </div>

            {/* ÍCONO */}

            <motion.div
              className="
                mx-auto mt-7
                flex h-20 w-20
                items-center justify-center
                rounded-full
                border border-[#D5B76A]/35
                bg-white/70
                shadow-[0_14px_35px_rgba(84,17,42,0.10)]
                sm:h-24 sm:w-24
              "
              animate={{
                y: [0, -4, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={DATOS_REGALOS.imagenRegalo}
                alt="Regalo para los XV años de Carla"
                className="
                  h-14 w-14
                  object-contain
                  sm:h-16 sm:w-16
                "
              />
            </motion.div>

            {/* TÍTULO */}

            <motion.h2
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
                delay: 0.15,
              }}
              viewport={{ once: true }}
              className="
                mt-7
                font-cursiveDancing
                text-[50px]
                leading-[0.95]
                sm:text-[66px]
                md:text-[80px]
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
                  "drop-shadow(0 8px 18px rgba(122,24,56,0.13))",
              }}
            >
              Regalos
            </motion.h2>

            {/* ORNAMENTO */}

            <motion.div
              className="
                my-7 flex
                items-center justify-center
                sm:my-9
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
              <motion.div
                className="h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(181,143,63,0.8))",
                }}
                animate={{
                  width: ["45px", "80px", "45px"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.span
                className="mx-4 text-lg text-[#D5B76A]"
                animate={{
                  rotate: [0, 8, -8, 0],
                  scale: [1, 1.12, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ✦
              </motion.span>

              <motion.div
                className="h-px"
                style={{
                  background:
                    "linear-gradient(to left, transparent, rgba(181,143,63,0.8))",
                }}
                animate={{
                  width: ["45px", "80px", "45px"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* MENSAJE */}

            <motion.p
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.25,
              }}
              viewport={{ once: true }}
              className="
                mx-auto
                max-w-xl
                font-playfair
                text-[15px]
                leading-relaxed
                text-[#72505D]
                sm:text-[17px]
                md:text-[18px]
              "
            >
              {DATOS_REGALOS.mensaje}
            </motion.p>

            <motion.p
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.35,
              }}
              viewport={{ once: true }}
              className="
                mx-auto mt-4
                max-w-lg
                font-cursiveDancing
                text-[25px]
                leading-relaxed
                text-[#7A1838]
                sm:text-[30px]
              "
            >
              Gracias por formar parte de este momento
            </motion.p>

            {/* BOTÓN */}

            <motion.button
              type="button"
              onClick={() => setMostrarModal(true)}
              className="
                relative
                mt-9
                inline-flex
                min-h-[50px]
                w-full max-w-[300px]
                items-center
                justify-center
                overflow-hidden
                rounded-full
                px-7 py-4
                text-white
                outline-none
                focus-visible:ring-2
                focus-visible:ring-[#D5B76A]
                focus-visible:ring-offset-2
                sm:mt-11
              "
              style={{
                background: `
                  linear-gradient(
                    135deg,
                    #8D2447 0%,
                    #6A1735 52%,
                    #451022 100%
                  )
                `,
                boxShadow: `
                  0 16px 34px rgba(90,16,43,0.25),
                  inset 0 1px 0 rgba(255,255,255,0.23)
                `,
              }}
              whileHover={{
                scale: 1.045,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              <motion.span
                aria-hidden="true"
                className="
                  absolute top-0
                  h-full w-[80%]
                  -skew-x-12
                  bg-white/20
                "
                animate={{
                  left: ["-120%", "150%"],
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  repeatDelay: 1.3,
                  ease: "easeInOut",
                }}
              />

              <span
                className="
                  relative z-10
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  sm:text-[11px]
                  sm:tracking-[0.28em]
                "
              >
                Ver mesa de regalos
              </span>

              <span className="relative z-10 ml-2">
                🎁
              </span>
            </motion.button>
          </div>
        </motion.div>
      </motion.section>

      {/* =================================================
          MODAL DE LIVERPOOL
      ================================================= */}

      <AnimatePresence>
        {mostrarModal && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-mesa-regalos"
            className="
              fixed inset-0 z-[100]
              flex items-center
              justify-center
              overflow-y-auto
              bg-[#17040b]/75
              px-4 py-8
              backdrop-blur-md
              sm:px-6
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setMostrarModal(false);
              }
            }}
          >
            <motion.div
              initial={{
                scale: 0.88,
                opacity: 0,
                y: 45,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.88,
                opacity: 0,
                y: 45,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                my-auto
                w-full max-w-md
                overflow-hidden
                rounded-[28px]
                border border-white/20
                px-5 py-10
                text-center
                text-white
                shadow-[0_28px_90px_rgba(0,0,0,0.42)]
                sm:rounded-[36px]
                sm:px-8 sm:py-12
              "
              style={{
                background: `
                  radial-gradient(
                    circle at top right,
                    rgba(255,255,255,0.13),
                    transparent 28%
                  ),
                  linear-gradient(
                    145deg,
                    #8D2447 0%,
                    #64142F 48%,
                    #350817 100%
                  )
                `,
              }}
            >
              {/* GLOW */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute -right-20 -top-20
                  h-60 w-60
                  rounded-full
                  bg-[#D5B76A]/20
                  blur-3xl
                "
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute -bottom-24 -left-20
                  h-60 w-60
                  rounded-full
                  bg-white/10
                  blur-3xl
                "
              />

              {/* BRILLO ANIMADO */}

              <motion.div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute top-0
                  h-full w-32
                  -skew-x-12
                  bg-gradient-to-r
                  from-transparent
                  via-white/20
                  to-transparent
                "
                animate={{
                  left: ["-45%", "140%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut",
                }}
              />

              {/* CERRAR */}

              <motion.button
                type="button"
                onClick={() => setMostrarModal(false)}
                aria-label="Cerrar mesa de regalos"
                className="
                  absolute right-4 top-4 z-20
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  border border-white/15
                  bg-white/10
                  text-lg text-white/80
                  backdrop-blur-md
                  transition-colors
                  hover:bg-white
                  hover:text-[#7A1838]
                  sm:right-5 sm:top-5
                "
                whileHover={{
                  rotate: 90,
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.92,
                }}
              >
                ✕
              </motion.button>

              {/* CONTENIDO */}

              <div className="relative z-10">
                <motion.div
                  className="
                    mx-auto
                    flex h-16 w-16
                    items-center justify-center
                    rounded-full
                    border border-[#D5B76A]/35
                    bg-white/10
                    text-3xl
                    shadow-[0_12px_30px_rgba(0,0,0,0.15)]
                    backdrop-blur-lg
                  "
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  🎁
                </motion.div>

                <p
                  className="
                    mt-6
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.28em]
                    text-[#EBD69D]
                    sm:text-[10px]
                    sm:tracking-[0.4em]
                  "
                >
                  Mesa de regalos
                </p>

                <h2
                  id="titulo-mesa-regalos"
                  className="
                    mt-3
                    font-playfair
                    text-[32px]
                    leading-tight
                    text-white
                    sm:text-[40px]
                  "
                >
                  Liverpool
                </h2>

                <div
                  className="
                    mx-auto my-6
                    h-px w-28
                    bg-gradient-to-r
                    from-transparent
                    via-[#D5B76A]
                    to-transparent
                  "
                />

                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.24em]
                    text-white/60
                  "
                >
                  Número de evento
                </p>

                {/* NÚMERO DE EVENTO */}

                <button
                  type="button"
                  onClick={copiarNumeroEvento}
                  className="
                    group
                    mt-4 w-full
                    rounded-2xl
                    border border-white/15
                    bg-white/10
                    px-4 py-5
                    shadow-inner
                    backdrop-blur-lg
                    transition
                    hover:bg-white/15
                  "
                >
                  <span
                    className="
                      block
                      break-all
                      font-mono
                      text-[25px]
                      font-semibold
                      tracking-[0.15em]
                      text-[#F3D995]
                      sm:text-[30px]
                      sm:tracking-[0.22em]
                    "
                  >
                    {DATOS_REGALOS.numeroEvento}
                  </span>

                  <span
                    className="
                      mt-2 block
                      text-[9px]
                      uppercase
                      tracking-[0.17em]
                      text-white/55
                    "
                  >
                    {numeroCopiado
                      ? "Número copiado"
                      : "Toca para copiar"}
                  </span>
                </button>

                {/* DESCRIPCIÓN */}

                <p
                  className="
                    mx-auto mt-6
                    max-w-sm
                    text-[13px]
                    leading-relaxed
                    text-white/72
                    sm:text-sm
                  "
                >
                  {DATOS_REGALOS.mensajeLiverpool}
                </p>

                {/* BOTÓN LIVERPOOL */}

                <motion.a
                  href={linkLiverpool}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    relative
                    mt-8
                    inline-flex
                    min-h-[48px]
                    w-full
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    bg-white
                    px-6 py-3.5
                    text-[#64142F]
                    shadow-[0_14px_32px_rgba(0,0,0,0.18)]
                  "
                  whileHover={{
                    scale: 1.04,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                >
                  <motion.span
                    aria-hidden="true"
                    className="
                      absolute top-0
                      h-full w-[80%]
                      -skew-x-12
                      bg-[#D5B76A]/20
                    "
                    animate={{
                      left: ["-120%", "150%"],
                    }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      repeatDelay: 1.4,
                      ease: "easeInOut",
                    }}
                  />

                  <span
                    className="
                      relative z-10
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      sm:text-[11px]
                      sm:tracking-[0.28em]
                    "
                  >
                    Ir a Liverpool
                  </span>
                </motion.a>

                <p
                  className="
                    mt-6
                    font-cursiveDancing
                    text-[24px]
                    leading-relaxed
                    text-[#F1D89A]
                    sm:text-[28px]
                  "
                >
                  Gracias por tu cariño y por acompañarme
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Regalos;