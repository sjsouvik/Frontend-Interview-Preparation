/**
 *
 * Write a function which will take your name and delay as arguments and print after the given delay.
 *
 */

const printNameAfterDelay = (name, delay) => {
  setTimeout(() => console.log(`Printing ${name} after ${delay} ms`), delay);
};

printNameAfterDelay("Souvik", 3000);
