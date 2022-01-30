/***
 *
 * Create a function count(), when called it should return how many times it has been called,
 * count.reset() should also implemented which would reset that count of function being invoked.
 *
 */

// This is known as Module pattern which we use to create private variables. Here, `counter` variable is private. With help of closure, scope and IIFE, we create this pattern
const count = (() => {
  let counter = 0;

  const innerFunction = () => (counter += 1);
  innerFunction.reset = () => (counter = 0);

  return innerFunction;
})();

console.log(count());
console.log(count());
console.log(count());

count.reset();

console.log(count());
console.log(count());

// This can also be written as the following without IIFE

function countWithoutIIFE() {
  let counter = 0;

  const innerFunction = function () {
    return (counter += 1);
  };

  innerFunction.reset = function () {
    counter = 0;
  };

  return innerFunction;
}

const returnedFunction = countWithoutIIFE();

console.log(returnedFunction());
console.log(returnedFunction());
console.log(returnedFunction());

returnedFunction.reset();

console.log(returnedFunction());
console.log(returnedFunction());
