import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E5C93",
        "primary-dark": "#15446D",
        navy: "#0F2945",
        accent: "#7DB8E6",
        field: "#F5F9FE",
        ink: "#18344F"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"]
      },
      boxShadow: {
        brand: "0 18px 50px rgba(18, 50, 74, 0.12)",
        lift: "0 24px 70px rgba(30, 92, 147, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
