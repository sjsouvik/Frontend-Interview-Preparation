/**
 *
 * Write a function which takes 2 objects and compare, if the both objects contain same keys and values corresponding to keys then return true else false.
 *
 */

//asked in Techmojo

function compareObjects(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (let key in obj1) {
    if (key in obj2) {
      if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
        return compareObjects(obj1[key], obj2[key]);
      } else if (obj1[key] === obj2[key]) {
        return true;
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
console.log(compareObjects({ a: { d: 1 }, b: 2 }, { b: 2, a: { d: 1 } }));
