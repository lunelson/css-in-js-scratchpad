const { relative } = require('path');
const { transformSync } = require("@babel/core");
const emphasize = require('emphasize/lib/core');
const langCss = require('highlight.js/lib/languages/css');
const langHtml = require('highlight.js/lib/languages/xml');
emphasize.registerLanguage('css', langCss)
emphasize.registerLanguage('html', langHtml)
const prettier = require('prettier');

const filename = require.resolve(`../src/emotion/${process.argv[2]}.jsx`);

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
        "sourceMap": false,
        "autoLabel": "never",
        "cssPropOptimization": true,
      }
    ],
  ]
};

const { addHook } = require('pirates');
const revert = addHook((code, filename) => {
  const result = transformSync(code, { filename, ...babelConfig });
  return result.code;
  },
  { exts: ['.js', '.jsx'] }
);
const { Test } = require(filename);
revert();

let result;
const { code } = transformSync(`
  import React from 'react';
  import { renderToString } from 'react-dom/server'

  import { extractCritical } from '@emotion/server'
  import { CacheProvider } from '@emotion/react'
  import { cache } from '@emotion/css'

  result = extractCritical(renderToString((
    <CacheProvider value={cache}>
      <Test />
    </CacheProvider>
  )))
`, { filename: __filename, ...babelConfig });

eval(code);

console.log(`
NODE_ENV: ${process.env.NODE_ENV}
file: ${relative(process.cwd(), filename)}
-----------------------------------------------
${emphasize.highlight('css', prettier.format(result.css, { parser: 'css' })).value}
${emphasize.highlight('html', prettier.format(result.html, { parser: 'html' })).value}
`.trim());
