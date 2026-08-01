import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
import html2canvas from "html2canvas";

// 🔥 URL GOOGLE SHEETS
const API_URL = "https://script.google.com/macros/s/AKfycbxQTHIUXU3wWSw_mg7wvwbjwLbzskGcgGaGKzuY_yUK1r-RfPfXtSB7WD4CfZ6W7f5QJg/exec";

const preguntas = [
  {
    pregunta: "¿Dónde se conocieron Allison y David?",
    opciones: ["En la Universidad", "En una Fiesta", "En el trabajo", "Por una app", "En un viaje"],
    correcta: 0
  },
  {
    pregunta: "¿Quién dijo 'te amo' primero?",
    opciones: ["Allison", "David", "Ambos", "Nadie", "Accidente 😅"],
    correcta: 1
  },
  {
    pregunta: "¿Comida favorita?",
    opciones: ["Pizza", "Sushi", "Tacos", "Pasta", "Hamburguesas"],
    correcta: 2
  },
  {
    pregunta: "¿Primera cita?",
    opciones: ["Cine", "Restaurante", "Parque", "Café", "Playa"],
    correcta: 3
  },
  {
    pregunta: "¿Quién es más puntual?",
    opciones: ["Allison", "David", "Ambos", "Ninguno 😂", "Depende"],
    correcta: 0
  }
];

const Preguntas = () => {
  const [nombre, setNombre] = useState("");
  const [mostrarNombre, setMostrarNombre] = useState(true);
  const [paso, setPaso] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [score, setScore] = useState(0);
  const [terminado, setTerminado] = useState(false);
  const [ranking, setRanking] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const resultadoRef = useRef();

  // 📤 enviar resultado
const enviarResultado = async () => {
  try {
    await fetch(API_URL, {
      method: "POST",
      mode: "no-cors", // ✅ IMPORTANTE
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombre,
        score: score
      })
    });
  } catch (e) {
    console.log("Error enviando:", e);
  }
};

  // 📥 obtener ranking
  const obtenerRanking = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      const ordenado = data.sort((a, b) => b.score - a.score);
      setRanking(ordenado.slice(0, 3));
    } catch (e) {
      console.log("Error ranking:", e);
    }
  };

  // 🔥 flujo final (TIEMPO REAL)
  useEffect(() => {
    if (terminado) {
      const flujoFinal = async () => {
        await enviarResultado();

        // ⏳ esperar a que Google Sheets guarde
        setTimeout(async () => {
          await obtenerRanking();
        }, 1200);

        // 🎉 confetti seguro
        setShowConfetti(true);
      };

      flujoFinal();
    }
  }, [terminado]);

  // 🎯 lógica respuestas
  const manejarRespuesta = (index) => {
    if (paso === 0 && !nombre.trim()) {
      alert("Escribe tu nombre 😊");
      return;
    }

    setSeleccion(index);

    if (index === preguntas[paso].correcta) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      setSeleccion(null);

      if (paso === 0) setMostrarNombre(false);

      if (paso + 1 < preguntas.length) {
        setPaso(paso + 1);
      } else {
        setTerminado(true);
      }
    }, 700);
  };

  // 📸 guardar imagen
  const guardarResultado = async () => {
    const canvas = await html2canvas(resultadoRef.current);
    const link = document.createElement("a");
    link.download = "resultado.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex justify-center relative">
      <div className="w-full max-w-xl">

        {/* 🎉 CONFETTI FIX */}
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={300}
            recycle={false}
          />
        )}

        <AnimatePresence mode="wait">
          {!terminado ? (
            <motion.div
              key={paso}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="flex flex-col items-center gap-5 py-10 bg-gray-50 rounded-2xl shadow-md"
            >
              <h1 className="text-2xl font-bold">¿CUÁNTO NOS CONOCES?</h1>

              <p className="text-blue-400">
                PREGUNTA {paso + 1} DE {preguntas.length}
              </p>

              {mostrarNombre && (
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre..."
                  className="px-4 py-2 border rounded-lg w-72 text-center"
                />
              )}

              <h2>{preguntas[paso].pregunta}</h2>

              <div className="flex flex-col gap-3 w-full items-center">
                {preguntas[paso].opciones.map((opcion, index) => (
                  <button
                    key={index}
                    onClick={() => manejarRespuesta(index)}
                    className={`w-80 px-4 py-3 rounded-xl border transition-all
                      ${seleccion === index
                        ? "bg-pink-400 text-white scale-105"
                        : "bg-white hover:bg-pink-100"}`}
                  >
                    {opcion}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              ref={resultadoRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-6 py-10 bg-white rounded-2xl shadow-xl"
            >
              <h2 className="text-2xl font-bold">
                🎉 {nombre}, acertaste {score} de {preguntas.length}
              </h2>

              {/* 🏆 PODIO TIEMPO REAL */}
              <div className="flex items-end justify-center gap-4 mt-6">

                {ranking[1] && (
                  <motion.div initial={{ y: 50 }} animate={{ y: 0 }}>
                    <div className="bg-gray-300 h-24 w-20 rounded-t-xl flex items-center justify-center">2</div>
                    <p>{ranking[1].nombre}</p>
                    <span>{ranking[1].score}</span>
                  </motion.div>
                )}

                {ranking[0] && (
                  <motion.div initial={{ y: 80 }} animate={{ y: 0 }}>
                    <div className="bg-yellow-400 h-32 w-24 rounded-t-xl flex items-center justify-center">🏆</div>
                    <p className="font-bold">{ranking[0].nombre}</p>
                    <span>{ranking[0].score}</span>
                  </motion.div>
                )}

                {ranking[2] && (
                  <motion.div initial={{ y: 50 }} animate={{ y: 0 }}>
                    <div className="bg-orange-300 h-20 w-20 rounded-t-xl flex items-center justify-center">3</div>
                    <p>{ranking[2].nombre}</p>
                    <span>{ranking[2].score}</span>
                  </motion.div>
                )}

              </div>

              <button
                onClick={guardarResultado}
                className="px-6 py-2 bg-green-500 text-white rounded-full"
              >
                📸 Guardar resultado
              </button>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Preguntas;