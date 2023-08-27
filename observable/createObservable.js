/*

Have you ever used RxJS before? The most important concept in it is Observable and Observer.

Observable defines how values are delivered to Observer. Observer is just a set of callbacks.

Let's look at the code.

```javascript
const observer = {
  next: (value) => {
     console.log('we got a value', value)
  },
  error: (error) => {
    console.log('we got an error', error)
  },
  complete: () => {
    console.log('ok, no more values')
  }
}
```

Above is an Observer which is pretty clear about what it is doing.

Then we could attach this Observer to some Observable. Observable feeds this observer with values or errors.

```javascript
const observable = new Observable((subscriber)=> {
  subscriber.next(1)
  subscriber.next(2)
  setTimeout(() => {
    subscriber.next(3)
    subscriber.next(4)
    subscriber.complete()
  }, 100)
})
```

The code plainly says when is a subscriber is attached,

1. subscriber is fed with a value 1
2. subscriber is then fed with a value 2
3. wait 100 ms
4. subscriber is fed with 3
5. subscriber is fed with 4
6. no more values for subscriber

Now if we attach above observer to observable, next and complete of subscriber are called in order.(be aware that there is a delay between 2 and 3)

```javascript
const sub = observable.subscribe(subscriber)
// we got a value 1
// we got a value 2

// we got a value 3
// we got a value 4
// ok, no more values
```

Notice subscribe() return a Subscription which could be used to stop listening to the value delivery.

```javascript
const sub = observable.subscribe(subscriber)
setTimeout(() => {
  // ok we only subscribe for 100ms
  sub.unsubscribe()
}, 100)
```

So this is the basic idea of Observable and Observer. There will be a few more interesting follow-up problems.

Now you are asked to implement a basic Observable class, which makes above possible.

Some extra requirements are listed here.

1. error and complete can only be delivered once, next/error/complete after error/complete should not work
2. for a subscriber object, next/error/complete callback are all optional. if a function is passed as observer, it is treated as next.
3. should support multiple subscription

Further Reading

https://github.com/tc39/proposal-observable

**************************************************************Solution***********************************************************/

class Observable {
  constructor(setup) {
    this.setup = setup;
  }

  subscribe(subscriber) {
    if (typeof subscriber === "function") {
      subscriber = { next: subscriber };
    }

    let isUnsubscribed = false;
    const subscriberObj = {
      next(value) {
        if (isUnsubscribed || !subscriber.next) {
          return;
        }

        subscriber.next(value);
      },

      error(error) {
        if (isUnsubscribed || !subscriber.error) {
          return;
        }

        subscriber.error(error);
        this.unsubscribe();
      },

      complete() {
        if (isUnsubscribed || !subscriber.complete) {
          return;
        }

        subscriber.complete();
        this.unsubscribe();
      },

      unsubscribe() {
        isUnsubscribed = true;
      },
    };

    this.setup(subscriberObj);
    return subscriberObj;
  }
}
