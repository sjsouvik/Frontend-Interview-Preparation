/*

Implement your own split() for strings.

******************************************************************Solution***************************************************/

// solution without using any JS array methods
String.prototype.mySplit2 = function (separator) {
  if (separator === undefined) {
    return [this];
  }

  const str = this,
    res = [];

  if (separator.length === 0) {
    for (const char of str) {
      res.push(char);
    }

    return res;
  }

  let word = "",
    matchedPart = "",
    j = 0;
  for (const currentChar of str) {
    if (currentChar === separator[j]) {
      if (j === separator.length - 1) {
        res.push(word);
        word = "";
        matchedPart = "";
        j = 0;
      } else {
        matchedPart += currentChar;
        j++;
      }
    } else {
      if (j) {
        j = 0;
        word += matchedPart + currentChar;
        matchedPart = "";
      } else {
        word += currentChar;
      }
    }
  }

  if (word) {
    res.push(word);
  }

  return res;
};

// recursive solution using JS array methods
String.prototype.mySplit = function (delimiter) {
  const inputString = this;

  if (delimiter === "") {
    return Array.from(inputString);
  }

  const result = [];

  function splitString(str, index) {
    if (index >= inputString.length) {
      return;
    }

    const indexOfDelimiter1stChar = str.indexOf(delimiter);

    if (indexOfDelimiter1stChar >= 0) {
      result.push(str.substring(0, indexOfDelimiter1stChar));
      splitString(
        str.substring(indexOfDelimiter1stChar + delimiter.length),
        indexOfDelimiter1stChar + delimiter.length
      );
    } else {
      result.push(str);
    }
  }

  splitString(inputString, 0);
  return result;
};

const strTest = "abxc abdef";
console.log("Split testing", strTest.split());
console.log("polyfill testing of String.split() -", strTest.mySplit2());
console.log("updated polyfill testing of String.split() -", strTest.mySplit());
