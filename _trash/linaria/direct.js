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
const testSource = readFileSync(filename, 'utf8');
const { code, metadata: { linaria: { rules } } } = transformSync(`
  ${testSource}
  container = render(<Test/>).container;
`, {
    filename,
    presets: [
      "@babel/preset-env",
      "@babel/preset-react",
      "linaria/babel"
    ],
  });
let container;
eval(code);

console.clear();
console.log(`
-----------------------------------------------
${emphasize.highlight('css', Object.keys(rules).map(cn => {
  return `
/* ${rules[cn].displayName} */
${cn} {
  ${rules[cn].cssText.trim()}
}
`.trim();
}).join('\n\n')).value}

${emphasize.highlight('html', pretty(container.innerHTML)).value}
`);
