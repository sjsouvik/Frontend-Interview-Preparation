/*

Create a fetch method with timeout that will terminate the api call if it's not fulfilled within the given duration

*/

// https://developer.mozilla.org/en-US/docs/Web/API/AbortController/AbortController
function fetchWithTimeout(url, time) {
  return new Promise((resolve, reject) => {
    let timerId;
    const controller = new AbortController();
    const { signal } = controller;

    fetch(url, { signal })
      .then((response) =>
        response
          .json()
          .then((data) => {
            clearTimeout(timerId);
            resolve(data);
          })
          .catch(reject)
      )
      .catch(reject);

    timerId = setTimeout(() => {
      console.log("aborted");
      controller.abort();
    }, time);
  });
}

fetchWithTimeout("https://jsonplaceholder.typicode.com/todos/1", 100)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("got this error-", error);
  });
