/*

Suppose you have solved above problem, now let's take a look at React.createElement():

```
React.createElement(
  type,
  [props],
  [...children]
)
```

1. First argument is type, it could be set to Custom Component, but here in this problem, it would 
only be HTML tag name
2. Second argument is props, here in this problem, it would only be the (common) camelCased HTML attributes
3. the rest arguments are the children, which in React supports many data types, but in this problem, 
it only has the element type of MyElement, or string for TextNode.

You are asked to create your own createElement() and render(), so that following code could create the 
exact HTMLElement in 113. Virtual DOM I.

```
const h = createElement

render(h(
  'div',
  {},
  h('h1', {}, ' this is '),
  h(
    'p',
    { className: 'paragraph' },
    ' a ',
    h('button', {}, ' button '),
    ' from ',
    h('a', 
      { href: 'https://bfe.dev' }, 
      h('b', {}, 'BFE'),
      '.dev')
  )
))
```

Notes:

The goal of this problem is not to create the replica of React implementation, you can have your own 
object representation format other than the one in 113. Virtual DOM I.

Details about ref, key are ignored here, they will be put in other problems. Re-render is not covered here, 
it will be in another problem as well.

****************************************************Solution**************************************************/

/**
 * MyElement is the type your implementation supports
 *
 * type MyNode = MyElement | string
 */

/**
 * @param { string } type - valid HTML tag name
 * @param { object } [props] - properties.
 * @param { ...MyNode} [children] - elements as rest arguments
 * @return { MyElement }
 */
function createElement(type, props, ...children) {
  const element = document.createElement(type);

  for (const key of Object.keys(props)) {
    element.setAttribute(key === "className" ? "class" : key, props[key]);
  }

  for (const child of children) {
    if (typeof child === "string") {
      element.append(document.createTextNode(child));
    } else {
      element.append(child);
    }
  }

  return element;
}

/**
 * @param { MyElement }
 * @returns { HTMLElement }
 */
function render(myElement) {
  return myElement;
}
