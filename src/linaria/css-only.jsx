import React from 'react';
import { css, cx } from 'linaria';

const myClass = css`
  color: green;
  display: block;
`;

const bg = (c) => ({ background: c });

const other = css`
  color: red;
  display: block;
  ${bg('blue')}
`;


function Box({ mt=0, className, ...rest }) {
  return (
    <div className={cx(className)} style={{'--mt': mt}} {...rest}/>
  );
}

export const Test = () => (
  <>
    <Box mt="30px"/>
    <div className={myClass}>hello world</div>
  </>
)
