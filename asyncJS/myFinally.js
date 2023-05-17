/**
 
Promise.prototype.finally() could be used to run a callback when a promise is settled(either fulfilled or rejected).

Notice that the callback passed finally() doesn't receive any argument, meaning it doesn't modify the value in the promise chain (care for rejection).

*/

// refer to this https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally to know more about finally()

/**
 * @param {Promise<any>} promise
 * @param {() => void} onFinally
 * @returns {Promise<any>}
 */

async function myFinally(promise, onFinally) {
  try {
    const resolvedValue = await promise;
    await onFinally();
    return resolvedValue;
  } catch (error) {
    await onFinally();
    throw error;
  }
}
