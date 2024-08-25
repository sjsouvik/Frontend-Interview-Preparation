/*

Given a DOM tree and a target element, generate a valid selector to target it.

For example, for a DOM tree like below

```html
<div>
  <p>BFE.dev</p>
  <div>
    is
    <p>
      <span>great. <button>click me!</button></span>
    </p>
  </div>
</div>
```

There could be more than 1 answer.

```javascript
let selector = generateSelector(root, target) // 'button'
expect(root.querySelector(selector)).toBe(target)
selector = generateSelector(root, target) // 'div > div > p > button'
expect(root.querySelector(selector)).toBe(target)
```

*****************************************************Solution*****************************************************/


/**
 * @param {HTMLElement} root
 * @param {HTMLElement} target
 * @return {string}
 */
function generateSelector(root, target) {
  let current = target, output = ''
  
  while(current !== root){
    output = `> ${current.tagName.toLowerCase()}${current.id ? `#${current.id}` : ""}` + output
    current = current.parentElement
  }

  return `${root.tagName.toLowerCase()} ${output}`
}
