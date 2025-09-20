/**
 * ESBuild configuration for the backend application
 * @see https://esbuild.github.io/api/
 * @type {import('esbuild').BuildOptions}
 */
module.exports = {
  platform: 'node',
  bundle: false,
  sourcemap: process.env.NODE_ENV !== 'production',
  minify: process.env.NODE_ENV === 'production',
  outExtension: {
    '.js': '.js'
  }
};
