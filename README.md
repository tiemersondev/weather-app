# Weather Now

Weather Now is a responsive weather dashboard built with Next.js, React, TypeScript and Tailwind CSS. It follows the provided Frontend Mentor visual brief and uses the free Open-Meteo APIs for location search and weather forecasts.

## Features

- Search for locations with Open-Meteo geocoding.
- View current temperature, weather icon, location and date.
- See feels-like temperature, humidity, wind speed and precipitation.
- Browse 7-day daily forecasts.
- Switch the hourly forecast by day.
- Toggle between metric and imperial units.
- Loading, empty search and API error states.
- Responsive desktop and mobile layouts.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Open-Meteo Geocoding API
- Open-Meteo Forecast API

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

Build for production:

```bash
npm run build
```

## Environment Variables

No environment variables are required. Open-Meteo does not require an API key for this use case.

## Project Notes

- The visual assets and local fonts from the brief are stored in `public/assets`.
- `services/weather.ts` isolates API calls and transforms Open-Meteo responses into UI-friendly data.
- `context.md` documents project context, visual decisions and assumptions.
- `project-state.md` tracks implementation progress.
- The mockups use a fixed date, but the app displays real dates from the API response.
