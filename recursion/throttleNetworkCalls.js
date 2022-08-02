// write a function which would make 5 network calls once at max, then allow other calls one by one once others are resolved - asked in Wingify

function httpLib(config) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(config.data), Math.random() * 1000)
  );
}

let callsMade = 0,
  queue = [];
const maxNoOfCalls = 5;

function httpThrottled(config) {
  return new Promise((resolve, reject) => {
    if (callsMade < maxNoOfCalls) {
      callsMade++;

      httpLib(config)
        .then((data) => {
          callsMade--;
          resolve(data);

          if (queue.length) {
            const nextCall = queue[0];

            httpThrottled(nextCall.config).then((resolvedData) => {
              nextCall.resolve(resolvedData);
            });

            queue = queue.slice(1);
          }
        })
        .catch(reject);
    } else {
      queue.push({ config, resolve });
    }
  });
}

httpThrottled({ data: 1 }).then(console.log);
httpThrottled({ data: 2 }).then(console.log);
httpThrottled({ data: 3 }).then(console.log);
httpThrottled({ data: 4 }).then(console.log);
httpThrottled({ data: 5 }).then(console.log);
httpThrottled({ data: 6 }).then(console.log);
httpThrottled({ data: 7 }).then(console.log);
httpThrottled({ data: 8 }).then(console.log);
httpThrottled({ data: 9 }).then(console.log);
