import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
      },
      colors: {
        border: "hsl(210 10% 87%)",
        muted: "hsl(210 5% 43%)",
        brand: {
          DEFAULT: "hsl(181 100% 37%)",
          dark: "hsl(183 100% 25%)",
          soft: "hsl(180 60% 96%)",
        },
        danger: "hsl(0 72% 45%)",
      },
      boxShadow: {
        card: "0 16px 40px -28px rgba(17, 24, 39, 0.24)",
        lift: "0 18px 45px -24px rgba(0, 127, 132, 0.32)",
      },
    },
  },
  plugins: [],
};

export default config;
