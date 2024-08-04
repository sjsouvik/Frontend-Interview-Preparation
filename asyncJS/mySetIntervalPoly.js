/*

Write a polyfill of `setInterval()`

****************************************************Solution*************************************************/

const intervalMap = {};
let intervalId = 1;

globalThis.mySetInterval = function (callback, delay, ...args) {
  intervalId++;

  function triggerCallback() {
    intervalMap[intervalId] = setTimeout(() => {
      callback.apply(this, args);

      if (intervalMap[intervalId]) {
        triggerCallback();
      }
    }, delay);
  }

  triggerCallback();

  return intervalId;
};

globalThis.myClearInterval = function (id) {
  clearTimeout(intervalMap[id]);
  delete intervalMap[id];
};

let counter = 0;
const id = globalThis.mySetInterval(
  (name) => {
    console.log("hello", name);

    counter++;
    if (counter === 2) {
      globalThis.myClearInterval(id);
    }
  },
  1 * 1000,
  "Souvik"
);
