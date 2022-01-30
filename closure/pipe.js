/***
 *
 * Create a pipe() function, which chains multiple functions(times(), plus(), subtract(), divide() as mentioned below) together
 * to create a new function. This is a problem on `Composition`.
 *
 */

const times = (y) => (x) => x * y;
const plus = (y) => (x) => x + y;
const subtract = (y) => (x) => x - y;
const divide = (y) => (x) => x / y;

const pipe = (functions) => {
  return function (x) {
    return functions.reduce((accumulator, currentFunction) => {
      accumulator = currentFunction(accumulator);
      return accumulator;
    }, x);
  };
};

console.log(pipe([times(2), plus(3), times(3), divide(3), subtract(3)])(10));
