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
        navy: {
          midnight: "#10243A",
          dark: "#172F4D",
          deep: "#0B1928",
          light: "#1E3A5F",
          muted: "#2A4568",
        },
        ivory: {
          warm: "#F8F7F3",
          light: "#FCFAF6",
          dark: "#EFECE4",
        },
        slate: {
          muted: "#64748B",
          light: "#94A3B8",
          dark: "#334155",
        },
        brass: {
          DEFAULT: "#C5A46D",
          hover: "#B39158",
          light: "#F5EFE4",
          muted: "#DFCA9E",
          dark: "#8C7142",
        },
        border: {
          subtle: "#E2E8F0",
          navy: "#234165",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        heading: ["var(--font-heading)", "Plus Jakarta Sans", "Manrope", "sans-serif"],
        serif: ["var(--font-serif)", "DM Serif Display", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(16, 36, 58, 0.05), 0 10px 25px -5px rgba(16, 36, 58, 0.04)",
        "card-hover": "0 10px 30px -5px rgba(16, 36, 58, 0.1), 0 20px 40px -10px rgba(16, 36, 58, 0.06)",
        mega: "0 20px 50px -10px rgba(16, 36, 58, 0.15)",
        floating: "0 30px 60px -15px rgba(16, 36, 58, 0.25)",
      },
      maxWidth: {
        container: "1320px",
        form: "720px",
        "form-compact": "480px",
      },
    },
  },
  plugins: [],
};
export default config;
