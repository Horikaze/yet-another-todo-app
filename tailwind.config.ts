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
        text: "#eeeff4",
        background: "#0f0f18",
        primary: "#a9aaca",
        secondary: "#6d4643",
        accent: "#a99c74",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
export default config;
