/*

This is a follow-up on create an Observable problem.

Suppose you have solved create an Observable problem, here you are asked to implement a creation operator from().

From the document, from()

Creates an Observable from an Array, an array-like object, a Promise, an iterable object, or an Observable-like object.

Your from() should accept all above types.

```javascript
from([1,2,3]).subscribe(console.log);
// 1
// 2
// 3
```

Note:

1. Observable is already given for you, no need to create it.
2. for the problem here, Observable-like means Observable instance. Though in real-world you should check Symbol.observable

**************************************************************Solution**********************************************************/

/**
 * @param {Array | ArrayLike | Promise | Iterable | Observable} input
 * @return {Observable}
 */
function from(input) {
  // converting array-like object to an array
  if ("length" in input) {
    input = Array.from(input);
  }

  if (input instanceof Observable) {
    return input;
  }

  if (typeof input[Symbol.iterator] === "function") {
    return new Observable((subscriber) => {
      try {
        for (const item of input) {
          subscriber.next(item);
        }
        subscriber.complete();
      } catch (error) {
        subscriber.error(error);
      }
    });
  }

  if (input instanceof Promise) {
    return new Observable((subscriber) => {
      input
        .then((value) => {
          subscriber.next(value);
        })
        .catch((error) => subscriber.error(error))
        .finally(() => subscriber.complete());
    });
  }

  throw new Error("Unsupported type");
}
