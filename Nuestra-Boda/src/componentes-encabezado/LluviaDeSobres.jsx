"use client";

import { motion } from "framer-motion";

/* =====================================================
   INFORMACIÓN DE LA SECCIÓN
===================================================== */

const DATOS_LLUVIA_SOBRES = {
  titulo: "Lluvia de sobres",
  mensaje:
    "Tu presencia es nuestro mejor regalo. Si además deseas tener un detalle con nosotros, agradecemos de corazón tu obsequio en efectivo mediante la tradicional lluvia de sobres. El día del evento encontrarás sobres disponibles para depositar tu regalo.",
};

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
   ANIMACIONES
===================================================== */

const contenedor = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1,
    },
  },
};

const aparecerArriba = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const aparecerCentro = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.97,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const aparecerAbajo = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};



/* =====================================================
   COMPONENTE PRINCIPAL
===================================================== */

const LluviaDeSobres = () => {
  return (
    <motion.section
      className="
        lluvia-sobres
        relative
        flex
        min-h-[760px]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#B9D8F4]
        px-4
        py-20
        sm:px-6
        sm:py-24
        lg:min-h-[860px]
        lg:px-10
        lg:py-32
      "
      variants={contenedor}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.12,
      }}
    >
      {/* =================================================
          FONDO EDITORIAL
          Sin círculos ni ondas
      ================================================= */}


      <div
        aria-hidden="true"
        className="
          lluvia-sobres__franja-superior-blanca
          pointer-events-none
          absolute
          right-0
          top-0
          h-4
          w-[38%]
          bg-white
        "
      />



      <div
        aria-hidden="true"
        className="
          lluvia-sobres__bloque-blanco-derecho
          pointer-events-none
          absolute
          right-0
          top-[38%]
          h-52
          w-[30%]
          bg-white
          opacity-25
          sm:h-72
        "
        style={{
          clipPath: "polygon(25% 0, 100% 18%, 100% 100%, 0 76%)",
        }}
      />



      <div
        aria-hidden="true"
        className="
          lluvia-sobres__linea-derecha
          pointer-events-none
          absolute
          right-6
          top-1/2
          hidden
          h-40
          w-px
          -translate-y-1/2
          bg-[#D99AB1]
          sm:block
          lg:right-12
        "
      />

      {/* =================================================
          TARJETA PRINCIPAL
      ================================================= */}

      <motion.div
        className="
          lluvia-sobres__contenedor
          relative
          z-10
          mx-auto
          w-full
          max-w-5xl
        "
        variants={aparecerCentro}
      >
        {/* Sombra desplazada rosa */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-5
            -right-4
            h-full
            w-full
            bg-[#D99AB1]
            sm:-bottom-7
            sm:-right-7
          "
        />

        {/* Tarjeta */}

        <motion.div
          className="
            lluvia-sobres__tarjeta
            relative
            overflow-hidden
            border
            border-white/70
            bg-[#B9D8F4]
            px-6
            py-14
            text-center
            shadow-[0_30px_80px_rgba(31,31,31,0.18)]
            sm:px-12
            sm:py-16
            md:px-16
            md:py-20
            lg:px-24
            lg:py-24
          "
          whileHover={{
            y: -5,
          }}
          transition={{
            duration: 0.35,
          }}
        >
          {/* Panel blanco interior */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-4
              bottom-4
              top-[13%]
              bg-white
              sm:inset-x-6
              sm:bottom-6
            "
          />

          {/* Franja rosa lateral */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              h-full
              w-3
              bg-[#D99AB1]
              sm:w-5
            "
          />

 

          {/* Diagonal azul inferior */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-4
              left-4
              h-28
              w-40
              bg-[#B9D8F4]
              opacity-75
              sm:bottom-6
              sm:left-6
              sm:h-36
              sm:w-52
            "
            style={{
              clipPath: "polygon(0 0, 100% 100%, 0 100%)",
            }}
          />


          {/* Marco interior */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-7
              border
              border-[#1F1F1F]/15
              sm:inset-10
            "
          />

          {/* Brillo animado */}

          <motion.div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              top-0
              h-full
              w-28
              -skew-x-12
              bg-gradient-to-r
              from-transparent
              via-white/28
              to-transparent
            "
            animate={{
              left: ["-45%", "140%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: "easeInOut",
            }}
          />

          {/* =================================================
              CONTENIDO
          ================================================= */}

          <div
            className="
              lluvia-sobres__contenido
              relative
              z-10
              mx-auto
              max-w-3xl
            "
          >


            {/* Título */}

            <motion.h2
              className="
                mt-10
                font-cursiveDancing
                text-[52px]
                leading-[0.95]
                text-[#D99AB1]
                sm:text-[68px]
                md:text-[82px]
              "
              variants={aparecerCentro}
            >
              {DATOS_LLUVIA_SOBRES.titulo}
            </motion.h2>

            {/* Separador */}

            <motion.div
              className="
                mx-auto
                my-8
                flex
                items-center
                justify-center
                gap-3
                sm:my-10
              "
              variants={aparecerCentro}
            >
              <motion.span
                className="
                  block
                  h-px
                  bg-[#B9D8F4]
                "
                animate={{
                  width: ["42px", "76px", "42px"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <span
                className="
                  h-2.5
                  w-2.5
                  rotate-45
                  bg-[#D99AB1]
                "
              />



              <span
                className="
                  h-2.5
                  w-2.5
                  rotate-45
                  bg-[#D99AB1]
                "
              />

              <motion.span
                className="
                  block
                  h-px
                  bg-[#B9D8F4]
                "
                animate={{
                  width: ["42px", "76px", "42px"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Mensaje */}

            <motion.p
              className="
                mx-auto
                max-w-2xl
                font-playfair
                text-[1.25rem]
                leading-[1.8]
                text-[#1F1F1F]
                sm:text-[1.65rem]
                sm:leading-[1.75]
                md:text-[1.9rem]
              "
              variants={aparecerCentro}
            >
              {DATOS_LLUVIA_SOBRES.mensaje}
            </motion.p>


          </div>

          {/* Esquinas decorativas */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-7
              top-7
              h-14
              w-14
              border-l-2
              border-t-2
              border-[#D99AB1]
              sm:left-10
              sm:top-10
              sm:h-20
              sm:w-20
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-7
              right-7
              h-14
              w-14
              border-b-2
              border-r-2
              border-[#B9D8F4]
              sm:bottom-10
              sm:right-10
              sm:h-20
              sm:w-20
            "
          />

          {/* Rombos decorativos */}

          <motion.span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-10
              top-16
              h-3
              w-3
              rotate-45
              bg-[#D99AB1]
              sm:right-16
              sm:top-20
            "
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [0.85, 1.2, 0.85],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-16
              left-10
              h-3
              w-3
              rotate-45
              bg-[#B9D8F4]
              sm:bottom-20
              sm:left-16
            "
            animate={{
              opacity: [1, 0.4, 1],
              scale: [1.2, 0.85, 1.2],
            }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* =================================================
          FRANJAS INFERIORES
      ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-4
          w-[38%]
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
          h-4
          w-[62%]
          bg-[#D99AB1]
        "
      />
    </motion.section>
  );
};

export default LluviaDeSobres;