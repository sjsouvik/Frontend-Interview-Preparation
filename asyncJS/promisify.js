/*

Let's take a look at following error-first callback.

const callback = (error, data) => {
  if (error) {
    // handle the error
  } else {
    // handle the data
  }
}
Now think about async functions that takes above error-first callback as last argument.

const func = (arg1, arg2, callback) => {
  // some async logic
  if (hasError) {
    callback(someError)
  } else {
    callback(null, someData)
  }
}
You see what needs to be done now. Please implement promisify() to make the code better.

const promisedFunc = promisify(func)

promisedFunc().then((data) => {
  // handles data
}).catch((error) => {
  // handles error
})

*****************************************************************Solution*****************************************************/

/**
 * @param {(...args) => void} func
 * @returns {(...args) => Promise<any}
 */
function promisify(func) {  
  return function (...args){
    return new Promise((resolve, reject) => {
      const callback = (error, data) => {
        error ? reject(error) : resolve(data);
      }

      func.apply(this, [...args, callback]);
    })
  }  
}

