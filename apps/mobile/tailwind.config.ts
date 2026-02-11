import type { Config } from "tailwindcss";
import sharedConfig from "../../packages/ui/tailwind.config";

const config: Config = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      ...sharedConfig.theme?.extend,
    },
  },
};

export default config;
