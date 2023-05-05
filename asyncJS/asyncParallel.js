/*

You are asked to implement an async function helper, parallel() which works like Promise.all(). Different from sequence(), the async function doesn't wait for each other, rather they are all triggered together.

All async functions have following interface

type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void
Your parallel() should accept AsyncFunc array, and return a new function which triggers its own callback when all async functions are done or an error occurs.

Suppose we have an 3 async functions

const async1 = (callback) => {
   callback(undefined, 1)
}

const async2 = (callback) => {
   callback(undefined, 2)
}

const async3 = (callback) => {
   callback(undefined, 3)
}
Your parallel() should be able to accomplish this

const all = parallel(
  [
    async1,
    async2,
    async3
  ]
)

all((error, data) => {
   console.log(data) // [1, 2, 3]
}, 1)
When error occurs, only first error is passed down to the last. Later errors or data are ignored.

 */

/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function parallel(funcs) {
  return function (callback) {
    const result = [];
    let gotError = false;

    funcs.forEach((asyncFunc) => {
      asyncFunc((error, value) => {
        if (gotError) {
          return;
        }

        if (error) {
          callback(error, undefined);
          gotError = true;
          return;
        }

        result.push(value);

        if (result.length === funcs.length) {
          callback(undefined, result);
        }
      });
    });
  };
}
