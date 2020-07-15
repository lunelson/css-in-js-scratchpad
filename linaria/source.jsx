import React from 'react';
import { styled } from 'linaria/react';
import { css, cx } from 'linaria';

import SubComponent from './source2';

const MyBox = styled.div`
  --font-alias: ${props => props.fa||'sans'};
  color: red;
  height: 200px;
  &:hover { color: blue; }
  & > * { margin-top: 1em; }
`;

const myStyles = css`
  background-color: lightblue;
`;

const danger = css`
  color: red;
  &:hover { color: blue; }
  & > * { margin-top: 1em; }
`

const base = css`
  background-color: darkgreen;
  margin-left: 2rem;
  color: beige;
`

const globalStyles = css`
:global() {
  body {
    color: red;
  }
}
`;

const Test = () => (
  <>
    <p className={cx(myStyles)}>This is the content of a paragraph</p>
    <SubComponent/>
    <div className={cx(base, danger)} >
      <MyBox fa='mono' className={css`color: green;`} />
    </div>
  </>
)

export default Test;
