/*

The Object.assign() method copies all enumerable own properties from one or more source objects to a target object. 
It returns the target object. (source: MDN)

It is widely used, Object Spread operator actually is internally the same as Object.assign() (source). 
Following 2 lines of code are totally the same.

let aClone = { ...a };
let aClone = Object.assign({}, a);
This is an easy one, could you implement Object.assign() with your own implementation ?

*************************************************************************Solution*********************************************************/

/**
 * @param {any} target
 * @param {any[]} sources
 * @return {object}
 */
 function objectAssign(target, ...sources) {  
    // should throw error when target is null or undefined
    if(target === null || target === undefined){
      throw new Error('Cannot convert null or undefined to object');
    }
  
    // should convert to object if target is primitive
    if(typeof target !== 'object'){
      target = Object(target);
    }
  
    return sources.reduce((acc, currentSrc) => {    
      if(currentSrc === null || currentSrc === undefined){
        return acc;
      }
  
      // to get all keys(including symbols as keys) of an object as an array
      const keys = [...Object.keys(currentSrc), ...Object.getOwnPropertySymbols(currentSrc)];
  
      for(const key of keys){      
        acc[key] = currentSrc[key];
  
        if(currentSrc[key] !== acc[key]){
          throw new Error();
        }
      }
      
      return acc;
    }, target);
  }