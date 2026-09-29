import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      boxShadow: {
        subtle: "0 1px 2px rgb(0 0 0 / 0.05)",
        card: "0 1px 3px rgb(0 0 0 / 0.08), 0 1px 2px rgb(0 0 0 / 0.06)",
        "card-hover": "0 10px 25px rgb(0 0 0 / 0.08), 0 4px 6px rgb(0 0 0 / 0.05)",
        drawer: "0 20px 40px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        card: "0.75rem",
        btn: "0.5rem",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "200ms",
      },
    },
  },
  plugins: [],
};

export default config;