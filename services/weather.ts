import type {
  HourlyForecast,
  LocationSuggestion,
  UnitSystem,
  WeatherIcon,
  WeatherReport,
} from "@/types/weather";

type GeocodingResponse = {
  results?: Array<{
    id: number;
    name: string;
    country: string;
    admin1?: string;
    latitude: number;
    longitude: number;
    timezone: string;
  }>;
};

type ForecastResponse = {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    precipitation: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
};

const forecastParams = [
  "temperature_2m",
  "apparent_temperature",
  "relative_humidity_2m",
  "precipitation",
  "weather_code",
  "wind_speed_10m",
];

export async function searchLocations(
  query: string,
  signal?: AbortSignal,
): Promise<LocationSuggestion[]> {
  const params = new URLSearchParams({
    name: query,
    count: "5",
    language: "en",
    format: "json",
  });

  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error("Unable to search locations.");
  }

  const data = (await response.json()) as GeocodingResponse;
  return (data.results ?? []).map((location) => ({
    id: location.id,
    name: location.name,
    country: location.country,
    admin1: location.admin1,
    latitude: location.latitude,
    longitude: location.longitude,
    timezone: location.timezone,
  }));
}

export async function fetchWeather(
  location: LocationSuggestion,
  unitSystem: UnitSystem,
  signal?: AbortSignal,
): Promise<WeatherReport> {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    timezone: location.timezone || "auto",
    current: forecastParams.join(","),
    hourly: "temperature_2m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    forecast_days: "7",
  });

  if (unitSystem === "imperial") {
    params.set("temperature_unit", "fahrenheit");
    params.set("wind_speed_unit", "mph");
    params.set("precipitation_unit", "inch");
  }

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error("Unable to load weather.");
  }

  const data = (await response.json()) as ForecastResponse;
  return transformForecast(location, data);
}

function transformForecast(
  location: LocationSuggestion,
  data: ForecastResponse,
): WeatherReport {
  const daily = data.daily.time.map((date, index) => ({
    date,
    label: formatWeekday(date, "short"),
    longLabel: formatWeekday(date, "long"),
    high: data.daily.temperature_2m_max[index],
    low: data.daily.temperature_2m_min[index],
    icon: mapWeatherCode(data.daily.weather_code[index]),
  }));

  const hourlyByDay = data.hourly.time.reduce<Record<string, HourlyForecast[]>>(
    (acc, time, index) => {
      const date = time.slice(0, 10);
      const hour = Number(time.slice(11, 13));

      if (hour < 15 || hour > 22) {
        return acc;
      }

      acc[date] ??= [];
      acc[date].push({
        time,
        label: formatHour(time),
        temperature: data.hourly.temperature_2m[index],
        icon: mapWeatherCode(data.hourly.weather_code[index]),
      });

      return acc;
    },
    {},
  );

  return {
    location: location.name,
    country: location.country,
    dateLabel: formatFullDate(data.current.time),
    temperature: data.current.temperature_2m,
    apparentTemperature: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    precipitation: data.current.precipitation,
    icon: mapWeatherCode(data.current.weather_code),
    daily,
    hourlyByDay,
  };
}

function mapWeatherCode(code: number): WeatherIcon {
  if ([0, 1].includes(code)) return "sunny";
  if ([2].includes(code)) return "partly-cloudy";
  if ([3].includes(code)) return "overcast";
  if ([45, 48].includes(code)) return "fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  if ([95, 96, 99].includes(code)) return "storm";
  return "partly-cloudy";
}

function formatWeekday(date: string, weekday: "short" | "long") {
  return new Intl.DateTimeFormat("en", {
    weekday,
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

function formatFullDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatHour(value: string) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    hour12: true,
  }).format(new Date(value));
}
