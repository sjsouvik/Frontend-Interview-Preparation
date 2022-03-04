/*

_.isEqual is useful when you want to compare complex data types by value not the reference.

Can you implement your own version of deep equal isEqual? The lodash version covers a lot of data types. 
In this problem, you are asked to support :

1. primitives
2. plain objects (object literals)
3. array

Objects are compared by their own, not inherited, enumerable properties

const a = {a: 'bfe'}
const b = {a: 'bfe'}

isEqual(a, b) // true
a === b // false

const c = [1, a, '4']
const d = [1, b, '4']

isEqual(c, d) // true
c === d // false
Lodash implementation has some strange behaviors. (github issue, like following code


const a = {}
a.self = a
const b = {self: a}
const c = {}
c.self = c
const d = {self: {self: a}}
const e = {self: {self: b}}
lodash.isEqual gives us following result. Notice there is a case that resulting in false.

// result from lodash implementation
_.isEqual(a, b) // true
_.isEqual(a, c) // true
_.isEqual(a, d) // true
_.isEqual(a, e) // true
_.isEqual(b, c) // true
_.isEqual(b, d) // true
_.isEqual(b, e) // false
_.isEqual(c, d) // true
_.isEqual(c, e) // true
_.isEqual(d, e) // true
Setting aside the performance concerns mentioned by lodash, your implement should not have above problem, which means above all 
returns true and call stack should not exceed the maximum.

**********************************************************************Solution****************************************************************/

/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */

 function isEqual(a, b, visited = new Set()){
    if(typeof(a) !== 'object' || typeof(b) !== 'object'){
      return a === b;
    }
  
    visited.add(a);
    visited.add(b);
  
    // to compare if both are arrays
    if(Array.isArray(a) && Array.isArray(b)){
      if(a.length !== b.length){
        return false;
      }
  
      for(let i = 0; i < a.length; i++){
        /* to skip circular reference(if one array or object contains itself as an item or property respectively, 
        in that case no need to compare again and again which would exceed the call stack) */
        if(visited.has(a[i]) || visited.has(b[i])){
          return true;
        }
  
        if(!isEqual(a[i], b[i], visited)){
          return false;
        }
      }
      return true;
    }
    
    // to compare if both are objects
    if(Object.keys(a).length !== Object.keys(b).length){
      return false;
    }
  
    for(let key in a){
      // to skip circular reference
      if(visited.has(a[key]) || visited.has(b[key])){
        return true;
      }
  
      if(!isEqual(a[key], b[key], visited)){
        return false;
      }
    }
  
    return true;
  }