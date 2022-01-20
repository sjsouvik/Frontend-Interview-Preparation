/**
 *
 * Write a function to throttle a heavy function call
 *
 */

function apiCall(caller) {
  console.log("API is called by", caller);
}

function throttle(fn, delay) {
  let flag = true;

  return function () {
    if (flag) {
      const context = this,
        args = arguments;
      fn.apply(context, args);
      flag = false;

      setTimeout(function () {
        flag = true;
      }, delay);
    }
  };
}

const throttledFunction = throttle(apiCall, 300);
throttledFunction("Souvik");

// Solving the same problem with ES6

const throttleFunction = (fn, delay) => {
  let flag = true;

  return (...args) => {
    if (flag) {
      fn.apply(this, args);
      flag = false;

      setTimeout(() => (flag = true), delay);
    }
  };
};

const throttledFn = throttle(apiCall, 300);
throttledFn("Souvik + ES6");
