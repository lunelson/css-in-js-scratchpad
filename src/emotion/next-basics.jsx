import React from 'react';
import { css, cx, injectGlobal } from '@emotion/css';
import cn from 'clsx';

import {
  breakpoints,
  parseValue,
  stringifyValue,
  isObject,
  assertUnit,
  queryString,
  media,
  isBreakPointObj,
  responsiveClass,
  reduceStyleProp,
  gatherStyleProps,
  parseStyleProps,
 } from './utils';


const testCss = css`
  color: red;
  ${media([null, 40], css`padding-top: 5rem;`)}
  ${media('m', css`
    background: yellow;
    &::after {
      margin-left: -2rem;
    }
  `)}
`

function Box({mt, ml}) {
  const baseClasses = [
    mt && 'mt',
    ml && 'ml',
  ].filter(Boolean).concat(css`${[
    mt && `--mt: ${stringifyValue(mt)}`,
    ml && `--ml: ${stringifyValue(ml)}`,
  ].filter(Boolean)}`);
  return <div className={cn(baseClasses)} />
}

function gatherSysProps(props, systemKeys) {
  return Object.keys(props).reduce((arr, key) => {
    if (~systemKeys.indexOf(key)) arr[0][key] = props[key];
    else arr[1][key] = props[key];
    return arr;
  }, [{}, {}]);
}

function Box2({as: Tag = 'div', className, ...props}) {
  const [classNames, restProps] = parseStyleProps(props);
  return <Tag className={cn(classNames, className)} {...restProps} />
}

export const Test = () => (
  <>
    <Box2 mt={{s: 20, l: 0}} aria-labelledby="someID">hello world</Box2>
    <Box2 as='span' py={10} mt={{s: 20}} aria-labelledby="someID">hello world</Box2>
    <Box2 className="foobar" px="100"></Box2>
    {/* <Box mt="2" ml="3"></Box>
    <Box ml="3"></Box>
    <Box mt="2"></Box>
    <Box mt="2"></Box>
    <div className={cx(testCss)}></div>
    <p className={cx(css`color: blue;`)}>This is the content of a paragraph</p> */}
  </>
)
