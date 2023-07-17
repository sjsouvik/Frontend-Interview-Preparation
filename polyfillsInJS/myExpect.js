/*

Here are some simple Jest test code.

expect(3).toBe(3) // ✅
expect(4).toBe(3) // ❌
We can reverse it with not.

expect(3).not.toBe(3) // ❌
expect(4).not.toBe(3) // ✅

Please implement myExpect() to support toBe() and also not.

************************************************************Solution**********************************************************/

/**
 * interface Matcher {
 *  toBe(data: any): void
 * }
 */
/**
 * @param {any} input
 * @returns {Matcher & {not: Matcher}}
 */

function myExpect(input) {
  function toBe(arg, not = false) {
    let matched = Object.is(arg, input);

    if (!not && !matched) {
      throw new Error("Not Equal");
    }

    if (not && matched) {
      throw new Error("Equal");
    }
  }

  return {
    toBe,
    not: {
      toBe: (value) => toBe(value, true),
    },
  };
}
