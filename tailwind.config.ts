import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF6EE",
        cream: "#F4EFE6",
        ink: "#1A1816",
        muted: "#6A635A",
        rule: "#D9D1C2",
        ember: "#B24A2A",
        softember: "#D97A56",
        positive: "#2F6F4E",
        warning: "#8A5A00",
        critical: "#8F1D1D"
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 45px rgba(26, 24, 22, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
