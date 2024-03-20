/*

please implement curry() which also supports placeholder.

Here is an example

```javascript
const  join = (a, b, c) => {
   return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)
const _ = curry.placeholder

curriedJoin(1, 2, 3) // '1_2_3'

curriedJoin(_, 2)(1, 3) // '1_2_3'

curriedJoin(_, _, _)(1)(_, 3)(2) // '1_2_3'
```

*****************************************************Solution*************************************************/

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */

// Refer to `myCurry.js` for the simpler version of this problem
function curry(fn) {
  return function inner(...args) {
    // to remove extra arguments
    args = args.slice(0, fn.length);
    const hasPlaceHolder = args.includes(curry.placeholder);

    if (!hasPlaceHolder && args.length === fn.length) {
      return fn.apply(this, args);
    }

    return function (...moreArgs) {
      return inner.apply(this, mergeArgs(args, moreArgs));
    };
  };
}

function mergeArgs(args, nextArgs) {
  // replacing the placeholders with the values from the next arguments
  args = args.map((arg) =>
    arg === curry.placeholder && nextArgs.length ? nextArgs.shift() : arg
  );

  /* merging args with the remaining items of nextArgs since it might happen that 
  args.length < nextArgs.length */
  return [...args, ...nextArgs];
}

curry.placeholder = Symbol();
