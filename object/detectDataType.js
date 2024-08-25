/*

For all the basic data types in JavaScript, how could you write a function to detect the type of arbitrary data?

Besides basic types, you need to also handle also commonly used complex data type including Array, ArrayBuffer, Map, Set, Date and Function

The goal is not to list up all the data types but to show us how to solve the problem when we need to.

The type should be lowercase

detectType(1) // 'number'
detectType(new Map()) // 'map'
detectType([]) // 'array'
detectType(null) // 'null'
// more in judging step

*****************************************************Solution******************************************************/

/**
 * @param {any} data
 * @return {string}
 */
function detectDataType(data) {
  const allowedTypes = new Set([
    "number",
    "string",
    "boolean",
    "null",
    "undefined",
    "symbol",
    "bigint",
    "date",
    "set",
    "map",
    "function",
    "array",
    "arraybuffer",
  ]);

  if (typeof data === "object") {
    if (data === null) {
      return "null";
    }

    const dataType = data.constructor.name.toLowerCase();
    return allowedTypes.has(dataType) ? dataType : "object";
  }

  return typeof data;
}
