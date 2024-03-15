/*

If using React, you can set the prop className to add class name to an element, it is string so you can 
add multiple class names like this:

```
<p className="classname1 classname2">
  BFE.dev can help
</p>
```

When class names are dynamically generated, it becomes verbose.

```
<p 
  className={`classname1  ${shouldAddClassname2 ? 'classname2' : ''}`}>
  BFE.dev can help
</p>
```

classnames can help with this.

`classNames()` accepts arbitrary arguments, filter out the falsy values, and generate the final className string.

1. string and number are used directly.

```
classNames('BFE', 'dev', 100) 
// 'BFE dev 100'
```

2. other primitives are ignored.

```javascript
classNames(
  null, undefined, Symbol(), 1n, true, false
) 
// ''
```

3. Object's enumerable property keys are kept if the key is string and value is truthy. Array should be flattened.

```javascript
const obj = new Map()
obj.cool = '!'

classNames({BFE: [], dev: true, is: 3}, obj) 
// 'BFE dev is cool'

classNames(['BFE', [{dev: true}, ['is', [obj]]]])
// 'BFE dev is cool'
```

Please implement your own classNames().

note:

It is not the goal to reimplement the original package, so the spec might be a little different, 
please follow the above description.

***************************************************Solution***************************************************/

/**
 * @param {any[]} args
 * @returns {string}
 */

// recursive solution without using Array.flat()

function classNames(...args) {
  function util(...classes) {
    return classes.reduce((result, item) => {
      if (typeof item === "string" || typeof item === "number") {
        result.push(item);
      } else if (Array.isArray(item)) {
        result = [...result, ...util(...item)];
      } else if (item !== null && typeof item === "object") {
        for (const key of Object.keys(item)) {
          if (item[key]) {
            result.push(key);
          }
        }
      }

      return result;
    }, []);
  }

  return util(...args).join(" ");
}

/*
  
  // solution using Array.flat()
  function classNames(...args){
    return args.flat(Infinity).reduce((result, item) => {
      if(item === null){
        return result;
      }
  
      switch(typeof item){
        case "string":
        case "number":{
          result.push(item)
          break;
        }
  
        case "object":{
          for(const key of Object.keys(item)){
            if(item[key]){
              result.push(key)
            }
          }
  
          break;
        }
      }
  
      return result;
    }, []).join(" ")
  }
  
  */
