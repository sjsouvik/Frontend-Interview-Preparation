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

function plus(a) {
  return {
    total: a,
    value: function () {
      return this.total;
    },
    plus: function (b) {
      this.total += b;
      return this;
    },
    minus: function (b) {
      this.total -= b;
      return this;
    },
  };
}

console.log(plus(5).minus(3).plus(20).value());
console.log(plus(7).plus(3).minus(2).value());

// asked in Ping Identity
const operation = {
  total: 0,
  add: function (a) {
    this.total += a;
    return this;
  },
  subtract: function (a) {
    this.total -= a;
    return this;
  },
  multiply: function (a) {
    this.total *= a;
    return this;
  },
  divide: function (a) {
    this.total /= a;
    return this;
  },
};

operation.add(10).multiply(19).subtract(10).divide(10).add(12);
console.log(operation.total);
