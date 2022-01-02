const myObj = {
  firstName: "Souvik",
  lastName: "Jana",
};

function printDetails(town, state, country) {
  console.log(
    `My Name is ${this.firstName} ${this.lastName}, live in ${town}, State: ${state}, Country: ${country}`
  );
}

// to understand bind() in detail refer to this blog - https://sjsouvik.hashnode.dev/call-apply-and-bind-in-js
const myFunction = printDetails.bind(myObj, "Kharagpur", "West Bengal");
myFunction("India");

console.log("**************polyfill for bind()***************");
Function.prototype.myBind = function (obj, ...restArgs) {
  const functionToBeInvoked = this;

  return function (...args) {
    functionToBeInvoked.apply(obj, [...restArgs, ...args]);
  };
};

const returnedFunction = printDetails.myBind(myObj, "Kharagpur", "West Bengal");
returnedFunction("India");
