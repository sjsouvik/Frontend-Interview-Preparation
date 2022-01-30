/***
 *
 * Create an object with property count, which increments every time count is accessed, initial value is 0.
 *
 */

// getter in JS: The get syntax binds an object property to a function that will be called when that property is looked up.
function createCounter() {
  let c = 0;

  return {
    get count() {
      return c++;
    },
  };
}

const counter = createCounter();
console.log(counter.count);
console.log(counter.count);
console.log(counter.count);
counter.count = 100; // can't be altered
console.log(counter.count);
