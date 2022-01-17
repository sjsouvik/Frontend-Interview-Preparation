/**
 *
 * Write a polyfill for toLowerCase().
 *
 */

String.prototype.myToLowerCase = function () {
  const str = this;
  let output = "";

  for (let i = 0; i < str.length; i++) {
    const asciiOfChar = str.charCodeAt(i);

    //ASCII value of "A" is 65, "a" is 97
    if (asciiOfChar >= 65 && asciiOfChar <= 90) {
      output += String.fromCharCode(asciiOfChar + 32);
    } else {
      output += str[i];
    }
  }

  return output;
};

console.log("HEl4l.?O".myToLowerCase());
