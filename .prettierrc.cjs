/** @type {import("prettier").Config} */
const config = {
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
  objectWrap: 'collapse',
  singleAttributePerLine: true,
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-tailwindcss'],
};

module.exports = config;
