/*

Our company wants to switch to data driven product development. To make this initiative work we need to design a 
reusable function capable of collecting and delivering UI analytics to the backend server.

To get you started we created a small snippet of code which should explain how we intend to use that API function.

```js
// This is the example of component to be instrumented using the function
class Component {
  constructor() {
    // this is where the unction could be called for example
    sendAnalyticsEvent(event);
    setTimeout(this.init, 100);
  }
  init() {
    sendAnalyticsEvent(event);
  }
}
```

Your goal is to implement the sendAnalyticsEvent(event) API function.

```js
const sendAnalyticsEvent = (event) => {
  // TODO: add your code here
  example event
  {
  "type": "pageView",
  "data": {
    "userId": "abc123"
  }
};
```

When using an API, you would need to POST those analytics events down to the backend via some `/analytics` end-point. 
To get you started we’ve developed a simple mock of the server API abstraction.
Feel free to change this implementation.

```js
const doRequest = (events) => {
  return new Promise((resolve, reject) => {
    return resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({}),
    });
  });
};
```

Server returns 200 HTTP code and empty response when API worked fine.

Server returns 500 HTTP code and empty response when server has experienced an error.

```js
const doRequest = (event) => {
  return new Promise((resolve, reject) => {
    return resolve({
      ok: false,
      status: 500,
      json: () => null,
    });
  });
};
```

I was asked to implement it first the bare minimum part to send backend(BE) request for 
every event, then asked to do error handling, what to do with the events in case 
the backend request fails - what all options we can explore to handle the events for 
failure cases, BE requests should be sent in batches, for example: 1 BE request 
should be triggered to log 5 events.

*/

// asked in Atlassian

/*

A variation of this problem was asked in Atlassian before
https://learnersbucket.com/examples/interview/create-analytics-sdk-in-javascript/

*/

const MAX_EVENTS_COUNT = 5;

class SendAnalyticsEvent {
  static _instance = null;
  #events;

  constructor() {
    if (SendAnalyticsEvent._instance) {
      throw new Error(
        "You can create only one instance which already exists! Use getInstance method"
      );
    }

    SendAnalyticsEvent._instance = this;
    this.#events = [];
  }

  getInstance() {
    return this;
  }

  async sendToBackend(events) {
    try {
      const response = await doRequest(events);

      if (response.status !== 200) {
        this.#events.push(...events); // adding the failed events back to the events so that those can be sent to the BE
        throw new Error("some issue at BE");
      }

      const data = await response.json();

      console.log("l-", data);
    } catch (error) {
      console.log(error);
    }
  }

  async log(event) {
    this.#events.push(event);
    console.log("event is stored");

    if (this.#events.length === MAX_EVENTS_COUNT) {
      while (true) {
        console.log("inside the while");

        const eventsToSend = this.#events.slice(0, MAX_EVENTS_COUNT);
        this.#events = this.#events.slice(MAX_EVENTS_COUNT);
        await this.sendToBackend(eventsToSend);

        if (this.#events.length === 0) {
          break;
        }
      }
    }
  }
}

const doRequest = (events) => {
  return new Promise((resolve, reject) => {
    return resolve({
      ok: true,
      status: 200,
      json: () => {
        return Promise.resolve(events);
      },
    });
  });
};

const sendAnalyticsObj = new SendAnalyticsEvent();

class Component {
  constructor() {
    this.event = {
      type: "pageView",
      data: {
        userId: "abc123",
      },
    };

    // this is where the function could be called for example
    // sendAnalyticsEvent(event);
    // setTimeout(this.init, 100);
    this.init();
  }

  init() {
    sendAnalyticsObj.log(this.event);
    sendAnalyticsObj.log(this.event);
    sendAnalyticsObj.log(this.event);
    sendAnalyticsObj.log(this.event);
    sendAnalyticsObj.log(this.event);

    sendAnalyticsObj.log(this.event);
    sendAnalyticsObj.log(this.event);
    sendAnalyticsObj.log(this.event);
    sendAnalyticsObj.log(this.event);
    sendAnalyticsObj.log(this.event);

    sendAnalyticsObj.log(this.event);
    sendAnalyticsObj.log(this.event);
  }
}

class Component2 {
  constructor() {
    this.event = {
      type: "pageView2",
      data: {
        userId: "abc123",
      },
    };

    // this is where the function could be called for example
    // sendAnalyticsEvent(event);
    // setTimeout(this.init, 100);
    this.init();
  }

  init() {
    sendAnalyticsObj.log(this.event);
    sendAnalyticsObj.log(this.event);
    sendAnalyticsObj.log(this.event);
    sendAnalyticsObj.log(this.event);
    sendAnalyticsObj.log(this.event);

    // sendAnalyticsObj.log(this.event);
    // sendAnalyticsObj.log(this.event);
    // sendAnalyticsObj.log(this.event);
    // sendAnalyticsObj.log(this.event);
    // sendAnalyticsObj.log(this.event);

    // sendAnalyticsObj.log(this.event);
    // sendAnalyticsObj.log(this.event);
  }
}

new Component();
new Component2();
