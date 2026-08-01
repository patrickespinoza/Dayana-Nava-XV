import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Countdown from "./componentes-encabezado/encabeza-cuenta";
import GlitterIntro from "./componentes-encabezado/gliter";

/* =====================================================
   CONFIGURACIÓN GENERAL DEL DEMO
===================================================== */

const DATOS_XV = {
  nombre: "Carla Durán",
  inicial: "C",
  fechaTexto: "13 • Marzo • 2027",
  fechaCuentaRegresiva: "2027-03-13T17:00:00-06:00",

  // Desktop
  imagenDesktop: "/xv-desktop.jpg",

  // Celular
  imagenMobile: "/xv-mobile.jpg",

  cancion: "/TylerShaw.mp3",
};

/* =====================================================
   TEMA DEL SOBRE — XV AÑOS VINO LUXURY
===================================================== */

const envelopeTheme = {
  body: `
    linear-gradient(
      145deg,
      #7a1838 0%,
      #5b102b 42%,
      #310817 100%
    )
  `,

  flap: `
    linear-gradient(
      180deg,
      #8d2447 0%,
      #62132f 48%,
      #3a091c 100%
    )
  `,

  seal: `
    radial-gradient(
      circle at 30% 25%,
      #fff9e9 0%,
      #eedba5 18%,
      #d5b76a 42%,
      #a77c25 70%,
      #664408 100%
    )
  `,
};

/* =====================================================
   COMPONENTE PRINCIPAL
===================================================== */

export default function Portada() {
  const audioRef = useRef(null);
  const temporizadorRef = useRef(null);

  const [introActiva, setIntroActiva] = useState(true);
  const [mostrarContenido, setMostrarContenido] = useState(false);
  const [abrirSobre, setAbrirSobre] = useState(false);
  const [experienciaIniciada, setExperienciaIniciada] = useState(false);

  const [invitado, setInvitado] = useState("Invitado especial");
  const [pases, setPases] = useState(1);

  /* =====================================================
     OBTENER NOMBRE Y PASES DESDE LA URL

     Ejemplo:
     /?nombre=Familia%20López&pases=4
  ===================================================== */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const nombreRecibido = params.get("nombre");
    const pasesRecibidos = params.get("pases");

    if (nombreRecibido?.trim()) {
      setInvitado(nombreRecibido.trim());
    }

    if (pasesRecibidos) {
      const cantidad = Number.parseInt(pasesRecibidos, 10);

      if (Number.isFinite(cantidad) && cantidad > 0) {
        setPases(cantidad);
      }
    }

    return () => {
      if (temporizadorRef.current) {
        clearTimeout(temporizadorRef.current);
      }
    };
  }, []);

  /* =====================================================
     ABRIR SOBRE E INICIAR AUDIO
  ===================================================== */

  const iniciarExperiencia = () => {
    if (experienciaIniciada) return;

    setExperienciaIniciada(true);
    setAbrirSobre(true);

    temporizadorRef.current = setTimeout(async () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.45;

        try {
          await audioRef.current.play();
        } catch (error) {
          console.warn(
            "El navegador bloqueó la reproducción automática del audio:",
            error
          );
        }
      }

      setIntroActiva(false);
      setMostrarContenido(true);
    }, 1750);
  };

  const textoLugares = pases === 1 ? "LUGAR" : "LUGARES";
  const textoReservado = pases === 1 ? "HEMOS RESERVADO" : "HEMOS RESERVADO";

  return (
    <main className="relative w-full overflow-x-hidden bg-[#fffafb] text-[#31101c]">
      {/* =================================================
          AUDIO DE FONDO
      ================================================= */}

      <audio ref={audioRef} loop preload="auto">
        <source src={DATOS_XV.cancion} type="audio/mpeg" />
      </audio>

      {/* =================================================
          INTRODUCCIÓN DEL SOBRE
      ================================================= */}

      <AnimatePresence mode="wait">
        {introActiva && (
          <motion.section
            key="intro-xv"
            className="
              fixed inset-0 z-50
              min-h-[100dvh]
              overflow-y-auto overflow-x-hidden
            "
            style={{
              background: `
                radial-gradient(
                  circle at 15% 10%,
                  rgba(255,255,255,0.10),
                  transparent 24%
                ),
                radial-gradient(
                  circle at 85% 90%,
                  rgba(195,139,159,0.12),
                  transparent 28%
                ),
                linear-gradient(
                  145deg,
                  #711936 0%,
                  #4c1027 44%,
                  #260712 100%
                )
              `,
            }}
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.75,
                ease: "easeInOut",
              },
            }}
          >
            <GlitterIntro/>
            {/* BRILLOS DECORATIVOS */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute left-[8%] top-[12%]
                h-1.5 w-1.5 rounded-full
                bg-white/70 blur-[0.5px]
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute right-[12%] top-[20%]
                h-1 w-1 rounded-full
                bg-[#f2dba1]
                shadow-[0_0_14px_rgba(242,219,161,0.9)]
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute bottom-[20%] left-[15%]
                h-1 w-1 rounded-full
                bg-white/60
                shadow-[0_0_12px_rgba(255,255,255,0.7)]
              "
            />

            {/* CONTENEDOR RESPONSIVE */}

            <div
              className="
                relative z-10
                flex min-h-[100dvh] w-full
                flex-col items-center justify-center
                px-4 py-10
                text-center
                sm:px-6 sm:py-14
                lg:px-10 lg:py-16
              "
            >
              {/* =========================================
                  ENCABEZADO
              ========================================= */}

              <motion.div
                className="relative mb-8 w-full max-w-3xl sm:mb-10"
                initial={{ opacity: 0, y: -18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                {/* ETIQUETA SUPERIOR */}

                <div className="mb-4 flex items-center justify-center gap-3 sm:gap-5">
                  <div
                    className="
                      h-px w-9
                      bg-gradient-to-r
                      from-transparent to-[#dfc17b]
                      sm:w-16
                    "
                  />

                  <p
                    className="
                      whitespace-nowrap
                      text-[9px] font-light uppercase
                      tracking-[0.32em]
                      sm:text-[11px] sm:tracking-[0.5em]
                    "
                    style={{
                      color: "#f0dfbd",
                      textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    }}
                  >
                    MIS XV AÑOS
                  </p>

                  <div
                    className="
                      h-px w-9
                      bg-gradient-to-l
                      from-transparent to-[#dfc17b]
                      sm:w-16
                    "
                  />
                </div>

                {/* NOMBRE */}

                <h1
                  className="
                    mx-auto
                    max-w-full
                    break-words
                    px-2
                    font-cursiveDancing
                    text-[48px]
                    leading-[0.92]
                    sm:text-[68px]
                    md:text-[88px]
                    lg:text-[104px]
                  "
                  style={{
                    background: `
                      linear-gradient(
                        180deg,
                        #ffffff 0%,
                        #fff8ed 26%,
                        #ead9ae 57%,
                        #c9a958 82%,
                        #98701d 100%
                      )
                    `,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter:
                      "drop-shadow(0 8px 20px rgba(20,0,8,0.32))",
                    letterSpacing: "0.01em",
                  }}
                >
                  {DATOS_XV.nombre}
                </h1>

                {/* SUBTÍTULO */}

                <p
                  className="
                    mt-3
                    font-serif
                    text-[12px]
                    italic
                    tracking-[0.12em]
                    sm:mt-4 sm:text-[15px]
                    md:text-[17px]
                  "
                  style={{
                    color: "#f4e7df",
                  }}
                >
                  Una noche para recordar por siempre
                </p>

                {/* FECHA */}

                <div className="mt-5 flex flex-col items-center sm:mt-6">
                  <div
                    className="
                      mb-4 h-px w-24
                      bg-gradient-to-r
                      from-transparent via-[#d7b568] to-transparent
                      sm:w-32
                    "
                  />

                  <p
                    className="
                      text-[10px] uppercase
                      tracking-[0.24em]
                      sm:text-[13px] sm:tracking-[0.38em]
                    "
                    style={{
                      color: "#ead9c4",
                      textShadow: "0 2px 8px rgba(0,0,0,0.28)",
                    }}
                  >
                    {DATOS_XV.fechaTexto}
                  </p>
                </div>
              </motion.div>

              {/* =========================================
                  SOBRE
              ========================================= */}

              <motion.button
                type="button"
                onClick={iniciarExperiencia}
                disabled={experienciaIniciada}
                aria-label="Abrir invitación de quince años"
                className="
                  group relative block
                  w-[88vw] max-w-[350px]
                  cursor-pointer
                  border-0 bg-transparent p-0
                  outline-none
                  disabled:cursor-default
                  sm:w-[350px]
                  md:max-w-[390px]
                "
                style={{
                  aspectRatio: "340 / 240",
                  perspective: 2200,
                }}
                initial={{ opacity: 0, scale: 0.92, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.15,
                }}
                whileHover={
                  experienciaIniciada
                    ? undefined
                    : {
                        scale: 1.015,
                        y: -3,
                      }
                }
                whileTap={
                  experienciaIniciada
                    ? undefined
                    : {
                        scale: 0.985,
                      }
                }
              >
                {/* GLOW EXTERIOR */}

                <div
                  className="
                    absolute inset-0
                    scale-110 rounded-[28px]
                    bg-[#d6b25d]/20
                    opacity-70 blur-3xl
                  "
                />

                {/* SOMBRA */}

                <div
                  className="
                    absolute -bottom-7 left-1/2
                    h-12 w-[72%]
                    -translate-x-1/2
                    rounded-full
                    bg-black/35 blur-3xl
                    sm:-bottom-9 sm:h-16
                  "
                />

                {/* CUERPO */}

                <div
                  className="
                    absolute inset-0
                    overflow-hidden
                    rounded-[22px]
                    border
                    backdrop-blur-xl
                    sm:rounded-[28px]
                  "
                  style={{
                    background: `
                      linear-gradient(
                        145deg,
                        rgba(255,255,255,0.12),
                        rgba(255,255,255,0.015)
                      ),
                      ${envelopeTheme.body}
                    `,
                    borderColor: "rgba(255,232,238,0.22)",
                    boxShadow: `
                      0 35px 75px rgba(15,0,6,0.52),
                      inset 0 1px 0 rgba(255,255,255,0.22),
                      inset 0 -3px 14px rgba(20,0,8,0.42)
                    `,
                  }}
                >
                  {/* TEXTURA */}

                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(
                          45deg,
                          rgba(255,255,255,0.18) 0px,
                          rgba(255,255,255,0.18) 1px,
                          transparent 1px,
                          transparent 6px
                        )
                      `,
                    }}
                  />

                  {/* BRILLO SUPERIOR */}

                  <div
                    className="absolute left-0 top-0 h-24 w-full opacity-30"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0.34), transparent)",
                    }}
                  />

                  {/* REFLEJO */}

                  <div
                    className="absolute left-0 top-0 h-full w-20 opacity-10"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(255,255,255,0.65), transparent)",
                      transform: "skewX(-20deg)",
                    }}
                  />
                </div>

                {/* BORDE INTERNO */}

                <div
                  className="
                    absolute inset-[7px]
                    rounded-[17px]
                    border border-white/10
                    sm:inset-[9px] sm:rounded-[21px]
                  "
                />

                {/* TAPA */}

                <motion.div
                  className="
                    absolute left-0 top-0 z-20
                    h-1/2 w-full
                    origin-top
                  "
                  style={{
                    clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                    background: `
                      linear-gradient(
                        to bottom,
                        rgba(255,255,255,0.18),
                        rgba(255,255,255,0.015)
                      ),
                      ${envelopeTheme.flap}
                    `,
                    boxShadow: `
                      0 25px 40px rgba(20,0,8,0.42),
                      inset 0 2px 0 rgba(255,255,255,0.16)
                    `,
                  }}
                  animate={
                    abrirSobre
                      ? {
                          rotateX: -185,
                          y: -2,
                        }
                      : {
                          rotateX: 0,
                          y: 0,
                        }
                  }
                  transition={{
                    duration: 1.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />

                {/* CARTA INTERNA */}

                <motion.div
                  className="
                    absolute left-1/2 top-[9%] z-10
                    flex h-[79%] w-[83%]
                    -translate-x-1/2
                    flex-col items-center justify-between
                    overflow-hidden
                    rounded-[15px]
                    px-3 py-4
                    sm:rounded-[19px] sm:px-5 sm:py-6
                  "
                  style={{
                    background: `
                      radial-gradient(
                        circle at top,
                        rgba(255,255,255,0.95),
                        transparent 42%
                      ),
                      linear-gradient(
                        180deg,
                        #fffefe 0%,
                        #fff7f8 55%,
                        #f5e3e8 100%
                      )
                    `,
                    border: "1px solid rgba(142,38,73,0.12)",
                    boxShadow: `
                      0 12px 34px rgba(21,0,8,0.24),
                      inset 0 1px 0 rgba(255,255,255,0.9)
                    `,
                  }}
                  animate={
                    abrirSobre
                      ? {
                          y: -72,
                          scale: 1.025,
                        }
                      : {
                          y: 0,
                          scale: 1,
                        }
                  }
                  transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* DECORACIÓN */}

                  <div
                    className="
                      mt-0.5 h-[2px] w-12
                      bg-gradient-to-r
                      from-transparent via-[#b99545] to-transparent
                      sm:w-16
                    "
                  />

                  {/* TEXTO SUPERIOR */}

                  <p
                    className="
                      whitespace-nowrap
                      text-center
                      text-[7px] uppercase
                      tracking-[0.23em]
                      sm:text-[10px] sm:tracking-[0.38em]
                    "
                    style={{
                      color: "#8b2447",
                    }}
                  >
                    INVITACIÓN ESPECIAL
                  </p>

                  {/* NOMBRE */}

                  <div className="flex flex-col items-center justify-center">
                    <span
                      className="
                        mb-0.5
                        font-serif
                        text-[9px] uppercase
                        tracking-[0.2em]
                        sm:mb-1 sm:text-[11px]
                      "
                      style={{
                        color: "#a98035",
                      }}
                    >
                      MIS XV AÑOS
                    </span>

                    <h3
                      className="
                        max-w-full
                        break-words
                        text-center
                        font-cursiveDancing
                        text-[25px]
                        leading-none
                        sm:text-[34px]
                      "
                      style={{
                        color: "#651531",
                      }}
                    >
                      Carla Durán
                    </h3>
                  </div>

                  {/* TEXTO INFERIOR */}

                  <p
                    className="
                      whitespace-nowrap
                      text-center
                      text-[7px] uppercase
                      tracking-[0.15em]
                      sm:text-[9px] sm:tracking-[0.25em]
                    "
                    style={{
                      color: "#8c6672",
                    }}
                  >
                    TOCA PARA ABRIR
                  </p>
                </motion.div>

                {/* SELLO */}

                <motion.div
                  className="
                    pointer-events-none
                    absolute inset-0 z-30
                    flex items-center justify-center
                  "
                  animate={
                    abrirSobre
                      ? {
                          scale: 0.55,
                          opacity: 0,
                          y: -20,
                        }
                      : {
                          scale: 1,
                          opacity: 1,
                          y: 0,
                        }
                  }
                  transition={{ duration: 0.6 }}
                >
                  <div
                    className="
                      relative
                      flex h-20 w-20
                      items-center justify-center
                      sm:h-28 sm:w-28
                    "
                  >
                    {/* GLOW */}

                    <div
                      className="
                        absolute inset-0
                        scale-125 rounded-full
                        bg-[#e0bd67]/30 blur-2xl
                      "
                    />

                    {/* SELLO */}

                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: envelopeTheme.seal,
                        boxShadow: `
                          inset 0 4px 10px rgba(255,255,255,0.7),
                          inset 0 -12px 20px rgba(57,31,0,0.5),
                          0 18px 34px rgba(20,0,8,0.5)
                        `,
                      }}
                    />

                    {/* BORDE DEL SELLO */}

                    <div
                      className="
                        absolute inset-[6px]
                        rounded-full
                        border border-[#5b3b00]/30
                      "
                    />

                    <div
                      className="
                        absolute inset-[10px]
                        rounded-full
                        border border-white/25
                      "
                    />

                    {/* INICIAL */}

                    <span
                      className="
                        relative z-10
                        font-serif
                        text-[27px]
                        sm:text-[37px]
                      "
                      style={{
                        color: "#694900",
                        textShadow: `
                          1px 1px 0 rgba(255,255,255,0.5),
                          -1px -1px 0 rgba(73,42,0,0.5),
                          0 4px 7px rgba(44,23,0,0.35)
                        `,
                      }}
                    >
                      {DATOS_XV.inicial}
                    </span>
                  </div>
                </motion.div>

                {/* TEXTO ABRIR */}

                <motion.div
                  className="
                    pointer-events-none
                    absolute inset-0 z-40
                    flex items-start justify-center
                    pt-4 sm:pt-6
                  "
                  animate={
                    abrirSobre
                      ? { opacity: 0 }
                      : { opacity: 1 }
                  }
                >
                  <p
                    className="
                      text-[8px] font-light
                      uppercase
                      tracking-[0.28em]
                      text-white/80
                      sm:text-[10px] sm:tracking-[0.42em]
                    "
                  >
                    ABRIR
                  </p>
                </motion.div>
              </motion.button>

              {/* =========================================
                  PASES
              ========================================= */}

              <motion.div
                className="
                  mt-9 flex w-full
                  max-w-lg flex-col items-center
                  sm:mt-12
                "
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.35,
                }}
              >
                <div
                  className="
                    mb-4 h-px w-20
                    bg-gradient-to-r
                    from-transparent via-[#d7b568] to-transparent
                    sm:mb-5 sm:w-28
                  "
                />

                <p
                  className="
                    text-[9px] uppercase
                    tracking-[0.32em]
                    sm:text-[11px] sm:tracking-[0.48em]
                  "
                  style={{
                    color: "#ead9c4",
                  }}
                >
                  {textoReservado}
                </p>

                {/* NÚMERO DE PASES */}

                <div className="relative my-2.5 sm:my-3">
                  <div
                    className="
                      absolute inset-0
                      scale-150 rounded-full
                      bg-[#dab968]/20 blur-2xl
                    "
                  />

                  <span
                    className="
                      relative
                      font-light
                      text-[48px]
                      leading-none
                      sm:text-[60px]
                      md:text-[68px]
                    "
                    style={{
                      background: `
                        linear-gradient(
                          180deg,
                          #ffffff 0%,
                          #fff1d0 30%,
                          #ddbd6d 62%,
                          #9e7421 100%
                        )
                      `,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter:
                        "drop-shadow(0 7px 15px rgba(15,0,5,0.25))",
                    }}
                  >
                    {pases}
                  </span>
                </div>

                <p
                  className="
                    px-3
                    text-center
                    text-[9px] uppercase
                    tracking-[0.26em]
                    sm:text-[11px] sm:tracking-[0.4em]
                  "
                  style={{
                    color: "#e8d4da",
                  }}
                >
                  {textoLugares} EN TU HONOR
                </p>

                <div
                  className="
                    my-4 h-px w-16
                    bg-gradient-to-r
                    from-transparent via-[#d7b568]/80 to-transparent
                    sm:my-5
                  "
                />

                {/* NOMBRE DEL INVITADO */}

                <div
                  className="
                    max-w-[94vw]
                    rounded-full
                    border
                    px-4 py-2.5
                    backdrop-blur-md
                    sm:px-6 sm:py-3
                  "
                  style={{
                    background: "rgba(255,255,255,0.09)",
                    borderColor: "rgba(255,235,240,0.2)",
                    boxShadow: `
                      0 10px 28px rgba(15,0,6,0.18),
                      inset 0 1px 0 rgba(255,255,255,0.13)
                    `,
                  }}
                >
                  <p
                    className="
                      break-words
                      text-center
                      text-[10px]
                      tracking-[0.08em]
                      sm:text-[12px] sm:tracking-[0.14em]
                    "
                    style={{
                      color: "#eadce0",
                    }}
                  >
                    Invitación para:
                    <span
                      className="ml-2 font-semibold"
                      style={{
                        color: "#ffffff",
                      }}
                    >
                      {invitado}
                    </span>
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* =================================================
          PORTADA PRINCIPAL
      ================================================= */}

      <section
        className="
          relative
          min-h-[100svh]
          w-full
          overflow-hidden
          bg-[#3b0b1c]
        "
      >
        {/* IMAGEN */}

        {/* ===============================
      IMAGEN DESKTOP
================================ */}

<motion.img
  src="/portadaHorizontal.png"
  alt="Portada Desktop"
  className="
    hidden
    md:block

    absolute
    inset-0

    w-full
    h-full

    object-cover
    object-center
  "
  initial={{ opacity: 0, scale: 1.04 }}
  animate={
    mostrarContenido
      ? {
          opacity: 1,
          scale: 1,
        }
      : {
          opacity: 0,
          scale: 1.04,
        }
  }
  transition={{
    opacity: { duration: 1.2 },
    scale: { duration: 4.5 },
  }}
/>

{/* ===============================
      IMAGEN MÓVIL
================================ */}

<motion.img
  src="portadavertical.png"
  alt="Portada Mobile"
  className="
    block
    md:hidden

    absolute
    inset-0

    w-full
    h-full

    object-cover
    object-center
  "
  initial={{ opacity: 0, scale: 1.04 }}
  animate={
    mostrarContenido
      ? {
          opacity: 1,
          scale: 1,
        }
      : {
          opacity: 0,
          scale: 1.04,
        }
  }
  transition={{
    opacity: { duration: 1.2 },
    scale: { duration: 4.5 },
  }}
/>

        {/* OVERLAY GENERAL */}

        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                180deg,
                rgba(37,3,15,0.28) 0%,
                rgba(55,5,22,0.32) 40%,
                rgba(25,1,9,0.78) 100%
              )
            `,
          }}
          initial={{ opacity: 0 }}
          animate={
            mostrarContenido
              ? { opacity: 1 }
              : { opacity: 0 }
          }
          transition={{ duration: 1.2 }}
        />

        {/* DEGRADADO INFERIOR */}

        <div
          className="
            pointer-events-none
            absolute inset-x-0 bottom-0
            h-[55%]
          "
          style={{
            background:
              "linear-gradient(to top, rgba(31,2,12,0.88), transparent)",
          }}
        />

        {/* CONTENIDO */}

        <motion.div
          className="
            relative z-10
            flex min-h-[100svh]
            w-full
            flex-col items-center justify-center
            px-4 py-16
            text-center text-white
            sm:px-8 sm:py-20
            lg:px-12
          "
          initial={{ opacity: 0, y: 24 }}
          animate={
            mostrarContenido
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 24,
                }
          }
          transition={{
            duration: 1.1,
            delay: 0.2,
          }}
        >
          {/* ETIQUETA */}

          <div className="mb-5 flex items-center justify-center gap-3 sm:gap-5">
            <div
              className="
                h-px w-8
                bg-gradient-to-r
                from-transparent to-[#e0c27d]
                sm:w-16
              "
            />

            <p
              className="
                text-[9px] uppercase
                tracking-[0.3em]
                text-[#f0e1d0]
                sm:text-[12px] sm:tracking-[0.5em]
              "
            >
              MIS XV AÑOS
            </p>

            <div
              className="
                h-px w-8
                bg-gradient-to-l
                from-transparent to-[#e0c27d]
                sm:w-16
              "
            />
          </div>

          {/* NOMBRE */}

          <h1
            className="
              max-w-5xl
              break-words
              font-cursiveDancing
              text-[58px]
              leading-[0.88]
              sm:text-[82px]
              md:text-[105px]
              lg:text-[126px]
            "
            style={{
              color: "#ffffff",
              textShadow: `
                0 3px 8px rgba(38,0,13,0.45),
                0 15px 38px rgba(20,0,8,0.55)
              `,
            }}
          >
            {DATOS_XV.nombre}
          </h1>



          {/* DIVISOR */}

          <div
            className="
              my-7 h-px w-24
              bg-gradient-to-r
              from-transparent via-[#ddbe73] to-transparent
              sm:my-9 sm:w-36
            "
          />

          {/* CUENTA REGRESIVA */}

          <div className="w-full max-w-4xl">
            <p
              className="
                mb-3
                text-[9px] uppercase
                tracking-[0.25em]
                text-[#f1dce2]
                sm:text-[11px] sm:tracking-[0.42em]
              "
            >
              Faltan
            </p>

            <Countdown targetDate={DATOS_XV.fechaCuentaRegresiva} />


          </div>
        </motion.div>
      </section>
    </main>
  );
}