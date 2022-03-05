/*

_.get(object, path, [defaultValue]) is a handy method to help retrieving data from an arbitrary object. 
if the resolved value from path is undefined, defaultValue is returned.

Can you create your own get()?

const obj = {
  a: {
    b: {
      c: [1,2,3]
    }
  }
}

get(obj, 'a.b.c') // [1,2,3]
get(obj, 'a.b.c.0') // 1
get(obj, 'a.b.c[1]') // 2
get(obj, ['a', 'b', 'c', '2']) // 3
get(obj, 'a.b.c[3]') // undefined
get(obj, 'a.c', 'bfe') // 'bfe'

*******************************************************************Solution*************************************************************/

/**
 * @param {object} source
 * @param {string | string[]} path
 * @param {any} [defaultValue]
 * @return {any}
 */
 function myGet(source, path, defaultValue = undefined) {
    if(!path.length){
      return defaultValue;
    }
  
    let result = source;
  
    path = Array.isArray(path) ? path : path.replaceAll('[', '.').replaceAll(']', '').split('.');
  
    for(let i = 0; i < path.length; i++){
      const value = result[path[i]];
      
      if(!value){
        return defaultValue;
      }
  
      result = value;          
    }
  
    return result;
  }