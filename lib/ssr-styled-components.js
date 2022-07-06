const { relative } = require("path");
const { transformSync } = require("@babel/core");
const emphasize = require("emphasize/lib/core");
const langCss = require("highlight.js/lib/languages/css");
const langHtml = require("highlight.js/lib/languages/xml");
emphasize.registerLanguage("css", langCss);
emphasize.registerLanguage("html", langHtml);
const prettier = require("prettier");

const filename = require.resolve(`../src/styled-components/${process.argv[2]}`);

const babelConfig = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    [
      "babel-plugin-styled-components",
      {
        displayName: false,
        fileName: false,
      },
    ],
  ],
};

const { addHook } = require("pirates");
const revert = addHook(
  (code, filename) => {
    const result = transformSync(code, { filename, ...babelConfig });
    return result.code;
  },
  { exts: [".jsx"] }
);
const { default: Test } = require(filename);
revert();

const result = {};
const keySuffixRE = "-\\d\\d?";
const { code } = transformSync(
  `
  import React from 'react';
  import { renderToString } from 'react-dom/server'
  import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
  const sheet = new ServerStyleSheet()
  try {
    const rawHtml = renderToString(
      <StyleSheetManager sheet={sheet.instance}>
        <Test />
      </StyleSheetManager>
    );
    const rawCss = sheet.getStyleTags();
    const styledMatch = rawCss.match(/data-styled.+\\[id="([a-z,\\d]+)-\\d"\\]/m);
    result.key = styledMatch && styledMatch[1];
    result.html = styledMatch ? rawHtml.replace(new RegExp(result.key+keySuffixRE, 'g'),'') : rawHtml;
    result.css = rawCss
      .replace(/<.+>/gm,'')
      .replace(/\\/\\*\\!sc\\*\\/\\s?data-styled.+\\/\\*\\!sc\\*\\//gm,'');
  } catch (error) {
    console.error(error)
  } finally {
    sheet.seal()
  }
`,
  { filename: __filename, ...babelConfig }
);

eval(code);

console.log(
  `
NODE_ENV: ${process.env.NODE_ENV}
file: ${relative(process.cwd(), filename)}
-----------------------------------------------
${
  emphasize.highlight("css", prettier.format(result.css, { parser: "css" }))
    .value
}
${
  emphasize.highlight("html", prettier.format(result.html, { parser: "html" }))
    .value
}
`.trim()
);
