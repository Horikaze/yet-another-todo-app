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
        text: "#eef4f5",
        background: "#070f0f",
        primary: "#abbfc0",
        secondary: "#534a63",
        accent: "#41d2d9",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
export default config;
