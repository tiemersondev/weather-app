import type { UnitLabels, UnitSystem, WeatherIcon } from "@/types/weather";

export const DEFAULT_LOCATION = {
  id: 2950159,
  name: "Berlin",
  country: "Germany",
  latitude: 52.52,
  longitude: 13.405,
  timezone: "Europe/Berlin",
};

export const UNIT_LABELS: Record<UnitSystem, UnitLabels> = {
  metric: {
    temperature: "C",
    wind: "km/h",
    precipitation: "mm",
  },
  imperial: {
    temperature: "F",
    wind: "mph",
    precipitation: "in",
  },
};

export const WEATHER_ICON_SRC: Record<WeatherIcon, string> = {
  sunny: "/assets/images/icon-sunny.webp",
  "partly-cloudy": "/assets/images/icon-partly-cloudy.webp",
  overcast: "/assets/images/icon-overcast.webp",
  fog: "/assets/images/icon-fog.webp",
  drizzle: "/assets/images/icon-drizzle.webp",
  rain: "/assets/images/icon-rain.webp",
  snow: "/assets/images/icon-snow.webp",
  storm: "/assets/images/icon-storm.webp",
};
