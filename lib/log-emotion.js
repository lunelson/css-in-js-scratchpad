require('jsdom-global')();
const { relative } = require('path');
const { transformSync } = require("@babel/core");
const emphasize = require('emphasize/lib/core');
const langCss = require('highlight.js/lib/languages/css');
const langHtml = require('highlight.js/lib/languages/xml');
const prettier = require('prettier');
emphasize.registerLanguage('css', langCss)
emphasize.registerLanguage('html', langHtml)

const filename = require.resolve(`../src/emotion/${process.argv[2]}`);
const babelConfig = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@emotion/babel-preset-css-prop",
  ],
  plugins: [
    [
      "@emotion",
      {
        // sourceMap is on by default but source maps are dead code eliminated in production
        "sourceMap": false,
        "autoLabel": "never",
        // "labelFormat": "[local]-99",
        "cssPropOptimization": false,
      }
    ],
  ]
};

console.log(document.body.innerHTML);

const { addHook } = require('pirates');
const revert = addHook((code, filename) => {
  const result = transformSync(code, { filename, ...babelConfig });
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

console.log(`
NODE_ENV: ${process.env.NODE_ENV}
file: ${relative(process.cwd(), filename)}
-----------------------------------------------
${emphasize.highlight('css', prettier.format(Array.from(target.ownerDocument.styleSheets).map(sheet => sheet.toString()).join(''), { parser: 'css' })).value}
${emphasize.highlight('html', prettier.format(target.innerHTML, { parser: 'html' })).value}
`.trim());
