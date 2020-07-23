require('jsdom-global')();
const { relative } = require('path');
const { transformSync } = require("@babel/core");
const { compile, serialize, stringify } = require('stylis');
const emphasize = require('emphasize/lib/core');
const langCss = require('highlight.js/lib/languages/css');
const langHtml = require('highlight.js/lib/languages/xml');
const prettier = require('prettier');
emphasize.registerLanguage('css', langCss)
emphasize.registerLanguage('html', langHtml)

const filename = require.resolve(`../src/linaria/${process.argv[2]}`);
const babelConfig = {
  filename,
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "linaria/babel"
  ],
};

const linariaRules = {};
const { addHook } = require('pirates');
const revert = addHook((code, filename) => {
  const result = transformSync(code, { filename, ...babelConfig });
  const resultRules = result.metadata.linaria && result.metadata.linaria.rules;
  if (resultRules) Object.assign(linariaRules, resultRules);
  return result.code;
  },
  { exts: ['.jsx'] }
);
const { Test } = require(filename);
revert();
const target = document.createElement('div');
document.body.appendChild(target);
const { code } = transformSync(`
  import React from 'react';
  import { render } from 'react-dom';
  render(<Test/>, target);
`, { filename, ...babelConfig });
eval(code);

const linariaCss = Object.keys(linariaRules).map(cn => {
  return `${cn} { ${linariaRules[cn].cssText.trim()} }`.trim();
}).join('\n');

console.log(`
NODE_ENV: ${process.env.NODE_ENV}
file: ${relative(process.cwd(), filename)}
-----------------------------------------------
${emphasize.highlight('css', prettier.format(serialize(compile(linariaCss), stringify), { parser: 'css' })).value}
${emphasize.highlight('html', prettier.format(target.innerHTML, { parser: 'html' })).value}
`.trim());
