/**
 *
 * Write a function which would take input and give output as follows:
 *
 * plus(2).plus(3).value()
 * output: 5
 *
 * plus(5).minus(3).value()
 * 2
 *
 * plus(7).plus(3).minus(2).value()
 * output: 8
 *
 */

//asked in Xebia

function minus(a) {
  return {
    value: function () {
      return a;
    },
    plus: function (b) {
      return plus(a + b);
    },
    minus: function (c) {
      return minus(a - c);
    },
  };
}

function plus(a) {
  return {
    value: function () {
      return a;
    },
    plus: function (b) {
      return plus(a + b);
    },
    minus: function (c) {
      return minus(a - c);
    },
  };
}

console.log(plus(5).minus(3).value());
console.log(plus(7).plus(3).minus(2).value());
