import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: import.meta.url
});

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends("next/core-web-vitals"), 
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error", 
      "no-console": ["warn", { allow: ["error", "warn"] }],  
      "react/react-in-jsx-scope": "off", 
    }
  }
];
