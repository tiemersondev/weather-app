"use client";

import { useCallback, useEffect, useState } from "react";
import { SearchForm } from "@/components/forms/SearchForm";
import { Header } from "@/components/layout/Header";
import { EmptyState, ErrorState, LoadingState } from "@/components/sections/FeedbackStates";
import { WeatherDashboard } from "@/components/sections/WeatherDashboard";
import { DEFAULT_LOCATION } from "@/constants/weather";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { fetchWeather, searchLocations } from "@/services/weather";
import type { LocationSuggestion, UnitSystem, WeatherReport } from "@/types/weather";

type ViewState = "loading" | "ready" | "empty" | "error";

export default function Home() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationSuggestion>(DEFAULT_LOCATION);
  const [report, setReport] = useState<WeatherReport | null>(null);
  const [viewState, setViewState] = useState<ViewState>("loading");
  const debouncedQuery = useDebouncedValue(query, 350);

  const loadWeather = useCallback(
    async (location: LocationSuggestion, unit: UnitSystem) => {
      const controller = new AbortController();
      setViewState("loading");

      try {
        const nextReport = await fetchWeather(location, unit, controller.signal);
        setReport(nextReport);
        setSelectedLocation(location);
        setViewState("ready");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setViewState("error");
        }
      }

      return () => controller.abort();
    },
    [],
  );

  useEffect(() => {
    const controller = new AbortController();

    async function reloadWeatherForUnit() {
      setViewState("loading");
      try {
        const nextReport = await fetchWeather(selectedLocation, unitSystem, controller.signal);
        setReport(nextReport);
        setViewState("ready");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setViewState("error");
        }
      }
    }

    reloadWeatherForUnit();
    return () => controller.abort();
    // The selected location should not trigger this effect; direct searches call loadWeather.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitSystem]);

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();

    if (trimmedQuery.length < 2) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();
    setIsSearching(true);

    searchLocations(trimmedQuery, controller.signal)
      .then((results) => setSuggestions(results))
      .catch((error) => {
        if ((error as Error).name !== "AbortError") {
          setSuggestions([]);
        }
      })
      .finally(() => setIsSearching(false));

    return () => controller.abort();
  }, [debouncedQuery]);

  async function handleSubmit() {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setIsSearching(true);

    try {
      const results = suggestions.length > 0 ? suggestions : await searchLocations(trimmedQuery);
      if (results.length === 0) {
        setReport(null);
        setViewState("empty");
        return;
      }

      setQuery("");
      setSuggestions([]);
      await loadWeather(results[0], unitSystem);
    } catch {
      setViewState("error");
    } finally {
      setIsSearching(false);
    }
  }

  async function handleSelectSuggestion(suggestion: LocationSuggestion) {
    setQuery("");
    setSuggestions([]);
    await loadWeather(suggestion, unitSystem);
  }

  function handleUnitChange(nextUnit: UnitSystem) {
    if (nextUnit === unitSystem) return;
    setUnitSystem(nextUnit);
  }

  return (
    <main className="min-h-screen pb-12">
      <Header unitSystem={unitSystem} onUnitChange={handleUnitChange} />

      <section className="mx-auto mt-12 w-full max-w-[900px] px-4 text-center sm:mt-16 lg:mt-[72px]">
        <h1 className="font-display text-[3.25rem] font-bold leading-[1.08] tracking-normal sm:text-[4rem] lg:text-[4.5rem]">
          How&apos;s the sky looking today?
        </h1>
      </section>

      <SearchForm
        query={query}
        suggestions={suggestions}
        isSearching={isSearching}
        onQueryChange={setQuery}
        onSubmit={handleSubmit}
        onSelectSuggestion={handleSelectSuggestion}
      />

      {viewState === "loading" && <LoadingState />}
      {viewState === "error" && (
        <ErrorState onRetry={() => void loadWeather(selectedLocation, unitSystem)} />
      )}
      {viewState === "empty" && <EmptyState />}
      {viewState === "ready" && report && <WeatherDashboard report={report} unitSystem={unitSystem} />}
    </main>
  );
}
