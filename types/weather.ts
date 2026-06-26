export type UnitSystem = "metric" | "imperial";

export type WeatherIcon =
  | "sunny"
  | "partly-cloudy"
  | "overcast"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "storm";

export type LocationSuggestion = {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

export type WeatherDay = {
  date: string;
  label: string;
  longLabel: string;
  high: number;
  low: number;
  icon: WeatherIcon;
};

export type HourlyForecast = {
  time: string;
  label: string;
  temperature: number;
  icon: WeatherIcon;
};

export type WeatherReport = {
  location: string;
  country: string;
  dateLabel: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  icon: WeatherIcon;
  daily: WeatherDay[];
  hourlyByDay: Record<string, HourlyForecast[]>;
};

export type UnitLabels = {
  temperature: string;
  wind: string;
  precipitation: string;
};
