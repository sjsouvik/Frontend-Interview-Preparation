/**
 *
 * Given an array of integers, finc the sum of all odd and even numbers.
 *
 */

function oddEvenSum(arr) {
  return arr.reduce(
    (accumulator, currentItem) => {
      if (currentItem % 2 === 0) {
        accumulator["evenSum"] += currentItem;
      } else {
        accumulator["oddSum"] += currentItem;
      }

      return accumulator;
    },
    { oddSum: 0, evenSum: 0 }
  );
}

console.log(oddEvenSum([2, 3, 5, 6, 8]));

// solving the same problem while maintaining immutability - Functional Programming

function oddEvenSumFn(arr) {
  return arr.reduce(
    (accumulator, currentItem) => {
      if (currentItem % 2) {
        return { ...accumulator, oddSum: accumulator["oddSum"] + currentItem };
      } else {
        return {
          ...accumulator,
          evenSum: accumulator.evenSum + currentItem,
        };
      }
    },
    { oddSum: 0, evenSum: 0 }
  );
}

console.log(oddEvenSumFn([2, 3, 5, 6, 8]));
