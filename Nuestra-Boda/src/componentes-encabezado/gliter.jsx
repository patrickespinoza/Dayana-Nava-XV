import React, { useMemo } from "react";
import { motion } from "framer-motion";

const GlitterIntro = () => {
  const particulas = useMemo(() => {
    return Array.from({ length: 45 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 4,
      size: 3 + Math.random() * 5,
      opacity: 0.35 + Math.random() * 0.55,
      drift: -30 + Math.random() * 60,
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute inset-0
        z-20
        overflow-hidden
      "
    >
      {particulas.map((particula) => (
        <motion.span
          key={particula.id}
          className="absolute top-[-20px] rounded-full"
          style={{
            left: `${particula.left}%`,
            width: particula.size,
            height: particula.size,
            opacity: particula.opacity,
            background: `
              radial-gradient(
                circle,
                #fffdf2 0%,
                #f4df9b 35%,
                #d5b76a 65%,
                transparent 100%
              )
            `,
            boxShadow: `
              0 0 8px rgba(255,245,205,0.75),
              0 0 14px rgba(213,183,106,0.45)
            `,
          }}
          animate={{
            y: ["-5vh", "110vh"],
            x: [0, particula.drift],
            rotate: [0, 180, 360],
            opacity: [
              0,
              particula.opacity,
              particula.opacity,
              0,
            ],
          }}
          transition={{
            duration: particula.duration,
            delay: particula.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default GlitterIntro;