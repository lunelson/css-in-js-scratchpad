var { readFileSync } = require('fs');
const { transformSync } = require("@babel/core");
require('jsdom-global')();
const prettier = require('prettier');

const relFile = 'source.jsx';
const filename = `${__dirname}/${relFile}`;

let foo;
eval(`
foo = 5;
`);
foo;//?

const source = readFileSync(filename, 'utf8');
const result = transformSync(`
  import { render, screen } from '@testing-library/react';
  ${source}
  container = render(<Test/>).container;
`, {
    filename,
    presets: [
      "@babel/preset-env",
      "@babel/preset-react"
    ],
    plugins: [
      "astroturf/plugin",
      // require('../test-babel-plugin'),
    ]
  });
// result.code;//?
let container;
eval(result.code);
container.innerHTML; //?
// eval(`
//   container = (function() {
//     const exports = {};
//     ${result.code}
//     const Test = exports.default;
//     return render(<Test/>);
//   })()
// `)
// container;//?

// module._compile(result.code, filename); //?
// const result = transformSync(`import Test from './source.jsx';`, {
//     filename,
//     presets: [
//       "@babel/preset-env",
//       "@babel/preset-react"
//     ],
//     plugins: [
//       "astroturf/plugin",
//       // require('../test-babel-plugin'),
//     ]
//   });

// result.code; //?

/*
const source = readFileSync(filename);
const result = transformSync(source, {
    filename,
    presets: [
      "@babel/preset-env",
      "@babel/preset-react"
    ],
    plugins: [
      "astroturf/plugin",
      // require('../test-babel-plugin'),
    ]
  });

result.metadata.astroturf.styles; //?
result.metadata.astroturf.styles.map(style => {
  return prettier.format(`
\/* ${style.relativeFilePath} *\/

${style.value.trim()}
  `, { parser: 'css' });
}).join('\n'); //?

const { JSDOM } = require('jsdom');
const { window } = new JSDOM('<!DOCTYPE html><html lang="en"><head></head><body></body></html>');


  */
// with(window) eval(result.code);
// module.exports.default;//?
