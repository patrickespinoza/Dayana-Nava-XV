import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

const Album = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex items-center justify-center p-6"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-md w-full text-center space-y-6 text-black relative overflow-hidden">
          
          {/* Glow */}
          <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-[#fcd5b5]/40 via-[#f9e1d1]/20 to-transparent rounded-full blur-3xl animate-pulse -z-10"></div>

          <h1 className="text-3xl sm:text-4xl font-bold font-playfair tracking-wide">
            ÁLBUM COMPARTIDO
          </h1>

          <div className="w-20 h-[2px] mx-auto bg-gradient-to-r from-transparent via-[#9E8E7B] to-transparent rounded-full"></div>

          <p className="text-lg sm:text-2xl font-[DancingScript]">
            Sube tus fotos del evento y revive cada momento especial junto a nosotros
          </p>

          {/* BOTÓN */}
          <button
            onClick={() => setOpen(true)}
            className="bg-[#9E8E7B] text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            Ir al Álbum 📸
          </button>
        </div>
      </motion.div>

      {/* MODAL de Álbum */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ duration: 0.4 }}
              className="relative bg-white rounded-[2rem] p-8 max-w-md w-full text-center space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.3)] overflow-hidden"
            >
              
              {/* Glow interno */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#fcd5b5]/30 via-transparent to-[#f9e1d1]/20 rounded-[2rem] blur-2xl -z-10"></div>

              {/* Cerrar */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-5 text-gray-400 hover:text-black text-xl transition"
              >
                ✕
              </button>

              {/* Título */}
              <h2 className="text-2xl font-playfair font-semibold text-[#7f5b45]">
                Nuestro Álbum 📸
              </h2>

              {/* Línea */}
              <div className="w-20 h-[2px] mx-auto bg-gradient-to-r from-transparent via-[#9E8E7B] to-transparent"></div>

              {/* App */}
              <p className="text-gray-600">
                Aplicación:
                <span className="block font-semibold text-[#9E8E7B] mt-1">
                  Wedshoots
                </span>
              </p>

              {/* Botón app */}
              <a
                href="https://apps.apple.com/mx/app/wedshoots/id660256196"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-2 rounded-full border border-[#9E8E7B] text-[#9E8E7B] hover:bg-[#9E8E7B] hover:text-white transition"
              >
                Descargar App
              </a>

              {/* Código */}
              <div className="space-y-2">
                <p className="text-gray-500 text-sm">
                  Código del álbum
                </p>

                <div className="bg-[#f8f5f2] rounded-xl py-3 px-4 font-mono text-lg tracking-[0.3em] text-[#7f5b45] shadow-inner">
                  MXat19tb26
                </div>
              </div>

              {/* QR */}
              <div className="flex justify-center">
                <div className="p-3 bg-white rounded-2xl shadow-lg border border-gray-200">
                  <img
                    src="/qr.png"
                    alt="QR"
                    className="w-40 h-40 rounded-lg"
                  />
                </div>
              </div>

              <p className="text-xs text-gray-400">
                Escanea el código o usa la app para subir tus fotos ✨
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Album;