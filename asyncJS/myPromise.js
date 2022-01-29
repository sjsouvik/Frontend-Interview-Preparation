/***
 *
 * Implement your own Promise from scratch.
 *
 */

class MyPromise {
  constructor(executor) {
    this.promiseChain = [];

    this.onResolve = this.onResolve.bind(this);
    this.onReject = this.onReject.bind(this);
    executor(this.onResolve, this.onReject);

    this.handleError = () => {};
  }

  onResolve(value) {
    let storedValue = value;

    try {
      this.promiseChain.forEach(
        (successHandler) => (storedValue = successHandler(storedValue))
      );
    } catch (error) {
      this.promiseChain = [];
      this.onReject(error);
    }
  }

  onReject(error) {
    this.handleError(error);
  }

  then(successHandler) {
    this.promiseChain.push(successHandler);
    return this;
  }

  catch(errorHandler) {
    this.handleError = errorHandler;
    return this;
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }

    return new MyPromise((resolve) => resolve(value));
  }

  static reject(value) {
    return new MyPromise((_, reject) => reject(value));
  }
}

const myPromise = new MyPromise((resolve, reject) => {
  const success = true;
  setTimeout(
    () => (success ? resolve(20) : reject("Something went wrong")),
    1000
  );
});

myPromise
  .then((data) => data + 15)
  .then(console.log)
  .catch((error) => console.log(error));
