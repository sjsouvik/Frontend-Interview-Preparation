/**
 *
 * Write a polyfill for toUpperCase().
 *
 */

String.prototype.myToUpperCase = function () {
  const str = this;
  let output = "";

  for (let i = 0; i < str.length; i++) {
    const asciiOfChar = str.charCodeAt(i);

    //ASCII value of "A" is 65, "a" is 97
    if (asciiOfChar >= 97) {
      output += String.fromCharCode(asciiOfChar - 32);
    } else {
      output += str[i];
    }
  }

  return output;
};

console.log("hello".myToUpperCase());
