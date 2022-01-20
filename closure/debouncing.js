/**
 *
 * Write a function to debounce a heavy function call/api call.
 *
 */

function apiCall(caller) {
  console.log("API is called by", caller);
}

function debounce(fn, delay) {
  let timer;

  return function () {
    const context = this,
      args = arguments;
    clearTimeout(timer);

    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

const improvedFunction = debounce(apiCall, 300);
improvedFunction("Souvik");

// Solving the same problem with ES6

const debounceFunction = (fn, delay) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

const improvedFn = debounce(apiCall, 300);
improvedFn("Souvik + ES6");
