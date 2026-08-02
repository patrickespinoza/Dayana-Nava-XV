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
   INFORMACIÓN DEL EVENTO
===================================================== */

const DATOS_EVENTO = {
  diaSemana: "Sábado",
  dia: "19",
  mes: "Septiembre",
  anio: "2026",

  ceremonia: {
    titulo: "Ceremonia religiosa",
    hora: "16:00 Hrs",
    lugar: "Parroquia de San Francisco de Asís",
    direccion:
      "Leandro Valle 20, Barrio Nte, 52960 Cdad. López Mateos, Méx.",
    ubicacion:
      "https://maps.app.goo.gl/tJMN1VkjkJm81eUb8",
    variante: "azul",
  },

  recepcion: {
    titulo: "Recepción",
    hora: "17:30 Hrs",
    lugar: "Jardín Hermon",
    direccion:
      "Leandro Valle #16, Colonia Atizapán Centro, Atizapán de Zaragoza, Estado de México, 52900.",
    ubicacion:
      "https://maps.app.goo.gl/WJsGt8i7GYRcRoMC6",
    variante: "rosa",
  },
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
   TARJETA DE UBICACIÓN
===================================================== */

const TarjetaUbicacion = ({
  titulo,
  hora,
  lugar,
  direccion,
  ubicacion,
  variante,
}) => {
  const esAzul = variante === "azul";

  const colorPrincipal = esAzul
    ? COLORES.azul
    : COLORES.rosa;

  const colorSecundario = esAzul
    ? COLORES.rosa
    : COLORES.azul;

  return (
    <motion.article
      variants={
        esAzul
          ? aparecerIzquierda
          : aparecerDerecha
      }
      className="
        evento-xv__tarjeta
        group
        relative
        flex
        min-h-[460px]
        w-full
        flex-col
        overflow-hidden
        border
        border-white/50
        shadow-[0_28px_70px_rgba(31,31,31,0.18)]
        sm:min-h-[500px]
      "
      style={{
        backgroundColor: colorPrincipal,
      }}
      whileHover={{
        y: -7,
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
          inset-4
          border
          border-white/60
          sm:inset-5
        "
      />

      {/* Franja superior */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-3
          w-full
        "
        style={{
          backgroundColor: colorSecundario,
        }}
      />

      {/* Bloque diagonal superior */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          h-28
          w-40
          bg-white/25
          sm:h-36
          sm:w-52
        "
        style={{
          clipPath:
            "polygon(38% 0, 100% 0, 100% 100%, 0 35%)",
        }}
      />

      {/* Bloque inferior */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-20
          w-[48%]
        "
        style={{
          backgroundColor: colorSecundario,
          clipPath:
            "polygon(0 25%, 100% 100%, 0 100%)",
        }}
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
          via-white/25
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

      {/* Contenido */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          flex-1
          flex-col
          items-center
          justify-center
          px-7
          py-14
          text-center
          sm:px-10
          sm:py-16
          lg:px-12
        "
      >
        {/* Etiqueta */}

        <div
          className="
            flex
            items-center
            justify-center
            gap-3
          "
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
              text-[9px]
              font-bold
              uppercase
              tracking-[0.28em]
              text-[#1F1F1F]
              sm:text-[11px]
              sm:tracking-[0.4em]
            "
          >
            {titulo}
          </p>

          <span
            className="
              h-px
              w-10
              bg-[#1F1F1F]/45
              sm:w-14
            "
          />
        </div>

        {/* Hora */}

        <p
          className="
            mt-8
            font-playfair
            text-[40px]
            leading-none
            text-[#1F1F1F]
            sm:text-[50px]
            lg:text-[56px]
          "
        >
          {hora}
        </p>

        {/* Separador */}

        <div
          className="
            my-8
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <motion.span
            className="
              block
              h-[2px]
              bg-[#1F1F1F]/45
            "
            animate={{
              width: ["45px", "78px", "45px"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.span
            aria-hidden="true"
            className="
              h-3
              w-3
              rotate-45
              border
              border-white/80
            "
            style={{
              backgroundColor: colorSecundario,
            }}
            animate={{
              rotate: [45, 225, 405],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.span
            className="
              block
              h-[2px]
              bg-[#1F1F1F]/45
            "
            animate={{
              width: ["45px", "78px", "45px"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Lugar */}

        <h3
          className="
            max-w-xl
            font-cursiveDancing
            text-[37px]
            leading-tight
            text-[#1F1F1F]
            sm:text-[46px]
            lg:text-[52px]
          "
        >
          {lugar}
        </h3>

        {/* Dirección */}

        <p
          className="
            mx-auto
            mt-6
            max-w-md
            text-sm
            leading-[1.8]
            text-[#1F1F1F]/75
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
            evento-xv__boton
            relative
            mt-9
            inline-flex
            min-h-[50px]
            w-full
            max-w-[260px]
            items-center
            justify-center
            overflow-hidden
            border
            border-[#1F1F1F]/20
            bg-[#1F1F1F]
            px-7
            py-3.5
            text-center
            shadow-[0_14px_30px_rgba(31,31,31,0.22)]
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
              absolute
              top-0
              h-full
              w-[70%]
              -skew-x-12
              bg-white/20
            "
            initial={{
              left: "-120%",
            }}
            animate={{
              left: ["-120%", "160%"],
            }}
            transition={{
              duration: 3.3,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeInOut",
            }}
          />

          <span
            className="
              relative
              z-10
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-white
              sm:text-[11px]
              sm:tracking-[0.32em]
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
      className="
        evento-xv
        relative
        w-full
        overflow-hidden
        bg-[#B9D8F4]
        px-4
        py-20
        sm:px-6
        sm:py-24
        lg:px-10
        lg:py-32
      "
      variants={contenedor}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.06,
      }}
    >
      {/* =================================================
          FONDO SIN CÍRCULOS
      ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-5
          w-[60%]
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
          h-5
          w-[40%]
          bg-white
        "
      />

      {/* Bloque rosa izquierdo */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-[18%]
          h-[280px]
          w-[32%]
          bg-[#D99AB1]
          opacity-75
          sm:h-[370px]
          lg:w-[26%]
        "
        style={{
          clipPath:
            "polygon(0 0, 100% 20%, 78% 100%, 0 78%)",
        }}
      />

      {/* Bloque blanco derecho */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-0
          top-[34%]
          h-[220px]
          w-[27%]
          bg-white
          opacity-25
          sm:h-[300px]
        "
        style={{
          clipPath:
            "polygon(25% 0, 100% 18%, 100% 100%, 0 76%)",
        }}
      />

      {/* Bloque rosa inferior */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[4%]
          right-0
          h-[240px]
          w-[40%]
          bg-[#D99AB1]
          opacity-60
          sm:h-[320px]
          lg:w-[32%]
        "
        style={{
          clipPath:
            "polygon(22% 0, 100% 24%, 100% 100%, 0 75%)",
        }}
      />

      {/* Líneas laterales */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-6
          top-[42%]
          hidden
          h-52
          w-px
          bg-[#1F1F1F]/35
          sm:block
          lg:left-12
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-6
          top-[58%]
          hidden
          h-40
          w-px
          bg-[#D99AB1]
          sm:block
          lg:right-12
        "
      />

      {/* =================================================
          CONTENIDO PRINCIPAL
      ================================================= */}

      <div
        className="
          evento-xv__contenido
          relative
          z-10
          mx-auto
          w-full
          max-w-6xl
        "
      >
        {/* =================================================
            ENCABEZADO
        ================================================= */}

        <motion.div
          className="
            evento-xv__encabezado
            mx-auto
            max-w-4xl
            text-center
          "
          variants={aparecerArriba}
        >


          <h2
            className="
              mt-6
              font-cursiveDancing
              text-[52px]
              leading-[0.95]
              text-[#1F1F1F]
              sm:text-[70px]
              md:text-[86px]
              lg:text-[96px]
            "
          >
            Save the Date
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              font-playfair
              text-[15px]
              leading-[1.85]
              text-[#1F1F1F]/75
              sm:text-[17px]
              md:text-[18px]
            "
          >
            Cada detalle de este día ha sido preparado
            con mucha ilusión. Será un honor compartir
            contigo esta celebración tan especial.
          </p>
        </motion.div>

        {/* =================================================
            FECHA
        ================================================= */}

        <motion.div
          className="
            evento-xv__fecha
            relative
            mx-auto
            mt-14
            grid
            w-full
            max-w-5xl
            overflow-hidden
            border
            border-white/65
            shadow-[0_28px_75px_rgba(31,31,31,0.18)]
            sm:mt-16
            md:grid-cols-[0.9fr_1.2fr]
          "
          variants={aparecerArriba}
        >
          {/* Día */}

          <div
            className="
              evento-xv__fecha-dia
              relative
              flex
              min-h-[285px]
              flex-col
              items-center
              justify-center
              overflow-hidden
              bg-[#D99AB1]
              px-6
              py-12
              text-center
              md:min-h-[410px]
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-0
                top-0
                h-3
                w-full
                bg-white
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                bottom-0
                left-0
                h-24
                w-[58%]
                bg-[#B9D8F4]
              "
              style={{
                clipPath:
                  "polygon(0 20%, 100% 100%, 0 100%)",
              }}
            />

            <p
              className="
                relative
                z-10
                text-[10px]
                font-bold
                uppercase
                tracking-[0.35em]
                text-[#1F1F1F]
                sm:text-[12px]
              "
            >
              {DATOS_EVENTO.diaSemana}
            </p>

            <motion.span
              className="
                relative
                z-10
                mt-3
                font-cursiveDancing
                text-[115px]
                leading-[0.75]
                text-[#1F1F1F]
                sm:text-[150px]
              "
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {DATOS_EVENTO.dia}
            </motion.span>
          </div>

          {/* Mes y año */}

          <div
            className="
              evento-xv__fecha-mes
              relative
              flex
              min-h-[285px]
              flex-col
              items-center
              justify-center
              overflow-hidden
              bg-[#B9D8F4]
              px-6
              py-12
              text-center
              md:min-h-[410px]
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                right-0
                top-0
                h-28
                w-44
                bg-white/35
                sm:h-36
                sm:w-56
              "
              style={{
                clipPath:
                  "polygon(35% 0, 100% 0, 100% 100%, 0 30%)",
              }}
            />

            <p
              className="
                relative
                z-10
                text-[10px]
                font-bold
                uppercase
                tracking-[0.34em]
                text-[#D99AB1]
                sm:text-[12px]
              "
            >
              Mis XV años
            </p>

            <h3
              className="
                relative
                z-10
                mt-6
                font-playfair
                text-[40px]
                leading-tight
                text-[#1F1F1F]
                sm:text-[54px]
                md:text-[60px]
              "
            >
              {DATOS_EVENTO.mes}
            </h3>

            <div
              className="
                relative
                z-10
                my-7
                flex
                items-center
                justify-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-14
                  bg-[#1F1F1F]/45
                "
              />

              <motion.span
                className="
                  h-3
                  w-3
                  rotate-45
                  bg-[#D99AB1]
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
                  h-px
                  w-14
                  bg-[#1F1F1F]/45
                "
              />
            </div>

            <p
              className="
                relative
                z-10
                font-playfair
                text-3xl
                tracking-[0.2em]
                text-[#1F1F1F]
                sm:text-4xl
              "
            >
              {DATOS_EVENTO.anio}
            </p>
          </div>
        </motion.div>

        {/* =================================================
            UBICACIONES
        ================================================= */}

        <div
          className="
            evento-xv__ubicaciones
            mt-10
            grid
            grid-cols-1
            gap-7
            sm:mt-12
            md:grid-cols-2
            lg:gap-9
          "
        >
          <TarjetaUbicacion
            {...DATOS_EVENTO.ceremonia}
          />

          <TarjetaUbicacion
            {...DATOS_EVENTO.recepcion}
          />
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
          h-4
          w-[42%]
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
          w-[58%]
          bg-[#D99AB1]
        "
      />
    </motion.section>
  );
}