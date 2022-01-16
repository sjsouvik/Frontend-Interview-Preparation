/**
 *
 * Write a function which takes a message and time as arguments. The function then prints that input message every given time interval and stops after 5 secs(given time interval <= 5 secs).
 *
 */

const printMessageAfterInterval = (message, interval) => {
  const timerId = setInterval(() => console.log(message), interval);
  setTimeout(() => clearInterval(timerId), 5000);
};

printMessageAfterInterval("FE Interview Prep", 1000);

/**
 *
 * Write a function which takes a number. Then, print a countdown from that number to 0. At 0 print "Bang Bang!"
 *
 */

const printCountDown = (number, interval) => {
  const timerId = setInterval(() => {
    if (number === 0) {
      console.log("Bang Bang!");
      return clearInterval(timerId);
    }

    console.log(number--);
  }, interval);
};

printCountDown(3, 1000);
