import React from 'react';
import { css } from 'linaria';
// import { logLinaria, debugLinaria } from '../';

import { render } from '@testing-library/react';
import testRenderer from 'react-test-renderer';
import pretty from 'pretty';

// linaria
import { reactSerializer as linariaSerializer } from 'linaria-jest';
const { print: printLinaria } = linariaSerializer;


const header = css`
  text-transform: uppercase;
`;

// const html = testRenderer.create(<h1 className={header}>Hello world</h1>).toTree(); //?
const html = render(<h1 className={header}>Hello world</h1>);

const h1s = document.getElementsByTagName('h1');
Array.from(h1s).map(heading => heading.textContent); //?

document.getElementsByTagName("head")[0].innerHTML; //?
document.head.innerHTML; //?
document.body.innerHTML; //?
document.getElementsByTagName('style').length; //?
document.querySelectorAll('style').length; //?
document.styleSheets.length; //?

// const styleTags = document.getElementsByTagName('style'); //?
// Array.from(styleTags).map(tag => tag.textContent); //?


// printLinaria(HTML, str => str); //?

// Then use it as a class name
// debugLinaria(<h1 className={header}>Hello world</h1>);
