export enum AppStep {
  Home,
  Results,
}

export interface WeatherReport {
  location: string;
  temperature: number;
  condition: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  summary: string;
  rain: number; // Chance of rain as a percentage
}
