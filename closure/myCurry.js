/**
 *
 * implement a curry() function, which accepts a function and return a curried one.
 * 
 * Example:

const join = (a, b, c) => {
   return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)

curriedJoin(1, 2, 3) // '1_2_3'

curriedJoin(1)(2, 3) // '1_2_3'

curriedJoin(1, 2)(3) // '1_2_3'
 
 *
 */

function join(a, b, c) {
  return `${a}_${b}_${c}`;
}

function myCurry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    return function (...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

const curriedJoin = myCurry(join);
console.log(curriedJoin(1, 2, 3));

console.log(curriedJoin(1)(2)(3));
console.log(curriedJoin(1, 2)(3));
console.log(curriedJoin(1)(2, 3));
