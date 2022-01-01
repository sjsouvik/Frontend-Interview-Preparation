const fruits = ["mango", "watermelon", "banana"];

// forEach() doesn't return a new array or list. It is used to iterate through the array items and do some manipulation.
// [].forEach((currentItem, index, array) => {...})
fruits.forEach((fruit) => console.log(fruit)); //forEach() Higher Order Function

console.log("**************polyfill of forEach()***************");
Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this); //passing currentItem, index, array as arguments to the callback as the callback of forEach() takes index and array as optional parameters
  }
};

fruits.myForEach((fruit) => console.log(fruit));
