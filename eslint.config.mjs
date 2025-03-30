import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable the rule for unused variables and imports
      "@typescript-eslint/no-unused-vars": "off",
      
      // Disable react-hooks/exhaustive-deps warnings
      "react-hooks/exhaustive-deps": "off",
      
      // Make unescaped entities warnings instead of errors
      "react/no-unescaped-entities": "warn"
    }
  }
];

export default eslintConfig;
