/*

You are asked to create a new mySetInterval(a, b) which has a different behavior from window.setInterval, 
the time between calls is a linear function, growing larger and larger period = a + b * count.

```javascript
let prev = Date.now()
const func = () => {
  const now = Date.now()
  console.log('roughly ', Date.now() - prev)
  prev = now
}

const id = mySetInterval(func, 100, 200)

// roughly 100, 100 + 200 * 0
// roughly 400,  100 + 200 * 1
// roughly 900,  100 + 200 * 2
// roughly 1600,  100 + 200 * 3
// ....

myClearInterval(id) // stop the interval
```

1. Interface is mySetInterval(delay, period), the first delay is used for the first call, 
and then period is used.

2. because window.setTimeout and window.setInterval are not accurate in browser environment, they are 
replaced to other implementation when judging your code. They still have the same interface, and 
internally keep track of the timing for testing purpose.

Something like below will be used to do the test. (You don't need to read following code to accomplish 
this task)

```javascript
let currentTime = 0

const run = (delay, period, clearAt) => {
  currentTime = 0
  pipeline.length = 0
  
  const logs = []

  const func = () => {
    logs.push(currentTime)
  }

  mySetInterval(func, delay, period)
  if (clearAt !== undefined) {
    setTimeout(() => {
      myClearInterval(id)
    }, clearAt)
  }

  while (pipeline.length > 0 && calls.length < 5) {
    const [time, callback] = pipeline.shift()
    currentTime = time
    callback()
  }

  return calls
}

expect(run(100, 200)).toEqual([100,400,900,1600,2500])
expect(run(100, 200, 450)).toEqual([100,400])
expect(run(100, 200, 50)).toEqual([])
```

******************************************************Solution************************************************/

/**
 * @param {Function} func
 * @param {number} delay
 * @param {number} period
 * @return {number}
 */

const timers = {};
let key = 0;

function mySetInterval(func, delay, period) {
  let count = 0,
    id = key++;

  function util() {
    const timerId = setTimeout(() => {
      func();
      util();
    }, delay + period * count);

    count++;
    timers[id] = timerId;
  }

  util();
  return id;
}

/**
 * @param { number } id
 */
function myClearInterval(id) {
  clearTimeout(timers[id]);
  delete timers[id];
}
