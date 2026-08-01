import { useEffect, useState } from "react";
import React from "react";

const Countdown = ({ targetDate }) => {
  const calculateTime = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        min: Math.floor((difference / 1000 / 60) % 60),
        seg: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTime());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <section className="w-full flex justify-center">
      <div className="font-playfair w-full max-w-md px-2">

        {/* FLEX SIEMPRE EN LÍNEA */}
        <div className="flex justify-between items-center gap-2">

          {Object.keys(timeLeft).map((interval, index) => (
            <React.Fragment key={interval}>

              {/* BLOQUE */}
              <div className="
                flex flex-col items-center justify-center
                bg-white/10 backdrop-blur-md
                px-2 py-2 sm:px-3 sm:py-3
                rounded-xl
                flex-1
              ">

                {/* NÚMERO */}
                <span className="
                  text-white font-bold
                  text-xl sm:text-2xl md:text-4xl
                ">
                  {timeLeft[interval]}
                </span>

                {/* LABEL */}
                <span className="
                  text-white uppercase tracking-widest
                  text-[9px] sm:text-xs
                  opacity-80
                ">
                  {interval}
                </span>

              </div>

              {/* ":" */}
              {index < Object.keys(timeLeft).length - 1 && (
                <span className="
                  text-lg sm:text-2xl
                  text-[#9E8E7B] opacity-80
                ">
                  :
                </span>
              )}

            </React.Fragment>
          ))}
        </div>

        {/* FINAL */}
        {Object.keys(timeLeft).length === 0 && (
          <span className="text-white mt-4 text-center block">
            ¡Llegó el gran día! 🎉
          </span>
        )}

      </div>
    </section>
  );
};

export default Countdown;
