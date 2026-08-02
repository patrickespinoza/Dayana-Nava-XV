"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

/* =====================================================
   CONFIGURACIÓN
===================================================== */

const DATOS_CONFIRMACION = {
  festejada: "Dayana Nava Meléndez",

  scriptUrl:
    "https://script.google.com/macros/s/AKfycbxklU9PTlqxkcu9pBUfWYhByQZ_7kJWuFENeeQhlEW-C6eh2cVbTK3z2AbMJiWVL1ME/exec",
};

/* =====================================================
   PALETA
===================================================== */

const COLORES = {
  azul: "#B9D8F4",
  rosa: "#D99AB1",
  blanco: "#FFFFFF",
  negro: "#1F1F1F",
};

/* =====================================================
   DECODIFICAR URL DEL GENERADOR

   Formato esperado:
   /?id=CODIGO_ENCRIPTADO

   Contenido decodificado:
   {
     nombre: "Familia López",
     pases: 4
   }
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
      Generador actual:
      JSON → invertir texto → Base64 UTF-8
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
        Compatibilidad con enlaces anteriores
        creados únicamente con btoa().
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
        "No se pudieron leer los datos encriptados:",
        errorSecundario
      );

      return null;
    }
  }
};

/* =====================================================
   ANIMACIÓN GENERAL
===================================================== */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
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

const Confirmacion = () => {
  const temporizadorRef = useRef(null);

  const [nombreInvitado, setNombreInvitado] =
    useState("");

  const [mensajeInvitado, setMensajeInvitado] =
    useState("");

  const [asistencia, setAsistencia] =
    useState("");

  const [invitados, setInvitados] =
    useState(1);

  const [pasesPermitidos, setPasesPermitidos] =
    useState(1);

  const [datosDesdeGenerador, setDatosDesdeGenerador] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  /* =====================================================
     LEER URL ENCRIPTADA

     Prioridad:

     1. /?id=...
     2. /?nombre=...&pases=...
  ===================================================== */

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const idEncriptado = params.get("id");

    if (idEncriptado) {
      const datos =
        decodificarInvitacion(idEncriptado);

      if (datos) {
        const nombreDecodificado =
          datos.nombre ||
          datos.invitado ||
          datos.nombreInvitado;

        const pasesDecodificados =
          Number.parseInt(
            datos.pases ||
              datos.invitados ||
              datos.lugares,
            10
          );

        if (
          typeof nombreDecodificado === "string" &&
          nombreDecodificado.trim()
        ) {
          setNombreInvitado(
            nombreDecodificado.trim()
          );

          setDatosDesdeGenerador(true);
        }

        if (
          Number.isFinite(pasesDecodificados) &&
          pasesDecodificados > 0
        ) {
          setPasesPermitidos(
            pasesDecodificados
          );

          setInvitados(1);
        }

        return;
      }
    }

    /*
      Compatibilidad con enlaces antiguos.
    */

    const nombreUrl = params.get("nombre");
    const pasesUrl = params.get("pases");

    if (nombreUrl?.trim()) {
      setNombreInvitado(nombreUrl.trim());
      setDatosDesdeGenerador(true);
    }

    if (pasesUrl) {
      const cantidad = Number.parseInt(
        pasesUrl,
        10
      );

      if (
        Number.isFinite(cantidad) &&
        cantidad > 0
      ) {
        setPasesPermitidos(cantidad);
        setInvitados(1);
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
     OPCIONES DE PASES
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
     SELECCIONAR ASISTENCIA
  ===================================================== */

  const seleccionarAsistencia = (opcion) => {
    setAsistencia(opcion);
    setError("");
    setEnviado(false);

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
      setError(
        "Por favor, escribe tu nombre."
      );

      return false;
    }

    if (!asistencia) {
      setError(
        "Selecciona si podrás asistir."
      );

      return false;
    }

    if (
      asistencia === "Sí asistiré" &&
      (invitados < 1 ||
        invitados > pasesPermitidos)
    ) {
      setError(
        `Puedes confirmar un máximo de ${pasesPermitidos} ${
          pasesPermitidos === 1
            ? "persona"
            : "personas"
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
    if (loading || enviado) return;

    if (!validarFormulario()) return;

    setError("");
    setLoading(true);

    const data = {
      fecha: new Date().toLocaleString(
        "es-MX",
        {
          timeZone: "America/Mexico_City",
        }
      ),

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
      await fetch(
        DATOS_CONFIRMACION.scriptUrl,
        {
          method: "POST",
          mode: "no-cors",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(data),
        }
      );

      setEnviado(true);
      setMensajeInvitado("");

      /*
        Conservamos los datos obtenidos
        desde el generador.
      */

      if (!datosDesdeGenerador) {
        setNombreInvitado("");
      }

      temporizadorRef.current =
        window.setTimeout(() => {
          setEnviado(false);
        }, 6000);
    } catch (err) {
      console.error(
        "Error enviando confirmación:",
        err
      );

      setError(
        "No pudimos enviar tu confirmación. Inténtalo nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const textoPases =
    pasesPermitidos === 1
      ? "1 lugar asignado"
      : `${pasesPermitidos} lugares asignados`;

  /* =====================================================
     INTERFAZ
  ===================================================== */

  return (
    <motion.section
      className="
        confirmacion-xv
        relative
        w-full
        overflow-hidden
        bg-[#B9D8F4]
        px-4
        py-20
        sm:px-6
        sm:py-24
        lg:px-10
        lg:py-28
      "
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.08,
      }}
    >
      {/* FRANJA SUPERIOR */}

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

      <div
        className="
          confirmacion-xv__contenedor
          relative
          z-10
          mx-auto
          w-full
          max-w-3xl
        "
      >
        {/* ===============================================
            ENCABEZADO
        =============================================== */}

        <motion.div
          className="
            confirmacion-xv__encabezado
            mx-auto
            max-w-2xl
            text-center
          "
          variants={fadeUp}
        >
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.32em]
              text-[#1F1F1F]
              sm:text-[11px]
              sm:tracking-[0.45em]
            "
          >
            Reserva tu lugar
          </p>

          <h2
            className="
              mt-4
              font-cursiveDancing
              text-[50px]
              leading-tight
              text-[#D99AB1]
              sm:text-[66px]
              md:text-[76px]
            "
          >
            Confirma tu asistencia
          </h2>

        </motion.div>

        {/* ===============================================
            FORMULARIO
        =============================================== */}

        <motion.div
          className="
            confirmacion-xv__formulario
            relative
            mt-10
            w-full
            border
            border-black/10
            bg-white
            px-5
            py-9
            shadow-[0_22px_60px_rgba(31,31,31,0.13)]
            sm:mt-12
            sm:px-9
            sm:py-11
            md:px-12
          "
          variants={fadeUp}
        >
          {/* Borde superior */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              h-2
              w-full
              bg-[#D99AB1]
            "
          />

          {/* NOMBRE */}

          <div>
            <label
              htmlFor="nombre-invitado"
              className="
                mb-2
                block
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#1F1F1F]
              "
            >
              Nombre del invitado
            </label>

            <input
              id="nombre-invitado"
              type="text"
              autoComplete="name"
              placeholder="Nombre y apellido"
              value={nombreInvitado}
              readOnly={datosDesdeGenerador}
              disabled={loading}
              onChange={(event) => {
                if (datosDesdeGenerador) return;

                setNombreInvitado(
                  event.target.value
                );

                setError("");
              }}
              className={`
                min-h-[51px]
                w-full
                border
                border-black/15
                bg-[#B9D8F4]/25
                px-4
                py-3
                font-playfair
                text-[15px]
                text-[#1F1F1F]
                outline-none
                transition
                placeholder:text-black/35
                focus:border-[#D99AB1]
                focus:ring-2
                focus:ring-[#D99AB1]/20
                disabled:cursor-not-allowed
                disabled:opacity-65
                sm:px-5
                sm:text-base
                ${
                  datosDesdeGenerador
                    ? "cursor-not-allowed bg-[#B9D8F4]/45"
                    : ""
                }
              `}
            />

            {datosDesdeGenerador && (
              <p
                className="
                  mt-2
                  text-xs
                  text-[#1F1F1F]/55
                "
              >
                Este nombre está asignado a tu
                invitación.
              </p>
            )}
          </div>

          {/* ASISTENCIA */}

          <fieldset className="mt-7">
            <legend
              className="
                mb-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#1F1F1F]
              "
            >
              ¿Podrás acompañarnos?
            </legend>

            <div
              className="
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-2
              "
            >
              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  seleccionarAsistencia(
                    "Sí asistiré"
                  )
                }
                className={`
                  min-h-[56px]
                  border
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  transition
                  ${
                    asistencia === "Sí asistiré"
                      ? "border-[#D99AB1] bg-[#D99AB1] text-[#1F1F1F]"
                      : "border-black/15 bg-white text-[#1F1F1F] hover:border-[#D99AB1]"
                  }
                  ${
                    loading
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  }
                `}
              >
                Sí asistiré
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  seleccionarAsistencia(
                    "No podré asistir"
                  )
                }
                className={`
                  min-h-[56px]
                  border
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  transition
                  ${
                    asistencia ===
                    "No podré asistir"
                      ? "border-[#B9D8F4] bg-[#B9D8F4] text-[#1F1F1F]"
                      : "border-black/15 bg-white text-[#1F1F1F] hover:border-[#B9D8F4]"
                  }
                  ${
                    loading
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  }
                `}
              >
                No podré asistir
              </button>
            </div>
          </fieldset>

          {/* SELECTOR DE PASES */}

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
                  duration: 0.3,
                }}
                className="overflow-hidden"
              >
                <div className="mt-7">
                  <label
                    htmlFor="numero-invitados"
                    className="
                      mb-2
                      block
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-[#1F1F1F]
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
                          Number(
                            event.target.value
                          )
                        )
                      }
                      className="
                        min-h-[51px]
                        w-full
                        appearance-none
                        border
                        border-black/15
                        bg-[#B9D8F4]/25
                        px-4
                        py-3
                        pr-12
                        text-center
                        font-playfair
                        text-base
                        text-[#1F1F1F]
                        outline-none
                        transition
                        focus:border-[#D99AB1]
                        focus:ring-2
                        focus:ring-[#D99AB1]/20
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
                        absolute
                        right-5
                        top-1/2
                        -translate-y-1/2
                        text-[#1F1F1F]
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
                      text-[#1F1F1F]/60
                    "
                  >
                    Tu invitación cuenta con{" "}
                    <strong className="font-semibold text-[#D99AB1]">
                      {textoPases}
                    </strong>
                    .
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MENSAJE */}

          <div className="mt-7">
            <label
              htmlFor="mensaje-invitado"
              className="
                mb-2
                block
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#1F1F1F]
              "
            >
              Mensaje para Dayana{" "}
              <span
                className="
                  normal-case
                  tracking-normal
                  text-black/40
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
                setMensajeInvitado(
                  event.target.value
                )
              }
              className="
                min-h-[120px]
                w-full
                resize-none
                border
                border-black/15
                bg-[#B9D8F4]/25
                px-4
                py-4
                font-playfair
                text-[15px]
                leading-relaxed
                text-[#1F1F1F]
                outline-none
                transition
                placeholder:text-black/35
                focus:border-[#D99AB1]
                focus:ring-2
                focus:ring-[#D99AB1]/20
                disabled:cursor-not-allowed
                disabled:opacity-65
                sm:px-5
              "
            />

            <p
              className="
                mt-1
                text-right
                text-[10px]
                text-black/40
              "
            >
              {mensajeInvitado.length}/350
            </p>
          </div>

          {/* MENSAJES */}

          <div className="mt-5 min-h-[48px]">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  key="error"
                  initial={{
                    opacity: 0,
                    y: 7,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -5,
                  }}
                  className="
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    py-3
                    text-center
                    text-sm
                    text-red-600
                  "
                >
                  {error}
                </motion.div>
              )}

              {enviado && !error && (
                <motion.div
                  key="enviado"
                  initial={{
                    opacity: 0,
                    y: 7,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -5,
                  }}
                  className="
                    border
                    border-[#B9D8F4]
                    bg-[#B9D8F4]/35
                    px-4
                    py-3
                    text-center
                    text-sm
                    text-[#1F1F1F]
                  "
                >
                  ✓ Tu confirmación fue enviada
                  correctamente.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* BOTÓN */}

          <motion.button
            type="button"
            onClick={enviarConfirmacion}
            disabled={loading || enviado}
            className={`
              mt-2
              inline-flex
              min-h-[53px]
              w-full
              items-center
              justify-center
              bg-[#D99AB1]
              px-7
              py-4
              text-[10px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[#1F1F1F]
              shadow-[0_12px_28px_rgba(31,31,31,0.14)]
              transition
              sm:text-[11px]
              ${
                loading || enviado
                  ? "cursor-not-allowed opacity-65"
                  : "cursor-pointer"
              }
            `}
            whileHover={
              loading || enviado
                ? undefined
                : {
                    y: -2,
                    scale: 1.01,
                  }
            }
            whileTap={
              loading || enviado
                ? undefined
                : {
                    scale: 0.98,
                  }
            }
          >
            {loading ? (
              <span
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >
                <span
                  className="
                    h-5
                    w-5
                    animate-spin
                    border-2
                    border-[#1F1F1F]/25
                    border-t-[#1F1F1F]
                  "
                />

                Enviando
              </span>
            ) : enviado ? (
              "Confirmación enviada"
            ) : (
              "Enviar confirmación"
            )}
          </motion.button>

          <p
            className="
              mx-auto
              mt-5
              max-w-md
              text-center
              text-[11px]
              leading-relaxed
              text-[#1F1F1F]/50
            "
          >
            Por favor, envía una sola
            confirmación por invitación.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Confirmacion;