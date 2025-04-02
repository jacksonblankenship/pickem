/** @type {import("prettier").Config} */
const config = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-tailwindcss'],
};

module.exports = config;
