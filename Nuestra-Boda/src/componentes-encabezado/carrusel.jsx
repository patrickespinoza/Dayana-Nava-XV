import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = () => {
  const carouselRef = useRef(null);

  const [index, setIndex] = useState(0);

  const images = [
    "/carrusel01.jpeg",
    "/carusel02.jpeg",
    "/carusel03.jpeg",
    "/carusel04.jpeg",
    "/carusel05.jpeg",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="w-full flex flex-col items-center">

      {/* CONTENEDOR */}
      <div className="relative w-full max-w-3xl h-[520px] overflow-hidden rounded-[32px]">

        {/* GLOW */}
        <div className="absolute inset-0 bg-[#d4af37]/10 blur-3xl scale-110 rounded-[32px]" />

        <AnimatePresence mode="wait">

          <motion.img
            key={index}
            src={images[index]}
            alt={`Imagen ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover rounded-[32px]"
            initial={{
              opacity: 0,
              scale: 1.08,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.04,
            }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

        </AnimatePresence>

        {/* OVERLAY */}
        <div
          className="absolute inset-0 rounded-[32px]"
          style={{
            background: `
              linear-gradient(
                to top,
                rgba(0,0,0,0.18),
                transparent 40%
              )
            `,
          }}
        />

      </div>

      {/* INDICADORES */}
      <div className="flex justify-center mt-8 gap-3">

        {images.map((_, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden rounded-full"
            animate={{
              scale: index === i ? 1.2 : 1,
            }}
            transition={{
              duration: 0.4,
            }}
          >

            <div
              className={`h-[9px] rounded-full transition-all duration-500 ${
                index === i
                  ? "w-10"
                  : "w-2"
              }`}
              style={{
                background:
                  index === i
                    ? "linear-gradient(90deg, #d4af37, #b38728)"
                    : "rgba(120,120,120,0.35)",
              }}
            />

          </motion.div>
        ))}

      </div>

    </section>
  );
};

export default Carousel;