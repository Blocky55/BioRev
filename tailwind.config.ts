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
        // Biology-inspired palette
        surface: "#FFFFFF",
        "surface-secondary": "#F9FAFB",
        "surface-tertiary": "#F3F4F6",
        border: "#E5E7EB",
        "border-strong": "#D1D5DB",

        // Primary — rich emerald green (biology, nature, cells)
        primary: "#047857",
        "primary-light": "#ECFDF5",
        "primary-hover": "#065F46",
        "primary-dark": "#064E3B",

        // Semantic
        success: "#16A34A",
        "success-light": "#F0FDF4",
        danger: "#DC2626",
        "danger-light": "#FEF2F2",
        warning: "#CA8A04",
        "warning-light": "#FEFCE8",

        // Text
        "text-primary": "#111827",
        "text-secondary": "#4B5563",
        "text-muted": "#9CA3AF",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        "sm": "0 1px 2px rgba(0,0,0,0.04)",
        "DEFAULT": "0 2px 8px rgba(0,0,0,0.06)",
        "md": "0 4px 16px rgba(0,0,0,0.08)",
        "lg": "0 8px 32px rgba(0,0,0,0.10)",
      },
    },
  },
  plugins: [],
};
export default config;
