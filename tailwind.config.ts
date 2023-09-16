import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  plugins: [],
  theme: {
    screens: {
      xl: { max: "1440px" },
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "480px" },
    },
  },
};

export default config;