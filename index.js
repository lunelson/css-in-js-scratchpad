import { render } from '@testing-library/react';
import pretty from 'pretty';

// styled-components
import { print as printSC } from 'jest-styled-components/src/styleSheetSerializer';
import { resetStyleSheet } from 'jest-styled-components/src/utils';
export function logSC(el) {
  resetStyleSheet();
  console.log(
    `
----------------------------------------------------------------------------
${printSC(render(el).container, ({ innerHTML }) => pretty(innerHTML).trim())}

  `,
  );
}

// linaria
import { reactSerializer as linariaSerializer } from 'linaria-jest';
const { print: printLinaria } = linariaSerializer;
export function debugLinaria(el) { console.log(Object.keys(render(el).container)) }
export function logLinaria(el) {
  console.log(
    `
----------------------------------------------------------------------------
${printLinaria(render(el).container, (container) => {
  return container;
  // return pretty(innerHTML).trim()
})}

  `,
  );
}


// astroturf
// compiled-css -- SERIALIZER DOES NOT EXIST https://compiledcssinjs.com/docs/testing#dynamic-props
