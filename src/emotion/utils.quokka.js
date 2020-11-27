import { css } from '@emotion/css';
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
 } from './utils';

// console.log(parseCssValue('35'))
// console.log(parseCssValue('35'))
// console.log(parseCssValue('35px'))
// console.log(parseCssValue('35rem'))
// console.log(modifyValue(35, n => n*2));
// console.log(modifyValue('35', n => n*2));
// console.log(modifyValue('35px', n => n*2));
// console.log(modifyValue('35rem', n => n*2));

// breakpoints[null];//?
// breakpoints[undefined];//?
// breakpoints['s'];//?
// breakpoints['m'];//?

// console.log(queryString(['s']))
// console.log(queryString(['_']))

// NOTE: this returns an array of all node_modules locations !
// require.resolve.paths(''); //?

const testObj = { mt: 'yes', children: [], gap: [] };

export const stylePropKeys = `

mt
mr
mb
ml
my
mx
pt
pr
pb
pl
py
px
gapY

`.trim().split('\n').filter(Boolean);

export function gatherStyleProps2(props, stylePropKeys) {
  const classNames = [], styleRules = [];
  const restProps = Object.keys(props).reduce((obj, key) => {
    if (~stylePropKeys.indexOf(key)) {
      let prop = props[key];
      prop = isBreakPointObj(prop) ? prop : { _: prop };
      for (const bk in prop) {
        classNames.push(responsiveClass(bk, key));
        styleRules.push(media(bk, css`--${key}: ${stringifyValue(prop[bk])};`));
      }
    }
    else
      obj[key] = props[key];
    return obj;
  }, {});
  return [classNames.concat(css`${styleRules}`), styleRules, restProps];
}


// gatherStyleProps(testObj, ['mt', 'gap']); //?
// isBreakPointObj({_: 30, m: 20, l: 0}); //?
// reduceStyleProp({_: 30, m: 20, l: 0}, 'mt'); //?

(function(){
  const props = {
    py: 20,
    mb: { s: 20 },
    mt: {_: 30, m: 20, l: 0},
    gapY: 20,
    children: [],
  };
  const [classes, styles, restProps] = gatherStyleProps2(props, stylePropKeys);
  classes; //?
  styles; //?
  // restProps; //?
})()
