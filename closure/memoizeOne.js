/*

In problem 14. Implement a general memoization function, you are asked to implement a memo 
function without space concern.

But in reality, it could be a problem if cache bloats.

You might need to restrict the cache capacity, just like memoize-one , it only remembers the latest 
arguments and result.

Please implement your own memoizeOne(), it takes 2 arguments

1. target function
2. (optional) a equality check function to compare current and last arguments

Default equality check function should be a shallow comparison on array items with strict equal ===.

*****************************************************Solution*************************************************/

/**
 * @param {Function} func
 * @param {(args: any[], newArgs: any[]) => boolean} [isEqual]
 * @returns {any}
 */

function defaultIsEqual(newArgs, prevArgs) {
  return JSON.stringify(newArgs) === JSON.stringify(prevArgs);
}

function memoizeOne(func, isEqual = defaultIsEqual) {
  let cache = {};

  return function (...args) {
    if (cache.thisRef === this && isEqual(args, cache.args)) {
      return cache.value;
    }

    const value = func.apply(this, args);
    cache = { args, thisRef: this, value };
    return value;
  };
}
