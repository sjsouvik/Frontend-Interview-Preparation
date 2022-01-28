/**
 *
 * Write a function to implement Promise.any() from scratch.
 *
 */

function asyncTask(delay) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(delay), delay)
  );
}

function myPromiseAny(promises) {
  const errors = [];

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((error) => {
          errors[index] = error;
          if (errors.length === promises.length) {
            reject(errors);
          }
        });
    });
  });
}

myPromiseAny([Promise.reject(10), Promise.resolve(20)])
  .then(console.log)
  .catch(console.error);
