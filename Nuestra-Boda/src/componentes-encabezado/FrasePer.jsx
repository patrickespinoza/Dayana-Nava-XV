import React from "react";
import { motion } from "framer-motion";

/* =====================================================
   INFORMACIÓN PRINCIPAL
===================================================== */

const DATOS_FRASE = {
  frase:
    "Hay recuerdos que no voy a borrar, personas que no voy a olvidar y momentos como este que siempre voy a guardar. Con la bendición de Dios y en compañía de mi familia, acompáñanos a celebrar.",

  nombre: "Dayana",
  celebracion: "Mis XV años",
};


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
      delayChildren: 0.12,
    },
  },
};

const aparecerArriba = {
  hidden: {
    opacity: 0,
    y: -28,
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
      duration: 1.05,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const aparecerIzquierda = {
  hidden: {
    opacity: 0,
    x: -45,
  },

  show: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.95,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const aparecerDerecha = {
  hidden: {
    opacity: 0,
    x: 45,
  },

  show: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.95,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const aparecerAbajo = {
  hidden: {
    opacity: 0,
    y: 28,
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

const FrasePersonalizada = () => {
  return (
    <motion.section
      className="
        frase-personalizada
        relative
        flex
        min-h-[720px]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#B9D8F4]
        px-4
        py-20
        sm:px-6
        sm:py-24
        lg:min-h-[820px]
        lg:px-10
        lg:py-32
      "
      variants={contenedor}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.15,
      }}
    >
      {/* =================================================
          BLOQUES DECORATIVOS DEL FONDO
          Sin círculos ni ondas
      ================================================= */}

      
      <div
        aria-hidden="true"
        className="
          frase-personalizada__panel-rosa-izquierdo
          pointer-events-none
          absolute
          left-0
          top-[15%]
          h-[230px]
          w-[34%]
          bg-[#D99AB1]
          opacity-70
          sm:h-[300px]
          lg:w-[29%]
        "
        style={{
          clipPath:
            "polygon(0 0, 100% 20%, 82% 100%, 0 78%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          frase-personalizada__panel-blanco-derecho
          pointer-events-none
          absolute
          right-0
          top-[31%]
          h-[190px]
          w-[30%]
          bg-white
          opacity-35
          sm:h-[260px]
          lg:w-[24%]
        "
        style={{
          clipPath:
            "polygon(18% 0, 100% 16%, 100% 100%, 0 80%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          frase-personalizada__panel-rosa-inferior
          pointer-events-none
          absolute
          bottom-[7%]
          right-0
          h-[190px]
          w-[42%]
          bg-[#D99AB1]
          opacity-65
          sm:h-[250px]
          lg:w-[34%]
        "
        style={{
          clipPath:
            "polygon(20% 0, 100% 24%, 100% 100%, 0 76%)",
        }}
      />

      {/* Líneas laterales */}


      <div
        aria-hidden="true"
        className="
          frase-personalizada__linea-derecha
          pointer-events-none
          absolute
          right-5
          top-1/2
          hidden
          h-36
          w-px
          -translate-y-1/2
          bg-[#D99AB1]
          sm:block
          lg:right-10
        "
      />

      {/* =================================================
          CONTENEDOR PRINCIPAL
      ================================================= */}

      <motion.div
        className="
          frase-personalizada__contenedor
          relative
          z-10
          mx-auto
          w-full
          max-w-6xl
        "
        variants={aparecerCentro}
      >
        {/* Sombra desplazada rosa */}

        <div
          aria-hidden="true"
          className="
            frase-personalizada__sombra-rosa
            pointer-events-none
            absolute
            -bottom-4
            -right-3
            h-full
            w-full
            bg-[#D99AB1]
            sm:-bottom-6
            sm:-right-6
          "
        />

        {/* Sombra desplazada negra */}

        <div
          aria-hidden="true"
          className="
            frase-personalizada__sombra-negra
            pointer-events-none
            absolute
            -left-2
            -top-2
            h-[32%]
            w-[42%]
            bg-[#1F1F1F]
            opacity-15
            sm:-left-4
            sm:-top-4
          "
        />

        {/* =================================================
            TARJETA PRINCIPAL
        ================================================= */}

        <motion.div
          className="
            frase-personalizada__tarjeta
            relative
            overflow-hidden
            border
            border-white/70
            bg-[#B9D8F4]
            px-6
            py-14
            text-center
            shadow-[0_28px_75px_rgba(31,31,31,0.18)]
            sm:px-12
            sm:py-16
            md:px-16
            md:py-20
            lg:px-24
            lg:py-24
          "
          variants={aparecerCentro}
        >
          {/* Panel blanco interior */}

          <div
            aria-hidden="true"
            className="
              frase-personalizada__panel-interior
              pointer-events-none
              absolute
              inset-x-4
              bottom-4
              top-[17%]
              bg-white
              sm:inset-x-6
              sm:bottom-6
            "
          />

          {/* Franja rosa izquierda */}

          <motion.div
            aria-hidden="true"
            className="
              frase-personalizada__franja-rosa
              pointer-events-none
              absolute
              left-0
              top-0
              h-full
              w-3
              bg-[#D99AB1]
              sm:w-5
            "
            variants={aparecerIzquierda}
          />



          {/* Diagonal azul interior */}

          <div
            aria-hidden="true"
            className="
              frase-personalizada__diagonal-azul
              pointer-events-none
              absolute
              bottom-4
              left-4
              h-28
              w-36
              bg-[#B9D8F4]
              opacity-70
              sm:bottom-6
              sm:left-6
              sm:h-36
              sm:w-48
            "
            style={{
              clipPath:
                "polygon(0 0, 100% 100%, 0 100%)",
            }}
          />

          {/* Diagonal rosa interior */}

          <div
            aria-hidden="true"
            className="
              frase-personalizada__diagonal-rosa
              pointer-events-none
              absolute
              right-4
              top-[17%]
              h-28
              w-36
              bg-[#D99AB1]
              opacity-30
              sm:right-6
              sm:h-36
              sm:w-48
            "
            style={{
              clipPath:
                "polygon(100% 0, 100% 100%, 0 0)",
            }}
          />

          {/* Marco recto interior */}

          <div
            aria-hidden="true"
            className="
              frase-personalizada__marco
              pointer-events-none
              absolute
              inset-7
              border
              border-[#1F1F1F]/15
              sm:inset-10
            "
          />

          {/* =================================================
              CONTENIDO
          ================================================= */}

          <div
            className="
              frase-personalizada__contenido
              relative
              z-10
              mx-auto
              max-w-4xl
            "
          >
            {/* Encabezado */}

            <motion.div
              className="
                frase-personalizada__encabezado
                flex
                items-center
                justify-center
                gap-3
                sm:gap-5
              "
              variants={aparecerArriba}
            >
              <span
                className="
                  h-px
                  w-10
                  bg-[#1F1F1F]/45
                  sm:w-20
                "
              />

              <motion.span
                aria-hidden="true"
                className="
                  h-3
                  w-3
                  rotate-45
                  border
                  border-white
                  bg-[#D99AB1]
                  shadow-[0_0_15px_rgba(217,154,177,0.75)]
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

              <p
                className="
                  whitespace-nowrap
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.27em]
                  text-[#1F1F1F]
                  sm:text-[11px]
                  sm:tracking-[0.44em]
                "
              >
                Una celebración especial
              </p>

              <motion.span
                aria-hidden="true"
                className="
                  h-3
                  w-3
                  rotate-45
                  border
                  border-white
                  bg-[#D99AB1]
                  shadow-[0_0_15px_rgba(217,154,177,0.75)]
                "
                animate={{
                  rotate: [45, -135, -315],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <span
                className="
                  h-px
                  w-10
                  bg-[#1F1F1F]/45
                  sm:w-20
                "
              />
            </motion.div>

            {/* Título */}

            <motion.p
              className="
                frase-personalizada__titulo
                mt-7
                font-cursiveDancing
                text-[42px]
                leading-none
                text-[#D99AB1]
                sm:text-[56px]
                md:text-[64px]
              "
              variants={aparecerArriba}
            >
              Un recuerdo para siempre
            </motion.p>

            {/* Comillas */}

            <motion.div
              className="
                frase-personalizada__comillas
                mt-8
                flex
                items-center
                justify-center
                gap-4
              "
              variants={aparecerCentro}
            >
              <span
                className="
                  h-px
                  w-14
                  bg-[#B9D8F4]
                  sm:w-24
                "
              />

              <span
                className="
                  font-playfair
                  text-7xl
                  leading-[0.4]
                  text-[#D99AB1]
                  sm:text-8xl
                "
              >
                “
              </span>

              <span
                className="
                  h-px
                  w-14
                  bg-[#B9D8F4]
                  sm:w-24
                "
              />
            </motion.div>

            {/* Frase */}

            <motion.p
              className="
                frase-personalizada__frase
                mx-auto
                mt-7
                max-w-3xl
                font-playfair
                text-[1.35rem]
                font-normal
                leading-[1.8]
                text-[#1F1F1F]
                sm:text-[1.8rem]
                sm:leading-[1.75]
                md:text-[2.15rem]
                md:leading-[1.7]
                lg:text-[2.45rem]
              "
              variants={aparecerCentro}
            >
              {DATOS_FRASE.frase}
            </motion.p>

            {/* Separador */}

            <motion.div
              className="
                frase-personalizada__separador
                mx-auto
                my-9
                flex
                items-center
                justify-center
                gap-3
                sm:my-11
              "
              variants={aparecerAbajo}
            >
              <motion.span
                className="
                  block
                  h-px
                  bg-[#B9D8F4]
                "
                animate={{
                  width: ["42px", "72px", "42px"],
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
                  h-2
                  w-2
                  rotate-45
                  bg-[#1F1F1F]
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
                  width: ["42px", "72px", "42px"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Nombre */}

            <motion.p
              className="
                frase-personalizada__nombre
                font-cursiveDancing
                text-[52px]
                leading-none
                text-[#D99AB1]
                drop-shadow-[0_7px_14px_rgba(217,154,177,0.25)]
                sm:text-[68px]
                md:text-[82px]
              "
              variants={aparecerAbajo}
            >
              {DATOS_FRASE.nombre}
            </motion.p>

            {/* Texto inferior */}

            <motion.div
              className="
                frase-personalizada__celebracion
                mx-auto
                mt-6
                inline-flex
                items-center
                justify-center
                border-y
                border-[#1F1F1F]/20
                bg-[#B9D8F4]/55
                px-7
                py-3
              "
              variants={aparecerAbajo}
            >
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#1F1F1F]
                  sm:text-[11px]
                  sm:tracking-[0.45em]
                "
              >
                {DATOS_FRASE.celebracion}
              </p>
            </motion.div>
          </div>

          {/* =================================================
              ESQUINAS DECORATIVAS
          ================================================= */}

          <div
            aria-hidden="true"
            className="
              frase-personalizada__esquina-superior
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
              frase-personalizada__esquina-inferior
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
              frase-personalizada__rombo-superior
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
              frase-personalizada__rombo-inferior
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
          frase-personalizada__bloque-inferior-blanco
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
          frase-personalizada__bloque-inferior-rosa
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

export default FrasePersonalizada;