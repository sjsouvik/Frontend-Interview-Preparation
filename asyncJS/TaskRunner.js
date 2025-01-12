/*

Design and implement an TaskRunner utility that processes asynchronous tasks with a maximum concurrency limit. 
The utility should ensure that at most a defined number of tasks (concurrency) are running at any given time. 
If more tasks are pushed into the queue when the limit is reached, they should wait until at least one running 
task is completed before execution.

The push method is used to add tasks (asynchronous functions) to the executor. If the current number of running 
tasks is below the concurrency limit, the task should be executed immediately. If the number of running tasks 
is equal to or exceeds the concurrency limit, the task should wait until a running task finishes before starting.

Arguments:

concurrency (number): The maximum number of tasks that can run concurrently.
task (function): An asynchronous function to be executed. It is passed to the push method.

Returns:

The push method does not return a value. It simply manages task execution by ensuring that tasks run 
according to the concurrency limit.

Examples:

const ex = new TaskRunner(3);

// Simulated async tasks
const t1 = async () => { console.log('t1 started'); await delay(2000); console.log('t1 finished'); };
const t2 = async () => { console.log('t2 started'); await delay(1000); console.log('t2 finished'); };
const t3 = async () => { console.log('t3 started'); await delay(1500); console.log('t3 finished'); };
const t4 = async () => { console.log('t4 started'); await delay(1000); console.log('t4 finished'); };
const t5 = async () => { console.log('t5 started'); await delay(500); console.log('t5 finished'); };

// Add tasks to the executor
ex.push(t1);  // Starts immediately
ex.push(t2);  // Starts immediately
ex.push(t3);  // Starts immediately
ex.push(t4);  // Waits until at least one task finishes
ex.push(t5);  // Waits until another task finishes

Expected Output (with assumed time delay):

t1 started
t2 started
t3 started
t2 finished
t4 started
t3 finished
t5 started
t1 finished
t5 finished
t4 finished

In the example, the first three tasks start immediately since the concurrency limit is 3. 
The fourth and fifth tasks will wait until some of the tasks finish to ensure that only 
3 tasks run at the same time.

********************************************************Solution****************************************************/

const asyncTask = (delay) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

const task1 = async () => {
  console.log("t1 started");
  await asyncTask(2000);
  console.log("t1 finished");
};

const task2 = async () => {
  console.log("t2 started");
  await asyncTask(1000);
  console.log("t2 finished");
};

const task3 = async () => {
  console.log("t3 started");
  await asyncTask(1500);
  console.log("t3 finished");
};

const task4 = async () => {
  console.log("t4 started");
  await asyncTask(1000);
  console.log("t4 finished");
};

const task5 = async () => {
  console.log("t5 started");
  await asyncTask(500);
  console.log("t5 finished");
};

class TaskRunner {
  constructor(concurrency) {
    // write your code below
    this.runningTasks = 0;
    this.concurrency = concurrency;
    this.queue = [];
  }

  async execute(task) {
    this.runningTasks++;

    try {
      await task();
    } finally {
      this.runningTasks--;
      if (this.queue.length && this.runningTasks < this.concurrency) {
        const nextTask = this.queue.shift();
        this.execute(nextTask);
      }
    }
  }

  async push(task) {
    if (this.runningTasks < this.concurrency) {
      await this.execute(task);
    } else {
      this.queue.push(task);
    }
  }
}

const taskRunner = new TaskRunner(3);

taskRunner.push(task1);
taskRunner.push(task2);
taskRunner.push(task3);
taskRunner.push(task4);
taskRunner.push(task5);
