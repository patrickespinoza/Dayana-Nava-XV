import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Countdown from "./componentes-encabezado/encabeza-cuenta";
import GlitterIntro from "./componentes-encabezado/gliter";

/* =====================================================
   CONFIGURACIÓN GENERAL
===================================================== */

const DATOS_XV = {
  nombre: "Dayana Nava Melendez",
  inicial: "D",

  fechaTexto: "19 • Septiembre • 2026",
  fechaCuentaRegresiva: "2026-09-19T17:00:00-06:00",

  imagenDesktop: "/portada.jpg",
  imagenMobile: "/portada.jpg",

  cancion: "/musica.mp3",
};

/* =====================================================
   PALETA PRINCIPAL

   Solo utilizaremos:
   Azul, rosa, blanco y negro.
===================================================== */

const COLORES = {
  azul: "#B9D8F4",
  rosa: "#D99AB1",
  blanco: "#FFFFFF",
  negro: "#1F1F1F",
};

/* =====================================================
   DECODIFICAR DATOS DEL GENERADOR

   Compatible con enlaces como:

   /?id=CODIGO_ENCRIPTADO

   El generador debe crear el id con:

   const datos = JSON.stringify({
     nombre: "Familia López",
     pases: 4,
   });

   const invertido = datos.split("").reverse().join("");
   const id = btoa(
     unescape(encodeURIComponent(invertido))
   );
===================================================== */

const convertirBase64AUTF8 = (base64) => {
  const base64Normalizado = base64
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const paddingNecesario =
    (4 - (base64Normalizado.length % 4)) % 4;

  const base64ConPadding =
    base64Normalizado + "=".repeat(paddingNecesario);

  const textoBinario = window.atob(base64ConPadding);

  const bytes = Uint8Array.from(
    textoBinario,
    (caracter) => caracter.charCodeAt(0)
  );

  return new TextDecoder("utf-8").decode(bytes);
};

const decodificarInvitacion = (id) => {
  if (!id) return null;

  try {
    /*
      Intento principal:
      Base64 UTF-8 + texto invertido.
    */

    const textoDecodificado = convertirBase64AUTF8(id);

    const jsonNormal = textoDecodificado
      .split("")
      .reverse()
      .join("");

    return JSON.parse(jsonNormal);
  } catch (errorPrincipal) {
    try {
      /*
        Compatibilidad con generadores anteriores
        que utilizaban únicamente btoa().
      */

      const base64Normalizado = id
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      const paddingNecesario =
        (4 - (base64Normalizado.length % 4)) % 4;

      const textoDecodificado = window.atob(
        base64Normalizado +
          "=".repeat(paddingNecesario)
      );

      const jsonNormal = textoDecodificado
        .split("")
        .reverse()
        .join("");

      return JSON.parse(jsonNormal);
    } catch (errorSecundario) {
      console.error(
        "No fue posible leer los datos encriptados de la invitación.",
        errorSecundario
      );

      return null;
    }
  }
};

/* =====================================================
   COMPONENTE PRINCIPAL
===================================================== */

export default function Portada() {
  const audioRef = useRef(null);
  const temporizadorRef = useRef(null);

  const [introActiva, setIntroActiva] = useState(true);
  const [mostrarContenido, setMostrarContenido] =
    useState(false);

  const [abrirSobre, setAbrirSobre] = useState(false);

  const [
    experienciaIniciada,
    setExperienciaIniciada,
  ] = useState(false);

  const [invitado, setInvitado] = useState(
    "Invitado especial"
  );

  const [pases, setPases] = useState(1);

  /* =====================================================
     LEER NOMBRE Y PASES DESDE LA URL

     Prioridad:

     1. URL encriptada:
        /?id=...

     2. URL anterior:
        /?nombre=Familia%20López&pases=4
  ===================================================== */

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const idEncriptado = params.get("id");

    if (idEncriptado) {
      const datosDecodificados =
        decodificarInvitacion(idEncriptado);

      if (datosDecodificados) {
        const nombreDecodificado =
          datosDecodificados.nombre ||
          datosDecodificados.invitado ||
          datosDecodificados.nombreInvitado;

        const pasesDecodificados = Number.parseInt(
          datosDecodificados.pases ||
            datosDecodificados.invitados ||
            datosDecodificados.lugares,
          10
        );

        if (
          typeof nombreDecodificado === "string" &&
          nombreDecodificado.trim()
        ) {
          setInvitado(nombreDecodificado.trim());
        }

        if (
          Number.isFinite(pasesDecodificados) &&
          pasesDecodificados > 0
        ) {
          setPases(pasesDecodificados);
        }

        return;
      }
    }

    /*
      Compatibilidad con enlaces anteriores
      sin encriptación.
    */

    const nombreRecibido = params.get("nombre");
    const pasesRecibidos = params.get("pases");

    if (nombreRecibido?.trim()) {
      setInvitado(nombreRecibido.trim());
    }

    if (pasesRecibidos) {
      const cantidad = Number.parseInt(
        pasesRecibidos,
        10
      );

      if (
        Number.isFinite(cantidad) &&
        cantidad > 0
      ) {
        setPases(cantidad);
      }
    }
  }, []);

  /* =====================================================
     LIMPIAR TEMPORIZADOR
  ===================================================== */

  useEffect(() => {
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

    /*
      La reproducción debe comenzar directamente dentro del clic.
      Si se intenta después de un setTimeout, algunos navegadores
      móviles dejan de considerarla una acción del usuario y la bloquean.
    */
    if (audioRef.current) {
      audioRef.current.volume = 0.45;

      const promesaReproduccion = audioRef.current.play();

      if (promesaReproduccion !== undefined) {
        promesaReproduccion.catch((error) => {
          console.warn(
            "El navegador bloqueó la reproducción del audio:",
            error
          );
        });
      }
    }

    temporizadorRef.current = window.setTimeout(() => {
      setIntroActiva(false);
      setMostrarContenido(true);
    }, 1750);
  };

  const textoLugares =
    pases === 1 ? "LUGAR" : "LUGARES";

  const textoReservado =
    pases === 1
      ? "HEMOS RESERVADO"
      : "HEMOS RESERVADO";

  return (
    <main
      className="
        portada-xv
        relative
        w-full
        overflow-x-hidden
        bg-white
        text-[#1F1F1F]
      "
    >
      {/* ===============================================
          AUDIO DE FONDO
      =============================================== */}

      <audio ref={audioRef} loop preload="auto" playsInline>
        <source
          src={DATOS_XV.cancion}
          type="audio/mpeg"
        />
      </audio>

      {/* ===============================================
          INTRODUCCIÓN DEL SOBRE
      =============================================== */}

      <AnimatePresence mode="wait">
        {introActiva && (
          <motion.section
            key="intro-xv"
            className="
              portada-xv__intro
              fixed inset-0 z-50
              min-h-[100dvh]
              overflow-y-auto
              overflow-x-hidden
            "
            style={{
              background: `
                radial-gradient(
                  circle at 15% 10%,
                  rgba(255,255,255,0.72),
                  transparent 28%
                ),
                radial-gradient(
                  circle at 88% 88%,
                  rgba(217,154,177,0.42),
                  transparent 32%
                ),
                ${COLORES.azul}
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
            <GlitterIntro />

            {/* BRILLOS DECORATIVOS */}

            <motion.div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute left-[8%] top-[13%]
                h-2 w-2
                rounded-full bg-[#D99AB1]
              "
              animate={{
                opacity: [0.35, 1, 0.35],
                scale: [0.8, 1.25, 0.8],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
              }}
            />

            <motion.div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute right-[12%] top-[21%]
                h-2.5 w-2.5
                rounded-full
                bg-[#D99AB1]
              "
              animate={{
                opacity: [0.4, 1, 0.4],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />

            <motion.div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute bottom-[18%] left-[14%]
                h-1.5 w-1.5
                rounded-full bg-[#D99AB1]
              "
              animate={{
                opacity: [0.3, 0.9, 0.3],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: 0.5,
              }}
            />

            {/* CONTENEDOR */}

            <div
              className="
                portada-xv__intro-contenido
                relative z-10
                flex min-h-[100dvh]
                w-full flex-col
                items-center justify-start
                px-4 pb-10 pt-7
                text-center
                sm:px-6 sm:pb-12 sm:pt-10
                md:justify-center
                md:py-14
                lg:px-10 lg:py-16
              "
            >
              {/* ENCABEZADO */}

              <motion.div
                className="
                  portada-xv__encabezado
                  relative mb-5
                  w-full max-w-3xl
                  sm:mb-8
                "
                initial={{
                  opacity: 0,
                  y: -18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.9,
                }}
              >
                <div
                  className="
                    portada-xv__etiqueta
                    mb-3 flex
                    items-center justify-center
                    gap-3 sm:gap-5
                  "
                >
                  <div
                    className="
                      h-px w-9
                      bg-[#D99AB1]
                      sm:w-16
                    "
                  />

                  <p
                    className="
                      whitespace-nowrap
                      text-[9px] font-medium
                      uppercase
                      tracking-[0.32em]
                      text-[#1F1F1F]
                      sm:text-[12px]
                      sm:tracking-[0.5em]
                    "
                  >
                    MIS XV AÑOS
                  </p>

                  <div
                    className="
                      h-px w-9
                      bg-[#D99AB1]
                      sm:w-16
                    "
                  />
                </div>

                <h1
                  className="
                    portada-xv__nombre
                    mx-auto max-w-full
                    break-words px-2
                    font-cursiveDancing
                    text-[52px]
                    leading-[0.92]
                    text-[#1F1F1F]
                    sm:text-[72px]
                    md:text-[92px]
                    lg:text-[108px]
                  "
                  style={{
                    textShadow:
                      "0 5px 18px rgba(255,255,255,0.8)",
                  }}
                >
                  {DATOS_XV.nombre}
                </h1>

                <p
                  className="
                    portada-xv__subtitulo
                    mt-2
                    font-serif
                    text-[12px] italic
                    tracking-[0.1em]
                    text-[#1F1F1F]
                    sm:mt-4
                    sm:text-[15px]
                    md:text-[17px]
                  "
                >
                  Una noche para recordar por siempre
                </p>

                <div
                  className="
                    portada-xv__fecha
                    mt-4 flex
                    flex-col items-center
                    sm:mt-5
                  "
                >
                  <div
                    className="
                      mb-3 h-px w-24
                      bg-[#D99AB1]
                      sm:w-32
                    "
                  />

                  <p
                    className="
                      text-[10px] font-medium
                      uppercase
                      tracking-[0.24em]
                      text-[#1F1F1F]
                      sm:text-[13px]
                      sm:tracking-[0.38em]
                    "
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
                  portada-xv__sobre
                  group relative block
                  w-[84vw]
                  max-w-[325px]
                  cursor-pointer
                  border-0
                  bg-transparent p-0
                  outline-none
                  disabled:cursor-default
                  sm:w-[350px]
                  sm:max-w-[350px]
                  md:max-w-[390px]
                "
                style={{
                  aspectRatio: "340 / 240",
                  perspective: 2200,
                }}
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
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
                {/* RESPLANDOR */}

                <div
                  className="
                    portada-xv__sobre-resplandor
                    absolute inset-0
                    scale-110
                    rounded-[28px]
                    bg-[#D99AB1]/40
                    blur-3xl
                  "
                />

                {/* SOMBRA */}

                <div
                  className="
                    portada-xv__sobre-sombra
                    absolute -bottom-7
                    left-1/2
                    h-12 w-[72%]
                    -translate-x-1/2
                    rounded-full
                    bg-black/20 blur-3xl
                    sm:-bottom-9 sm:h-16
                  "
                />

                {/* CUERPO DEL SOBRE */}

                <div
                  className="
                    portada-xv__sobre-cuerpo
                    absolute inset-0
                    overflow-hidden
                    rounded-[22px]
                    border border-white/70
                    bg-[#D99AB1]
                    sm:rounded-[28px]
                  "
                  style={{
                    boxShadow: `
                      0 28px 60px rgba(31,31,31,0.24),
                      inset 0 1px 0 rgba(255,255,255,0.75),
                      inset 0 -5px 14px rgba(31,31,31,0.12)
                    `,
                  }}
                >
                  <div
                    className="
                      absolute inset-0
                      opacity-[0.12]
                    "
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(
                          45deg,
                          rgba(255,255,255,0.8) 0px,
                          rgba(255,255,255,0.8) 1px,
                          transparent 1px,
                          transparent 7px
                        )
                      `,
                    }}
                  />

                  <div
                    className="
                      absolute left-0 top-0
                      h-24 w-full
                    "
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0.38), transparent)",
                    }}
                  />
                </div>

                {/* BORDE INTERNO */}

                <div
                  className="
                    pointer-events-none
                    absolute inset-[7px]
                    rounded-[17px]
                    border border-white/35
                    sm:inset-[9px]
                    sm:rounded-[21px]
                  "
                />

                {/* TAPA DEL SOBRE */}

                <motion.div
                  className="
                    portada-xv__sobre-tapa
                    absolute left-0 top-0
                    z-20 h-1/2 w-full
                    origin-top
                  "
                  style={{
                    clipPath:
                      "polygon(0 0, 50% 100%, 100% 0)",
                    background: COLORES.rosa,
                    boxShadow: `
                      0 18px 30px rgba(31,31,31,0.18),
                      inset 0 2px 0 rgba(255,255,255,0.5)
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

                {/* CARTA INTERIOR */}

                <motion.div
                  className="
                    portada-xv__carta
                    absolute left-1/2
                    top-[9%] z-10
                    flex h-[79%] w-[83%]
                    -translate-x-1/2
                    flex-col
                    items-center
                    justify-between
                    overflow-hidden
                    rounded-[15px]
                    border
                    bg-white
                    px-3 py-4
                    sm:rounded-[19px]
                    sm:px-5 sm:py-6
                  "
                  style={{
                    borderColor:
                      "rgba(217,154,177,0.55)",
                    boxShadow: `
                      0 12px 34px rgba(31,31,31,0.2),
                      inset 0 1px 0 rgba(255,255,255,0.95)
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
                  <div
                    className="
                      mt-0.5
                      h-[2px] w-12
                      bg-[#B9D8F4]
                      sm:w-16
                    "
                  />

                  <p
                    className="
                      whitespace-nowrap
                      text-center
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.18em]
                      text-[#1F1F1F]
                      sm:text-[12px]
                      sm:tracking-[0.32em]
                    "
                  >
                    INVITACIÓN ESPECIAL
                  </p>

                  <div
                    className="
                      flex flex-col
                      items-center justify-center
                    "
                  >
                    <span
                      className="
                        mb-0.5
                        font-serif
                        text-[10px]
                        uppercase
                        tracking-[0.2em]
                        text-[#D99AB1]
                        sm:mb-1
                        sm:text-[12px]
                      "
                    >
                      MIS XV AÑOS
                    </span>

                    <h3
                      className="
                        max-w-full
                        break-words
                        text-center
                        font-cursiveDancing
                        text-[28px]
                        leading-[0.95]
                        text-[#1F1F1F]
                        sm:text-[36px]
                      "
                    >
                      {DATOS_XV.nombre}
                    </h3>
                  </div>

                  <p
                    className="
                      whitespace-nowrap
                      text-center
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.14em]
                      text-[#1F1F1F]
                      sm:text-[11px]
                      sm:tracking-[0.22em]
                    "
                  >
                    TOCA PARA ABRIR
                  </p>
                </motion.div>

                {/* SELLO */}

                <motion.div
                  className="
                    portada-xv__sello-contenedor
                    pointer-events-none
                    absolute inset-0 z-30
                    flex items-center
                    justify-center
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
                  transition={{
                    duration: 0.6,
                  }}
                >
                  <div
                    className="
                      relative
                      flex h-20 w-20
                      items-center justify-center
                      sm:h-28 sm:w-28
                    "
                  >
                    <div
                      className="
                        absolute inset-0
                        scale-125
                        rounded-full
                        bg-white/45
                        blur-2xl
                      "
                    />

                    <div
                      className="
                        absolute inset-0
                        rounded-full
                        bg-[#B9D8F4]
                      "
                      style={{
                        boxShadow: `
                          inset 0 5px 10px rgba(255,255,255,0.8),
                          inset 0 -10px 18px rgba(31,31,31,0.14),
                          0 15px 28px rgba(31,31,31,0.25)
                        `,
                      }}
                    />

                    <div
                      className="
                        absolute inset-[6px]
                        rounded-full
                        border border-[#1F1F1F]/20
                      "
                    />

                    <div
                      className="
                        absolute inset-[10px]
                        rounded-full
                        border border-white/65
                      "
                    />

                    <span
                      className="
                        relative z-10
                        font-serif
                        text-[27px]
                        text-[#1F1F1F]
                        sm:text-[37px]
                      "
                      style={{
                        textShadow:
                          "1px 1px 0 rgba(255,255,255,0.75)",
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
                    flex items-start
                    justify-center
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
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.28em]
                      text-[#1F1F1F]
                      sm:text-[10px]
                      sm:tracking-[0.42em]
                    "
                  >
                    ABRIR
                  </p>
                </motion.div>
              </motion.button>

              {/* =========================================
                  INFORMACIÓN DE PASES
              ========================================= */}

              <motion.div
                className="
                  portada-xv__pases
                  mt-6 flex
                  w-full max-w-lg
                  flex-col items-center
                  sm:mt-9
                "
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.35,
                }}
              >
                <div
                  className="
                    mb-4 h-px w-20
                    bg-[#D99AB1]
                    sm:mb-5 sm:w-28
                  "
                />

                <p
                  className="
                    text-[10px]
                    font-medium uppercase
                    tracking-[0.32em]
                    text-[#1F1F1F]
                    sm:text-[11px]
                    sm:tracking-[0.48em]
                  "
                >
                  {textoReservado}
                </p>

                <div
                  className="
                    relative my-2.5
                    sm:my-3
                  "
                >
                  <div
                    className="
                      absolute inset-0
                      scale-150
                      rounded-full
                      bg-white/55
                      blur-2xl
                    "
                  />

                  <span
                    className="
                      relative
                      font-light
                      text-[48px]
                      leading-none
                      text-[#D99AB1]
                      sm:text-[60px]
                      md:text-[68px]
                    "
                    style={{
                      textShadow:
                        "0 7px 15px rgba(255,255,255,0.7)",
                    }}
                  >
                    {pases}
                  </span>
                </div>

                <p
                  className="
                    px-3 text-center
                    text-[10px]
                    font-medium uppercase
                    tracking-[0.26em]
                    text-[#1F1F1F]
                    sm:text-[11px]
                    sm:tracking-[0.4em]
                  "
                >
                  {textoLugares} EN TU HONOR
                </p>

                <div
                  className="
                    my-3 h-px w-16
                    bg-[#D99AB1]
                    sm:my-5
                  "
                />

                {/* NOMBRE DEL INVITADO */}

                <div
                  className="
                    portada-xv__invitado
                    max-w-[94vw]
                    rounded-full
                    border border-white/80
                    bg-white/55
                    px-4 py-2.5
                    backdrop-blur-md
                    sm:px-6 sm:py-3
                  "
                  style={{
                    boxShadow: `
                      0 10px 28px rgba(31,31,31,0.1),
                      inset 0 1px 0 rgba(255,255,255,0.8)
                    `,
                  }}
                >
                  <p
                    className="
                      break-words
                      text-center
                      text-[12px]
                      tracking-[0.04em]
                      text-[#1F1F1F]
                      sm:text-[13px]
                      sm:tracking-[0.08em]
                    "
                  >
                    Invitación para:

                    <span
                      className="
                        ml-2 font-semibold
                        text-[#1F1F1F]
                      "
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

      {/* ===============================================
          PORTADA PRINCIPAL
      =============================================== */}

      <section
        className="
          portada-xv__principal
          relative
          min-h-[100svh]
          w-full
          overflow-hidden
          bg-[#B9D8F4]
        "
      >
        {/* IMAGEN DESKTOP */}

        <motion.img
          src={DATOS_XV.imagenDesktop}
          alt={`Portada de los XV años de ${DATOS_XV.nombre}`}
          className="
            portada-xv__imagen-desktop
            absolute inset-0
            hidden h-full w-full
            object-cover
            object-[center_10%]
            md:block
          "
          initial={{
            opacity: 0,
            scale: 1.04,
          }}
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
            opacity: {
              duration: 1.2,
            },
            scale: {
              duration: 4.5,
              ease: "easeOut",
            },
          }}
        />

        {/* IMAGEN MÓVIL */}

        <motion.img
          src={DATOS_XV.imagenMobile}
          alt={`Portada móvil de los XV años de ${DATOS_XV.nombre}`}
          className="
            portada-xv__imagen-mobile
            absolute inset-0
            block h-full w-full
            object-cover
            object-center
            md:hidden
          "
          initial={{
            opacity: 0,
            scale: 1.04,
          }}
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
            opacity: {
              duration: 1.2,
            },
            scale: {
              duration: 4.5,
              ease: "easeOut",
            },
          }}
        />

        {/* OVERLAY */}

        <motion.div
          className="
            portada-xv__overlay
            absolute inset-0
            bg-black/35
          "
          initial={{ opacity: 0 }}
          animate={
            mostrarContenido
              ? { opacity: 1 }
              : { opacity: 0 }
          }
          transition={{
            duration: 1.2,
          }}
        />

        {/* OSCURECIMIENTO INFERIOR */}

        <div
          className="
            portada-xv__sombra-inferior
            pointer-events-none
            absolute inset-x-0
            bottom-0 h-[62%]
          "
          style={{
            background:
              "linear-gradient(to top, rgba(31,31,31,0.82), transparent)",
          }}
        />

        {/* CONTENIDO */}

        <motion.div
          className="
            portada-xv__contenido-principal
            relative z-10
            flex min-h-[100svh]
            w-full flex-col
            items-center justify-center
            px-4 py-16
            text-center text-white
            sm:px-8 sm:py-20
            lg:px-12
          "
          initial={{
            opacity: 0,
            y: 24,
          }}
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

          <div
            className="
              portada-xv__principal-etiqueta
              mb-5 flex
              items-center justify-center
              gap-3 sm:gap-5
            "
          >
            <div
              className="
                h-px w-8
                bg-[#D99AB1]
                sm:w-16
              "
            />

            <p
              className="
                text-[9px]
                font-medium uppercase
                tracking-[0.3em]
                text-white
                sm:text-[12px]
                sm:tracking-[0.5em]
              "
              style={{
                textShadow:
                  "0 2px 9px rgba(31,31,31,0.65)",
              }}
            >
              MIS XV AÑOS
            </p>

            <div
              className="
                h-px w-8
                bg-[#D99AB1]
                sm:w-16
              "
            />
          </div>

          {/* NOMBRE */}

          <h1
            className="
              portada-xv__principal-nombre
              max-w-5xl
              break-words
              font-cursiveDancing
              text-[58px]
              leading-[0.88]
              text-white
              sm:text-[82px]
              md:text-[105px]
              lg:text-[126px]
            "
            style={{
              textShadow: `
                0 3px 8px rgba(31,31,31,0.65),
                0 15px 38px rgba(31,31,31,0.55)
              `,
            }}
          >
            {DATOS_XV.nombre}
          </h1>

          {/* FECHA */}

          <p
            className="
              portada-xv__principal-fecha
              mt-5
              text-[10px]
              font-medium uppercase
              tracking-[0.24em]
              text-white
              sm:text-[13px]
              sm:tracking-[0.38em]
            "
            style={{
              textShadow:
                "0 2px 9px rgba(31,31,31,0.75)",
            }}
          >
            {DATOS_XV.fechaTexto}
          </p>

          {/* DIVISOR */}

          <div
            className="
              portada-xv__principal-divisor
              my-7 h-px w-24
              bg-[#D99AB1]
              sm:my-9 sm:w-36
            "
          />

          {/* CUENTA REGRESIVA */}

          <div
            className="
              portada-xv__cuenta
              w-full max-w-4xl
            "
          >
            <p
              className="
                mb-3
                text-[9px]
                font-medium uppercase
                tracking-[0.25em]
                text-white
                sm:text-[11px]
                sm:tracking-[0.42em]
              "
              style={{
                textShadow:
                  "0 2px 8px rgba(31,31,31,0.75)",
              }}
            >
              Faltan
            </p>

            <Countdown
              targetDate={
                DATOS_XV.fechaCuentaRegresiva
              }
            />
          </div>
        </motion.div>
      </section>
    </main>
  );
}