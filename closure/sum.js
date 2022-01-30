/***
 *
 * Create a function sum() which makes the following possible
 *
 * sum(2)(3) == 4 // false
 * sum(5)(-1)(2) == 6 // true
 *
 */

function sum(num) {
  const innerFunction = (num2) => {
    return num2 ? sum(num + num2) : num;
  };

  innerFunction.valueOf = () => num; // this is to override the definition of `valueOf()` so that it returns the total sum while comparing with the primitive value
  return innerFunction;
}

console.log(sum(2)(3) == 5); // sum(2)(3) returns a function which will be type casted using `valueOf()` and gets the total sum to compare equality
