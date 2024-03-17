/*

If you are using React, you must be familiar with JSX.

With JSX syntax support, transpilers are able to understand below non-standard code directly in JavaScript.

```
<p> this is <button className="button">button</button> </p>
```

Then it is transpiled to standard JavaScript function calls.

```
React.createElement("p", null,
  " this is ",
  React.createElement("button", { className: "button" }, "button"),
  " ");
```

have a try at TypeScript Playground

To illustrate how the transpilation works, let's start with a simple example.

```
<a>bfe.dev</a>
```

First the parser will create an AST(Abstract Syntax Tree) from the code.

Open above code in AST Explorer, you can see the AST in the right panel, roughly something like this:

```
expression: JSXElement {
  openingElement: JSXOpeningElement {
    name: JSXIdentifier {
      name: "a"
    }
  }
  closingElement: JSXClosingElement {
    name: JSXIdentifier {
      name: "a"
    }
  }
  children: [
    JSXText {
      value: "bfe.dev"
    }
  ]
}
```

Obviously above AST follows the JSX Spec:

```
JSXElement:
  JSXOpeningElement JSXChildren? JSXClosingElement

JSXOpeningElement:
  < JSXElementName JSXAttributes? >

JSXChildren:
  JSXChild JSXChildren?

JSXClosingElement:
  < / JSXElementName >

JSXChild:
  JSXText
  JSXElement
  { JSXChildExpression? }
```

With the above AST, it is fairly easy to generate code, we only need to traverse the AST and 
insert React.createElement:

```
React.createElement("p", null,
  " this is ",
  React.createElement("button", { className: "button" }, "button"),
  " ");
```

Also instead of React method, we could use h() defined in 140. Virtual DOM III - Functional Component instead.

```
h("p", null,
  " this is ",
  h("button", { className: "button" }, "button"),
  " ");
```

Now, please create your own parse() and generate() to transpile JSX Element code.

1. please generate code which uses `h()`, `h()` is bundled with your code.
2. Goal of this problem is not to recreate the full parser, so only need to support the minimum spec below:

```
JSXElement:
  JSXOpeningElement JSXChildren? JSXClosingElement

JSXOpeningElement:
  < JSXElementName >

JSXChildren:
  JSXChild

JSXClosingElement:
  < / JSXElementName >

JSXChild:
  JSXText
```

- you can choose not to follow the naming
- there is no newlines in the input, you can ignore the whitespace rules
- all input tags are smallcase HTML tags

3. for simplicity, the AST creating process with `parse()` won't be tested, rather `parse()` and `generate()` 
are tested together like this:

```
const result = eval(generate(parse('<a>bfe.dev</a>')))
expect(result).toEqual(h('a', null, 'bfe.dev'))
```

An error should be thrown if code is not valid JSXElement, for example, the `JSXOpeningElement` and 
`JSXClosingElement` might not be matched.

The test cases only cover some of the common errors.

****************************************************Solution***************************************************/

/**
 * @param {code} string
 * @returns {any} AST
 */
function parse(code) {
  code = code.trim();

  if (code[0] !== "<" || code[code.length - 1] !== ">") {
    throw new Error("code doesn't start and end with either '<' or '>'");
  }

  if (code.split("<").length !== code.split(">").length) {
    throw new Error("number of '<' and '>' are not equal");
  }

  const firstOpeningTagIndex = code.indexOf("<");
  const firstClosingTagIndex = code.indexOf(">");
  const lastOpeningTagIndex = code.lastIndexOf("<");
  const lastClosingTagIndex = code.lastIndexOf(">");

  const openingTagContent = code
    .slice(firstOpeningTagIndex + 1, firstClosingTagIndex)
    .trim()
    .split(" ");
  const openingTagName = openingTagContent[0];
  const attributes = openingTagContent.slice(1);

  const props = {};
  attributes.forEach((attribute) => {
    const [key, value] = attribute.split("=");
    props[key] = value;
  });

  const closingTagContent = code
    .slice(lastOpeningTagIndex + 1, lastClosingTagIndex)
    .trim()
    .replaceAll(" ", "");

  if (closingTagContent[0] !== "/") {
    throw new Error("Closing tag must start with a '/'");
  }

  if (openingTagName !== closingTagContent[1]) {
    throw new Error("found opening and closing tag mismatch");
  }

  const children = code.slice(firstClosingTagIndex + 1, lastOpeningTagIndex);
  props.children = children.length ? [children] : [];

  return {
    openingElement: openingTagName,
    closingElement: openingTagName,
    props,
  };
}

/**
 * @param {any} your AST
 * @returns {string}
 */
function generate(ast) {
  const { openingElement, props } = ast;

  return {
    type: openingElement,
    props,
  };
}
