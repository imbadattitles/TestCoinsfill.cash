import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        button: "bg-gradient-to-r from-[#FFC543] to-[#FF8412]",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        grey: "#1E1E2E",
        orange: "#FF8412",
        yellow: "#FFC543",
        dblue: "#4834D4",
        blue: "#686DE0",
      },
    },
  },
  plugins: [],
};
export default config;
