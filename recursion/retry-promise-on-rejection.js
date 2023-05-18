/*

For a web application, fetching API data is a common task.

But the API calls might fail because of Network problems. Usually we could show a screen for Network Error and ask users to retry.

One approach to handle this is auto retry when network error occurs.

You are asked to create a fetchWithAutoRetry(fetcher, count), which automatically fetch again when error happens, until the maximum count is met.

For the problem here, there is no need to detect network error, you can just retry on all promise rejections.

***********************************************************************Solution***************************************************************/

/**
 * @param {() => Promise<any>} fetcher
 * @param {number} maximumRetryCount
 * @return {Promise<any>}
 */

// asked in Flipkart
function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  return new Promise((resolve, reject) => {
    let retryCount = 0;

    function helper() {
      fetcher()
        .then((data) => resolve(data))
        .catch((error) => {
          if (retryCount++ < maximumRetryCount) {
            helper();
          } else {
            reject(error);
          }
        });
    }

    helper();
  });
}
