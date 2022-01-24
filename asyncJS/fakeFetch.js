/**
 *
 * Implement a fake fetch using Promise() and setTimeout().
 *
 */

const fakeFetch = (message, shouldReject) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject("Got some error");
      }
      resolve(`${message} fetched successfully from server`);
    }, 3000);
  });
};

fakeFetch("YaY!!", false)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
