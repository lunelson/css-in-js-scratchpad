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
  color: beige;
`

const globalStyles = css`
  body {
    color: red;
  }
`;

const Test = () => (
  <>
    <p className={myStyles}></p>
    <div className={cx(base, danger)} >
      <MyBox className={css`color: green;`} />
    </div>
  </>
)
