/**
 *
 * Write a function myPromiseAll which takes an array of Promises as an argument, and retuns a promise, which if resolved, returns
 * the result of each promise in an array, or an error catch block, if one of the promises is rejected.
 *
 */

function asyncTask(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(delay), delay);
  });
}

/**
 * Used Promise.resolve() so that myPromiseAll() can resolve even if the given inputs are not promise objects.
 *
 * Promise.resolve() - it takes a value and returns a promise object which resolves to that given value. If the given value is promise, then it returns the same promise.
 * Refer to this https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve to know more about Promise.resolve().
 *
 */
function myPromiseAll(promises) {
  const result = [];
  let taskCompleted = 0;

  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve(result);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((data) => {
          result[index] = data;
          taskCompleted += 1;

          if (taskCompleted === promises.length) {
            resolve(result);
          }
        })
        .catch((error) => reject(error));
    });
  });
}

myPromiseAll([4000, asyncTask(1000), asyncTask(2000), Promise.resolve(5000)])
  .then(console.log)
  .catch(console.error);
