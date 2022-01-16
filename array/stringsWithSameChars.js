/**
 *
 * Given an array of strings, find number of strings with similar number of characters.
 *
 * input: ["mango", "apple", "orange", "papaya"]
 * output: {'5': 2, '6': 2}
 *
 */

function stringWithSameCharsCount(arr) {
  return arr.reduce((acc, str) => {
    const strLength = str.length;

    if (strLength in acc) {
      acc[strLength] += 1;
    } else {
      acc[strLength] = 1;
    }

    return acc;
  }, {});
}

console.log(stringWithSameCharsCount(["mango", "apple", "orange", "papaya"]));

// Functional programming - maintaining immutability
function stringWithSameCharsCountFn(arr) {
  return arr.reduce((acc, str) => {
    const strLength = str.length;

    if (strLength in acc) {
      return { ...acc, [strLength]: acc[strLength] + 1 };
    } else {
      return { ...acc, [strLength]: 1 };
    }
  }, {});
}

console.log(
  stringWithSameCharsCountFn(["mango", "orange", "papaya", "jackfruit"])
);
