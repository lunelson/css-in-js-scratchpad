//#region setup

({
  babel: {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react"
    ],
    plugins: [
      [
        "babel-plugin-emotion",
        {
          autoLabel: false,
        }
      ],
      // require('../test-babel-plugin'),
    ]
  },
  plugins: [
    "jsdom-quokka-plugin"
  ]
});

/** @jsx jsx */
import React from 'react';
import { render, prettyDOM } from '@testing-library/react';
import prettier from 'prettier';
import { Global, css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

function debug(component) {

  const container = render(
    <>
      <Global styles={globalStyles} />
      <div css={[base, danger]} >
        <MyBox css={css`color: green;`} />
      </div>
    </>
  ).container;

  console.log(`
--------------------------------------------------------------------------------

${prettier.format(container.ownerDocument.styleSheets.map(sheet => sheet.toString()).join('\n'), { parser: 'css'})}

${prettyDOM(container)}
  `);
}

//#endregion

const MyBox = styled.div`
  color: red;
  height: 200px;
`;

const dummy = css`content: 'joke';`;

const what = css`
  display: grid;
  transition: all 0.5s;
  user-select: none;
  background: linear-gradient(to bottom, white, black);
`;

const danger = css`
  color: orange;
`

const base = css`
  color: blue;
`

const globalStyles = css`
  body {
    color: blue;
  }
`;

debug(
  <>
    <div css={dummy}></div>
    <Global styles={globalStyles} />
    <div css={what}>
      <p>is this thing on?</p>
    </div>
    <div css={[base, what]} >
      <MyBox css={css`color: green;`} />
    </div>
  </>
);

document.styleSheets[0] //?
