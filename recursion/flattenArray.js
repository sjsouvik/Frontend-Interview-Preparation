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
