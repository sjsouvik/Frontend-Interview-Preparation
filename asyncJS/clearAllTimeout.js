/*

window.setTimeout() could be used to schedule some task in the future.

Could you implement clearAllTimeout() to clear all the timers ? This might be useful when we want to clear things up before page transition.

For example


setTimeout(func1, 10000)
setTimeout(func2, 10000)
setTimeout(func3, 10000)

// all 3 functions are scheduled 10 seconds later
clearAllTimeout()

// all scheduled tasks are cancelled.

**********************************************************************Solution******************************************************/

const originalSetTimeout = window.setTimeout; // stored the actual definition of setTimeout() before overriding it
const timerIds = [];

// overriding the setTimeout() so that can get all timer ids to clear later
window.setTimeout = (...args) => {
  const timerId = originalSetTimeout(...args);
  timerIds.push(timerId);

  return timerId;
};

function clearAllTimeout() {
  timerIds.forEach((timerId) => window.clearTimeout(timerId));
}
