import React from 'react';
import { css } from 'linaria';
// import { logLinaria, debugLinaria } from '../';

// import { render } from '@testing-library/react';
import testRenderer from 'react-test-renderer';
import pretty from 'pretty';

// linaria
import { reactSerializer as linariaSerializer } from 'linaria-jest';
const { print: printLinaria } = linariaSerializer;


const header = css`
  text-transform: uppercase;
`;

const HTML = testRenderer.create(<h1 className={header}>Hello world</h1>).toTree(); //?

printLinaria(HTML, str => str); //?

// Then use it as a class name
// debugLinaria(<h1 className={header}>Hello world</h1>);
