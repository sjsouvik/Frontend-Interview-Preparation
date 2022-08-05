/*

Can you create a range(from, to) which makes following work?

for (let num of range(1, 4)) {
  console.log(num)  
}
// 1
// 2
// 3
// 4
This is a simple one, could you think more fancy approaches other than for-loop?

Notice that you are not required to return an array, but something iterable would be fine.

*************************************************************************Solution************************************************************/


/**
 * @param {integer} from
 * @param {integer} to
 */

// simple solution - return an array containing all the numbers in the given range 
function range(from, to) {
  const res = [];

  for(let i = from; i <= to; i++){
    res.push(i);
  }

  return res;
}

// using iterators - refer to https://javascript.info/iterable to learn more about iterables
function rangeUsingIterators(from, to) {  
  return {
    from,
    to,

    [Symbol.iterator]: function(){
      return this
    },

    next: function () {
      if(this.from <= this.to){
        return {value: this.from++, done: false}
      }else{
        return {done: true}
      }
    }
  }  
}