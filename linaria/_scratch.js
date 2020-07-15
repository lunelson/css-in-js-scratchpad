({
  babel: {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react",
      "linaria/babel"
    ],
  },
  plugins: [
    "jsdom-quokka-plugin"
  ]
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { styled } from 'linaria/react';
import { css, cx } from 'linaria';

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
    <div className={cx(base, danger)} >
      <MyBox className={css`color: green;`} />
    </div>
  </>
).container;

testContainer.ownerDocument.getElementsByTagName('style').length; //?
testContainer.ownerDocument.querySelectorAll('style').length; //?
testContainer.ownerDocument.styleSheets.length; //?
testContainer.ownerDocument.styleSheets.map(sheet => sheet.toString()).join('\n'); //?
screen.debug(testContainer);
