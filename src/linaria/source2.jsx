import React from 'react';
import { styled } from 'linaria/react';
import { css, cx } from 'linaria';

const fooBar = css`
  content: 'foobar';
`;

export const SubComponent = () => (
  <>
    <p className={fooBar}></p>
  </>
)
