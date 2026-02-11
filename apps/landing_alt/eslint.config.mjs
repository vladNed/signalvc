import { baseConfig } from "@signalvc/eslint-config";

export default [
  ...baseConfig({
    tsconfigPath: "./tsconfig.json",
    tsconfigRootDir: import.meta.dirname,
  }),
  {
    ignores: [".next/**"],
  },
];
