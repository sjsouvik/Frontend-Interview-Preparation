/**
 *
 * Write a function compose() which can take any number of functions and return a function which will run those given functions in order when called with an argument.
 *
 */

const increment = (num) => num + 1;
const square = (num) => num * num;

const compose = function (...functions) {
  return function (num) {
    return functions.reduce((accumulator, currentFunction) => {
      accumulator = currentFunction(accumulator);
      return accumulator;
    }, num);
  };
};

const returnedFunction = compose(increment, square, increment);
console.log(returnedFunction(2));
