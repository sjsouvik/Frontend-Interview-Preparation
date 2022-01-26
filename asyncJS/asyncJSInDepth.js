/**
 *
 * Code snippets on Callbacks, Promises, Async/Await
 *
 */

// made 3 async calls using callbacks
function getUser(userId, callback) {
  console.log("Fetching user details from DB");

  setTimeout(() => {
    callback({ userId, username: "sjsouvik" });
  }, 1000);
}

function getOrders(user, callback) {
  console.log(`Fetching order details for user ${user.username}`);

  setTimeout(() => {
    callback(["burger", "pizza", "coke"]);
  }, 1000);
}

function getCosts(orders, callback) {
  console.log(`Fetching orders cost of ${orders}`);

  setTimeout(() => {
    callback(100 * orders.length);
  }, 1000);
}

getUser(14, (user) => {
  getOrders(user, (orders) => {
    getCosts(orders, (costs) => {
      console.log(`Cost of all orders Rs. ${costs}/-`);
    });
  });
});

// Solved the previous problem, made 3 async calls sequestially using promises
function getUserDetails(userId) {
  return new Promise((resolve, reject) => {
    console.log("Fetching user details from DB");

    setTimeout(() => {
      resolve({ userId, username: "sjsouvik" });
    }, 1000);
  });
}

function getOrdersDetails(user) {
  return new Promise((resolve, reject) => {
    console.log(`Fetching order details for user ${user.username}`);

    setTimeout(() => {
      resolve(["burger", "pizza", "coke"]);
    }, 1000);
  });
}

function getOrdersCost(orders) {
  return new Promise((resolve, reject) => {
    console.log(`Fetching orders cost of ${orders}`);

    setTimeout(() => {
      resolve(orders.length * 100);
    }, 1000);
  });
}

getUserDetails(14)
  .then(getOrdersDetails)
  .then(getOrdersCost)
  .then(console.log)
  .catch(console.error);

// made same asyc calls using async/await
async function showOrdersCost() {
  try {
    const user = await getUserDetails(14);
    const orders = await getOrdersDetails(user);
    const ordersCost = await getOrdersCost(orders);

    console.log(`Cost of all orders Rs. ${ordersCost}/-`);
  } catch (error) {
    console.error(error);
  }
}

showOrdersCost();

/**
 *
 * Promise.all([promises]) --> resolves after all promises are resolved. return array of values once all promises are resolved. Rejects if even one of them is rejected.
 *
 * Promise.race([promises]) --> resolves or rejects based on whichever resolves or rejects 1st
 *
 * Promise.any([promises]) --> resolves with the 1st Promise to fulfill even if there's a Promise that rejects 1st
 *
 * Promise.allSettled([promises]) --> resolves after all promises are settled, either resolved or rejected. return an object with status and value of each promise.
 *
 */

// Examples of Promise.all([promises])

function fakeFetch(a, shouldResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(a);
      }

      reject("OOps! Got some error");
    }, 4 * 1000);
  });
}

// Promise.all([promises]) where all input promises are resolved
Promise.all([fakeFetch(10, true), fakeFetch(20, true), fakeFetch(30, true)])
  .then((arr) => arr.reduce((acc, item) => acc + item))
  .then(console.log)
  .catch(console.error);

// Promise.all([promises]) where one input promise got rejected
Promise.all([fakeFetch(10, true), fakeFetch(20, false), fakeFetch(30, true)])
  .then(console.log) // it wouldn't be executed as one input promise is rejected
  .catch(console.error);
