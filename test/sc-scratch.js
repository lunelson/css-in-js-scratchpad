//#region setup
({
  babel: {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react"
    ],
    plugins: [
      [
        "babel-plugin-styled-components",
        {
          displayName: false,
          fileName: false,
        }
      ]
    ]
  },
  plugins: [
    "jsdom-quokka-plugin"
  ]
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import styled, { css, createGlobalStyle } from 'styled-components';
//#endregion

const MyBox = styled.div`
  color: red;
  height: 200px;
`;

const GlobalStyle = createGlobalStyle`
  body {
    color: red;
  }
`;

const testContainer = render(
  <>
    <GlobalStyle />
    <div css={`
      background-color: darkgreen;
      color: beige;
    `} >
      <MyBox css={`color: green;`} />
    </div>
  </>
).container;

testContainer.ownerDocument.styleSheets.map(sheet => sheet.toString()).join('\n'); //?
screen.debug(testContainer);
