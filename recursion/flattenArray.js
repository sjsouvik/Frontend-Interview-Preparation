/**
 * Write a function which can take one nested array as input and flat it as the following:
 *
 * input: [1, [2, 3], 4, [[5]]]
 * output: [1, 2, 3, 4, 5]
 *
 */

// asked in EPAM System

const nestedArr = [1, 2, [3, 4], 5, [[[6, 7], 8, [[[[9]]]]]]];

function flattenArray(inputArray) {
  let flattenedArray = [];

  for (let i = 0; i < inputArray.length; i++) {
    const currentItem = inputArray[i];

    if (Array.isArray(currentItem)) {
      flattenedArray = flattenedArray.concat(flattenArray(currentItem));
    } else {
      flattenedArray.push(currentItem);
    }
  }

  return flattenedArray;
}

console.log(flattenArray(nestedArr));

/***************************************polyfill for flattenArray()********************************************/

Array.prototype.flattenArray = function () {
  let flattenedArray = [];

  for (let i = 0; i < this.length; i++) {
    const currentItem = this[i];

    if (Array.isArray(currentItem)) {
      flattenedArray = flattenedArray.concat(currentItem.flattenArray());
    } else {
      flattenedArray.push(currentItem);
    }
  }

  return flattenedArray;
};

console.log(nestedArr.flattenArray());

/***************************************Polyfill of Array.flat() with the given depth**********************************/

/**
 * @param {any[]} arr
 * @param {number} depth
 * @return {any[]}
 */
const flat = function (arr, n) {
  const result = [];

  const flatUtil = (arr, n) => {
    for (const item of arr) {
      if (Array.isArray(item) && n > 0) {
        const depth = n - 1;
        flatUtil(item, depth);
      } else {
        result.push(item);
      }
    }
  };

  flatUtil(arr, n);
  return result;
};
