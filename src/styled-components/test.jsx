import React from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';

const MyBox = styled.div`
  color: red;
  height: 200px;
`;

const GlobalStyle = createGlobalStyle`
  body {
    color: red;
  }
`;

const myStyle = css`
  margin-bottom: 16px;
`;

export const Test = () => (
  <>
    <GlobalStyle />
    <div css={`
      background-color: darkgreen;
      color: beige;
    `} >
      <MyBox css={[myStyle, css`color: green;`]} />
    </div>
  </>
);
