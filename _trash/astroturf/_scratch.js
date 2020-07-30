({
  babel: {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react"
    ],
    plugins: [
      "astroturf/plugin",
      // require('../test-babel-plugin'),
    ]
  },
  plugins: [
    "jsdom-quokka-plugin"
  ]
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import styled, { css } from 'astroturf';

const MyBox = styled('div')`
  color: red;
  height: 200px;
`;
const styles = css`
  .myStyles {
    background-color: lightblue;
    background-color: green;
  }

  .danger {
    color: red;
  }

  .base {
    background-color: darkgreen;
    color: beige;
  }
`;


const globalStyles = css`
  body {
    color: red;
  }
`;

const testContainer = render(
  <>
    <div className={styles.base} >
      <MyBox />
    </div>
  </>
).container;


testContainer.ownerDocument.getElementsByTagName('style').length; //?
testContainer.ownerDocument.querySelectorAll('style').length; //?
testContainer.ownerDocument.styleSheets.length; //?
testContainer.ownerDocument.styleSheets.map(sheet => sheet.toString()).join('\n'); //?
screen.debug(testContainer);
