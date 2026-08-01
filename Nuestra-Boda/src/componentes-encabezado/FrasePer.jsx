import React from "react";
import { motion } from "framer-motion";

const FrasePersonalizada = () => {
  const frase =
    "Hoy comienzo una nueva etapa llena de sueños, ilusiones y momentos que guardaré por siempre en mi corazón.";

  const nombre = "Carla";

  const contenedor = {
    hidden: {
      opacity: 0,
    },

    show: {
      opacity: 1,

      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.15,
      },
    },
  };

  const aparecerArriba = {
    hidden: {
      opacity: 0,
      y: -20,
    },

    show: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.9,
        ease: "easeOut",
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
        duration: 1.1,
        ease: "easeOut",
      },
    },
  };

  const aparecerAbajo = {
    hidden: {
      opacity: 0,
      y: 20,
    },

    show: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="
        relative
        flex
        min-h-[620px]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[linear-gradient(145deg,#fffafa_0%,#f8edef_45%,#ead7dc_100%)]
        px-5
        py-20
        sm:px-8
        sm:py-24
        lg:min-h-[700px]
        lg:px-12
        lg:py-28
      "
    >
      {/* Resplandor vino superior */}
      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -top-36
          left-1/2
          h-[340px]
          w-[340px]
          -translate-x-1/2
          rounded-full
          bg-[#7A1838]/10
          blur-[100px]
          sm:h-[430px]
          sm:w-[430px]
        "
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Resplandor dorado inferior */}
      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-44
          right-[-120px]
          h-[360px]
          w-[360px]
          rounded-full
          bg-[#D5B76A]/20
          blur-[110px]
          sm:h-[450px]
          sm:w-[450px]
        "
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Resplandor vino lateral */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-28
          top-1/2
          h-[250px]
          w-[250px]
          -translate-y-1/2
          rounded-full
          bg-[#8D2447]/5
          blur-[80px]
          sm:h-[330px]
          sm:w-[330px]
        "
      />

      {/* Círculo decorativo izquierdo */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-110px]
          top-1/2
          h-[230px]
          w-[230px]
          -translate-y-1/2
          rounded-full
          border
          border-[#D5B76A]/25
          sm:h-[300px]
          sm:w-[300px]
        "
      />

      {/* Círculo decorativo interior */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-80px]
          top-1/2
          h-[170px]
          w-[170px]
          -translate-y-1/2
          rounded-full
          border
          border-[#7A1838]/10
          sm:h-[225px]
          sm:w-[225px]
        "
      />

      {/* Línea vertical decorativa */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-5
          top-16
          hidden
          h-24
          w-px
          bg-gradient-to-b
          from-transparent
          via-[#D5B76A]/70
          to-transparent
          sm:block
          lg:left-12
        "
      />

      {/* Textura muy ligera */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          bg-[repeating-linear-gradient(45deg,rgba(79,16,40,0.14)_0px,rgba(79,16,40,0.14)_1px,transparent_1px,transparent_7px)]
        "
      />

      <motion.div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-4xl
        "
        variants={contenedor}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.3,
        }}
      >
        {/* Tarjeta principal */}
        <motion.div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-[#D5B76A]/30
            bg-white/55
            px-6
            py-14
            text-center
            shadow-[0_25px_70px_rgba(84,17,42,0.13)]
            backdrop-blur-xl
            sm:rounded-[2.5rem]
            sm:px-12
            sm:py-16
            md:px-16
            md:py-20
            lg:px-24
          "
          variants={aparecerCentro}
        >
          {/* Brillo interior */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-br
              from-white/80
              via-transparent
              to-[#7A1838]/5
            "
          />

          {/* Resplandor interior superior */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-52
              w-52
              rounded-full
              bg-[#7A1838]/8
              blur-3xl
            "
          />

          {/* Resplandor interior inferior */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-20
              -left-20
              h-52
              w-52
              rounded-full
              bg-[#D5B76A]/15
              blur-3xl
            "
          />

          {/* Marco interior */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-3
              rounded-[1.5rem]
              border
              border-[#D5B76A]/20
              sm:inset-4
              sm:rounded-[2rem]
            "
          />

          {/* Decoración superior */}
          <motion.div
            className="
              relative
              z-10
              mb-8
              flex
              items-center
              justify-center
              gap-4
            "
            variants={aparecerArriba}
          >
            <span
              className="
                h-px
                w-12
                bg-gradient-to-r
                from-transparent
                to-[#D5B76A]
                sm:w-20
              "
            />

            <motion.span
              className="
                font-playfair
                text-xl
                text-[#D5B76A]
                sm:text-2xl
              "
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

            <span
              className="
                h-px
                w-12
                bg-gradient-to-l
                from-transparent
                to-[#D5B76A]
                sm:w-20
              "
            />
          </motion.div>

          {/* Texto pequeño */}
          <motion.p
            className="
              relative
              z-10
              mb-5
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[#7A1838]
              sm:text-[11px]
              sm:tracking-[0.45em]
            "
            variants={aparecerArriba}
          >
            Un momento para recordar
          </motion.p>

          {/* Comillas decorativas */}
          <motion.span
            className="
              relative
              z-10
              block
              h-12
              font-playfair
              text-6xl
              leading-none
              text-[#D5B76A]/65
              sm:text-7xl
            "
            variants={aparecerCentro}
          >
            “
          </motion.span>

          {/* Frase */}
          <motion.p
            className="
              relative
              z-10
              mx-auto
              max-w-3xl
              font-playfair
              text-2xl
              font-normal
              leading-relaxed
              text-[#40202B]
              sm:text-3xl
              sm:leading-relaxed
              md:text-4xl
              md:leading-relaxed
              lg:text-[2.65rem]
            "
            variants={aparecerCentro}
          >
            {frase}
          </motion.p>

          {/* Separador */}
          <motion.div
            className="
              relative
              z-10
              mx-auto
              my-8
              flex
              items-center
              justify-center
              gap-3
            "
            variants={aparecerAbajo}
          >
            <span
              className="
                h-px
                w-8
                bg-gradient-to-r
                from-transparent
                to-[#D5B76A]
                sm:w-12
              "
            />

            <span
              className="
                h-1.5
                w-1.5
                rotate-45
                bg-[#D5B76A]
                shadow-[0_0_12px_rgba(213,183,106,0.65)]
              "
            />

            <span
              className="
                h-px
                w-8
                bg-gradient-to-l
                from-transparent
                to-[#D5B76A]
                sm:w-12
              "
            />
          </motion.div>

          {/* Nombre */}
          <motion.p
            className="
              relative
              z-10
              font-cursiveDancing
              text-5xl
              leading-none
              text-[#711936]
              drop-shadow-[0_7px_14px_rgba(104,19,50,0.14)]
              sm:text-6xl
              md:text-7xl
            "
            variants={aparecerAbajo}
          >
            {nombre}
          </motion.p>

          {/* Texto inferior */}
          <motion.p
            className="
              relative
              z-10
              mt-4
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[#9B6C7C]
              sm:text-[11px]
              sm:tracking-[0.4em]
            "
            variants={aparecerAbajo}
          >
            Mis XV años
          </motion.p>

          {/* Esquina superior izquierda */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-6
              top-6
              h-12
              w-12
              border-l
              border-t
              border-[#D5B76A]/45
              sm:left-9
              sm:top-9
              sm:h-16
              sm:w-16
            "
          />

          {/* Esquina inferior derecha */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-6
              right-6
              h-12
              w-12
              border-b
              border-r
              border-[#D5B76A]/45
              sm:bottom-9
              sm:right-9
              sm:h-16
              sm:w-16
            "
          />

          {/* Puntos decorativos */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-10
              top-12
              h-1.5
              w-1.5
              rounded-full
              bg-[#D5B76A]/70
              shadow-[0_0_12px_rgba(213,183,106,0.75)]
              sm:right-14
              sm:top-16
            "
          />

          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-12
              left-10
              h-1
              w-1
              rounded-full
              bg-[#7A1838]/50
              sm:bottom-16
              sm:left-14
            "
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FrasePersonalizada;