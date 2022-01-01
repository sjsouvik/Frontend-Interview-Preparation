const fruits = ["mango", "watermelon", "banana"];

// map() creates and returns a new list or array populated with the results of invoking the provided callback function to it, use map() when we need to return a new array after all manipulation
// [].forMap((currentItem, index, array) => {...})
const returnedArray = fruits.map((fruit) => {
  return fruit;
});

console.log(returnedArray);

console.log("**************polyfill for map()***************");
Array.prototype.myMap = function (callback) {
  const newFruits = []; //created the array

  for (let i = 0; i < this.length; i++) {
    newFruits.push(callback(this[i], i, this)); //passing currentItem, index, array as arguments to the callback as the callback of map() takes index and array as optional parameters along with currentItem and pushed the result of the callback to the newly created array
  }

  return newFruits; //returned the manipulated array
};

const newlyCreatedArray = fruits.myMap((fruit) => {
  return fruit;
});

console.log(newlyCreatedArray);
