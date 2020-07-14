var { readFileSync } = require('fs');
const { transformSync } = require("@babel/core");
import { render, screen } from '@testing-library/react';
const prettier = require('prettier');

const relFile = 'source.jsx';

const filename = `${__dirname}/${relFile}`;
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

result.metadata.astroturf.styles.map(style => {
  return prettier.format(`
/* ${style.relativeFilePath} */

${style.value.trim()}
  `, { parser: 'css' });
}).join('\n'); //?

const { JSDOM } = require('jsdom');
const { window } = new JSDOM('<!DOCTYPE html><html lang="en"><head></head><body></body></html>');
with(window) eval(result.code);
module.exports.default;//?
