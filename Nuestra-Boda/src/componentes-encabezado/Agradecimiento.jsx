import React from "react";
import { motion } from "framer-motion";

/* =====================================================
   PALETA DE COLORES
===================================================== */

const COLORES = {
  azul: "#B9D8F4",
  rosa: "#D99AB1",
  blanco: "#FFFFFF",
  negro: "#1F1F1F",
};

/* =====================================================
   INFORMACIÓN DE LA SECCIÓN
===================================================== */

const DATOS_LUGARES = {
  iglesia: {
    categoria: "Ceremonia religiosa",
    nombre: "Parroquia de San Francisco de Asís",
    imagen: "/iglesia.jpg",

    // Movimiento de la imagen
    posicionDesktop: "center 50%",
    posicionMobile: "90% 50%",
  },

  salon: {
    categoria: "Recepción",
    nombre: "Jardín Hermon",
    imagen: "/salon.jpg",

    // Movimiento de la imagen
    posicionDesktop: "center 50%",
    posicionMobile: "center 50%",
  },

  familia: {
    mama: "Ma. del Pilar Melendez Olvera",
    madrina: "Sandra Melendez Olvera",
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
      staggerChildren: 0.2,
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
   TARJETA FOTOGRÁFICA
===================================================== */

const TarjetaLugar = ({
  datos,
  variante = "azul",
  direccionAnimacion = "izquierda",
}) => {
  const esAzul = variante === "azul";

  return (
    <motion.article
      className="
        lugares-familia__tarjeta
        group
        relative
        min-h-[520px]
        w-full
        overflow-hidden
        border
        border-white/30
        shadow-[0_24px_65px_rgba(31,31,31,0.22)]
        sm:min-h-[620px]
        lg:min-h-[690px]
      "
      variants={
        direccionAnimacion === "izquierda"
          ? aparecerIzquierda
          : aparecerDerecha
      }
    >
      {/* ===============================================
          IMAGEN MÓVIL
      =============================================== */}

      <motion.img
        src={datos.imagen}
        alt={datos.nombre}
        className="
          lugares-familia__imagen-mobile
          absolute
          inset-0
          block
          h-full
          w-full
          object-cover
          transition-transform
          duration-[1600ms]
          group-hover:scale-[1.04]
          md:hidden
        "
        style={{
          objectPosition: datos.posicionMobile,
        }}
      />

      {/* ===============================================
          IMAGEN COMPUTADORA
      =============================================== */}

      <motion.img
        src={datos.imagen}
        alt={datos.nombre}
        className="
          lugares-familia__imagen-desktop
          absolute
          inset-0
          hidden
          h-full
          w-full
          object-cover
          transition-transform
          duration-[1600ms]
          group-hover:scale-[1.04]
          md:block
        "
        style={{
          objectPosition: datos.posicionDesktop,
        }}
      />

      {/* Overlay general */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/20
        "
      />

      {/* Oscurecimiento inferior */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-[72%]
          bg-gradient-to-t
          from-black/90
          via-black/45
          to-transparent
        "
      />

      {/* ===============================================
          INFORMACIÓN
      =============================================== */}

      <div
        className="
          lugares-familia__informacion
          absolute
          inset-x-0
          bottom-0
          z-10
          px-6
          pb-9
          pt-24
          text-left
          sm:px-9
          sm:pb-12
          md:px-10
          lg:px-12
        "
      >
        <motion.div
          className="
            mb-5
            flex
            items-center
            gap-3
          "
          initial={{
            opacity: 0,
            x: -15,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
        >
          <span
            className={`
              h-px
              w-12
              ${
                esAzul
                  ? "bg-[#B9D8F4]"
                  : "bg-[#D99AB1]"
              }
            `}
          />

          <p
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-white
              sm:text-[11px]
              sm:tracking-[0.4em]
            "
          >
            {datos.categoria}
          </p>
        </motion.div>

        <h3
          className="
            max-w-xl
            font-playfair
            text-[30px]
            leading-tight
            text-white
            sm:text-[38px]
            md:text-[42px]
            lg:text-[46px]
          "
          style={{
            textShadow:
              "0 4px 16px rgba(0,0,0,0.55)",
          }}
        >
          {datos.nombre}
        </h3>




      </div>
    </motion.article>
  );
};

/* =====================================================
   COMPONENTE PRINCIPAL
===================================================== */

const LugaresYFamilia = () => {
  return (
    <motion.section
      className="
        lugares-familia
        relative
        w-full
        overflow-hidden
        bg-[#B9D8F4]
        py-20
        sm:py-24
        lg:py-28
      "
      variants={contenedor}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.08,
      }}
    >
      {/* ===============================================
          FRANJA SUPERIOR ROSA
      =============================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-3
          w-full
          bg-[#D99AB1]
        "
      />

      {/* ===============================================
          ENCABEZADO
      =============================================== */}

      <motion.div
        className="
          lugares-familia__encabezado
          relative
          z-10
          mx-auto
          max-w-4xl
          px-5
          text-center
          sm:px-8
        "
        variants={aparecerArriba}
      >
        <div
          className="
            flex
            items-center
            justify-center
            gap-3
            sm:gap-5
          "
        >
          <span
            className="
              h-px
              w-10
              bg-[#1F1F1F]/45
              sm:w-20
            "
          />

          <span
            className="
              h-2
              w-2
              rotate-45
              bg-[#D99AB1]
            "
          />

          <p
            className="
              whitespace-nowrap
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[#1F1F1F]
              sm:text-[11px]
              sm:tracking-[0.46em]
            "
          >
            Lugares de celebración
          </p>

          <span
            className="
              h-2
              w-2
              rotate-45
              bg-[#D99AB1]
            "
          />

          <span
            className="
              h-px
              w-10
              bg-[#1F1F1F]/45
              sm:w-20
            "
          />
        </div>


      </motion.div>

      {/* ===============================================
          FOTOGRAFÍAS
      =============================================== */}

      <div
        className="
          lugares-familia__fotografias
          relative
          z-10
          mx-auto
          mt-14
          grid
          w-full
          max-w-[1450px]
          grid-cols-1
          gap-5
          px-4
          sm:mt-16
          sm:gap-6
          sm:px-6
          md:grid-cols-2
          lg:px-10
        "
      >
        <TarjetaLugar
          datos={DATOS_LUGARES.iglesia}
          variante="azul"
          direccionAnimacion="izquierda"
        />

        <TarjetaLugar
          datos={DATOS_LUGARES.salon}
          variante="rosa"
          direccionAnimacion="derecha"
        />
      </div>

      {/* ===============================================
          MAMÁ Y MADRINA
      =============================================== */}

      <motion.div
        className="
          lugares-familia__personas
          relative
          z-10
          mx-auto
          mt-6
          w-[calc(100%-2rem)]
          max-w-[1370px]
          overflow-hidden
          bg-[#1F1F1F]
          px-5
          py-14
          shadow-[0_25px_65px_rgba(31,31,31,0.22)]
          sm:w-[calc(100%-3rem)]
          sm:px-10
          sm:py-16
          lg:px-16
          lg:py-20
        "
        variants={aparecerArriba}
      >
        {/* Franja rosa izquierda */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            h-full
            w-2
            bg-[#D99AB1]
            sm:w-3
          "
        />

        {/* Franja azul derecha */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            h-full
            w-2
            bg-[#B9D8F4]
            sm:w-3
          "
        />

        <div
          className="
            relative
            z-10
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              gap-4
            "
          >
            <span
              className="
                h-px
                w-10
                bg-[#B9D8F4]
                sm:w-20
              "
            />

            <p
              className="
                text-center
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-white
                sm:text-[11px]
                sm:tracking-[0.46em]
              "
            >
              Con el amor y compañía de
            </p>

            <span
              className="
                h-px
                w-10
                bg-[#D99AB1]
                sm:w-20
              "
            />
          </div>

          <h3
            className="
              mt-5
              text-center
              font-cursiveDancing
              text-[44px]
              leading-tight
              text-[#D99AB1]
              sm:text-[58px]
              md:text-[66px]
            "
          >
            Personas muy importantes
          </h3>

          <div
            className="
              mx-auto
              mt-10
              grid
              max-w-5xl
              grid-cols-1
              gap-8
              md:grid-cols-[1fr_auto_1fr]
              md:items-center
              md:gap-10
            "
          >
            {/* MAMÁ */}

            <motion.div
              className="
                lugares-familia__mama
                px-4
                text-center
                md:text-right
              "
              whileHover={{
                y: -4,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#B9D8F4]
                  sm:text-[11px]
                "
              >
                Mi mamá
              </p>

              <p
                className="
                  mt-4
                  font-playfair
                  text-[25px]
                  leading-snug
                  text-white
                  sm:text-[31px]
                "
              >
                {DATOS_LUGARES.familia.mama}
              </p>

              <div
                className="
                  mx-auto
                  mt-5
                  h-1
                  w-16
                  bg-[#B9D8F4]
                  md:ml-auto
                  md:mr-0
                "
              />
            </motion.div>

            {/* SEPARADOR CENTRAL */}

            <div
              aria-hidden="true"
              className="
                mx-auto
                h-px
                w-28
                bg-white/25
                md:h-28
                md:w-px
              "
            />

            {/* MADRINA */}

            <motion.div
              className="
                lugares-familia__madrina
                px-4
                text-center
                md:text-left
              "
              whileHover={{
                y: -4,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#D99AB1]
                  sm:text-[11px]
                "
              >
                Mi madrina
              </p>

              <p
                className="
                  mt-4
                  font-playfair
                  text-[25px]
                  leading-snug
                  text-white
                  sm:text-[31px]
                "
              >
                {DATOS_LUGARES.familia.madrina}
              </p>

              <div
                className="
                  mx-auto
                  mt-5
                  h-1
                  w-16
                  bg-[#D99AB1]
                  md:ml-0
                  md:mr-auto
                "
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ===============================================
          MENSAJE INFERIOR
      =============================================== */}

      <motion.div
        className="
          lugares-familia__mensaje
          relative
          z-10
          mx-auto
          mt-14
          max-w-3xl
          px-6
          text-center
          sm:mt-18
        "
        variants={aparecerArriba}
      >
        <p
          className="
            font-cursiveDancing
            text-[31px]
            leading-relaxed
            text-[#1F1F1F]
            sm:text-[39px]
          "
        >
          Gracias por formar parte de esta historia
          tan especial.
        </p>

        <div
          className="
            mx-auto
            mt-6
            flex
            items-center
            justify-center
            gap-4
          "
        >
          <span
            className="
              h-px
              w-16
              bg-[#1F1F1F]/40
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

          <span
            className="
              h-px
              w-16
              bg-[#1F1F1F]/40
            "
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default LugaresYFamilia;