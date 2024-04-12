/*

I believe you've used `extends` keyword in you JavaScript programs before.

Could you implement a `myExtends()` function in ES5 to mimic the behavior of `extends`?

`myExtends()` takes a SubType and SuperType, and return a new type.

```javascript
const InheritedSubType = myExtends(SuperType, SubType)

const instance = new InheritedSubType()

// above should work (almost) the same as follows

class SubType extends SuperType {}
const instance = new SubType()
```

To solve this problem, you need to fully understand what is Inheritance

note:

Your code will be test against following SuperType and SubType

```javascript
function SuperType(name) {
    this.name = name
    this.forSuper = [1, 2]
    this.from = 'super'
}
SuperType.prototype.superMethod = function() {}
SuperType.prototype.method = function() {}
SuperType.staticSuper = 'staticSuper'

function SubType(name) {
    this.name = name
    this.forSub = [3, 4]
    this.from = 'sub'
}

SubType.prototype.subMethod = function() {}
SubType.prototype.method = function() {}
SubType.staticSub = 'staticSub'
```

*********************************************************Solution*******************************************************/

/*

Refer to the following resources to understand the solution:

https://www.javascripttutorial.net/javascript-tutorial/javascript-prototype/
https://blog.devgenius.io/prototypal-inheritance-and-classes-in-javascript-b85d0c6cf90c
https://javascript.info/class-inheritance
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf

*/

const myExtends = (SuperType, SubType) => {
  function ExtendedType(...args) {
    SuperType.apply(this, args);
    SubType.apply(this, args);

    /* linking the newly created object to the prototype of the SubType 
      since the object is created from the SubType */
    Object.setPrototypeOf(this, SubType.prototype);
  }

  /* linking the prototype of SubType to the prototype of SuperType since we want to 
    inherit the properties, methods, etc. from the SuperType, the following line is same as writing:
    SubType.prototype.__proto__ = SuperType.prototype */
  Object.setPrototypeOf(SubType.prototype, SuperType.prototype);

  // linking ExtendedType's prototype chain to SubType's prototype
  Object.setPrototypeOf(ExtendedType.prototype, SubType.prototype);

  // to pass the test: ExtendedType.__proto__ should be SuperType
  Object.setPrototypeOf(ExtendedType, SuperType);

  return ExtendedType;
};
