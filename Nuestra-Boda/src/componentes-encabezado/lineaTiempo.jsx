import React from "react";
import { motion } from "framer-motion";

const lineadelTiempo = () => {
  const imagenes = [
    {
      src: "/galeria01.png",
      posicion: "object-[center_35%]",
      tamanio:
        "md:col-span-7 md:row-span-2 lg:col-span-7 lg:row-span-2",
      altura: "h-[460px] sm:h-[560px] md:h-full",
      entrada: {
        x: -50,
        y: 30,
      },
    },
    {
      src: "/galeria02.png",
      posicion: "object-[center_30%]",
      tamanio:
        "md:col-span-5 md:row-span-1 lg:col-span-5 lg:row-span-1",
      altura: "h-[360px] sm:h-[430px] md:h-full",
      entrada: {
        x: 50,
        y: 20,
      },
    },
    {
      src: "/galeria03.png",
      posicion: "object-[center_42%]",
      tamanio:
        "md:col-span-5 md:row-span-1 lg:col-span-5 lg:row-span-1",
      altura: "h-[420px] sm:h-[480px] md:h-full",
      entrada: {
        x: 50,
        y: 40,
      },
    },
    {
      src: "/galeria04.png",
      posicion: "object-[center_35%]",
      tamanio:
        "md:col-span-5 md:row-span-1 lg:col-span-5 lg:row-span-1",
      altura: "h-[390px] sm:h-[460px] md:h-full",
      entrada: {
        x: -45,
        y: 35,
      },
    },
    {
      src: "/galeria05.png",
      posicion: "object-[center_40%]",
      tamanio:
        "md:col-span-7 md:row-span-2 lg:col-span-7 lg:row-span-2",
      altura: "h-[500px] sm:h-[600px] md:h-full",
      entrada: {
        x: 50,
        y: 30,
      },
    },
    {
      src: "/galeria06.png",
      posicion: "object-[center_32%]",
      tamanio:
        "md:col-span-5 md:row-span-1 lg:col-span-5 lg:row-span-1",
      altura: "h-[390px] sm:h-[460px] md:h-full",
      entrada: {
        x: -45,
        y: 35,
      },
    },
    {
      src: "/galeria07.png",
      posicion: "object-[center_38%]",
      tamanio:
        "md:col-span-12 md:row-span-2 lg:col-span-12 lg:row-span-2",
      altura: "h-[480px] sm:h-[600px] md:h-full",
      entrada: {
        x: 0,
        y: 60,
      },
    },
  ];

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[linear-gradient(145deg,#fffafa_0%,#f8edef_45%,#ead7dc_100%)]
        px-4
        py-20
        sm:px-6
        sm:py-24
        lg:px-10
        lg:py-32
      "
    >
      {/* Resplandor vino superior */}
      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          -top-40
          h-[380px]
          w-[380px]
          rounded-full
          bg-[#7A1838]/10
          blur-3xl
          sm:h-[500px]
          sm:w-[500px]
        "
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 9,
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
          -bottom-48
          -right-48
          h-[440px]
          w-[440px]
          rounded-full
          bg-[#D5B76A]/20
          blur-3xl
          sm:h-[560px]
          sm:w-[560px]
        "
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Resplandor central */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#8D2447]/5
          blur-[130px]
        "
      />

      {/* Textura */}
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

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Encabezado */}
        <motion.div
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
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="
            mx-auto
            mb-14
            max-w-3xl
            text-center
            sm:mb-18
            md:mb-20
          "
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
                w-8
                bg-gradient-to-r
                from-transparent
                to-[#D5B76A]
                sm:w-16
              "
            />

            <motion.span
              className="
                text-base
                text-[#D5B76A]
                sm:text-lg
              "
              animate={{
                rotate: [0, 8, -8, 0],
                scale: [1, 1.15, 1],
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
                w-8
                bg-gradient-to-l
                from-transparent
                to-[#D5B76A]
                sm:w-16
              "
            />
          </div>

          <h2
            className="
              mt-5
              font-cursiveDancing
              text-[48px]
              leading-tight
              text-[#711936]
              sm:text-[64px]
              md:text-[78px]
            "
          >
            Mis momentos
          </h2>
        </motion.div>

        {/* Galería */}
        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:gap-6
            md:auto-rows-[260px]
            md:grid-cols-12
            md:gap-7
            lg:auto-rows-[300px]
            lg:gap-8
          "
        >
          {imagenes.map((imagen, index) => (
            <motion.article
              key={imagen.src}
              initial={{
                opacity: 0,
                scale: 0.96,
                x: imagen.entrada.x,
                y: imagen.entrada.y,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{
                once: true,
                amount: 0.16,
              }}
              className={`
                group
                relative
                w-full
                overflow-hidden
                rounded-[28px]
                border
                border-[#D5B76A]/30
                bg-white/55
                p-2.5
                shadow-[0_24px_60px_rgba(84,17,42,0.13)]
                backdrop-blur-xl
                sm:rounded-[34px]
                sm:p-3
                ${imagen.tamanio}
              `}
            >
              {/* Brillo exterior */}
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

              {/* Marco de fotografía */}
              <div
                className={`
                  relative
                  z-10
                  w-full
                  overflow-hidden
                  rounded-[21px]
                  sm:rounded-[27px]
                  ${imagen.altura}
                `}
              >
                <motion.img
                  src={imagen.src}
                  alt={`Fotografía ${index + 1}`}
                  className={`
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-1000
                    ease-out
                    group-hover:scale-[1.06]
                    ${imagen.posicion}
                  `}
                  whileHover={{
                    scale: 1.06,
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />

                {/* Sombra inferior */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#35101E]/30
                    via-transparent
                    to-white/10
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
                    w-[40%]
                    -skew-x-12
                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent
                  "
                  initial={{
                    left: "-70%",
                  }}
                  whileInView={{
                    left: "140%",
                  }}
                  transition={{
                    duration: 1.8,
                    delay: 0.3 + index * 0.08,
                    ease: "easeInOut",
                  }}
                  viewport={{
                    once: true,
                  }}
                />

                {/* Bordes internos */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-3
                    rounded-[16px]
                    border
                    border-white/25
                    sm:rounded-[20px]
                  "
                />

                {/* Esquina superior */}
                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    left-5
                    top-5
                    h-9
                    w-9
                    border-l
                    border-t
                    border-[#D5B76A]/55
                    sm:h-12
                    sm:w-12
                  "
                />

                {/* Esquina inferior */}
                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    bottom-5
                    right-5
                    h-9
                    w-9
                    border-b
                    border-r
                    border-[#D5B76A]/55
                    sm:h-12
                    sm:w-12
                  "
                />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Ornamento final */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          className="
            mt-16
            flex
            items-center
            justify-center
            gap-4
            sm:mt-24
          "
        >
          <span
            className="
              h-px
              w-12
              bg-gradient-to-r
              from-transparent
              to-[#D5B76A]
              sm:w-24
            "
          />

          <motion.span
            className="
              text-lg
              text-[#D5B76A]
            "
            animate={{
              rotate: [0, 8, -8, 0],
              scale: [1, 1.15, 1],
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
              sm:w-24
            "
          />
        </motion.div>
      </div>
    </section>
  );
};

export default lineadelTiempo;