import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { baseConfig } from "@signalvc/eslint-config";

const tsconfigPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "tsconfig.json");
const nextConfigs = nextVitals.filter((config) => config.name !== "next/typescript");

const eslintConfig = defineConfig([
  ...nextConfigs,
  // Shared strict, type-aware rules (import plugin optional here)
  ...baseConfig({
    tsconfigPath,
    includeImportPlugin: false,
  }),
  // Allow JS/Metro/Next config files without a TS project
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      parserOptions: { project: null },
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "**/*.config.{js,mjs,cjs,ts,mts,cts}",
  ]),
]);

export default eslintConfig;
