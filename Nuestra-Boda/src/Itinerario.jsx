"use client";

import { motion } from "framer-motion";

/* =====================================================
   PALETA PRINCIPAL
===================================================== */

const COLORES = {
  azul: "#B9D8F4",
  rosa: "#D99AB1",
  blanco: "#FFFFFF",
  negro: "#1F1F1F",
};

/* =====================================================
   INFORMACIÓN DEL ITINERARIO
===================================================== */

const EVENTOS = [
  {
    hora: "16:00 Hrs",
    titulo: "Misa",
    descripcion:
      "Ceremonia religiosa",
    simbolo: "✦",
    variante: "rosa",
  },
  {
    hora: "17:30 Hrs",
    titulo: "Recepción",
    descripcion:
      "Bienvenida a familiares y amigos para dar inicio a una celebración",
    simbolo: "✧",
    variante: "azul",
  },
  {
    hora: "18:00 Hrs",
    titulo: "Palabras / Cena",
    descripcion:
      "Compartiremos unas palabras especiales para Dayana y después disfrutaremos juntos de la cena.",
    simbolo: "♕",
    variante: "rosa",
  },
  {
    hora: "19:15 Hrs",
    titulo: "Brindis",
    descripcion:
      "Levantaremos nuestras copas para celebrar los XV años de Dayana.",
    simbolo: "♡",
    variante: "azul",
  },
  {
    hora: "20:10 Hrs",
    titulo: "Baile sorpresa",
    descripcion:
      "Dayana presentará un baile especial.",
    simbolo: "✦",
    variante: "rosa",
  },
  {
    hora: "20:30 Hrs",
    titulo: "Grupo musical",
    descripcion:
      "Para comenzar a bailar y disfrutar de la celebración.",
    simbolo: "✧",
    variante: "azul",
  },
  {
    hora: "22:40 Hrs",
    titulo: "DJ / Vatucada",
    descripcion:
      "La fiesta continuará con DJ y Vatucada.",
    simbolo: "♡",
    variante: "rosa",
  },
  {
    hora: "23:30 Hrs",
    titulo: "Pastel",
    descripcion:
      "Compartiremos el tradicional pastel para celebrar este momento especial junto a Dayana y su familia.",
    simbolo: "✦",
    variante: "azul",
  },
  {
    hora: "00:00 Hrs",
    titulo: "Fin de la celabracion",
    descripcion:
      "Cerraremos esta hermosa celebración.",
    simbolo: "✧",
    variante: "rosa",
  },
];

/* =====================================================
   ANIMACIONES
===================================================== */

const contenedor = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,

    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const aparecerArriba = {
  hidden: {
    opacity: 0,
    y: 35,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.95,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const aparecerIzquierda = {
  hidden: {
    opacity: 0,
    x: -55,
  },

  show: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const aparecerDerecha = {
  hidden: {
    opacity: 0,
    x: 55,
  },

  show: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =====================================================
   TARJETA DE EVENTO
===================================================== */

const TarjetaEvento = ({ evento, index }) => {
  const izquierda = index % 2 === 0;
  const esRosa = evento.variante === "rosa";

  const colorPrincipal = esRosa
    ? COLORES.rosa
    : COLORES.azul;

  const colorContraste = esRosa
    ? COLORES.azul
    : COLORES.rosa;

  return (
    <motion.div
      className={`
        itinerario-xv__fila
        relative
        flex
        w-full
        pl-10
        md:pl-0
        ${
          izquierda
            ? "md:justify-start"
            : "md:justify-end"
        }
      `}
      variants={
        izquierda
          ? aparecerIzquierda
          : aparecerDerecha
      }
    >
      {/* ===============================================
          MARCADOR MÓVIL
          Forma romboidal, sin círculo
      =============================================== */}

      <motion.div
        aria-hidden="true"
        className="
          absolute
          left-[10px]
          top-10
          z-20
          flex
          h-4
          w-4
          rotate-45
          items-center
          justify-center
          border
          border-white/80
          md:hidden
        "
        style={{
          backgroundColor: colorPrincipal,
          boxShadow: `0 0 15px ${colorPrincipal}`,
        }}
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ===============================================
          MARCADOR CENTRAL EN COMPUTADORA
      =============================================== */}

      <motion.div
        aria-hidden="true"
        className="
          absolute
          left-1/2
          top-1/2
          z-20
          hidden
          h-12
          w-12
          -translate-x-1/2
          -translate-y-1/2
          rotate-45
          items-center
          justify-center
          border
          border-white/75
          md:flex
        "
        style={{
          backgroundColor: colorPrincipal,
          boxShadow: `0 0 24px ${colorPrincipal}90`,
        }}
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span
          className="
            -rotate-45
            text-base
            text-[#1F1F1F]
          "
        >
          {evento.simbolo}
        </span>
      </motion.div>

      {/* ===============================================
          TARJETA
      =============================================== */}

      <motion.article
        className="
          itinerario-xv__tarjeta
          group
          relative
          w-full
          overflow-hidden
          border
          border-white/55
          px-6
          py-9
          shadow-[0_22px_55px_rgba(31,31,31,0.16)]
          sm:px-8
          sm:py-11
          md:w-[44%]
          md:px-10
          md:py-12
        "
        style={{
          backgroundColor: colorPrincipal,
        }}
        whileHover={{
          y: -6,
        }}
        transition={{
          duration: 0.35,
        }}
      >
        {/* Marco interior */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-3
            border
            border-white/45
            sm:inset-4
          "
        />

        {/* Esquina decorativa superior */}

        <div
          aria-hidden="true"
          className={`
            pointer-events-none
            absolute
            top-0
            h-16
            w-16
            border-t-[12px]
            ${
              izquierda
                ? "right-0 border-r-[12px]"
                : "left-0 border-l-[12px]"
            }
          `}
          style={{
            borderColor: colorContraste,
          }}
        />

        {/* Esquina opuesta */}

        <div
          aria-hidden="true"
          className={`
            pointer-events-none
            absolute
            bottom-0
            h-10
            w-24
            ${
              izquierda
                ? "left-0"
                : "right-0"
            }
          `}
          style={{
            backgroundColor: colorContraste,
            clipPath: izquierda
              ? "polygon(0 0, 100% 100%, 0 100%)"
              : "polygon(100% 0, 100% 100%, 0 100%)",
          }}
        />

        {/* Brillo recto */}

        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            top-0
            h-full
            w-24
            -skew-x-12
            bg-gradient-to-r
            from-transparent
            via-white/25
            to-transparent
          "
          animate={{
            left: ["-45%", "135%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: "easeInOut",
          }}
        />

        {/* Contenido */}

        <div className="relative z-10">
          {/* Hora */}

          <div
            className={`
              flex
              items-center
              gap-3
              ${
                izquierda
                  ? "justify-start"
                  : "md:justify-end"
              }
            `}
          >
            <span
              className="
                h-px
                w-10
                bg-[#1F1F1F]/45
                sm:w-14
              "
            />

            <p
              className="
                text-[15px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#1F1F1F]
                sm:text-[12px]
                sm:tracking-[0.42em]
              "
            >
              {evento.hora}
            </p>
          </div>

          {/* Título */}

          <div
            className={`
              mt-6
              flex
              items-center
              gap-4
              ${
                izquierda
                  ? "justify-start"
                  : "md:justify-end"
              }
            `}
          >
            <span
              className="
                flex
                h-10
                w-10
                flex-shrink-0
                rotate-45
                items-center
                justify-center
                border
                border-white/70
                bg-white/35
                md:hidden
              "
            >
              <span
                className="
                  -rotate-45
                  text-sm
                  text-[#1F1F1F]
                "
              >
                {evento.simbolo}
              </span>
            </span>

            <h3
              className={`
                font-cursiveDancing
                text-[38px]
                leading-none
                text-[#1F1F1F]
                sm:text-[46px]
                md:text-[50px]
                ${
                  izquierda
                    ? "text-left"
                    : "md:text-right"
                }
              `}
            >
              {evento.titulo}
            </h3>
          </div>

          {/* Separador */}

          <div
            className={`
              my-6
              flex
              items-center
              gap-3
              ${
                izquierda
                  ? "justify-start"
                  : "md:justify-end"
              }
            `}
          >
            <motion.span
              className="
                block
                h-[2px]
                bg-[#1F1F1F]/50
              "
              animate={{
                width: ["55px", "90px", "55px"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <span
              className="
                h-2
                w-2
                rotate-45
                bg-white
              "
            />
          </div>

          {/* Descripción */}

          <p
            className={`
              max-w-xl
              text-[14px]
              leading-[1.8]
              text-[#1F1F1F]/75
              sm:text-[15px]
              md:text-base
              ${
                izquierda
                  ? "text-left"
                  : "md:ml-auto md:text-right"
              }
            `}
          >
            {evento.descripcion}
          </p>
        </div>
      </motion.article>
    </motion.div>
  );
};

/* =====================================================
   COMPONENTE PRINCIPAL
===================================================== */

const ItinerarioTimelinePremium = () => {
  return (
    <motion.section
      className="
        itinerario-xv
        relative
        w-full
        overflow-hidden
        bg-[#B9D8F4]
        px-4
        py-20
        sm:px-6
        sm:py-24
        md:py-28
        lg:px-10
        lg:py-32
      "
      variants={contenedor}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.05,
      }}
    >
      

      {/* ===============================================
          FRANJAS SUPERIORES
      =============================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-4
          w-1/2
          bg-[#D99AB1]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          h-4
          w-1/2
          bg-white
        "
      />

      {/* ===============================================
          PANELES DIAGONALES DEL FONDO
      =============================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-[14%]
          h-32
          w-[38%]
          bg-white/25
          sm:h-44
        "
        style={{
          clipPath:
            "polygon(0 0, 100% 35%, 82% 100%, 0 75%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[12%]
          right-0
          h-36
          w-[42%]
          bg-[#D99AB1]/55
          sm:h-48
        "
        style={{
          clipPath:
            "polygon(18% 0, 100% 22%, 100% 100%, 0 72%)",
        }}
      />

      {/* Textura lineal */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.06]
        "
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              135deg,
              rgba(31,31,31,0.4) 0px,
              rgba(31,31,31,0.4) 1px,
              transparent 1px,
              transparent 12px
            )
          `,
        }}
      />

      {/* ===============================================
          ENCABEZADO
      =============================================== */}

      <motion.div
        className="
          itinerario-xv__encabezado
          relative
          z-10
          mx-auto
          mb-16
          max-w-4xl
          text-center
          sm:mb-20
          md:mb-24
        "
        variants={aparecerArriba}
      >

        <h2
          className="
            mt-6
            font-cursiveDancing
            text-[51px]
            leading-[0.95]
            text-[#1F1F1F]
            sm:text-[69px]
            md:text-[83px]
            lg:text-[95px]
          "
        >
          Itinerario
        </h2>

        <div
          className="
            mx-auto
            my-8
            flex
            items-center
            justify-center
            gap-4
            sm:my-10
          "
        >
          <span
            className="
              h-[2px]
              w-16
              bg-[#1F1F1F]/40
              sm:w-24
            "
          />

          <motion.span
            className="
              h-3
              w-3
              rotate-45
              border
              border-white
              bg-[#D99AB1]
              shadow-[0_0_16px_rgba(217,154,177,0.8)]
            "
            animate={{
              rotate: [45, 225, 405],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <span
            className="
              h-[2px]
              w-16
              bg-[#1F1F1F]/40
              sm:w-24
            "
          />
        </div>

      </motion.div>

      {/* ===============================================
          LÍNEA DEL TIEMPO
      =============================================== */}

      <div
        className="
          itinerario-xv__timeline
          relative
          z-10
          mx-auto
          max-w-6xl
        "
      >
        {/* Línea central escritorio */}

        <div
          aria-hidden="true"
          className="
            absolute
            left-1/2
            top-0
            hidden
            h-full
            w-[2px]
            -translate-x-1/2
            bg-white/75
            md:block
          "
        />

        {/* Línea móvil */}

        <div
          aria-hidden="true"
          className="
            absolute
            left-[17px]
            top-0
            h-full
            w-[2px]
            bg-white/75
            md:hidden
          "
        />

        <div
          className="
            flex
            flex-col
            gap-8
            sm:gap-10
            md:gap-20
          "
        >
          {EVENTOS.map((evento, index) => (
            <TarjetaEvento
              key={`${evento.hora}-${evento.titulo}`}
              evento={evento}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Franjas inferiores */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-3
          w-[58%]
          bg-white
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          h-3
          w-[42%]
          bg-[#D99AB1]
        "
      />
    </motion.section>
  );
};

export default ItinerarioTimelinePremium;