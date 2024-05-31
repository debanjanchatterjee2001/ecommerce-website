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
      {
        mytheme: {
          primary: "#0094ff",
          secondary: "#0000ff",
          accent: "#005bea",
          neutral: "#181818",
          "base-100": "#fffcff",
          info: "#0055e2",
          success: "#a9e030",
          warning: "#bb9100",
          error: "#ff4c76",
          body: {
            "background-color": "#e3e6e6",
          },
        },
      },
    ],
  },
};
export default config;
