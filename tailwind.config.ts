import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // All semantic colours use CSS custom properties so light/dark
        // themes switch automatically without per-component dark: classes.
        canvas: "rgb(var(--c-canvas) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        "surface-secondary": "rgb(var(--c-surface-2) / <alpha-value>)",
        "surface-tertiary": "rgb(var(--c-surface-3) / <alpha-value>)",
        border: "rgb(var(--c-border) / <alpha-value>)",
        "border-strong": "rgb(var(--c-border-strong) / <alpha-value>)",

        primary: "rgb(var(--c-primary) / <alpha-value>)",
        "primary-light": "rgb(var(--c-primary-light) / <alpha-value>)",
        "primary-hover": "rgb(var(--c-primary-hover) / <alpha-value>)",
        "primary-dark": "rgb(var(--c-primary-dark) / <alpha-value>)",

        success: "rgb(var(--c-success) / <alpha-value>)",
        "success-light": "rgb(var(--c-success-light) / <alpha-value>)",
        danger: "rgb(var(--c-danger) / <alpha-value>)",
        "danger-light": "rgb(var(--c-danger-light) / <alpha-value>)",
        warning: "rgb(var(--c-warning) / <alpha-value>)",
        "warning-light": "rgb(var(--c-warning-light) / <alpha-value>)",

        "text-primary": "rgb(var(--c-text-1) / <alpha-value>)",
        "text-secondary": "rgb(var(--c-text-2) / <alpha-value>)",
        "text-muted": "rgb(var(--c-text-muted) / <alpha-value>)",

        // Biology accent colours
        bio: {
          glow: "rgb(var(--c-bio-glow) / <alpha-value>)",
          soft: "rgb(var(--c-bio-soft) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.04)",
        DEFAULT: "0 2px 8px rgba(0,0,0,0.06)",
        md: "0 4px 16px rgba(0,0,0,0.08)",
        lg: "0 8px 32px rgba(0,0,0,0.10)",
        glow: "0 0 20px rgba(16,185,129,0.15)",
        "glow-lg": "0 0 40px rgba(16,185,129,0.2)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "helix-spin": "helix-spin 20s linear infinite",
        "bounce-slow": "bounce-slow 3s ease-in-out infinite",
        "wobble": "wobble 4s ease-in-out infinite",
        "wiggle": "wiggle 2.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        "helix-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-6px) scale(1.03)" },
        },
        "wobble": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(0deg) translateX(0)" },
          "25%": { transform: "rotate(-2deg) translateX(-2px)" },
          "75%": { transform: "rotate(2deg) translateX(2px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
