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
const astroturfStyles = [];
const { addHook } = require('pirates');
const revert = addHook((code, filename) => {
  const result = transformSync(code, {
      filename,
      presets: [
        "@babel/preset-env",
        "@babel/preset-react",
      ],
      plugins: [
        [ 'astroturf/plugin', { writeFiles: false, enableCssProp: true } ]
      ]
    });
  let { code: resultCode, metadata } = result;
  const styles = metadata.astroturf.styles || [];;
  styles.forEach(style => {
    // console.log(resultCode.match(new RegExp(`require\\("${style.relativeFilePath}"\\)`, 'gm')));
    resultCode = resultCode.replace(new RegExp(`require\\("${style.relativeFilePath}"\\)`, 'gm'), JSON.stringify(style));
  })
  if (styles) astroturfStyles.push(...styles);
  return resultCode;
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

// console.log(container);

// console.clear();
// console.log(`
// -----------------------------------------------
// ${emphasize.highlight('css', Object.keys(linariaRules).map(cn => {
//   return `
// ${cn} {
//   ${linariaRules[cn].cssText.trim()}
// }
// `.trim();
// }).join('\n\n')).value}

// ${emphasize.highlight('html', pretty(container.innerHTML)).value}
// `);
