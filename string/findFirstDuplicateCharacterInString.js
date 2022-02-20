/*

Given a string which might have duplicate letters, write a function to find the first duplicate.


firstDuplicate('abca')
// 'a'

firstDuplicate('abcdefe')
// 'e'

firstDuplicate('abcdef')
// null

*/

// Solution 1: Using Map()

/**
 * @param {string} str
 * @return {string | null}
 */
function firstDuplicate(str) {
  const freqMap = new Map();

  for (const char of str) {
    if (freqMap.get(char)) {
      return char;
    }

    freqMap.set(char, 1);
  }

  return null;
}

// Solution 2: Using Object

/**
 * @param {string} str
 * @return {string | null}
 */
function firstDuplicateChar(str) {
  // your code here
  const freqMap = {};

  for (const char of str) {
    if (freqMap[char]) {
      return char;
    }

    freqMap[char] = 1;
  }

  return null;
}
