import React, { useState } from "react";
import { motion } from "framer-motion";
import WeatherCard from "./WeatherCard";
import { WeatherReport } from "../types";

interface HomePageProps {
  weather: WeatherReport | null;
  isLoadingWeather: boolean;
  weatherError: string | null;
  onFetchWeather: (location: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  weather,
  isLoadingWeather,
  weatherError,
  onFetchWeather,
}) => {
  const [isHoveredToday, setIsHoveredToday] = useState(false);
  const [isHoveredSession, setIsHoveredSession] = useState(false);

  return (
    <div className="relative bg-transparent rounded-xl overflow-hidden">
      {/* Animated gradient background */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full animate-[pulse_8s_ease-in-out_infinite] filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full animate-[pulse_10s_ease-in-out_infinite] filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-600/15 rounded-full animate-[pulse_12s_ease-in-out_infinite] filter blur-3xl" />
      

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          initial={{
            x: Math.random() * 100 + "vw",
            y: Math.random() * 100 + "vh",
          }}
          animate={{
            y: [null, -20, 0],
            x: [null, 10, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-16 py-8 sm:py-12">
        {/* Welcome section */}
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-pink-300 to-purple-400 drop-shadow-lg mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Welcome, Weather.com{" "}
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            >
              ✨
            </motion.span>
          </motion.h2>
          <motion.p
            className="mt-3 max-w-2xl mx-auto text-slate-300 text-base sm:text-lg font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Your personalized weather information. Check today's weather, update.
          </motion.p>
        </motion.div>

        {/* WeatherCard Centered */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="w-full max-w-lg">
            <WeatherCard
              weather={weather}
              isLoading={isLoadingWeather}
              error={weatherError}
              onFetchWeather={onFetchWeather}
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default HomePage;
