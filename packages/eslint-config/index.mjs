import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export const baseConfig = ({
  tsconfigPath,
  tsconfigRootDir = process.cwd(),
  includeImportPlugin = true,
  includeTypeScriptEslintConfig = true,
} = {}) => [
  js.configs.recommended,
  ...(includeTypeScriptEslintConfig ? tseslint.configs.recommendedTypeChecked : []),
  ...(includeTypeScriptEslintConfig ? tseslint.configs.stylisticTypeChecked : []),
  {
    languageOptions: {
      parserOptions: {
        project: tsconfigPath,
        tsconfigRootDir,
      },
    },
    plugins: {
      ...(includeImportPlugin ? { import: importPlugin } : {}),
      "unused-imports": unusedImports,
    },
    rules: {
      ...(includeTypeScriptEslintConfig
        ? {
            "@typescript-eslint/consistent-type-imports": [
              "error",
              { prefer: "type-imports", fixStyle: "inline-type-imports" },
            ],
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-misused-promises": [
              "error",
              { checksVoidReturn: { attributes: false } },
            ],
            "@typescript-eslint/no-unnecessary-condition": "error",
            "@typescript-eslint/no-unsafe-assignment": "error",
            "@typescript-eslint/no-unsafe-call": "error",
            "@typescript-eslint/no-unsafe-member-access": "error",
            "@typescript-eslint/no-unsafe-return": "error",
            "@typescript-eslint/no-unused-vars": "off",
          }
        : {}),
      ...(includeImportPlugin
        ? { "import/consistent-type-specifier-style": ["error", "prefer-inline"] }
        : {}),
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["warn", { args: "after-used", argsIgnorePattern: "^_" }],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*/*", "@/entities/*/*"],
              message:
                "Private internal access. Please import from the module's public 'index.ts' instead.",
            },
          ],
        },
      ],
    },
  },
];
