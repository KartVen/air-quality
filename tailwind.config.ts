import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        body: "rgb(14 28 67)",
        primary: "rgb(23 37 84)",
        "primary-hover": "rgb(21, 25, 44)"
      },
      fontFamily: {
        'primary': ['ui-sans-serif', 'arial'],
      },
      gap: {
        "cards-row": "2rem",
        "card-between": "1.25rem"
      }
    },
  },
  plugins: [],
};
export default config;
