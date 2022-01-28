/**
 *
 * Write a function to implement Promise.race() from scratch.
 *
 */

function asyncTask(delay) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(delay), delay)
  );
}

function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((data) => resolve(data))
        .catch(reject);
    });
  });
}

myPromiseRace([asyncTask(1000), Promise.reject("Oops! Got some error"), 4])
  .then(console.log)
  .catch(console.error);
