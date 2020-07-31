import React from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

const MyBox = styled.div`
  color: red;
  height: 500px;
`;

const mqtest = css`
  &-modifier {
    content: 'failure';
  }
  &+& {
    margin-top: 50px;
    ${(() => css`margin-bottom: 6px;`)()}
  }
  ${css`padding-top: 20px; background-color: yellow;`}
  ${[
    '@media screen {',
      css`margin-left: 100px;`,
    '}'
  ]}
`;

const stackBase = css`
  && > * + * { margin-top: var(--stack-gap); }
`;

const stack = gap => [stackBase, css`--stack-gap: ${gap};`]

const danger = css`
  color: orange;
`

const base = css`
  color: forestgreen;
`

const globalStyles = css`
  body {
    color: black;
    line-height: 1.4;
  }
`;

export const Test = () => (
  <>
    <Global styles={globalStyles} />
    <div css={stack(20)}>this is 20</div>
    <div css={stack(40)}>this is 40</div>
    <div className={`${mqtest}-modifier`} css={[mqtest]}>
      <p>is this thing on?</p>
    </div>
    <div css={[base, danger]} >
      <MyBox css={css`color: green;`} />
    </div>
  </>
);
