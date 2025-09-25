/**
 * https://www.nativewind.dev/docs/getting-started/installation#3-add-the-babel-preset
 */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel']
  };
};
