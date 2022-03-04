/*

`Object.assign()` could be used to do shallow copy, while for recursive deep copy, `_.cloneDeep` could be very useful.

Can you create your own `_.cloneDeep()`?

The lodash implementation actually covers a lot of data types, for simplicity, your code just need to cover

primitive types and their wrapper Object
Plain Objects (Object literal) with all enumerable properties
Array

There is built-in structuredClone() now, but don't use this to practice

*************************************************************************Solution***********************************************************/

// refer to this to know about shallow and deep copy in JS https://www.javascripttutorial.net/object/3-ways-to-copy-objects-in-javascript/
function cloneDeep(data, visited = new Map()) {  
    if(data === null || typeof data !== 'object'){
      return data;
    }
  
    /* to skip circular reference(if one array or object contains itself as an item or property respectively, 
        in that case no need to clone again and again which would exceed the call stack) */
    if(visited.has(data)){
      return visited.get(data);
    }
  
    let output = Array.isArray(data) ? [] : {};
    visited.set(data, output);
  
    // to get all indexes of an array or properties of an object as an array
    const keys = [...Object.keys(data), ...Object.getOwnPropertySymbols(data)];
  
    for(const key of keys){
      output[key] = cloneDeep(data[key], visited);
    }
  
    return output;
  }