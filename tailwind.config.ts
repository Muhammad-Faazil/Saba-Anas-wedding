import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fdf5ea",
        foreground: "#3d0a10",
        crimson: {
          50: "#fff5f5",
          100: "#fed7d7",
          500: "#861019",
          700: "#5C0A10",
          800: "#3d0a10",
          900: "#1e0408",
        },
        gold: {
          light: "#d8b67d",
          DEFAULT: "#c9a060",
          dark: "#a57d38",
        },
        cream: {
          DEFAULT: "#fdf5ea",
          card: "rgba(253,245,234,0.88)",
        },
      },
      fontFamily: {
        cormorant: ["'Cormorant Garamond'", "'Noto Serif'", "Georgia", "serif"],
        cinzel: ["'Cinzel'", "sans-serif"],
        amiri: ["'Amiri'", "'Arial'", "serif"],
        lora: ["'Lora'", "'Georgia'", "serif"],
        noto: ["'Noto Serif'", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
