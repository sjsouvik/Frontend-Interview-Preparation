/*

The `Array.prototype.concat` method on JavaScript arrays is used to merge two or more arrays. This method 
does not change the existing arrays, but instead returns a new array.

Implement `Array.prototype.concat`. To avoid overwriting the actual `Array.prototype.concat` which is being 
used by the autograder, we shall instead implement it as `Array.prototype.myConcat`.

Examples:

[1, 2, 3].myConcat([4, 5, 6]); // [1, 2, 3, 4, 5, 6]
[1, 2, 3].myConcat(4, 5, 6); // [1, 2, 3, 4, 5, 6]
[1, 2, 3].myConcat(4, [5, 6]); // [1, 2, 3, 4, 5, 6]

Notes:

As seen from the examples, `Array.prototype.concat` accepts a variadic number of arguments and depending 
on whether the argument is a primitive or an array/array-like object, they are handled differently. 
You are not required to handle arguments with the property `Symbol.isConcatSpreadable` set, but you are 
recommended to read the specification for Array.prototype.concat on MDN Docs before attempting.

******************************************************Solution************************************************/

/**
 * @template T
 * @param {...(T | Array<T>)} items
 * @return {Array<T>}
 */
Array.prototype.myConcat = function (...args) {
  const result = [...this];

  for (const arg of args) {
    if (Array.isArray(arg)) {
      result.push(...arg);
    } else {
      result.push(arg);
    }
  }

  return result;
};

console.log([1, 2].myConcat([4, 5], [6, 8]));
