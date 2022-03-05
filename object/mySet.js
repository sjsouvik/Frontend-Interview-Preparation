/*

_.set(object, path, value) is a handy method to updating an object without checking the property existence.

Can you create your own set()?

const obj = {
  a: {
    b: {
      c: [1,2,3]
    }
  }
}
set(obj, 'a.b.c', 'BFE')
console.log(obj.a.b.c) // "BFE"

set(obj, 'a.b.c.0', 'BFE')
console.log(obj.a.b.c[0]) // "BFE"

set(obj, 'a.b.c[1]', 'BFE')
console.log(obj.a.b.c[1]) // "BFE"

set(obj, ['a', 'b', 'c', '2'], 'BFE')
console.log(obj.a.b.c[2]) // "BFE"

set(obj, 'a.b.c[3]', 'BFE')
console.log(obj.a.b.c[3]) // "BFE"

set(obj, 'a.c.d[0]', 'BFE')
// valid digits treated as array elements
console.log(obj.a.c.d[0]) // "BFE"

set(obj, 'a.c.d.01', 'BFE')
// invalid digits treated as property string
console.log(obj.a.c.d['01']) // "BFE"

********************************************************************Solution**********************************************************/

/**
 * @param {object} obj
 * @param {string | string[]} path
 * @param {any} value
 */
 function mySet(obj, path, value) {
    let result = obj;
  
    path = Array.isArray(path) ? path : path.replaceAll('[', '.').replaceAll(']', '').split('.');
  
    for(let i = 0; i < path.length; i++){
      const currentProp = path[i];
      
      if(i === path.length - 1){
        result[currentProp] = value;
      }else if(!result[currentProp]){
        result[currentProp] = String(Number(path[i + 1])) === path[i + 1] ? [] : {};      
      }
  
      result = result[currentProp];
    }
  }
