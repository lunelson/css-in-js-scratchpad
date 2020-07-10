//#region setup

({
  babel: {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react",
      "@emotion/babel-preset-css-prop",
    ],
    plugins: [
      [
        "@emotion/babel-plugin",
        {
          autoLabel: "always",
        }
      ],
      // require('../test-babel-plugin'),
    ]
  },
  plugins: [
    "jsdom-quokka-plugin"
  ]
});

import React from 'react';
import { render, prettyDOM } from '@testing-library/react';
import prettier from 'prettier';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import { createSerializer } from '@emotion/jest';

function debug(component) {

  const serializer = createSerializer();
  const container = render(component).container;

  console.log(`
--------------------------------------------------------------------------------

${prettier.format(container.ownerDocument.styleSheets[container.ownerDocument.styleSheets.length - 1].toString(), { parser: 'css'})}
${serializer.serialize(container, {indent: '  '}, '  ', Infinity, null, (html) => prettyDOM(html))}
  `);
}

function debug2(component) {

  const container = render(component).container;

  console.log(`
--------------------------------------------------------------------------------

${prettier.format(container.ownerDocument.styleSheets.map(sheet => sheet.toString()).join('\n'), { parser: 'css'})}
${prettyDOM(container)}
  `);
}

//#endregion

const MyBox = styled.div`
  color: red;
  height: 500px;
`;

const mqtest = css`
  ${css`padding-top: 20px; background-color: yellow;`}
  ${[
    '@media screen {',
      css`margin-left: 100px;`,
    '}'
  ]}
`;

const stackBase = css`
  & > * + * { margin-top: var(--stack-gap); }
`;

const stack = gap => [stackBase, css`--stack-gap: ${gap};`]

const danger = css`
  color: orange;
`

const base = css`
  color: forestgreen;
`

const globalStyles = css`
  body {
    color: black;
    line-height: 1.4;
  }
`;

debug(
  <>
    <Global styles={globalStyles} />
    <div css={stack(20)}>this is 20</div>
    <div css={stack(40)}>this is 40</div>
    <div css={[mqtest]}>
      <p>is this thing on?</p>
    </div>
    <div css={[base, danger]} >
      <MyBox css={css`color: green;`} />
    </div>
  </>
);
