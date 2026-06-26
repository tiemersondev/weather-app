import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          0: "hsl(0 0% 100%)",
          200: "hsl(250 6% 84%)",
          300: "hsl(240 6% 70%)",
          600: "hsl(243 23% 30%)",
          700: "hsl(243 23% 24%)",
          800: "hsl(243 27% 20%)",
          900: "hsl(243 96% 9%)",
        },
        orange: {
          500: "hsl(28 100% 52%)",
        },
        blue: {
          500: "hsl(233 67% 56%)",
          700: "hsl(248 70% 36%)",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "Arial", "sans-serif"],
        display: ["var(--font-bricolage)", "Arial", "sans-serif"],
      },
      boxShadow: {
        menu: "0 18px 60px hsl(243 96% 4% / 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
