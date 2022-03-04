/**
 *
 * Write a function which takes 2 objects and compare, if the both objects contain same keys and values corresponding to keys then return true else false.
 * Refer to the problem - isEqual() in recursion section to have a better solution and understand little more complex kind of problem on data comparison.
 */

//asked in Techmojo

function compareArrays(arr1, arr2){
  if(arr1.length !== arr2.length){
    return false;
  }

  for(let i = 0; i < arr1.length; i++){
    if(Array.isArray(arr1[i]) && Array.isArray(arr2[i])){
      if(!compareArrays(arr1[i], arr2[i])){
        return false;
      }
    } else if(typeof(arr1[i]) === 'object' && typeof(arr2[i]) === 'object'){
      if(!compareObjects(arr1[i], arr2[i])){
        return false;
      }
    } else if(arr1[i] !== arr2[i]){
      return false;
    }
  }

  return true;
}

function compareObjects(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (let key in obj1) {
    if (key in obj2) {
      if(Array.isArray(obj1[key]) && Array.isArray(obj2[key])){
        if(!compareArrays(obj1[key], obj2[key])){
          return false;
        }
      } else if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
        if(!compareObjects(obj1[key], obj2[key])){
          return false;
        }
      } else if (obj1[key] !== obj2[key]) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
}

const firstObj = { a: 1, b: 2 };
const secondObj = { b: 2, a: 1, c: 1 };

console.log(compareObjects(firstObj, secondObj));
console.log(compareObjects({ a: { d: 1 }, b: 2, c:[2, 3, 4] }, { b: 2, a: { d: 1 }, c:[2, 3, 4] }));
