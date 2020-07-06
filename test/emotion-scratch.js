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
          autoLabel: true,
        }
      ]
    ]
  },
  plugins: [
    "jsdom-quokka-plugin"
  ]
});

/** @jsx jsx */
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import { Global, css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
//#endregion

const MyBox = styled.div`
  color: red;
  height: 200px;
`;

const myStyles = css`
  background-color: lightblue;
  background-color: green;
`;

const danger = css`
  color: red;
`

const base = css`
  background-color: darkgreen;
  color: beige;
`

const globalStyles = css`
  body {
    color: red;
  }
`;

const testContainer = render(
  <>
    <Global styles={globalStyles} />
    <div css={[base, danger]} >
      <MyBox css={css`color: green;`} />
    </div>
  </>
).container;

testContainer.ownerDocument.styleSheets.map(sheet => sheet.toString()).join('\n'); //?
screen.debug(testContainer);
