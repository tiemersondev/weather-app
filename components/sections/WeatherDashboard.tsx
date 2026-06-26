"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { UNIT_LABELS, WEATHER_ICON_SRC } from "@/constants/weather";
import { formatMetric, formatTemperature } from "@/lib/format";
import type { UnitSystem, WeatherReport } from "@/types/weather";

type WeatherDashboardProps = {
  report: WeatherReport;
  unitSystem: UnitSystem;
};

export function WeatherDashboard({ report, unitSystem }: WeatherDashboardProps) {
  const [selectedDate, setSelectedDate] = useState(report.daily[0]?.date);
  const labels = UNIT_LABELS[unitSystem];
  const selectedDay = report.daily.find((day) => day.date === selectedDate) ?? report.daily[0];
  const hourly = useMemo(
    () => report.hourlyByDay[selectedDay?.date ?? ""] ?? [],
    [report.hourlyByDay, selectedDay?.date],
  );

  return (
    <section className="mx-auto mt-12 grid w-full max-w-[1216px] gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,800px)_384px] lg:px-0">
      <div className="min-w-0">
        <CurrentWeather report={report} />
        <MetricsGrid report={report} labels={labels} />
        <DailyForecast
          report={report}
          selectedDate={selectedDay?.date}
          onSelectDate={setSelectedDate}
        />
      </div>
      <HourlyForecast
        days={report.daily}
        selectedDate={selectedDay?.date}
        onSelectDate={setSelectedDate}
        hourly={hourly}
      />
    </section>
  );
}

function CurrentWeather({ report }: { report: WeatherReport }) {
  return (
    <article className="relative min-h-[242px] overflow-hidden rounded-2xl bg-blue-700 p-6 sm:min-h-[286px] sm:p-8">
      <Image
        src="/assets/images/bg-today-large.svg"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="relative z-10 flex h-full min-h-[194px] flex-col items-center justify-between gap-6 text-center sm:min-h-[222px] sm:flex-row sm:text-left">
        <div className="sm:self-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {report.location}, {report.country}
          </h2>
          <p className="mt-2 text-base font-medium text-neutral-200 sm:text-lg">{report.dateLabel}</p>
        </div>
        <div className="flex items-center justify-center gap-6 sm:gap-10">
          <Image
            src={WEATHER_ICON_SRC[report.icon]}
            alt=""
            width={96}
            height={96}
            className="h-20 w-20 sm:h-24 sm:w-24"
          />
          <p className="font-display text-[5.25rem] font-bold leading-none tracking-normal sm:text-[6rem]">
            {formatTemperature(report.temperature)}
          </p>
        </div>
      </div>
    </article>
  );
}

function MetricsGrid({
  report,
  labels,
}: {
  report: WeatherReport;
  labels: { temperature: string; wind: string; precipitation: string };
}) {
  const metrics = [
    ["Feels Like", formatTemperature(report.apparentTemperature)],
    ["Humidity", `${Math.round(report.humidity)}%`],
    ["Wind", formatMetric(report.windSpeed, labels.wind)],
    ["Precipitation", formatMetric(report.precipitation, labels.precipitation)],
  ];

  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6">
      {metrics.map(([label, value]) => (
        <article key={label} className="weather-card min-h-[118px] p-5">
          <h3 className="text-base font-medium text-neutral-200 sm:text-lg">{label}</h3>
          <p className="mt-6 text-3xl font-light leading-none text-neutral-0 sm:text-[2rem]">{value}</p>
        </article>
      ))}
    </div>
  );
}

function DailyForecast({
  report,
  selectedDate,
  onSelectDate,
}: {
  report: WeatherReport;
  selectedDate?: string;
  onSelectDate: (date: string) => void;
}) {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold">Daily forecast</h2>
      <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-7 sm:gap-4">
        {report.daily.map((day) => (
          <button
            key={day.date}
            type="button"
            onClick={() => onSelectDate(day.date)}
            className={`focus-ring weather-card flex min-h-[164px] flex-col items-center justify-between p-4 text-center transition hover:bg-neutral-700 ${
              selectedDate === day.date ? "border-neutral-300 bg-neutral-700" : ""
            }`}
          >
            <span className="font-semibold">{day.label}</span>
            <Image src={WEATHER_ICON_SRC[day.icon]} alt="" width={64} height={64} className="h-14 w-14" />
            <span className="flex w-full justify-between text-base">
              <span>{formatTemperature(day.high)}</span>
              <span className="text-neutral-200">{formatTemperature(day.low)}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function HourlyForecast({
  days,
  selectedDate,
  onSelectDate,
  hourly,
}: {
  days: WeatherReport["daily"];
  selectedDate?: string;
  onSelectDate: (date: string) => void;
  hourly: WeatherReport["hourlyByDay"][string];
}) {
  return (
    <aside className="weather-card h-fit p-5 sm:p-6 lg:max-h-[694px] lg:overflow-y-auto">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold">Hourly forecast</h2>
        <label className="sr-only" htmlFor="hourly-day">
          Select forecast day
        </label>
        <select
          id="hourly-day"
          value={selectedDate}
          onChange={(event) => onSelectDate(event.target.value)}
          className="focus-ring rounded-lg border-0 bg-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-0 outline-none sm:text-base"
        >
          {days.map((day) => (
            <option key={day.date} value={day.date}>
              {day.longLabel}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 grid gap-4">
        {hourly.length > 0 ? (
          hourly.map((item) => (
            <article
              key={item.time}
              className="flex h-[60px] items-center justify-between rounded-lg border border-neutral-600 bg-neutral-700 px-5"
            >
              <div className="flex items-center gap-4">
                <Image src={WEATHER_ICON_SRC[item.icon]} alt="" width={36} height={36} className="h-9 w-9" />
                <p className="text-lg font-semibold">{item.label}</p>
              </div>
              <p className="font-semibold">{formatTemperature(item.temperature)}</p>
            </article>
          ))
        ) : (
          <p className="rounded-lg border border-neutral-600 bg-neutral-700 px-5 py-4 text-neutral-200">
            No hourly data available for this day.
          </p>
        )}
      </div>
    </aside>
  );
}
