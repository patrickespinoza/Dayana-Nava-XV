"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

/* =====================================================
   ANIMACIONES
===================================================== */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 55,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =====================================================
   CONFIGURACIÓN DEL EVENTO
===================================================== */

const DATOS_CONFIRMACION = {
  festejada: "Carla Durán",

  fechaLimite: "1 de marzo de 2027",

  scriptUrl:
    "https://script.google.com/macros/s/AKfycbxklU9PTlqxkcu9pBUfWYhByQZ_7kJWuFENeeQhlEW-C6eh2cVbTK3z2AbMJiWVL1ME/exec",
};

/* =====================================================
   COMPONENTE PRINCIPAL
===================================================== */

const Confirmacion = () => {
  const temporizadorRef = useRef(null);

  const [nombreInvitado, setNombreInvitado] = useState("");
  const [mensajeInvitado, setMensajeInvitado] = useState("");
  const [asistencia, setAsistencia] = useState("");
  const [invitados, setInvitados] = useState(1);

  const [pasesPermitidos, setPasesPermitidos] = useState(1);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  /* =====================================================
     OBTENER NOMBRE Y PASES DESDE LA URL

     Ejemplo:
     /?nombre=Familia%20López&pases=4
  ===================================================== */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const nombreUrl = params.get("nombre");
    const pasesUrl = params.get("pases");

    if (nombreUrl?.trim()) {
      setNombreInvitado(nombreUrl.trim());
    }

    if (pasesUrl) {
      const cantidad = Number.parseInt(pasesUrl, 10);

      if (Number.isFinite(cantidad) && cantidad > 0) {
        setPasesPermitidos(cantidad);
        setInvitados(1);
      }
    }

    return () => {
      if (temporizadorRef.current) {
        clearTimeout(temporizadorRef.current);
      }
    };
  }, []);

  /* =====================================================
     OPCIONES DEL SELECTOR DE INVITADOS
  ===================================================== */

  const opcionesInvitados = useMemo(() => {
    return Array.from(
      {
        length: pasesPermitidos,
      },
      (_, index) => index + 1
    );
  }, [pasesPermitidos]);

  /* =====================================================
     CAMBIAR ASISTENCIA
  ===================================================== */

  const seleccionarAsistencia = (opcion) => {
    setAsistencia(opcion);
    setError("");

    if (opcion === "No podré asistir") {
      setInvitados(0);
    } else if (invitados === 0) {
      setInvitados(1);
    }
  };

  /* =====================================================
     VALIDACIÓN
  ===================================================== */

  const validarFormulario = () => {
    if (!nombreInvitado.trim()) {
      setError("Por favor, escribe tu nombre.");
      return false;
    }

    if (!asistencia) {
      setError("Por favor, selecciona si podrás asistir.");
      return false;
    }

    if (
      asistencia === "Sí asistiré" &&
      (invitados < 1 || invitados > pasesPermitidos)
    ) {
      setError(
        `Puedes confirmar un máximo de ${pasesPermitidos} ${
          pasesPermitidos === 1 ? "persona" : "personas"
        }.`
      );

      return false;
    }

    return true;
  };

  /* =====================================================
     ENVIAR CONFIRMACIÓN
  ===================================================== */

  const enviarConfirmacion = async () => {
    if (loading) return;

    if (!validarFormulario()) return;

    setError("");
    setEnviado(false);
    setLoading(true);

    const data = {
      fecha: new Date().toLocaleString("es-MX", {
        timeZone: "America/Mexico_City",
      }),

      nombre: nombreInvitado.trim(),
      asistencia,

      invitados:
        asistencia === "Sí asistiré"
          ? invitados
          : 0,

      mensaje: mensajeInvitado.trim(),

      evento: `XV años de ${DATOS_CONFIRMACION.festejada}`,

      pasesAsignados: pasesPermitidos,
    };

    try {
      await fetch(DATOS_CONFIRMACION.scriptUrl, {
        method: "POST",
        mode: "no-cors",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      setEnviado(true);

      /*
       * Conservamos el nombre cuando viene desde la URL,
       * pero limpiamos los demás campos.
       */

      const params = new URLSearchParams(window.location.search);
      const nombreUrl = params.get("nombre");

      if (!nombreUrl) {
        setNombreInvitado("");
      }

      setMensajeInvitado("");
      setAsistencia("");
      setInvitados(1);

      temporizadorRef.current = setTimeout(() => {
        setEnviado(false);
      }, 5000);
    } catch (err) {
      console.error("Error enviando confirmación:", err);

      setError(
        "No pudimos enviar tu confirmación. Inténtalo nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

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
            rgba(122,24,56,0.11),
            transparent 27%
          ),
          radial-gradient(
            circle at bottom right,
            rgba(213,183,106,0.17),
            transparent 30%
          ),
          linear-gradient(
            145deg,
            #fffafa 0%,
            #f8edef 46%,
            #ead7dc 100%
          )
        `,
      }}
    >
      {/* =================================================
          GLOW VINO
      ================================================= */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -left-36 -top-40
          h-[380px] w-[380px]
          rounded-full
          bg-[#7A1838]/10
          blur-3xl
          sm:h-[500px] sm:w-[500px]
        "
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.25, 0.12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =================================================
          GLOW DORADO
      ================================================= */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -bottom-40 -right-36
          h-[390px] w-[390px]
          rounded-full
          bg-[#D5B76A]/16
          blur-3xl
          sm:h-[520px] sm:w-[520px]
        "
        animate={{
          scale: [1.08, 1, 1.08],
          opacity: [0.12, 0.24, 0.12],
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
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.025]
        "
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(91,16,43,0.15) 0px,
              rgba(91,16,43,0.15) 1px,
              transparent 1px,
              transparent 7px
            )
          `,
        }}
      />

      {/* =================================================
          DESTELLOS
      ================================================= */}

      <motion.span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-[8%] top-[17%]
          text-lg text-[#D5B76A]/65
        "
        animate={{
          opacity: [0.25, 1, 0.25],
          scale: [0.8, 1.2, 0.8],
          rotate: [0, 35, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ✦
      </motion.span>

      <motion.span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute right-[8%] top-[38%]
          text-sm text-[#7A1838]/45
        "
        animate={{
          opacity: [0.2, 0.85, 0.2],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ✧
      </motion.span>

      {/* =================================================
          CONTENEDOR PRINCIPAL
      ================================================= */}

      <div
        className="
          relative z-10
          mx-auto
          grid w-full max-w-6xl
          grid-cols-1
          items-center
          gap-10
          lg:grid-cols-[0.85fr_1.15fr]
          lg:gap-14
        "
      >
        {/* =================================================
            TEXTO IZQUIERDO
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: -35,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="
            mx-auto
            max-w-xl
            text-center
            lg:mx-0
            lg:text-left
          "
        >
          {/* ETIQUETA */}

          <div
            className="
              flex items-center
              justify-center
              gap-3
              lg:justify-start
            "
          >
            <div
              className="
                h-px w-8
                bg-gradient-to-r
                from-transparent to-[#D5B76A]
                lg:w-14
              "
            />

            <motion.p
              className="
                whitespace-nowrap
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#7A1838]
                sm:text-[11px]
                sm:tracking-[0.42em]
              "
              animate={{
                opacity: [0.72, 1, 0.72],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Reserva la fecha
            </motion.p>

            <div
              className="
                h-px w-8
                bg-gradient-to-l
                from-transparent to-[#D5B76A]
                lg:hidden
              "
            />
          </div>

          {/* TÍTULO */}

          <motion.h2
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.1,
            }}
            viewport={{ once: true }}
            className="
              mt-5
              font-cursiveDancing
              text-[48px]
              leading-[0.95]
              sm:text-[64px]
              md:text-[76px]
              lg:text-[86px]
            "
            style={{
              background: `
                linear-gradient(
                  180deg,
                  #9A3155 0%,
                  #7A1838 45%,
                  #4A0E23 100%
                )
              `,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter:
                "drop-shadow(0 8px 18px rgba(122,24,56,0.13))",
            }}
          >
            Confirma tu asistencia
          </motion.h2>

          {/* ORNAMENTO */}

          <div
            className="
              my-7 flex
              items-center
              justify-center
              lg:justify-start
            "
          >
            <div
              className="
                h-px w-16
                bg-gradient-to-r
                from-transparent via-[#D5B76A] to-[#D5B76A]
                lg:from-[#D5B76A]
                lg:to-transparent
                sm:w-24
              "
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

            <div
              className="
                h-px w-16
                bg-gradient-to-l
                from-transparent via-[#D5B76A] to-[#D5B76A]
                lg:hidden
                sm:w-24
              "
            />
          </div>

          {/* TEXTO */}

          <p
            className="
              font-playfair
              text-[15px]
              leading-relaxed
              text-[#72505D]
              sm:text-[17px]
              md:text-[18px]
            "
          >
            Tu presencia hará que esta celebración sea todavía más
            especial. Por favor, confirma si podrás acompañarme en
            mis XV años.
          </p>

          <p
            className="
              mt-5
              font-cursiveDancing
              text-[26px]
              leading-relaxed
              text-[#7A1838]
              sm:text-[31px]
            "
          >
            Espero compartir contigo esta noche inolvidable
          </p>

          {/* FECHA LÍMITE */}

          <div
            className="
              mx-auto mt-8
              max-w-sm
              rounded-[22px]
              border border-[#D5B76A]/25
              bg-white/45
              px-5 py-5
              shadow-[0_14px_35px_rgba(84,17,42,0.08)]
              backdrop-blur-lg
              lg:mx-0
            "
          >
            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#9A3155]
              "
            >
              Confirma antes del
            </p>

            <p
              className="
                mt-2
                font-playfair
                text-[21px]
                text-[#511329]
                sm:text-[24px]
              "
            >
              {DATOS_CONFIRMACION.fechaLimite}
            </p>
          </div>
        </motion.div>

        {/* =================================================
            FORMULARIO
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: 35,
            scale: 0.98,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="
            relative
            w-full
            overflow-hidden
            rounded-[30px]
            border border-white/70
            bg-white/58
            px-5 py-10
            shadow-[0_26px_70px_rgba(84,17,42,0.15)]
            backdrop-blur-xl
            sm:rounded-[38px]
            sm:px-8 sm:py-12
            md:px-10
          "
        >
          {/* GLOW INTERIOR */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-0
              bg-gradient-to-br
              from-white/90
              via-transparent
              to-[#7A1838]/7
            "
          />

          {/* BRILLO ANIMADO */}

          <motion.div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute top-0
              h-full w-32
              -skew-x-12
              bg-gradient-to-r
              from-transparent
              via-white/35
              to-transparent
            "
            animate={{
              left: ["-45%", "140%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />

          {/* BORDE INTERIOR */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-[8px]
              rounded-[22px]
              border border-white/45
              sm:inset-[11px]
              sm:rounded-[29px]
            "
          />

          <div className="relative z-10">
            {/* ENCABEZADO */}

            <div className="text-center">
              <motion.div
                className="
                  mx-auto
                  flex h-16 w-16
                  items-center justify-center
                  rounded-full
                  border border-[#D5B76A]/35
                  bg-white/70
                  text-3xl
                  shadow-[0_12px_30px_rgba(84,17,42,0.10)]
                "
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ✉️
              </motion.div>

              <h3
                className="
                  mt-5
                  font-playfair
                  text-[26px]
                  font-semibold
                  text-[#511329]
                  sm:text-[32px]
                "
              >
                Confirmación de asistencia
              </h3>

              <p
                className="
                  mx-auto mt-2
                  max-w-md
                  text-sm
                  leading-relaxed
                  text-[#866572]
                  sm:text-[15px]
                "
              >
                Completa los siguientes datos para registrar tu
                respuesta.
              </p>
            </div>

            {/* =================================================
                NOMBRE
            ================================================= */}

            <div className="mt-8">
              <label
                htmlFor="nombre-invitado"
                className="
                  mb-2 block
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#7A1838]
                "
              >
                Nombre completo
              </label>

              <input
                id="nombre-invitado"
                type="text"
                autoComplete="name"
                placeholder="Nombre y apellido"
                value={nombreInvitado}
                disabled={loading}
                onChange={(event) => {
                  setNombreInvitado(event.target.value);
                  setError("");
                }}
                className="
                  min-h-[50px]
                  w-full
                  rounded-2xl
                  border border-[#D5B76A]/25
                  bg-white/75
                  px-4 py-3
                  font-playfair
                  text-[15px]
                  text-[#40202B]
                  outline-none
                  transition
                  placeholder:text-[#A98D98]
                  focus:border-[#7A1838]/45
                  focus:ring-2
                  focus:ring-[#7A1838]/10
                  disabled:cursor-not-allowed
                  disabled:opacity-65
                  sm:px-5
                  sm:text-base
                "
              />
            </div>

            {/* =================================================
                ASISTENCIA
            ================================================= */}

            <fieldset className="mt-7">
              <legend
                className="
                  mb-3
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#7A1838]
                "
              >
                ¿Podrás acompañarme?
              </legend>

              <div
                className="
                  grid grid-cols-1
                  gap-3
                  sm:grid-cols-2
                "
              >
                {/* SÍ ASISTIRÉ */}

                <label
                  className={`
                    relative
                    flex min-h-[62px]
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    px-4 py-3
                    transition-all
                    ${
                      asistencia === "Sí asistiré"
                        ? "border-[#7A1838] bg-[#7A1838]/8 shadow-[0_10px_25px_rgba(84,17,42,0.08)]"
                        : "border-[#D5B76A]/25 bg-white/65 hover:border-[#7A1838]/25"
                    }
                    ${
                      loading
                        ? "pointer-events-none opacity-65"
                        : ""
                    }
                  `}
                >
                  <span
                    className={`
                      flex h-6 w-6
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      transition
                      ${
                        asistencia === "Sí asistiré"
                          ? "border-[#7A1838]"
                          : "border-[#BDA7AF]"
                      }
                    `}
                  >
                    {asistencia === "Sí asistiré" && (
                      <motion.span
                        initial={{
                          scale: 0,
                        }}
                        animate={{
                          scale: 1,
                        }}
                        className="
                          h-3 w-3
                          rounded-full
                          bg-[#7A1838]
                        "
                      />
                    )}
                  </span>

                  <span
                    className="
                      text-sm
                      font-medium
                      text-[#5C3946]
                      sm:text-[15px]
                    "
                  >
                    Sí asistiré
                  </span>

                  <input
                    type="radio"
                    name="asistencia"
                    value="Sí asistiré"
                    checked={asistencia === "Sí asistiré"}
                    disabled={loading}
                    onChange={() =>
                      seleccionarAsistencia("Sí asistiré")
                    }
                    className="sr-only"
                  />
                </label>

                {/* NO PODRÉ ASISTIR */}

                <label
                  className={`
                    relative
                    flex min-h-[62px]
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    px-4 py-3
                    transition-all
                    ${
                      asistencia === "No podré asistir"
                        ? "border-[#7A1838] bg-[#7A1838]/8 shadow-[0_10px_25px_rgba(84,17,42,0.08)]"
                        : "border-[#D5B76A]/25 bg-white/65 hover:border-[#7A1838]/25"
                    }
                    ${
                      loading
                        ? "pointer-events-none opacity-65"
                        : ""
                    }
                  `}
                >
                  <span
                    className={`
                      flex h-6 w-6
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      transition
                      ${
                        asistencia === "No podré asistir"
                          ? "border-[#7A1838]"
                          : "border-[#BDA7AF]"
                      }
                    `}
                  >
                    {asistencia === "No podré asistir" && (
                      <motion.span
                        initial={{
                          scale: 0,
                        }}
                        animate={{
                          scale: 1,
                        }}
                        className="
                          h-3 w-3
                          rounded-full
                          bg-[#7A1838]
                        "
                      />
                    )}
                  </span>

                  <span
                    className="
                      text-sm
                      font-medium
                      text-[#5C3946]
                      sm:text-[15px]
                    "
                  >
                    No podré asistir
                  </span>

                  <input
                    type="radio"
                    name="asistencia"
                    value="No podré asistir"
                    checked={
                      asistencia === "No podré asistir"
                    }
                    disabled={loading}
                    onChange={() =>
                      seleccionarAsistencia(
                        "No podré asistir"
                      )
                    }
                    className="sr-only"
                  />
                </label>
              </div>
            </fieldset>

            {/* =================================================
                NÚMERO DE ASISTENTES
            ================================================= */}

            <AnimatePresence mode="wait">
              {asistencia === "Sí asistiré" && (
                <motion.div
                  key="selector-invitados"
                  initial={{
                    opacity: 0,
                    height: 0,
                    y: -8,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    y: -8,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="overflow-hidden"
                >
                  <div className="mt-7">
                    <label
                      htmlFor="numero-invitados"
                      className="
                        mb-2 block
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-[#7A1838]
                      "
                    >
                      Personas que asistirán
                    </label>

                    <div className="relative">
                      <select
                        id="numero-invitados"
                        value={invitados}
                        disabled={loading}
                        onChange={(event) =>
                          setInvitados(
                            Number(event.target.value)
                          )
                        }
                        className="
                          min-h-[50px]
                          w-full
                          appearance-none
                          rounded-2xl
                          border border-[#D5B76A]/25
                          bg-white/75
                          px-4 py-3
                          pr-12
                          text-center
                          font-playfair
                          text-[16px]
                          text-[#40202B]
                          outline-none
                          transition
                          focus:border-[#7A1838]/45
                          focus:ring-2
                          focus:ring-[#7A1838]/10
                          disabled:cursor-not-allowed
                          disabled:opacity-65
                        "
                      >
                        {opcionesInvitados.map(
                          (cantidad) => (
                            <option
                              key={cantidad}
                              value={cantidad}
                            >
                              {cantidad}{" "}
                              {cantidad === 1
                                ? "persona"
                                : "personas"}
                            </option>
                          )
                        )}
                      </select>

                      <span
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute right-5 top-1/2
                          -translate-y-1/2
                          text-[#7A1838]
                        "
                      >
                        ▾
                      </span>
                    </div>

                    <p
                      className="
                        mt-2
                        text-center
                        text-xs
                        leading-relaxed
                        text-[#9A7884]
                      "
                    >
                      Esta invitación tiene{" "}
                      <strong className="text-[#7A1838]">
                        {pasesPermitidos}{" "}
                        {pasesPermitidos === 1
                          ? "lugar asignado"
                          : "lugares asignados"}
                      </strong>
                      .
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* =================================================
                MENSAJE
            ================================================= */}

            <div className="mt-7">
              <label
                htmlFor="mensaje-invitado"
                className="
                  mb-2 block
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#7A1838]
                "
              >
                Mensaje para Carla
                <span
                  className="
                    ml-2
                    normal-case
                    tracking-normal
                    text-[#A98D98]
                  "
                >
                  (opcional)
                </span>
              </label>

              <textarea
                id="mensaje-invitado"
                rows={4}
                maxLength={350}
                placeholder="Escribe un mensaje especial..."
                value={mensajeInvitado}
                disabled={loading}
                onChange={(event) =>
                  setMensajeInvitado(event.target.value)
                }
                className="
                  min-h-[120px]
                  w-full
                  resize-none
                  rounded-2xl
                  border border-[#D5B76A]/25
                  bg-white/75
                  px-4 py-4
                  font-playfair
                  text-[15px]
                  leading-relaxed
                  text-[#40202B]
                  outline-none
                  transition
                  placeholder:text-[#A98D98]
                  focus:border-[#7A1838]/45
                  focus:ring-2
                  focus:ring-[#7A1838]/10
                  disabled:cursor-not-allowed
                  disabled:opacity-65
                  sm:px-5
                "
              />

              <p
                className="
                  mt-1.5
                  text-right
                  text-[10px]
                  text-[#A98D98]
                "
              >
                {mensajeInvitado.length}/350
              </p>
            </div>

            {/* =================================================
                MENSAJES DE ERROR Y ÉXITO
            ================================================= */}

            <div
              className="
                mt-5
                min-h-[46px]
              "
            >
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    key="mensaje-error"
                    initial={{
                      opacity: 0,
                      y: 8,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -5,
                    }}
                    className="
                      rounded-2xl
                      border border-red-200
                      bg-red-50
                      px-4 py-3
                      text-center
                      text-sm
                      leading-relaxed
                      text-red-600
                    "
                  >
                    {error}
                  </motion.div>
                )}

                {enviado && !error && (
                  <motion.div
                    key="mensaje-exito"
                    initial={{
                      opacity: 0,
                      y: 8,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -5,
                    }}
                    className="
                      rounded-2xl
                      border border-[#D5B76A]/35
                      bg-[#F9F2E3]
                      px-4 py-3
                      text-center
                      text-sm
                      leading-relaxed
                      text-[#6A1735]
                    "
                  >
                    <span className="mr-1">✓</span>

                    Tu confirmación fue enviada correctamente.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* =================================================
                BOTÓN ENVIAR
            ================================================= */}

            <motion.button
              type="button"
              onClick={enviarConfirmacion}
              disabled={loading}
              className={`
                relative
                mt-2
                inline-flex
                min-h-[52px]
                w-full
                items-center
                justify-center
                overflow-hidden
                rounded-full
                px-7 py-4
                text-white
                outline-none
                transition
                focus-visible:ring-2
                focus-visible:ring-[#D5B76A]
                focus-visible:ring-offset-2
                ${
                  loading
                    ? "cursor-not-allowed opacity-65"
                    : "cursor-pointer"
                }
              `}
              style={{
                background: loading
                  ? "linear-gradient(135deg, #987985, #765966)"
                  : `
                    linear-gradient(
                      135deg,
                      #8D2447 0%,
                      #6A1735 52%,
                      #451022 100%
                    )
                  `,

                boxShadow: `
                  0 16px 34px rgba(90,16,43,0.25),
                  inset 0 1px 0 rgba(255,255,255,0.23)
                `,
              }}
              whileHover={
                loading
                  ? undefined
                  : {
                      scale: 1.025,
                      y: -2,
                    }
              }
              whileTap={
                loading
                  ? undefined
                  : {
                      scale: 0.98,
                    }
              }
            >
              {!loading && (
                <motion.span
                  aria-hidden="true"
                  className="
                    absolute top-0
                    h-full w-[80%]
                    -skew-x-12
                    bg-white/20
                  "
                  animate={{
                    left: ["-120%", "150%"],
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    repeatDelay: 1.3,
                    ease: "easeInOut",
                  }}
                />
              )}

              <span
                className="
                  relative z-10
                  flex items-center
                  justify-center
                  gap-3
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  sm:text-[11px]
                  sm:tracking-[0.28em]
                "
              >
                {loading ? (
                  <>
                    <span
                      className="
                        h-5 w-5
                        animate-spin
                        rounded-full
                        border-2
                        border-white/40
                        border-t-white
                      "
                    />

                    Enviando
                  </>
                ) : (
                  <>
                    Enviar confirmación

                    <span
                      aria-hidden="true"
                      className="text-base"
                    >
                      ✦
                    </span>
                  </>
                )}
              </span>
            </motion.button>

            {/* AVISO */}

            <p
              className="
                mx-auto mt-5
                max-w-md
                text-center
                text-[11px]
                leading-relaxed
                text-[#9A7884]
              "
            >
              Por favor, envía una sola confirmación por invitación.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Confirmacion;