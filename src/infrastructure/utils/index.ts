//@ts-nocheck
export const curry = (fn) => {
  const curried = (...args) => {
    return fn.length === args.length ? fn(...args) : (...rest) => curried(...args, ...rest);
  };
  return curried;
};

export const projection = curry((descriptor, src) => {
  const fragment = {};
  for (const item in descriptor) {
    fragment[item] = typeof descriptor[item] === 'function' ? descriptor[item](src) : src[descriptor[item]];
  }
  return fragment;
});
