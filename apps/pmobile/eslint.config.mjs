import nx from '@nx/eslint-plugin';
import tailwind from 'eslint-plugin-tailwindcss';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nx.configs['flat/react'],
  ...tailwind.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {}
  },
  {
    ignores: ['.expo', 'web-build', 'cache', 'dist']
  }
];
