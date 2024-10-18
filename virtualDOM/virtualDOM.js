/*

Suppose you have solved 110. serialize and deserialize binary tree, have you wondered how to do similar task to DOM tree ?

HTML string could be thought as some sort of serialization, the browser parses(deserialize) the HTML → construct the DOM tree.

Besides XML base, we could try JSON for this. If we log the element presentation in React, like below

```
const el = <div>
 <h1> this is </h1>
 <p className="paragraph"> a <button> button </button> from <a href="https://bfe.dev"><b>BFE</b>.dev</a>
 </p>
</div>;

console.log(el)
```

we would get this( ref, key .etc are stripped off)

```
{
  type: 'div',
  props: {
    children: [
      {
        type: 'h1',
        props: {
          children: ' this is '
        }
      },
      {
        type: 'p',
        props: {
          className: 'paragraph',
          children: [
            ' a ',
            {
              type: 'button',
              props: {
                children: ' button '
              }
            },
            ' from',
            {
              type: 'a',
              props: {
                href: 'https://bfe.dev',
                children: [
                  {
                    type: 'b',
                    props: {
                      children: 'BFE'
                    }
                  },
                  '.dev'
                ]
              }
            }
          ]
        }
      }
    ]
  }
}
```

Clearly this is the same tree structure but only in object literal.

Now you are asked to serialize/deserialize the DOM tree, like what React does.

Note:

Functions like event handlers and custom components are beyond the scope of this problem, 
you can ignore them, just focus on basic HTML tags.

You should support:

1. TextNode (string) as children
2. single child and multiple children
3. camelCased properties.

virtualize() takes in a real DOM tree and create an object literal render() takes in a object literal 
presentation and recreate a DOM tree.

***************************************************Solution***************************************************/

/**
 * @param {HTMLElement}
 * @return {object} object literal presentation
 */
// this function generates virtual DOM from the given actual DOM
function virtualize(element) {
  const { tagName, attributes, childNodes } = element;
  const virtualDOM = { type: tagName.toLowerCase() };

  // props will contain the attributes and child nodes of an element
  const props = {};

  // checking for attributes
  for (const { name, value } of attributes) {
    props[name === "class" ? "className" : name] = value;
  }

  // checking for child nodes - in childNodes we can see both text nodes, element nodes, and even comment nodes if they exist.
  const children = [];
  childNodes.forEach((childNode) => {
    // checking for text nodes
    if (!childNode.tagName) {
      children.push(childNode.textContent);
    } else {
      children.push(virtualize(childNode));
    }
  });

  if (children.length === 1) {
    props.children = children[0];
  } else {
    props.children = children;
  }

  virtualDOM.props = props;

  return virtualDOM;
}

/**
 * @param {object} valid object literal presentation
 * @return {HTMLElement}
 */

// this function renders the DOM from the given virtual DOM
function render(obj) {
  if (typeof obj !== "object") {
    return obj;
  }

  const {
    type,
    props: { children, ...attributes },
  } = obj;
  const rootElement = document.createElement(type);

  for (let key of Object.keys(attributes)) {
    const value = attributes[key];
    key = key === "className" ? "class" : key;
    rootElement.setAttribute(key, value);
  }

  if (Array.isArray(children)) {
    children.forEach((child) => {
      rootElement.append(render(child));
    });
  } else {
    const textNode = document.createTextNode(children);
    rootElement.append(textNode);
  }

  return rootElement;
}
