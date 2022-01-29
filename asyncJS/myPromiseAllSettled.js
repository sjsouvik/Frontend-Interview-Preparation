/**
 *
 * Write a function to implement Promise.allSettled() from scratch.
 *
 */

function myPromiseAllSettled(promises) {
  const result = [];
  let taskCompleted = 0;

  return new Promise((resolve, reject) => {
    if (!promises.length) {
      resolve(result);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          result[index] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          result[index] = { status: "rejected", reason };
        })
        .finally(() => {
          taskCompleted += 1;
          if (taskCompleted === promises.length) {
            resolve(result);
          }
        });
    });
  });
}

myPromiseAllSettled([Promise.reject(10), Promise.reject(20), 4])
  .then(console.log)
  .catch(console.error);
