/*

Object.is() is similar to === except following cases

Object.is(0, -0) // false
0 === -0 // true

Object.is(NaN, NaN) // true
NaN === NaN // false

******************************************************************Solution************************************************************/


/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
 function is(a, b) {    
    if(a === b){
      return a !== 0 || 1/a === 1/b; // return true when x and y are not 0 or, both are 0 of the same sign
    }
  
    return Number.isNaN(a) && Number.isNaN(b); // return true when both are NaN
    // return a !== a && b !== b; //The only possibility for a variable to not be strictly equal to itself is when that variable evaluates to NaN
  }