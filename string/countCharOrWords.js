/**
 *
 * Write a function to get count of each character/word in a string and return the result as an object.
 *
 * input: "abbcddd"
 * output: {a: 1, b: 2, c: 1, d: 3}
 *
 */

function countChars(str) {
  const freqMap = {};
  for (const currentChar of str) {
    const countOfChar = freqMap[currentChar];
    freqMap[currentChar] = (countOfChar || 0) + 1;
  }

  return freqMap;
}

function countWords(str) {
  const arrOfWords = str.toLowerCase().split(" ");

  const outputObj = arrOfWords.reduce((acc, item) => {
    if (item in acc) {
      acc[item] += 1;
    } else {
      acc[item] = 1;
    }

    return acc;
  }, {});

  return outputObj;
}

console.log(countChars("abbcddd"));
console.log(countWords("Hello from hello to hello"));
