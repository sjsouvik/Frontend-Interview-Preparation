/*

`setTimeout` adds task in to a task queue to be handled later, the time actually is no accurate. (Event Loop).

This is OK in general web application, but might be problematic in test.

For example, at 5. implement throttle() with leading & trailing option we need to test the timer 
with more accurate approach.

Could you implement your own `setTimeout()` and `clearTimeout()` to be sync? so that they have accurate 
timing for test. This is what FakeTimes are for.

By "accurate", it means suppose all functions cost no time, we start our function at time 0, 
then setTimeout(func1, 100) would schedule func1 exactly at 100.

You need to replace `Date.now()` as well to provide the time.

```javascript
class FakeTimer {
  install() {
    // setTimeout(), clearTimeout(), and Date.now() 
    // are replaced
  }

  uninstall() {
    // restore the original APIs
    // setTimeout(), clearTimeout() and Date.now()
  }

  tick() {
     // run all the schedule functions in order
  }
}
```

Your code is tested like this

```
const fakeTimer = new FakeTimer()
fakeTimer.install()

const logs = []
const log = (arg) => {
   logs.push([Date.now(), arg])
}

setTimeout(() => log('A'), 100)
//log 'A' at 100

const b = setTimeout(() => log('B'), 110)
clearTimeout(b)
// b is set but cleared

setTimeout(() => log('C'), 200)

expect(logs).toEqual([[100, 'A'], [200, 'C']])

fakeTimer.uninstall()
```

Note:
Only Date.now() is used when judging your code, you can ignore other time related apis.

****************************************************Solution**************************************************/

class FakeTimer {
  constructor() {
    this.actualSetTimeout = window.setTimeout;
    this.actualClearTimeout = window.clearTimeout;
    this.now = Date.now;

    this.queue = [];
    this.timerId = 1;
    this.currentTime = 0;
  }

  install() {
    // replace window.setTimeout, window.clearTimeout, Date.now
    // with your implementation
    window.setTimeout = (callback, delay = 0) => {
      this.timerId += 1;

      this.queue.push({
        id: this.timerId,
        callback,
        waitTime: this.currentTime + delay,
      });
      this.queue.sort((a, b) => a.waitTime - b.waitTime);
      return this.timerId;
    };

    window.clearTimeout = (timerId) => {
      this.queue = this.queue.filter((callback) => callback.id !== timerId);
    };

    Date.now = () => this.currentTime;
  }

  uninstall() {
    // restore the original implementation of
    // window.setTimeout, window.clearTimeout, Date.now
    window.setTimeout = this.actualSetTimeout;
    window.clearTimeout = this.actualClearTimeout;
    Date.now = this.now;
  }

  tick() {
    // run the scheduled functions without waiting
    while (this.queue.length) {
      /* using `shift()` to remove the 1st item from the queue since the queue is sorted 
        in ascending order, the other alternative would be to sort the queue in descending 
        order and use `pop()` to get the 1st task to get executed */
      const { callback, waitTime } = this.queue.shift();
      this.currentTime = waitTime;
      callback();
    }
  }
}
