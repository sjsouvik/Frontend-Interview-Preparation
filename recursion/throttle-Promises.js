/* 

Say you need to fetch some data through 100 APIs, and as soon as possible.

If you use Promise.all(), 100 requests go to your server at the same time, which is a burden to low spec servers.

Can you throttle your API calls so that always maximum 5 API calls at the same time?

You are asked to create a general throttlePromises() which takes an array of functions returning promises, and a number indicating the maximum concurrent pending promises.


throttleAsync(callApis, 5).then((data) => {
  // the data is the same as `Promise.all` 
}).catch((err) => {
  // any error occurs in the callApis would be relayed here
})
By running above code, at any time, no more than 5 APIs are requested, so low spec servers are saved.

***********************************************************************Solution**************************************************************/

function httpLib() {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(Math.random() * 100), Math.random() * 1000)
  );
}


/**
 * @param {() => Promise<any>} func
 * @param {number} max
 * @return {Promise}
 */

// asked in Wingify
function throttlePromises(funcs, max = 5){
  return new Promise((resolve, reject) => {
    const res = [], totalCalls = funcs.length;
    let callsMade = 0;

    function helper(){
      while(callsMade < max && funcs.length){
        const currentCall = funcs.shift();
        callsMade++;

        currentCall().then(data => {
          callsMade--;
          res.push(data);
          
          helper();        
        }).catch(reject)
      }

      if(res.length === totalCalls){
        resolve(res);
      }
    }

    helper();
  })
}

throttlePromises([httpLib, httpLib, httpLib, httpLib, httpLib, httpLib, httpLib]).then(console.log)