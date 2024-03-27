/*

Do you know how instanceOf works ?

If so, please write you own `myInstanceOf()`.

```javascript
class A {}
class B extends A {}

const b = new B()
myInstanceOf(b, B) // true
myInstanceOf(b, A) // true
myInstanceOf(b, Object) // true

function C() {}
myInstanceOf(b, C) // false
C.prototype = B.prototype
myInstanceOf(b, C) // true
C.prototype = {}
myInstanceOf(b, C) // false
```

******************************************************Solution************************************************/

/**
 * @param {any} obj
 * @param {target} target
 * @return {boolean}
 */

/* 
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof

  The `instanceof` operator tests to see if the prototype property of a constructor 
  function (or, class or, target in this problem) appears anywhere in the prototype 
  chain of an object.
*/

function myInstanceOf(obj, target) {
  /* An instance has to be an object. If obj is not an object, it cannot
    be an instance of anything. If obj is null (i.e. we reached the top of 
    the prototype chain), it isn't an instance of target */
  if (obj === null || typeof obj !== "object") {
    return false;
  }

  if (Object.getPrototypeOf(obj) === target.prototype) {
    return true;
  }

  return myInstanceOf(Object.getPrototypeOf(obj), target);
}
