const fruits = ["mango", "watermelon", "banana"];

// filter() creates and returns a new list or array populated with the items that satisfies the condition implemented by the provided callback function to it, use filter() when we need to filter out some items based on one condition
// [].filter((currentItem, index, array) => {...})
const returnedArray = fruits.filter((fruit) => {
  return fruit.length > 5;
});

console.log(returnedArray);

console.log("**************polyfill for filter()***************");
Array.prototype.myFilter = function (callback) {
  const newFruits = []; //created the array

  for (let i = 0; i < this.length; i++) {
    //passing currentItem, index, array as arguments to the callback as the callback of filter() takes index and array as optional parameters along with currentItem and pushing the currentItem to the newly created array if the currentItem satisfies the condition implemented by the callback
    if (callback(this[i], i, this)) {
      newFruits.push(this[i]);
    }
  }
  return newFruits; //returned the manipulated array
};

const newlyCreatedArray = fruits.myFilter((fruit) => {
  return fruit.length > 5;
});

console.log(newlyCreatedArray);
