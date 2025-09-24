/**
 * @see https://github.com/lint-staged/lint-staged?tab=readme-ov-file#configuration
 * @filename: .lintstagedrc.mjs
 * @type {import('lint-staged').Configuration}
 */
export default {
  '**/*.{js,mjs,cjs,ts,jsx,tsx,html,css}': (files) =>
    files.length > 0 ? [`nx affected:lint --fix --files=${files.join(',')}`] : [],
  '**/*.{ts,tsx}': (files) =>
    files.length > 0 ? [`nx affected --target=typecheck --files=${files.join(',')}`] : [],
  '**/*': (files) => (files.length > 0 ? [`nx format:write --files=${files.join(',')}`] : [])
};
