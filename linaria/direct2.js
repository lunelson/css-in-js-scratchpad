/*
TODO: make the babel transformation happen in a custom require extension
  - should key off extension .linaria.jsx
  - should return exports.default and exports.metadata

  https://gist.github.com/jamestalmage/df922691475cff66c7e6
  https://github.com/ariporad/pirates

TODO: handle a single argument, to get the filename to transform
*/

const relFile = 'source.jsx';

require('jsdom-global')();
var { readFileSync } = require('fs');
const { transformSync } = require("@babel/core");
const { render } = require('@testing-library/react');
const pretty = require('pretty');
const emphasize = require('emphasize/lib/core');
const langCss = require('highlight.js/lib/languages/css');
const langHtml = require('highlight.js/lib/languages/xml');
emphasize.registerLanguage('css', langCss)
emphasize.registerLanguage('html', langHtml)

const filename = `${__dirname}/${relFile}`;
const { addHook } = require('pirates');
const revert = addHook((code, filename) => {
  const result = transformSync(`${code}; const { container } = render(<Test/>);`, {
      filename,
      presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        "linaria/babel"
      ],
    });
  return `
const { render } = require('@testing-library/react');
${result.code}
exports.container = container;
exports.metadata = ${JSON.stringify(result.metadata)};
    `;
  },
  { exts: ['.jsx'] }
);
const { container, metadata } = require(filename);
revert();
/// GOOD REQUIRE UP TO NOW
console.log(container);
console.log(JSON.stringify(metadata));

// const { code, metadata: { linaria: { rules } } } = transformSync(`
//   ${testSource}
//   container = render(<Test/>).container;
// `, {
//     filename,
//     presets: [
//       "@babel/preset-env",
//       "@babel/preset-react",
//       "linaria/babel"
//     ],
//   });
// let container;
// eval(code);

// console.clear();
// console.log(`
// -----------------------------------------------
// ${emphasize.highlight('css', Object.keys(rules).map(cn => {
//   return `
// /* ${rules[cn].displayName} */
// ${cn} {
//   ${rules[cn].cssText.trim()}
// }
// `.trim();
// }).join('\n\n')).value}

// ${emphasize.highlight('html', pretty(container.innerHTML)).value}
// `);
