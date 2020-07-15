import React from 'react';
import { styled } from 'linaria/react';
import { css, cx } from 'linaria';

import SubComponent from './source2';

const MyBox = styled.div`
  color: red;
  height: 200px;
`;

const myStyles = css`
  background-color: lightblue;
`;

const danger = css`
  color: red;
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
      <MyBox className={css`color: green;`} />
    </div>
  </>
)

export default Test;
