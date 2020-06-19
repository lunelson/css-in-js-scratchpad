import React from 'react';
import { render } from '@testing-library/react';
import styled, { css} from 'styled-components';
import { print as printSC } from 'jest-styled-components/src/styleSheetSerializer';
import { resetStyleSheet } from 'jest-styled-components/src/utils';
import pretty from 'pretty';

export function logSC(el) {
  resetStyleSheet();
  console.log(
    `
----------------------------------------------------------------------------
${printSC(render(el).container, ({ innerHTML }) => pretty(innerHTML).trim())}

  `,
  );
}

const MyBox = styled.div`
  color: red;
  height: 200px;
`;

logSC(
  <MyBox>Hello World</MyBox>
);
