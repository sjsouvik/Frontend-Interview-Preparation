const fruits = ["mango", "watermelon", "banana"];

// use reduce() when you need to get a single value out of an array, for detailed explaination refer to MDN docs for reduce()
// [].reduce((accumulator, currentItem, index, array) => {...}, initialValue)
const reducedResult = fruits.reduce((acc, item) => {
  // return { ...acc, [item]: item.length }; // create and return a new copy of the object to maintain immutability, follow immutability in case of functional programming and wherever it's required
  acc[item] = item.length;
  return acc;
}, {});

console.log(reducedResult);

console.log("**************polyfill for reduce()***************");
Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue; //single value that would be returned from this funciton as result, initialized this to initialValue

  for (let i = 0; i < this.length; i++) {
    if (!accumulator) {
      accumulator = this[i]; // if initialValue is undefined, in that case 1st item of the array would be considered as initialValue
    } else {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }

  return accumulator;
};

const reducedValue = fruits.myReduce((acc, fruit) => {
  acc[fruit] = fruit.length;
  return acc;
}, {});

console.log(reducedValue);
