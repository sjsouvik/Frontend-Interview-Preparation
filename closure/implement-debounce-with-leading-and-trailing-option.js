/*

This is a follow up on 6. implement basic debounce(), please refer to it for detailed explanation.

In this problem, you are asked to implement an enhanced debounce() which accepts third parameter, option: {leading: boolean, trailing: boolean}

leading: whether to invoke right away
trailing: whether to invoke after the delay.
6. implement basic debounce() is the default case with {leading: false, trailing: true}.

for the previous example of debouncing by 3 dashes

─A─B─C─ ─D─ ─ ─ ─ ─ ─ E─ ─F─G

with {leading: false, trailing: true}, we get as below

─ ─ ─ ─ ─ ─ ─ ─D─ ─ ─ ─ ─ ─ ─ ─ ─ G

with {leading: true, trailing: true}:

─A─ ─ ─ ─ ─ ─ ─D─ ─ ─E─ ─ ─ ─ ─ ─G

with {leading: true, trailing: false}

─A─ ─ ─ ─ ─ ─ ─ ─ ─ ─E

with {leading: false, trailing: false}, of course, nothing happens.

notes

please follow above spec. the behavior might not be exactly the same as lodash.debounce()

because window.setTimeout and window.clearTimeout are not accurate in browser environment, they are replaced to other implementation when judging your code. They still have the same interface, and internally keep track of the timing for testing purpose.

Something like below will be used to do the test.

let currentTime = 0

const run = (input) => {
  currentTime = 0
  const calls = []

  const func = (arg) => {
     calls.push(`${arg}@${currentTime}`)
  }

  const debounced = debounce(func, 3)
  input.forEach((call) => {
     const [arg, time] = call.split('@')
     setTimeout(() => debounced(arg), time)
  })
  return calls
}

expect(run(['A@0', 'B@2', 'C@3'])).toEqual(['C@6'])

*****************************************************************Solution****************************************************/


/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 * @returns {(...args: any[]) => any}
 */
function debounce(func, wait, option = {leading: false, trailing: true}) {
  let timerId, readyToCallForLeading = true, lastArgs = null;

  /* 
    refer to this blog to understand about debouncing and throttlinh with leading and trailing options 
    https://ellenaua.medium.com/throttle-debounce-behavior-lodash-6bcae1494e03 

    This is a tricky problem if the both leading and trailing are true. 
    we implement debounce with {leading: false, trailing: true} by default, 
    debounce with {leading: true, trailing: false} invokes the 1st call immediately 
    and then it works in same way as the default debounce -

    if leading is true then we need to invoke the function immediately 
    and set the `readyToCallForLeading` to false, so that the other calls within the given wait time can be ignored. 
    Also, we need to store the arguments for the last call that was made during the wait time, 
    so that if the trailing is true, then the function can be invoked with the last stored arguments once the wait time is over.
  */
  return function debounced(...args){
    const context = this;         
    
    if(option.leading && readyToCallForLeading){
      func.apply(context, args);
      readyToCallForLeading = false;
    }else{
      lastArgs = args;
    }

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      if(option.trailing && lastArgs){
        func.apply(context, lastArgs)
        lastArgs = null;          
      }

      readyToCallForLeading = true;      
    }, wait);
  }
}
