import React, { useState } from 'react';
import { AppStep, WeatherReport } from './types';
import { generateWeatherReport } from './services/geminiService';
import HomePage from './components/HomePage';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.Home);
  const [weather, setWeather] = useState<WeatherReport | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const handleFetchWeather = async (location: string) => {
    if (!location.trim()) {
      setWeatherError("Please enter a location.");
      return;
    }
    setIsLoadingWeather(true);
    setWeatherError(null);
    setWeather(null); // Clear previous weather data
    try {
      const report = await generateWeatherReport(location);
      setWeather(report);
    } catch (e) {
      setWeatherError("Failed to get weather for that location. Please try again.");
    } finally {
      setIsLoadingWeather(false);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white antialiased relative">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/20 via-slate-900 to-slate-900"></div>

      {/* Main content */}
      <div className="relative z-10">
        
        {step === AppStep.Home && (
          <HomePage
            weather={weather}
            isLoadingWeather={isLoadingWeather}
            weatherError={weatherError}
            onFetchWeather={handleFetchWeather}
          />
        )}
      </div>
    </div>
  );
};

export default App;
