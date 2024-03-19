/*

This is a follow-up on 36. create a fake timer(`setTimeout`)

Like `setTimeout`, `setInterval` also is not accurate. (please refer Event Loop for detail).

This is OK in general web application, but might be problematic in test.

Could you implement your own `setInterval()` and `clearInterval()` to be sync? so that they have accurate 
timing for test. This is what FakeTimes are for.

By "accurate", it means suppose all functions cost no time, we start our function at time 0, 
then `setInterval(func1, 100)` would schedule func1 exactly at 100, 200, 300 .etc.

You need to replace Date.now() as well to provide the time.

```javascript
class FakeTimer {
  install() {
    // replace window.setInterval, window.clearInterval, Date.now
    // with your implementation
  }
  
  uninstall() {
    // restore the original implementation of
    // window.setInterval, window.clearInterval, Date.now
  }
  
  tick() {
    // run the scheduled functions without waiting
  }
}
```

** Be careful about the infinite loops **. Your code is tested like this:

```javascript
const fakeTimer = new FakeTimer()
fakeTimer.install()

const logs = []
const log = () => {
    logs.push(Date.now())
}

let count = 0
const id = setInterval(() => {
  if (count > 1) {
    clearInterval(id)
  } else {
    log()
  }
  count += 1
}, 100)
// log 'A' at every 100, stop at 200
fakeTimer.tick()
fakeTimer.uninstall()
 
expect(logs).toEqual([100,200])
```

Note:
Only Date.now() is used when judging your code, you can ignore other time related apis.

***************************************************Solution***************************************************/

class FakeTimer {
  constructor() {
    this.actualSetInterval = window.setInterval;
    this.actualClearInterval = window.clearInterval;
    this.now = Date.now;

    this.currentTime = 0;
    this.timerId = 1;
    this.queue = [];
  }

  install() {
    // replace window.setInterval, window.clearInterval, Date.now
    // with your implementation
    window.setInterval = (callback, delay) => {
      this.timerId += 1;
      this.queue.push({
        id: this.timerId,
        callback,
        waitTime: this.currentTime + delay,
        delay,
      });
      return this.timerId;
    };

    window.clearInterval = (timerId) => {
      this.queue = this.queue.filter((callback) => callback.id !== timerId);
    };

    Date.now = () => this.currentTime;
  }

  uninstall() {
    // restore the original implementation of
    // window.setInterval, window.clearInterval, Date.now
    window.setInterval = this.actualSetInterval;
    window.clearInterval = this.actualClearInterval;
    Date.now = this.now;
  }

  tick() {
    // run the scheduled functions without waiting
    while (this.queue.length) {
      /* sorting inside the while loop because a new `setInterval()` can be added in between while 
        processing call stack, and we need to execute Intervals according to the given delay */
      this.queue.sort((a, b) => a.waitTime - b.waitTime);
      const { callback, waitTime, delay } = this.queue.shift();
      this.currentTime = waitTime;

      /* the implementation is almost same as the implementation of setTimeout() - 
        the only difference is we need to schedule the current task again before 
        executing the current task */
      this.queue.push({
        id: this.timerId,
        callback,
        waitTime: this.currentTime + delay,
      });
      callback();
    }
  }
}
