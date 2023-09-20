/*

write a counter() function that can do the following:


const c1 = counter();

c1.latest(); // 0

const c2 = counter();

c1.add(5);
c2.add(5);
c1.add(6);

c1.latest(); // 11
c2.latest(); // 5

c2.add(3);

c2.latest(); // 8
 
************************************************************Solution*********************************************************/

// asked in Leadsquared

function counter() {
  return {
    value: 0,
    add: function (num) {
      this.value += num;
    },
    latest: function () {
      console.log(this.value);
    },
  };
}
