/*

You can use Object.create() to create a new object.

Can you write your own myObjectCreate() to do the same(well for the basic usage) ?

Note:

1. you don't need to support propertiesObject - 2nd parameter of Object.create
2. throw an Error if non-object is passed in. (why?)
3. Object.create() and Object.setPrototypeOf() should not be used.

*******************************************************************Solution**********************************************************/

/**
 * @param {any} proto
 * @return {object}
 */
 function myObjectCreate(proto) {  
    if(typeof(proto) !== 'object' || proto === null){
      throw new Error('proto has to be an object');
    }
  
    const newObj = {};
    newObj.__proto__ = proto;
    return newObj;
  }