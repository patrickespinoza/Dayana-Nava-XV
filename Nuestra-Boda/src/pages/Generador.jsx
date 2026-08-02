import { useMemo, useState } from "react";
import {
  Check,
  Copy,
  ExternalLink,
  Link2,
  MessageCircle,
  RefreshCw,
  Sparkles,
  Ticket,
  UserRound,
} from "lucide-react";

/* =====================================================
   CONFIGURACIÓN
===================================================== */

const CONFIGURACION = {
  festejada: "Dayana Nava Meléndez",
  fecha: "19 de septiembre de 2026",

  /*
    Coloca esta imagen dentro de public:

    public/vistaprevia.png
  */

  imagenVistaPrevia: "/vistaprevia.png",
};

/* =====================================================
   ENCRIPTAR DATOS

   Compatible con la portada y la confirmación:

   JSON
   → invertir texto
   → convertir a UTF-8
   → Base64 URL segura
===================================================== */

const encriptarDatos = (datos) => {
  const json = JSON.stringify(datos);

  const textoInvertido = json
    .split("")
    .reverse()
    .join("");

  const bytes = new TextEncoder().encode(
    textoInvertido
  );

  let binario = "";

  bytes.forEach((byte) => {
    binario += String.fromCharCode(byte);
  });

  return window
    .btoa(binario)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
};

/* =====================================================
   COMPONENTE PRINCIPAL
===================================================== */

export default function Generador() {
  const [nombre, setNombre] = useState("");
  const [pases, setPases] = useState("");

  const [link, setLink] = useState("");
  const [mensajePersonalizado, setMensajePersonalizado] =
    useState("");

  const [error, setError] = useState("");
  const [copiado, setCopiado] = useState("");

  /* =====================================================
     TEXTO DE PASES
  ===================================================== */

  const cantidadPases = Number(pases);

  const textoPases = useMemo(() => {
    if (
      !Number.isFinite(cantidadPases) ||
      cantidadPases < 1
    ) {
      return "lugares reservados";
    }

    return cantidadPases === 1
      ? "1 lugar reservado"
      : `${cantidadPases} lugares reservados`;
  }, [cantidadPases]);

  /* =====================================================
     MENSAJE PREDETERMINADO
  ===================================================== */

  const mensajePredeterminado = useMemo(() => {
    if (!nombre.trim()) return "";

    const saludo = nombre
      .trim()
      .toLowerCase()
      .startsWith("familia")
      ? nombre.trim()
      : nombre.trim();

    return `✨ ${saludo}

Con mucha alegría queremos invitarte a celebrar los XV años de ${CONFIGURACION.festejada}.

Hemos reservado ${textoPases} para ti.

📅 ${CONFIGURACION.fecha}

Consulta todos los detalles y confirma tu asistencia en el siguiente enlace:

${link || "[Aquí aparecerá el enlace]"}

Será muy especial contar con tu presencia. 💙🌸`;
  }, [nombre, link, textoPases]);

  const mensajeFinal =
    mensajePersonalizado || mensajePredeterminado;

  /* =====================================================
     GENERAR ENLACE
  ===================================================== */

  const generarLink = () => {
    const nombreLimpio = nombre.trim();
    const cantidad = Number.parseInt(pases, 10);

    if (!nombreLimpio) {
      setError(
        "Escribe el nombre del invitado o de la familia."
      );
      return;
    }

    if (
      !Number.isFinite(cantidad) ||
      cantidad < 1
    ) {
      setError(
        "Escribe una cantidad válida de pases."
      );
      return;
    }

    const datos = {
      nombre: nombreLimpio,
      pases: cantidad,
    };

    const id = encriptarDatos(datos);

    const url = `${window.location.origin}/?id=${id}`;

    setLink(url);
    setMensajePersonalizado("");
    setError("");
    setCopiado("");
  };

  /* =====================================================
     COPIAR CONTENIDO
  ===================================================== */

  const copiarContenido = async (
    contenido,
    tipo
  ) => {
    if (!contenido) return;

    try {
      await navigator.clipboard.writeText(
        contenido
      );

      setCopiado(tipo);

      window.setTimeout(() => {
        setCopiado("");
      }, 2200);
    } catch (errorCopiar) {
      console.error(
        "No fue posible copiar el contenido:",
        errorCopiar
      );

      setError(
        "No fue posible copiar. Selecciona el contenido manualmente."
      );
    }
  };

  /* =====================================================
     LIMPIAR FORMULARIO
  ===================================================== */

  const limpiarGenerador = () => {
    setNombre("");
    setPases("");
    setLink("");
    setMensajePersonalizado("");
    setError("");
    setCopiado("");
  };

  return (
    <main
      className="
        generador-xv
        min-h-screen
        bg-[#B9D8F4]
        px-4
        py-8
        text-[#1F1F1F]
        sm:px-6
        sm:py-12
        lg:px-10
      "
    >
      {/* FRANJA SUPERIOR */}

      <div
        aria-hidden="true"
        className="
          fixed
          left-0
          top-0
          z-50
          h-2
          w-full
          bg-[#D99AB1]
        "
      />

      <div
        className="
          generador-xv__contenedor
          mx-auto
          w-full
          max-w-7xl
        "
      >
        {/* ===============================================
            ENCABEZADO
        =============================================== */}

        <header
          className="
            generador-xv__encabezado
            mb-8
            flex
            flex-col
            gap-5
            border-b
            border-[#1F1F1F]/15
            pb-7
            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          <div>
            <div
              className="
                mb-3
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  bg-[#D99AB1]
                "
              >
                <Sparkles size={19} />
              </span>

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                "
              >
                Wedly · Panel privado
              </p>
            </div>

            <h1
              className="
                font-playfair
                text-3xl
                font-semibold
                sm:text-4xl
                lg:text-5xl
              "
            >
              Generador de invitaciones
            </h1>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-relaxed
                text-[#1F1F1F]/65
                sm:text-base
              "
            >
              Crea un enlace único con el nombre
              del invitado y la cantidad de pases
              asignados.
            </p>
          </div>

          <button
            type="button"
            onClick={limpiarGenerador}
            className="
              inline-flex
              min-h-[46px]
              items-center
              justify-center
              gap-2
              self-start
              border
              border-[#1F1F1F]/20
              bg-white/45
              px-5
              text-xs
              font-bold
              uppercase
              tracking-[0.16em]
              transition
              hover:bg-white
              md:self-auto
            "
          >
            <RefreshCw size={16} />

            Limpiar
          </button>
        </header>

        {/* ===============================================
            DISTRIBUCIÓN PRINCIPAL
        =============================================== */}

        <div
          className="
            generador-xv__columnas
            grid
            grid-cols-1
            gap-7
            lg:grid-cols-[0.9fr_1.1fr]
            lg:items-start
          "
        >
          {/* =============================================
              FORMULARIO
          ============================================= */}

          <section
            className="
              generador-xv__formulario
              relative
              overflow-hidden
              border
              border-[#1F1F1F]/10
              bg-white
              p-5
              shadow-[0_24px_65px_rgba(31,31,31,0.13)]
              sm:p-8
            "
          >
            <div
              aria-hidden="true"
              className="
                absolute
                left-0
                top-0
                h-2
                w-full
                bg-[#D99AB1]
              "
            />

            <div
              className="
                mb-7
                flex
                items-center
                justify-between
                gap-4
                border-b
                border-[#1F1F1F]/10
                pb-5
              "
            >
              <div>
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-[#D99AB1]
                  "
                >
                  Información del invitado
                </p>

                <h2
                  className="
                    mt-2
                    font-playfair
                    text-2xl
                    font-semibold
                  "
                >
                  Crear invitación
                </h2>
              </div>

              <span
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  bg-[#B9D8F4]
                "
              >
                <Link2 size={21} />
              </span>
            </div>

            {/* NOMBRE */}

            <div>
              <label
                htmlFor="nombre-generador"
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                "
              >
                <UserRound size={15} />

                Nombre del invitado
              </label>

              <input
                id="nombre-generador"
                type="text"
                value={nombre}
                placeholder="Ej. Familia López"
                autoComplete="off"
                onChange={(event) => {
                  setNombre(event.target.value);
                  setLink("");
                  setMensajePersonalizado("");
                  setError("");
                }}
                className="
                  min-h-[52px]
                  w-full
                  border
                  border-[#1F1F1F]/15
                  bg-[#B9D8F4]/20
                  px-4
                  font-playfair
                  text-base
                  outline-none
                  transition
                  placeholder:text-[#1F1F1F]/35
                  focus:border-[#D99AB1]
                  focus:ring-2
                  focus:ring-[#D99AB1]/20
                "
              />
            </div>

            {/* PASES */}

            <div className="mt-6">
              <label
                htmlFor="pases-generador"
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                "
              >
                <Ticket size={15} />

                Número de pases
              </label>

              <input
                id="pases-generador"
                type="number"
                min="1"
                inputMode="numeric"
                value={pases}
                placeholder="Ej. 4"
                onChange={(event) => {
                  const valor =
                    event.target.value;

                  if (
                    valor === "" ||
                    Number(valor) >= 1
                  ) {
                    setPases(valor);
                  }

                  setLink("");
                  setMensajePersonalizado("");
                  setError("");
                }}
                className="
                  min-h-[52px]
                  w-full
                  border
                  border-[#1F1F1F]/15
                  bg-[#B9D8F4]/20
                  px-4
                  font-playfair
                  text-base
                  outline-none
                  transition
                  placeholder:text-[#1F1F1F]/35
                  focus:border-[#D99AB1]
                  focus:ring-2
                  focus:ring-[#D99AB1]/20
                "
              />

              <p
                className="
                  mt-2
                  text-xs
                  leading-relaxed
                  text-[#1F1F1F]/50
                "
              >
                La confirmación limitará la
                cantidad de asistentes a este
                número.
              </p>
            </div>

            {/* ERROR */}

            {error && (
              <div
                className="
                  mt-5
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  text-red-600
                "
              >
                {error}
              </div>
            )}

            {/* BOTÓN GENERAR */}

            <button
              type="button"
              onClick={generarLink}
              className="
                mt-7
                inline-flex
                min-h-[54px]
                w-full
                items-center
                justify-center
                gap-3
                bg-[#D99AB1]
                px-6
                text-[11px]
                font-bold
                uppercase
                tracking-[0.22em]
                shadow-[0_13px_28px_rgba(31,31,31,0.14)]
                transition
                hover:-translate-y-0.5
                hover:shadow-[0_17px_34px_rgba(31,31,31,0.17)]
                active:translate-y-0
              "
            >
              <Sparkles size={18} />

              Generar invitación
            </button>

            {/* ENLACE GENERADO */}

            {link && (
              <div
                className="
                  mt-7
                  border-t
                  border-[#1F1F1F]/10
                  pt-7
                "
              >
                <div
                  className="
                    mb-3
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                    "
                  >
                    Enlace encriptado
                  </p>

                  <span
                    className="
                      bg-[#B9D8F4]
                      px-3
                      py-1
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                    "
                  >
                    Listo
                  </span>
                </div>

                <div
                  className="
                    max-h-28
                    overflow-y-auto
                    break-all
                    border
                    border-[#1F1F1F]/10
                    bg-[#F7F7F7]
                    p-4
                    font-mono
                    text-xs
                    leading-relaxed
                    text-[#1F1F1F]/70
                  "
                >
                  {link}
                </div>

                <div
                  className="
                    mt-3
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-2
                  "
                >
                  <button
                    type="button"
                    onClick={() =>
                      copiarContenido(
                        link,
                        "link"
                      )
                    }
                    className="
                      inline-flex
                      min-h-[48px]
                      items-center
                      justify-center
                      gap-2
                      border
                      border-[#1F1F1F]/15
                      bg-white
                      px-4
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      transition
                      hover:bg-[#B9D8F4]/35
                    "
                  >
                    {copiado === "link" ? (
                      <>
                        <Check size={17} />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy size={17} />
                        Copiar enlace
                      </>
                    )}
                  </button>

                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      min-h-[48px]
                      items-center
                      justify-center
                      gap-2
                      bg-[#1F1F1F]
                      px-4
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-white
                      transition
                      hover:opacity-85
                    "
                  >
                    <ExternalLink size={17} />

                    Abrir invitación
                  </a>
                </div>
              </div>
            )}
          </section>

          {/* =============================================
              VISTA PREVIA
          ============================================= */}

          <section
            className="
              generador-xv__vista-previa
              overflow-hidden
              border
              border-[#1F1F1F]/10
              bg-white
              shadow-[0_24px_65px_rgba(31,31,31,0.13)]
            "
          >
            {/* IMAGEN */}

            <div
              className="
                relative
                min-h-[310px]
                overflow-hidden
                bg-[#D99AB1]
                sm:min-h-[390px]
              "
            >
              <img
                src="/portada.jpg"
                alt={`Vista previa de los XV años de ${CONFIGURACION.festejada}`}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  object-[center_10%]
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/15
                  to-transparent
                "
              />

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  p-6
                  text-white
                  sm:p-8
                "
              >
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.3em]
                  "
                >
                  Vista previa
                </p>

                <h2
                  className="
                    mt-2
                    font-cursiveDancing
                    text-5xl
                    leading-none
                    sm:text-6xl
                  "
                >
                  {CONFIGURACION.festejada}
                </h2>

                <p
                  className="
                    mt-3
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-white/80
                  "
                >
                  {CONFIGURACION.fecha}
                </p>
              </div>
            </div>

            {/* RESUMEN */}

            <div
              className="
                grid
                grid-cols-2
                border-b
                border-[#1F1F1F]/10
              "
            >
              <div
                className="
                  border-r
                  border-[#1F1F1F]/10
                  p-5
                "
              >
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[#1F1F1F]/50
                  "
                >
                  Invitado
                </p>

                <p
                  className="
                    mt-2
                    break-words
                    font-playfair
                    text-base
                    font-semibold
                  "
                >
                  {nombre.trim() ||
                    "Pendiente"}
                </p>
              </div>

              <div className="p-5">
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[#1F1F1F]/50
                  "
                >
                  Pases
                </p>

                <p
                  className="
                    mt-2
                    font-playfair
                    text-base
                    font-semibold
                  "
                >
                  {cantidadPases >= 1
                    ? cantidadPases
                    : "Pendiente"}
                </p>
              </div>
            </div>

            {/* MENSAJE WHATSAPP */}

            <div className="p-5 sm:p-8">
              <div
                className="
                  mb-4
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                <div>
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.25em]
                      text-[#D99AB1]
                    "
                  >
                    Mensaje para WhatsApp
                  </p>

                  <h3
                    className="
                      mt-1
                      font-playfair
                      text-xl
                      font-semibold
                    "
                  >
                    Vista previa del envío
                  </h3>
                </div>

                <span
                  className="
                    flex
                    h-11
                    w-11
                    flex-shrink-0
                    items-center
                    justify-center
                    bg-[#B9D8F4]
                  "
                >
                  <MessageCircle size={20} />
                </span>
              </div>

              <textarea
                rows={12}
                value={mensajeFinal}
                disabled={!nombre.trim()}
                onChange={(event) =>
                  setMensajePersonalizado(
                    event.target.value
                  )
                }
                placeholder="Genera una invitación para visualizar el mensaje."
                className="
                  min-h-[300px]
                  w-full
                  resize-y
                  border
                  border-[#1F1F1F]/10
                  bg-[#F7F7F7]
                  p-4
                  text-sm
                  leading-relaxed
                  outline-none
                  transition
                  focus:border-[#D99AB1]
                  focus:ring-2
                  focus:ring-[#D99AB1]/20
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:p-5
                "
              />

              <button
                type="button"
                disabled={!link}
                onClick={() =>
                  copiarContenido(
                    mensajeFinal,
                    "mensaje"
                  )
                }
                className="
                  mt-4
                  inline-flex
                  min-h-[51px]
                  w-full
                  items-center
                  justify-center
                  gap-3
                  bg-[#1F1F1F]
                  px-6
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-white
                  transition
                  hover:opacity-85
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                {copiado === "mensaje" ? (
                  <>
                    <Check size={18} />

                    Mensaje copiado
                  </>
                ) : (
                  <>
                    <Copy size={18} />

                    Copiar mensaje completo
                  </>
                )}
              </button>

              <p
                className="
                  mt-3
                  text-center
                  text-[11px]
                  leading-relaxed
                  text-[#1F1F1F]/45
                "
              >
                Puedes editar el mensaje antes de
                copiarlo sin modificar el enlace
                generado.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}