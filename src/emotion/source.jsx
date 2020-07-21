import React from 'react';
import { css, cx, injectGlobal } from '@emotion/css';

const myStyles = css`
  background-color: green;
  &+& {
    margin-top: 20px;
  }
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

injectGlobal`
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  @font-face {
    font-family: 'MaterialIcons';
    src: url(../assets/fonts/MaterialIcons.ttf) format('truetype');
  }
`

const Test = () => (
  <>
    <div className={cx()}></div>
    <p className={cx(myStyles)}>This is the content of a paragraph</p>
    <div className={cx(base, danger)} >
    </div>
  </>
)

export default Test;
