/*

This is a follow up on 4. implement basic throttle(), please refer to it for detailed explanation.

In this problem, you are asked to implement a enhanced throttle() which accepts third parameter, option: {leading: boolean, trailing: boolean}

leading: whether to invoke right away
trailing: whether to invoke after the delay.
4. implement basic throttle() is the default case with {leading: true, trailing: true}.

Explanation

for the previous example of throttling by 3 dashes

─A─B─C─ ─D─ ─ ─ ─ ─ ─ E─ ─F─G

with {leading: true, trailing: true}, we get as below

─A─ ─ ─C─ ─ ─D ─ ─ ─ ─ E─ ─ ─G

with {leading: false, trailing: true}, A and E are swallowed.

─ ─ ─ ─C─ ─ ─D─ ─ ─ ─ ─ ─ ─G

with {leading: true, trailing: false}, only A D E are kept

─A─ ─ ─ ─D─ ─ ─ ─ ─ ─ E

with {leading: false, trailing: false}, of course, nothing happens.

notes

please follow above spec. the behavior is not exactly the same as lodash.throttle()

because window.setTimeout and window.clearTimeout are not accurate in browser environment, they are replaced to other implementation when judging your code. They still have the same interface, and internally keep track of the timing for testing purpose.

Something like below will be used to do the test.

let currentTime = 0

const run = (input) => {
  currentTime = 0
  const calls = []

  const func = (arg) => {
     calls.push(`${arg}@${currentTime}`)
  }

  const throttled = throttle(func, 3)
  input.forEach((call) => {
     const [arg, time] = call.split('@')
     setTimeout(() => throttled(arg), time)
  })
  return calls
}

expect(run(['A@0', 'B@2', 'C@3'])).toEqual(['A@0', 'C@3'])

**************************************************************Solution********************************************************/

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 * @returns {(...args: any[]) => any}
 */

/*
    We implement throttle with {leading: true, trainling: true} by default, 
    throttle with {leading: true} will invoke the function immediately 
    and then it works in the same way as {leading: false, trailing: true}.
*/
function throttle(func, wait, option = {leading: true, trailing: true}) {
  let readyToCall = true, lastArgs;
  
  return function throttled(...args){
    if(readyToCall){
      const context = this;

      if(option.leading){
        func.apply(context, args);        
      }

      function setTimer() {
        readyToCall = false; // so that other calls made during the wait time can't enter inside the if block at line no. 78

        setTimeout(() => {
          if(option.trailing && lastArgs){
            func.apply(context, lastArgs);
            lastArgs = null;

            setTimer(); // to invoke the function with arguments of last call made during the wait time, this won't invoke the function if `lastArgs` is null
          }else{
            readyToCall = true;            
          }                    
        }, wait);   
      }

      setTimer();
    }else{
      lastArgs = args;
    }
  }
}
