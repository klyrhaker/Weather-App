# Klyrh Weather

A responsive weather forecast app built with React, TypeScript, and Vite. Search any city or use your current location to see today's weather, a 3-day outlook, or a 10-day forecast, with light/dark theme support.

**Live demo:** https://weather-app-psi-nine-64.vercel.app/

## Features

- 🔍 **City search** with debounced input — no request spam while typing
- 📍 **Geolocation support** — automatically detects your location on first load, with a manual "My Location" button to re-trigger it anytime
- 📅 **Multiple forecast ranges** — Today, 3 Days, 10 Days
- 🌡️ **Celsius / Fahrenheit toggle**
- 🌗 **Light / dark theme**, synced to system preference by default and persisted across visits
- 💾 **Persistent state** — last searched city and theme choice are saved to `localStorage`
- 🎨 **Custom weather icons**, recolored per condition and theme via inlined, `currentColor`-driven SVGs
- 💀 **Skeleton loading state** that mirrors the number of days being requested
- 📱 **Fully responsive layout**, from mobile to desktop

## Tech stack

- **React 19** + **TypeScript** (strict mode)
- **Vite** — build tool and dev server
- **Vitest** + **React Testing Library** — unit and integration testing, built with strict TDD throughout
- **CSS Modules** — scoped component styling, theme-aware via CSS custom properties
- **vite-plugin-svgr** — inlines SVG weather icons as React components for `currentColor` theming
- **[Visual Crossing Weather API](https://www.visualcrossing.com/)** — weather data source

## Getting started

### Prerequisites

- Node.js (v18+ recommended)
- A free API key from [Visual Crossing](https://www.visualcrossing.com/weather-api)

### Installation

```bash
git clone https://github.com/klyrhaker/Weather-App.git
cd Weather-App
npm install
```

### Environment variables

Create a `.env` file in the project root:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

### Run locally

```bash
npm run dev
```

### Run tests

```bash
npm test
```

### Build for production

```bash
npm run build
```

## Project architecture

The app follows a layered structure with a clear separation between data-fetching hooks, transformation utilities, and presentational components:

```
src/
├── components/
│   ├── Navbar/            # Logo, city search, theme toggle, location button
│   ├── SearchWeather/      # Debounced city input
│   ├── WeatherForecast/    # Day list, range/unit controls
│   ├── WeatherIcon/        # Maps API icon codes to themed SVG icons
│   ├── Skeleton/           # Loading placeholder matching the requested day count
│   ├── Footer/
│   └── Button/
├── hooks/
│   ├── useWeather.ts       # Fetches and manages weather request state
│   ├── useGeolocation.ts   # Wraps the browser Geolocation API
│   ├── useLocalStorage.ts  # Persistent state, synced with localStorage
│   ├── useTheme.ts         # Theme state, applied to the DOM via data-theme
│   └── useDebounce.ts
├── utils/
│   ├── buildWeatherUrl.ts
│   ├── transformWeatherResponse.ts
│   ├── weatherReducer.ts
│   ├── selectDaysByRange.ts
│   └── transformTemp.ts
└── types/
    └── weather.ts          # Shared WeatherDay / TransformedWeatherResponse types
```

**Data flow:** `SearchWeather` → `App` (city state) → `buildWeatherUrl` → `useWeather` (fetch + reducer) → `WeatherForecast` (render). Geolocation coordinates, once resolved, are substituted directly as the query string — the Visual Crossing API accepts `"lat,lng"` in place of a city name.

## Development approach

This project was built end-to-end using **strict Test-Driven Development** with **Git Flow**: every unit (hooks, utilities, components) was written test-first, then implemented, then merged into `dev` through a dedicated `feat/<category>/<name>` branch, following Conventional Commits.

## Notes

- The Visual Crossing API key is exposed client-side (standard limitation of a frontend-only app without a backend proxy) — see the note in the source if you plan to reuse this project with your own key.
- Reverse geocoding (turning raw coordinates into a human-readable city name) is not performed — when using geolocation, the displayed location falls back to the coordinate string returned by the API.

## Author

Built by [Nikita (klyrhaker)](https://github.com/klyrhaker) as part of [The Odin Project](https://www.theodinproject.com/) full-stack JavaScript curriculum.
