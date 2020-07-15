import React from 'react';
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

const Test = () => (
  <>
    <p className={myStyles}></p>
    <div className={cx(base, danger)} >
      <MyBox className={css`color: green;`} />
    </div>
  </>
)
