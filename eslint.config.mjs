import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "prettier"
  ),
  {
    rules: {
      // TypeScript関連
      "@typescript-eslint/no-unused-vars": ["error", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_" 
      }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      
      // Import関連
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external", 
            "internal",
            ["parent", "sibling"],
            "index"
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ],
      
      // React関連
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "warn",
      
      // 一般的なコード品質
      "prefer-const": "error",
      "no-var": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      
      // Next.js関連
      "@next/next/no-img-element": "error"
    }
  },
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      ".vercel/**",
      "storybook-static/**"
    ]
  }
];

export default eslintConfig;