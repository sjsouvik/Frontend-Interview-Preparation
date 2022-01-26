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

function myPromiseAll(promises) {
  const result = [];
  let taskCompleted = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
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

myPromiseAll([asyncTask(4000), asyncTask(1000), asyncTask(2000)])
  .then(console.log)
  .catch(console.error);
