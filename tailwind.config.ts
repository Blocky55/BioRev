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
        navy: "#0a0e1a",
        "navy-light": "#131929",
        "navy-lighter": "#1a2236",
        "neon-green": "#39ff14",
        "hot-pink": "#ff2d78",
        amber: "#ffb800",
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "cursive"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
