import React from 'react';
import { styled } from 'linaria/react';
import { css, cx } from 'linaria';

const fooBar = css`
  content: 'foobar';
`;

const SubComponent = () => (
  <>
    <p className={fooBar}></p>
  </>
)

export default SubComponent;
