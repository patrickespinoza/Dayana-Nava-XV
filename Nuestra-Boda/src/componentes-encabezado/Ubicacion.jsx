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
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =====================================================
   INFORMACIÓN DEL EVENTO
===================================================== */

const DATOS_EVENTO = {
  diaSemana: "Sábado",
  dia: "13",
  mesAnio: "Marzo 2027",

  ceremonia: {
    titulo: "Ceremonia religiosa",
    hora: "5:00 PM",
    lugar: "Parroquia de San José",
    direccion: "Puebla, Puebla",
    ubicacion: "https://maps.google.com/",
  },

  recepcion: {
    titulo: "Recepción",
    hora: "7:00 PM",
    lugar: "Salón Jardín La Toscana",
    direccion: "Puebla, Puebla",
    ubicacion: "https://maps.google.com/",
  },
};

/* =====================================================
   COMPONENTE DE UBICACIÓN
===================================================== */

const TarjetaUbicacion = ({
  titulo,
  hora,
  lugar,
  direccion,
  ubicacion,
  delay = 0,
}) => {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      className="
        relative
        flex h-full
        flex-col items-center
        overflow-hidden
        rounded-[28px]
        border border-[#D5B76A]/25
        bg-white/65
        px-5 py-9
        text-center
        shadow-[0_18px_45px_rgba(82,14,39,0.09)]
        backdrop-blur-xl
        sm:px-7 sm:py-11
      "
    >
      {/* Glow de tarjeta */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-16 -top-16
          h-44 w-44
          rounded-full
          bg-[#7A1838]/8
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -bottom-16 -left-16
          h-44 w-44
          rounded-full
          bg-[#D5B76A]/15
          blur-3xl
        "
      />

      <div className="relative z-10 flex h-full w-full flex-col items-center">
        {/* Título */}

        <p
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.25em]
            text-[#7A1838]
            sm:text-[11px]
            sm:tracking-[0.35em]
          "
        >
          {titulo}
        </p>

        {/* Hora */}

        <p
          className="
            mt-5
            font-playfair
            text-[34px]
            leading-none
            text-[#40202B]
            sm:text-[42px]
          "
        >
          {hora}
        </p>

        {/* Ornamento */}

        <div className="my-6 flex items-center justify-center gap-3">
          <div
            className="
              h-px w-10
              bg-gradient-to-r
              from-transparent to-[#D5B76A]
              sm:w-14
            "
          />

          <span className="text-sm text-[#D5B76A]">✦</span>

          <div
            className="
              h-px w-10
              bg-gradient-to-l
              from-transparent to-[#D5B76A]
              sm:w-14
            "
          />
        </div>

        {/* Lugar */}

        <h3
          className="
            font-playfair
            text-[22px]
            leading-snug
            text-[#511329]
            sm:text-[26px]
          "
        >
          {lugar}
        </h3>

        {/* Dirección */}

        <p
          className="
            mt-3
            text-sm
            leading-relaxed
            text-[#735563]
            sm:text-base
          "
        >
          {direccion}
        </p>

        {/* Botón */}

        <motion.a
          href={ubicacion}
          target="_blank"
          rel="noopener noreferrer"
          className="
            relative
            mt-8
            inline-flex
            min-h-[48px]
            w-full
            max-w-[250px]
            items-center
            justify-center
            overflow-hidden
            rounded-full
            px-6 py-3.5
          "
          style={{
            background: `
              linear-gradient(
                135deg,
                #8D2447 0%,
                #6A1735 50%,
                #451022 100%
              )
            `,
            boxShadow: `
              0 14px 30px rgba(90,16,43,0.22),
              inset 0 1px 0 rgba(255,255,255,0.22)
            `,
          }}
          whileHover={{
            scale: 1.04,
            y: -2,
          }}
          whileTap={{
            scale: 0.97,
          }}
        >
          {/* Brillo animado */}

          <motion.span
            aria-hidden="true"
            className="
              absolute top-0
              h-full w-[80%]
              -skew-x-12
              bg-white/20
            "
            initial={{
              left: "-120%",
            }}
            animate={{
              left: ["-120%", "150%"],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: "easeInOut",
            }}
          />

          <span
            className="
              relative z-10
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-white
              sm:text-[11px]
              sm:tracking-[0.3em]
            "
          >
            Ver ubicación
          </span>
        </motion.a>
      </div>
    </motion.article>
  );
};

/* =====================================================
   COMPONENTE PRINCIPAL
===================================================== */

export default function EventoDireccion() {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.08,
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
            rgba(122,24,56,0.09),
            transparent 26%
          ),
          radial-gradient(
            circle at bottom right,
            rgba(213,183,106,0.16),
            transparent 28%
          ),
          linear-gradient(
            145deg,
            #fffafa 0%,
            #f8edef 45%,
            #ead7dc 100%
          )
        `,
      }}
    >
      {/* =================================================
          GLOWS DECORATIVOS
      ================================================= */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -left-32 -top-32
          h-[360px] w-[360px]
          rounded-full
          bg-[#7A1838]/10
          blur-3xl
          sm:h-[480px] sm:w-[480px]
        "
        animate={{
          scale: [1, 1.14, 1],
          opacity: [0.12, 0.24, 0.12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -bottom-36 -right-36
          h-[380px] w-[380px]
          rounded-full
          bg-[#D5B76A]/15
          blur-3xl
          sm:h-[520px] sm:w-[520px]
        "
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.12, 0.22, 0.12],
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
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(79,16,40,0.14) 0px,
              rgba(79,16,40,0.14) 1px,
              transparent 1px,
              transparent 7px
            )
          `,
        }}
      />

      {/* =================================================
          CONTENEDOR PRINCIPAL
      ================================================= */}

      <div className="relative z-10 w-full max-w-6xl">
        {/* =================================================
            ENCABEZADO
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
          }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Etiqueta */}

          <div className="flex items-center justify-center gap-3 sm:gap-5">
            <div
              className="
                h-px w-8
                bg-gradient-to-r
                from-transparent to-[#D5B76A]
                sm:w-16
              "
            />

            <p
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
            >
              Save the date
            </p>

            <div
              className="
                h-px w-8
                bg-gradient-to-l
                from-transparent to-[#D5B76A]
                sm:w-16
              "
            />
          </div>

          {/* Título */}

          <h2
            className="
              mt-5
              font-cursiveDancing
              text-[44px]
              leading-tight
              text-[#711936]
              sm:text-[58px]
              md:text-[72px]
            "
          >
            Celebremos juntos
          </h2>

          <p
            className="
              mx-auto mt-4
              max-w-2xl
              font-playfair
              text-base
              leading-relaxed
              text-[#72505D]
              sm:text-lg
            "
          >
            Hay momentos en la vida que son especiales por sí solos,
            pero compartirlos con personas importantes los hace
            inolvidables.
          </p>
        </motion.div>

        {/* =================================================
            CARD DE FECHA
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            relative
            mx-auto mt-12
            w-full max-w-3xl
            overflow-hidden
            rounded-[32px]
            border border-white/60
            bg-white/55
            px-5 py-11
            text-center
            shadow-[0_25px_65px_rgba(84,17,42,0.12)]
            backdrop-blur-xl
            sm:mt-16
            sm:rounded-[40px]
            sm:px-10
            sm:py-14
            md:px-16
          "
        >
          {/* Brillo */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-0
              bg-gradient-to-br
              from-white/80
              via-transparent
              to-[#7A1838]/5
            "
          />

          <div className="relative z-10">
            {/* Ornamento superior */}

            <motion.div
              className="flex items-center justify-center"
              animate={{
                opacity: [0.7, 1, 0.7],
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
                    "linear-gradient(to right, transparent, rgba(181,143,63,0.75))",
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
                    "linear-gradient(to left, transparent, rgba(181,143,63,0.75))",
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

            {/* Fecha */}

            <motion.h3
              className="
                mt-8
                font-playfair
                text-[25px]
                font-light
                leading-tight
                text-[#40202B]
                sm:text-[34px]
              "
              animate={{
                opacity: [0.88, 1, 0.88],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              {DATOS_EVENTO.diaSemana}

              <br />

              <span
                className="
                  my-2
                  inline-block
                  font-cursiveDancing
                  text-[78px]
                  leading-none
                  sm:text-[105px]
                "
                style={{
                  background: `
                    linear-gradient(
                      180deg,
                      #8D2447 0%,
                      #6A1735 45%,
                      #421020 100%
                    )
                  `,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter:
                    "drop-shadow(0 8px 18px rgba(104,19,50,0.16))",
                }}
              >
                {DATOS_EVENTO.dia}
              </span>

              <br />

              <span
                className="
                  block
                  text-[11px]
                  uppercase
                  tracking-[0.22em]
                  text-[#9B6C7C]
                  sm:text-[14px]
                  sm:tracking-[0.38em]
                "
              >
                {DATOS_EVENTO.mesAnio}
              </span>
            </motion.h3>
          </div>
        </motion.div>

        {/* =================================================
            CEREMONIA Y RECEPCIÓN
        ================================================= */}

        <div
          className="
            mt-8
            grid grid-cols-1
            gap-6
            sm:mt-10
            md:grid-cols-2
            lg:gap-8
          "
        >
          <TarjetaUbicacion
            {...DATOS_EVENTO.ceremonia}
            delay={0.25}
          />

          <TarjetaUbicacion
            {...DATOS_EVENTO.recepcion}
            delay={0.4}
          />
        </div>

        {/* =================================================
            MENSAJE FINAL
        ================================================= */}

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
            delay: 0.45,
          }}
          viewport={{ once: true }}
          className="
            mx-auto mt-12
            max-w-2xl
            text-center
            font-cursiveDancing
            text-[25px]
            leading-relaxed
            text-[#711936]
            sm:mt-16
            sm:text-[32px]
          "
        >
          Tu presencia hará de este día un recuerdo aún más especial.
        </motion.p>
      </div>
    </motion.section>
  );
}