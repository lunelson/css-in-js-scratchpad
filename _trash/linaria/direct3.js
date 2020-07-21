/*
TODO: handle a single argument, to get the filename to transform
*/

const relFile = 'source.jsx';

require('jsdom-global')();
const { transformSync } = require("@babel/core");
const pretty = require('pretty');
const emphasize = require('emphasize/lib/core');
const langCss = require('highlight.js/lib/languages/css');
const langHtml = require('highlight.js/lib/languages/xml');
emphasize.registerLanguage('css', langCss)
emphasize.registerLanguage('html', langHtml)

const filename = `${__dirname}/${relFile}`;
const linariaRules = {};
const { addHook } = require('pirates');
const revert = addHook((code, filename) => {
  const result = transformSync(code, {
      filename,
      presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        "linaria/babel"
      ],
    });
  const resultRules = result.metadata.linaria && result.metadata.linaria.rules;
  console.log(resultRules);
  if (resultRules) Object.assign(linariaRules, resultRules);
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
`, {
    filename,
    presets: [
      "@babel/preset-env",
      "@babel/preset-react",
      "linaria/babel"
    ],
  });
eval(code);

console.log(`
-----------------------------------------------
${emphasize.highlight('css', Object.keys(linariaRules).map(cn => {
  return `
${cn} {
  ${linariaRules[cn].cssText.trim()}
}
`.trim();
}).join('\n\n')).value}

${emphasize.highlight('html', pretty(container.innerHTML)).value}
`);
