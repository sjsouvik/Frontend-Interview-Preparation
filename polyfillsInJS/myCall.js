/*

Can you implement your own myCall, which returns the same result as Function.prototype.call?

******************************************************************Solution************************************************************/

Function.prototype.myCall = function (thisArg, ...args) {
  thisArg = thisArg ? Object(thisArg) : window;

  const key = Symbol(); // generate unique key to store the function as property of thisArg
  thisArg[key] = this;

  const result = thisArg[key](...args);
  delete thisArg[key]; // removing so that it doesn't create any property conflict

  return result;
};

const myObj = {
  firstName: "Souvik",
  lastName: "Jana",
};

function printDetails(town, state, country) {
  console.log(
    `My Name is ${this.firstName} ${this.lastName}, live in ${town}, State: ${state}, Country: ${country}`
  );
}

printDetails.myCall(myObj, "Kharagpur", "West Bengal", "India");
