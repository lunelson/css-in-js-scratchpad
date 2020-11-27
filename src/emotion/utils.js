import { css } from '@emotion/css';

// TRICK: https://ultimatecourses.com/blog/understanding-javascript-types-and-reliable-type-checking#true-object-types
export const classof = (value) => Object.prototype.toString.call(value).slice(8, -1);

export const isString = (value) => classof(value) === 'String';
export const isDate = (value) => classof(value) === 'Date';
export const isRegExp = (value) => classof(value) === 'RegExp';
export const isNumber = (value) => classof(value) === 'Number' && !Number.isNaN(value);
export const isNaN = (value) => Number.isNaN(value);
export const isInteger = (value) => Number.isInteger(value);
export const isBoolean = (value) => classof(value) === 'Boolean';
export const isNull = (value) => classof(value) === 'Null';
export const isUndefined = (value) => classof(value) === 'Undefined';
export const isFunction = (value) => classof(value) === 'Function';
export const isArray = (value) => classof(value) === 'Array';
export const isObject = (value) => classof(value) === 'Object';
export const isSymbol = (value) => classof(value) === 'Symbol';
export const isMap = (value) => classof(value) === 'Map';
export const isSet = (value) => classof(value) === 'Set';
export const isWeakMap = (value) => classof(value) === 'WeakMap';
export const isWeakSet = (value) => classof(value) === 'WeakSet';

// export function memoize( fn ) {
//   return function (...args) {
//     hash = "",
//     i = args.length;
//     currentArg = null;
//     while (i--) {
//       currentArg = args[i];
//       hash += (currentArg === Object(currentArg)) ?
//       JSON.stringify(currentArg) : currentArg;
//       fn.memoize || (fn.memoize = {});
//     }
//     return (hash in fn.memoize) ? fn.memoize[hash] :
//     fn.memoize[hash] = fn.apply(this, args);
//   };
// }

export const breakpoints = {
  xs: 24,
  s: 32,
  m: 48,
  ml: 64,
  l: 80,
  xl: 96,
};

// export function parseValue(n) {
//   const type = typeof n;
//   if (!['string', 'number'].includes(type)) {
//     throw Error(`invalid type for CSS value: ${type}`);
//   }
//   n = type === 'string' ? n.trim() : n;
//   const value = parseFloat(n);
//   if (Number.isNaN(value)) return { value: n };
//   const unit = type === 'string' ? n.replace(value, '') : '';
//   return { value, unit };
// }

export function stringifyValue(n, fn) {
  n = typeof n === 'string' ? n.trim() : n;
  const number = parseFloat(n);
  if (Number.isNaN(number)) return n;
  const unit = String(n).replace(number, '');
  return `${fn ? fn(number) : number}${unit || 'px'}`;
}

// export function assertUnit(n, unit = 'px') {
//   n = typeof n === 'string' ? n.trim() : n;
//   const number = parseFloat(n);
//   if (Number.isNaN(number)) return n;
//   return `${number}${unit}`;
// }

export function queryString(query) {
  let [lo, hi] = [].concat(query);
  lo == '_' && (lo = undefined);
  hi == '_' && (hi = undefined);
  const loValue = breakpoints[lo] || lo;
  const hiValue = breakpoints[hi] || hi;
  const loQuery = loValue ? ` and (min-width: ${loValue}em)` : '';
  const hiQuery = hiValue ? ` and (max-width: ${hiValue - 0.01}em)` : '';
  return loQuery || hiQuery ? `@media screen${loQuery}${hiQuery}` : '';
}

export const media = (query, expr) => {
  const qs = queryString(query, breakpoints);
  return qs ? [`${qs} {`, expr, `}`] : [ expr ];
}

export function isBreakPointObj(obj) {
  return isObject(obj)
  // && '_' in obj
  && Object.keys(obj).every(key => key == '_' || key in breakpoints);
}

export function responsiveClass(bk, key) {
  return bk=='_' ? `${key}` : `${bk}__${key}`;
}

// export function reduceStyleProp(prop, key) {
//   const classes = []; const styles = [];
//   for (const bk in prop) {
//     classes.push(responsiveClass(bk, key));
//     styles.push(media(bk, `--${key}: ${stringifyValue(prop[bk])}`))
//   }
//   return [classes, styles];
// }

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

// export function gatherStyleProps(props) {
//   const keys = Object.keys(props), styleProps = {}, restProps = {};
//   let n = keys.length, key = undefined;
//   while (n--) {
//     key = keys[n];
//     if (~stylePropKeys.indexOf(key)) styleProps[key] = props[key];
//     else restProps[key] = props[key];
//   }
//   return [styleProps, restProps];
// }

export function parseStylePropValue(value, key) {
  /*

  TODO: look up special value output rules here

  - css keyword value -> output
  - sys keyword value -> parse value and output
  - theme key -> look up and output

  */
  return stringifyValue(value);
}

export function parseStyleProps(props) {
  const
    propKeys = Object.keys(props),
    classNames = [],
    styleRules = [],
    restProps = {};
  let n = propKeys.length,
    propKey = undefined;
  while (n--) {
    propKey = propKeys[n];
    if (~stylePropKeys.indexOf(propKey)) {
      let prop = props[propKey];
      prop = isBreakPointObj(prop) ? prop : { _: prop };
      for (const bk in prop) {
        classNames.push(responsiveClass(bk, propKey));
        styleRules.push(media(bk, `--${propKey}: ${parseStylePropValue(prop[bk])};`));
      }
    }
    else restProps[propKey] = props[propKey];
  }
  return [classNames.concat(css`${styleRules}`), restProps];
}

// export function parseStyleProps(props) {
//   const classNames = [], styleRules = [];
//   const restProps = Object.keys(props).reduce((obj, key) => {
//     if (~stylePropKeys.indexOf(key)) {
//       let prop = props[key];
//       prop = isBreakPointObj(prop) ? prop : { _: prop };
//       for (const bk in prop) {
//         classNames.push(responsiveClass(bk, key));
//         styleRules.push(media(bk, `--${key}: ${stringifyValue(prop[bk])};`));
//       }
//     }
//     else
//     obj[key] = props[key];
//     return obj;
//   }, {});
//   return [classNames.concat(css`${styleRules}`), restProps];
// }
