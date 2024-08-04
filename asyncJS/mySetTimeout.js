/*

Write a polyfill of `setTimeout()`

****************************************************Solution*************************************************/

/* 

Asked in Target

https://www.youtube.com/watch?v=j1-fbe5F5uE&ab_channel=JsCafe
https://medium.com/@choprabhishek630/lets-write-a-polyfill-for-settimeout-24564b1a7142

requestIdleCallback() only present in browser or, window object, so, this code would only work in browser
 - https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback 
 
*/

let timerId = 0;
const timerMap = {};

globalThis.mySetTimeout = function (callback, delay, ...args) {
  const id = timerId++;
  const startTime = Date.now();
  timerMap[id] = true;

  function triggerCallback() {
    if (timerMap[id] === undefined) {
      return;
    }

    if (Date.now() >= startTime + delay) {
      callback.apply(this, args);
    } else {
      requestIdleCallback(triggerCallback); // without `requestIdleCallback()`, the call stack size would exceed
    }
  }

  requestIdleCallback(triggerCallback);
  return id;
};

window.myClearTimeout = function (id) {
  delete timerMap[id];
};

globalThis.mySetTimeout((name) => console.log("hello", name), 100, "Souvik");
