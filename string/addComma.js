/*

Given a number, please create a function to add commas as thousand separators.

addComma(1) // '1'
addComma(1000) // '1,000'
addComma(-12345678) // '-12,345,678'
addComma(12345678.12345) // '12,345,678.12345'
Input are all valid numbers.

*******************************************************Solution****************************************************/

/**
 * @param {number} num
 * @return {string}
 */

// Solution 1: without using any method or, library

function addComma(num) {
  const [integer, float] = String(num).split(".");
  const fraction = float ? `.${float}` : "";
  let result = "",
    j = 0,
    currentChar;

  for (let i = integer.length - 1; i >= 0; i--) {
    currentChar = integer[i];
    if (j++ === 3 && typeof Number(currentChar) === "number") {
      j = 1;
      result = `${currentChar},` + result;
    } else {
      result = currentChar + result;
    }
  }

  return `${result}${fraction}`;
}

// Solution 2: using toLocaleString()

function addComma2(num) {
  const [integer, float] = String(num).split(".");
  const fraction = float ? `.${float}` : "";

  return `${Number(integer).toLocaleString()}${fraction}`;
}
