/**
 *
 * Write a function memoize() which takes a function as an argument and subsequent calls to the memoized function with the same arguments are fast.
 *
 */

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }

  return n * factorial(n - 1);
}

function memoizedFunction(fn) {
  const cache = {};

  return function () {
    const args = JSON.stringify(arguments);

    if (args in cache) {
      console.log("Result from cache...");
      return cache[args];
    }

    console.log("Calculating...");
    const calculatedValue = fn.apply(this, arguments);
    cache[args] = calculatedValue;
    return cache[args];
  };
}

const functionMemoized = memoizedFunction(factorial);
console.log(functionMemoized(5));
console.log(functionMemoized(5));
console.log(functionMemoized(4));
