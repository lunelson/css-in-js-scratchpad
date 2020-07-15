const relFile = 'source.jsx';

require('jsdom-global')();
var { readFileSync } = require('fs');
const { transformSync } = require("@babel/core");
const { render, prettyDOM } = require('@testing-library/react');
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
console.log(`
-----------------------------------------------
${Object.keys(rules).map(cn => {
  return `
/* ${rules[cn].displayName} */
${cn} {
  ${rules[cn].cssText.trim()}
}
`.trim();
}).join('\n\n')}

${prettyDOM(container)}
`);
