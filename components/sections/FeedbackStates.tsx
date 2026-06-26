import Image from "next/image";

export function LoadingState() {
  return (
    <section className="mx-auto mt-12 grid w-full max-w-[1216px] gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,800px)_384px] lg:px-0">
      <div>
        <div className="weather-card flex min-h-[242px] flex-col items-center justify-center gap-4 bg-neutral-800/80 sm:min-h-[286px]">
          <span className="flex gap-2" aria-hidden="true">
            <span className="h-3 w-3 animate-pulse rounded-full bg-neutral-200" />
            <span className="h-3 w-3 animate-pulse rounded-full bg-neutral-200 [animation-delay:120ms]" />
            <span className="h-3 w-3 animate-pulse rounded-full bg-neutral-200 [animation-delay:240ms]" />
          </span>
          <p className="text-neutral-200">Loading...</p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6">
          {["Feels Like", "Humidity", "Wind", "Precipitation"].map((label) => (
            <article key={label} className="weather-card min-h-[118px] p-5">
              <h3 className="text-base font-medium text-neutral-200 sm:text-lg">{label}</h3>
              <p className="mt-6 text-3xl font-light">-</p>
            </article>
          ))}
        </div>
        <div className="mt-12">
          <h2 className="text-xl font-bold">Daily forecast</h2>
          <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-7 sm:gap-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="weather-card min-h-[164px] animate-pulse bg-neutral-800/80" />
            ))}
          </div>
        </div>
      </div>
      <aside className="weather-card p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Hourly forecast</h2>
          <span className="rounded-lg bg-neutral-700 px-5 py-2 font-semibold">-</span>
        </div>
        <div className="mt-4 grid gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-[60px] rounded-lg border border-neutral-600 bg-neutral-700/80" />
          ))}
        </div>
      </aside>
    </section>
  );
}

export function EmptyState() {
  return (
    <section className="mx-auto mt-12 flex min-h-[360px] w-full max-w-[656px] items-start justify-center px-4 pt-2 text-center">
      <h2 className="text-2xl font-bold sm:text-3xl">No search result found!</h2>
    </section>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <section className="mx-auto mt-24 flex w-full max-w-[620px] flex-col items-center px-4 text-center">
      <Image src="/assets/images/icon-error.svg" alt="" width={44} height={44} />
      <h2 className="mt-8 font-display text-4xl font-bold tracking-normal sm:text-5xl">
        Something went wrong
      </h2>
      <p className="mt-5 max-w-[520px] text-lg font-medium text-neutral-200">
        We couldn&apos;t connect to the server (API error). Please try again in a few moments.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="focus-ring mt-7 flex items-center gap-2 rounded-lg bg-neutral-800 px-4 py-3 text-base font-semibold transition hover:bg-neutral-700"
      >
        <Image src="/assets/images/icon-retry.svg" alt="" width={18} height={18} />
        Retry
      </button>
    </section>
  );
}
