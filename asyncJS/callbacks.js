/**
 *
 * Write a function which takes:
 * i) name,
 * ii) a function which will take your name as an argument and print the length of your name
 *
 */

const printLength = (inputStr) => {
  console.log(`OMG! my name ${inputStr} is ${inputStr.length} chars long!`);
};

const strLength = (name, inputFunction) => {
  inputFunction(name);
};

strLength("Souvik", printLength);

/**
 *
 * Write a function which will take:
 * i) your name,
 * ii) 2 functions as arguments - successFunction(this will be called if your name has even number of characters),
 * failureFunction(this will be called if your name has odd number of characters)
 *
 */

const successFunction = () => console.log("Yay! I'm alive!");

const failureFunction = () => {
  console.log("Give my bose speakers and headphones to my sister");
};

const willThanosKillMe = (name, successFn, failureFn) => {
  if (name.length % 2 === 0) {
    return successFn();
  }

  return failureFn();
};

willThanosKillMe("Souvik", successFunction, failureFunction);
