/**
 *
 * Write a polyfill to reverse a string
 *
 */

//asked in Techmojo

String.prototype.myReverse = function () {
  const inputStr = this;
  let outputStr = "";

  for (let i = 0; i < inputStr.length; i++) {
    outputStr = inputStr[i] + outputStr;
  }

  return outputStr;
};

console.log("auto".myReverse());
