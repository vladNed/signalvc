import { defineConfig, globalIgnores } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { baseConfig } from "@signalvc/eslint-config";

const tsconfigPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "tsconfig.json");

export default defineConfig([
  ...baseConfig({ tsconfigPath }),
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      parserOptions: { project: null },
    },
  },
  globalIgnores(["node_modules/**", "dist/**", "build/**", "**/*.config.{js,mjs,cjs,ts,mts,cts}"]),
]);
