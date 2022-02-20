/**

Given a non-empty string, return the most frequently ocurring character.

If there are multiple characters with same occurrance, return an array of them.

count('abbccc')
// 'c'

count('abbcccddd')
// ['c', 'd']

 */

// Solution 1: Using Object

/**
 * @param {string} str
 * @returns {string | string[]}
 */

function count(str) {
  const freqMap = {};

  for (const currentChar of str) {
    const noOfOccurencesSoFar = freqMap[currentChar];
    freqMap[currentChar] = (noOfOccurencesSoFar || 0) + 1;
  }

  let max = 0,
    res;
  for (const key in freqMap) {
    if (freqMap[key] > max) {
      max = freqMap[key];
      res = key;
    } else if (freqMap[key] === max) {
      res = [...res, key];
    }
  }

  return res;
}

// Solution 2: Using Map()

/**
 * @param {string} str
 * @returns {string | string[]}
 */

function mostFrequentlyOccurringCharacter(str) {
  const freqMap = new Map();

  for (const currentChar of str) {
    freqMap.set(currentChar, (freqMap.get(currentChar) || 0) + 1);
  }

  const maxFrequency = Math.max(...freqMap.values());

  const result = [];
  for (const [key, value] of freqMap) {
    if (value === maxFrequency) {
      result.push(key);
    }
  }

  return result.length === 1 ? result[0] : result;
}
