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
  let countOfRejectedPromises = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((error) => {
          errors[index] = error;
          countOfRejectedPromises += 1;
          if (countOfRejectedPromises === promises.length) {
            reject(errors);
          }
        });
    });
  });
}

myPromiseAny([asyncTask(1000), Promise.reject(20)])
  .then(console.log)
  .catch(console.error);

myPromiseAny([Promise.reject(10), Promise.reject(20)])
  .then(console.log)
  .catch(console.error);
