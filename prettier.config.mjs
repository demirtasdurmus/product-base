/** @type {import('prettier').Config} */
export default {
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  bracketSpacing: true,
  trailingComma: 'none',
  endOfLine: 'auto',
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '',
    '^types$',
    '^(@product-base)(/.*)$',
    '^(@/assets|@/components|@/hooks|@/layouts|@/libs|@/pages|@/routers|@/stores|@/styles)(/.*)$',
    '^[./]',
    ''
  ]
};
