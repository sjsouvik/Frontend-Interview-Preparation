/**
 *
 * Write a function which would take input and give output as mentioned below:
 *
 * input: sum(3)(2)()
 * output: 5
 *
 */

function sum(a) {
  return function (b) {
    return function () {
      return a + b;
    };
  };
}

const sumUsingArrowFunctions = (a) => {
  return (b) => {
    return () => {
      return a + b;
    };
  };
};

const sumWithShortSyntax = first => second => _ => first + second; // if there's no argument passed to an arrow function, we can use '_' there

console.log(sum(2)(3)());
console.log(sumUsingArrowFunctions(2)(3)());
console.log(sumWithShortSyntax(2)(3)());

/**
 *
 * Advanced version of 1st problem:
 *
 * Write a function which would take input and give output as mentioned below:
 *
 * input: sum(1)(2)(3)...(n)()
 * output: n(n + 1)/2
 *
 */

//asked in Techmojo, Unacademy

function sumAdvanced(first) {
  return function (second) {
    return second ? sumAdvanced(first + second) : first;
  };
}

const sumAdvancedUsingArrowFunctions = first => second => second ? sumAdvancedUsingArrowFunctions(first + second) : first;

console.log(sumAdvanced(1)(2)(3)());
console.log(sumAdvancedUsingArrowFunctions(2)(5)(3)());
