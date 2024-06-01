import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
        "winter",
        "night",
    ],
    darkTheme: "night",
    base: true,
    styled: true, // adds class names. Not colors)
    logs: true,
    themeRoot: ":root",
  },
};
export default config;
