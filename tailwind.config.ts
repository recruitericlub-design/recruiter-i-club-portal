import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        foreground: "#f8fafc",
        gold: {
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gold-gradient": "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
        "dark-glass": "linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(2, 6, 23, 0.85) 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 25px -5px rgba(245, 158, 11, 0.3)",
        "gold-glow-lg": "0 0 50px -10px rgba(245, 158, 11, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
