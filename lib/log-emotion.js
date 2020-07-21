require('jsdom-global')();
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
      "@emotion/babel-plugin",
      {
        // sourceMap is on by default but source maps are dead code eliminated in production
        "sourceMap": false,
        "autoLabel": "dev-only",
        "labelFormat": "[local]",
        "cssPropOptimization": true
      }
    ],
  ]
};

const { addHook } = require('pirates');
const revert = addHook((code, filename) => {
  const result = transformSync(code, { filename, ...babelConfig });
  return result.code;
  },
  { exts: ['.jsx'] }
);
const { default: Test } = require(filename);
revert();
let container;
const { code } = transformSync(`
  import React from 'react';
  import { render } from '@testing-library/react'
  container = render(<Test/>).container;
`, { filename, ...babelConfig });
eval(code);

console.log(`
-----------------------------------------------
${emphasize.highlight('css', prettier.format(Array.from(container.ownerDocument.styleSheets).map(sheet => sheet.toString()).join(''), { parser: 'css' })).value}
${emphasize.highlight('html', prettier.format(container.innerHTML, { parser: 'html' })).value}
`);
