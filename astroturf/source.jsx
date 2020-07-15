import React from 'react';
import styled, { css } from 'astroturf';

const MyBox = styled('div')`
  color: red;
  height: 400px;
`;

const styles = css`
  .myStyles {
    background-color: lightblue;
    background-color: green;
  }

  .danger {
    color: red;
  }

  .base {
    background-color: darkgreen;
    color: beige;
  }
`;

const globalStyles = css`
  body {
    color: red;
  }
`;

const Test = () => (
  <>
    <div className={styles.base} >
      <MyBox />
    </div>
  </>
);
