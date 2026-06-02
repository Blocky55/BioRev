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
        // Figma-inspired palette
        surface: "#FFFFFF",
        "surface-secondary": "#F5F5F5",
        "surface-tertiary": "#EBEBEB",
        border: "#E5E5E5",
        "border-strong": "#D4D4D4",
        "text-primary": "#1E1E1E",
        "text-secondary": "#6B6B6B",
        "text-muted": "#999999",
        accent: "#7B61FF",        // Figma purple
        "accent-light": "#EDE9FE",
        "accent-hover": "#6B4EE6",
        success: "#14AE5C",
        "success-light": "#ECFDF5",
        danger: "#F24822",
        "danger-light": "#FEF2F2",
        warning: "#FFCD29",
        "warning-light": "#FFFBEB",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        "figma-sm": "0 1px 2px rgba(0,0,0,0.05)",
        figma: "0 2px 8px rgba(0,0,0,0.08)",
        "figma-md": "0 4px 16px rgba(0,0,0,0.1)",
        "figma-lg": "0 8px 32px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
