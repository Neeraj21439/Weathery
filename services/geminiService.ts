import { WeatherReport } from '../types';

// ✅ Updated Weather Function to use OpenWeatherMap API
export async function generateWeatherReport(location: string): Promise<WeatherReport> {
  const apiKey = '89f0fb1b8512c48e3af9a1f1bb5e8c9e';
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== "200") {
      throw new Error(data.message || "Failed to fetch weather data");
    }

    const current = data.list[0]; // nearest forecast (3-hour block)
    const weather = current.weather[0];

    return {
      location: `${data.city.name}, ${data.city.country}`,
      temperature: current.main.temp,
      feelsLike: current.main.feels_like,
      humidity: current.main.humidity,
      condition: weather.description,
      windSpeed: current.wind.speed,
      rain: current.pop ? Math.round(current.pop * 100) : 0,
      summary: `It is ${weather.description} with a temperature of ${current.main.temp}°C. Rain chance is ${current.pop ? Math.round(current.pop * 100) : 0}%.`,
    };
  } catch (error) {
    console.error("Error fetching weather report:", error);
    throw new Error("Failed to get real weather data.");
  }
}
