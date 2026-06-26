"use client";

import Image from "next/image";
import type { FormEvent } from "react";
import { cx } from "@/lib/format";
import type { LocationSuggestion } from "@/types/weather";

type SearchFormProps = {
  query: string;
  suggestions: LocationSuggestion[];
  isSearching: boolean;
  onQueryChange: (query: string) => void;
  onSubmit: () => void;
  onSelectSuggestion: (suggestion: LocationSuggestion) => void;
};

export function SearchForm({
  query,
  suggestions,
  isSearching,
  onQueryChange,
  onSubmit,
  onSelectSuggestion,
}: SearchFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  const showPanel = query.trim().length >= 2 && (isSearching || suggestions.length > 0);

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-20 mx-auto mt-9 grid w-full max-w-[656px] gap-3 px-4 sm:grid-cols-[1fr_114px] sm:px-0 lg:mt-14"
    >
      <label className="sr-only" htmlFor="location-search">
        Search for a place
      </label>
      <div className="relative">
        <Image
          src="/assets/images/icon-search.svg"
          alt=""
          width={21}
          height={21}
          className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2"
        />
        <input
          id="location-search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search for a place..."
          autoComplete="off"
          className="focus-ring h-14 w-full rounded-lg border border-transparent bg-neutral-800 pl-16 pr-5 text-lg font-medium text-neutral-0 outline-none transition placeholder:text-neutral-200 hover:bg-neutral-700 sm:h-14"
        />
        {showPanel && (
          <div className="absolute left-0 top-[calc(100%+10px)] w-full rounded-lg border border-neutral-600 bg-neutral-800 p-2 shadow-menu">
            {isSearching ? (
              <div className="flex h-10 items-center gap-3 px-3 text-sm font-semibold text-neutral-0">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-transparent" />
                Search in progress
              </div>
            ) : (
              suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  type="button"
                  onClick={() => onSelectSuggestion(suggestion)}
                  className="focus-ring flex w-full items-center justify-between rounded-md px-3 py-2 text-left font-semibold transition hover:bg-neutral-700"
                >
                  <span>{suggestion.name}</span>
                  <span className="text-sm text-neutral-300">
                    {[suggestion.admin1, suggestion.country].filter(Boolean).join(", ")}
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
      <button
        type="submit"
        className={cx(
          "focus-ring h-14 rounded-lg bg-blue-500 px-6 text-lg font-bold text-neutral-0 transition hover:bg-blue-700",
          isSearching && "opacity-80",
        )}
      >
        Search
      </button>
    </form>
  );
}
