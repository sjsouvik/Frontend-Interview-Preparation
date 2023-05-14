/***
 *
 * Implement your own Promise from scratch.
 *
 */

class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.result = null;
    this.callbacks = [];

    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);

    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(value) {
    if (this.state !== "pending") {
      return;
    }

    this.state = "fulfilled";
    this.result = value;
    this.handleSettled("onFulfilled");
  }

  reject(value) {
    if (this.state !== "pending") {
      return;
    }

    this.state = "rejected";
    this.result = value;
    this.handleSettled("onRejected");
  }

  handleSettled(promiseState) {
    queueMicrotask(() => {
      for (const callback of this.callbacks) {
        try {
          const returnedValue = callback[promiseState](this.result);
          if (returnedValue instanceof MyPromise) {
            returnedValue.then(callback.resolve, callback.reject);
          } else {
            callback.resolve(returnedValue);
          }
        } catch (error) {
          callback.reject(error);
        }
      }
    });
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.callbacks.push({
        onFulfilled: onFulfilled || ((value) => value),
        onRejected:
          onRejected ||
          ((error) => {
            throw error;
          }),
        resolve,
        reject,
      });
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    return this.then(onFinally, onFinally);
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(value) {
    return new MyPromise((_, reject) => reject(value));
  }
}

const myPromise = new MyPromise((resolve, reject) => {
  const success = true;
  setTimeout(
    () => (success ? resolve(20) : reject("Something went wrong!")),
    1000
  );
});

myPromise
  .then((data) => data + 15)
  .then(console.log)
  .catch((error) => console.log(error));
