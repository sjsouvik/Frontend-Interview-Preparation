/*

LazyMan is very lazy, he only eats and sleeps.

LazyMan(name: string, logFn: (log: string) => void) would output a message, the passed logFn is used.

LazyMan('Jack', console.log)
// Hi, I'm Jack.
He can eat(food: string)

LazyMan('Jack', console.log)
  .eat('banana')
  .eat('apple')
// Hi, I'm Jack.
// Eat banana.
// Eat Apple.
He also sleep(time: number), time is based on seconds.

LazyMan('Jack', console.log)
  .eat('banana')
  .sleep(10)
  .eat('apple')
  .sleep(1)
// Hi, I'm Jack.
// Eat banana.
// Wake up after 10 seconds.
// Eat Apple.
// Wake up after 1 second.
He can sleepFirst(time: number), which has the highest priority among all tasks, no matter what the order is.

LazyMan('Jack', console.log)
  .eat('banana')
  .sleepFirst(10)
  .eat('apple')
  .sleep(1)
// Wake up after 10 seconds.
// Hi, I'm Jack.
// Eat banana
// Eat apple
// Wake up after 1 second.
Please create such LazyMan()

***********************************************Solution*********************************************/

// interface Laziness {
//   sleep: (time: number) => Laziness
//   sleepFirst: (time: number) => Laziness
//   eat: (food: string) => Laziness
// }

/**
 * @param {string} name
 * @param {(log: string) => void} logFn
 * @returns {Laziness}
 */

const goToSleep = (time) =>
  new Promise((resolve) => setTimeout(resolve, time * 1000));

function LazyMan(name, logFn) {
  const tasks = [["greet", name]];

  const actions = {
    greet: (name) => logFn(`Hi, I'm ${name}.`),
    sleep: (time) =>
      goToSleep(time).then(() =>
        logFn(`Wake up after ${time} ${time > 1 ? "seconds" : "second"}.`)
      ),
    eat: (food) => logFn(`Eat ${food}.`),
  };

  async function executeTasks() {
    for (const [action, arg] of tasks) {
      await actions[action](arg);
    }
  }

  Promise.resolve().then(executeTasks);

  return {
    eat: function (food) {
      tasks.push(["eat", food]);
      return this;
    },
    sleep: function (time) {
      tasks.push(["sleep", time]);
      return this;
    },
    sleepFirst: function (time) {
      tasks.unshift(["sleep", time]);
      return this;
    },
  };
}
