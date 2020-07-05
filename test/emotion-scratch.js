/** @jsx jsx */
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { Global, css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { print as printEmotion, test as testEmotion } from 'jest-emotion';
import { resetStyleSheet } from 'jest-styled-components/src/utils';
import pretty from 'pretty';

// export function logEmotion(el) {
//   document.querySelectorAll('style[data-emotion]').forEach(elem => elem.parentNode.removeChild(elem))
//   console.log(
//     `
// ----------------------------------------------------------------------------
// ${printEmotion(render(el).container, ({ innerHTML }) => pretty(innerHTML).trim())}

//   `,
//   );
// }

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

const testDoc = render(
  <>
    <Global styles={globalStyles} />
    <div css={[base, danger]} >
      <MyBox css={css`color: green;`} />
    </div>
  </>
)

// document.getElementsByTagName("head")[0].innerHTML; //?
// document.head.innerHTML; //?
// pretty(testDoc.container.innerHTML); //?
// cleanup();
// testDoc.container.ownerDocument; //?
testDoc.container.ownerDocument.styleSheets.map(sheet => sheet.toString()).join('\n'); //?
screen.debug(testDoc.container);
// pretty(document.body.innerHTML); //?
// Array.from(document.getElementsByTagName('style')).map(tag => tag.innerHTML); //?
// Array.from(document.querySelectorAll('style[data-emotion]')).map(tag => tag.innerHTML); //?
// document.styleSheets.length; //?
