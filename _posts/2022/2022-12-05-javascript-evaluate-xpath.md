---
layout: post
title: JavaScript evaluate XPath expression
date: 2022-12-05 19:06:11
excerpt: How to evaluate an XPath expression with JavaScript in the DOM.
categories: javascript xpath
---

This post goes over how to [evaluate](https://developer.mozilla.org/docs/Web/API/Document/evaluate) an [XPath](https://wikipedia.org/wiki/XPath) expression with JavaScript in the DOM.

# document.evaluate

Use [`document.evaluate`](https://developer.mozilla.org/docs/Web/API/Document/evaluate) to evaluate an XPath expression `<MY_XPATH>` in the DOM:

```js
document.evaluate('<MY_XPATH>', document, null, XPathResult.ANY_TYPE, null);
```

For example, to get all buttons containing the text `Yes` in the [`document.body`](https://developer.mozilla.org/docs/Web/API/Document/body):

```js
const result = document.evaluate(
  '//button[contains(text(), "Yes")]',
  document.body,
  null,
  XPathResult.ANY_TYPE,
  null
);

let button;
const buttons = [];

while ((button = result.iterateNext())) {
  buttons.push(button);
}

console.log(buttons);
```

Here's a helper function that evaluates XPath:

```js
/**
 * Evaluate XPath expression.
 *
 * @param {string} xpathExpression - XPath expression.
 * @param {HTMLElement} [contextNode=document] - Context node for the query.
 * @returns {HTMLElement[]}
 */
function evaluateXPath(xpathExpression, contextNode = document) {
  const result = document.evaluate(
    xpathExpression,
    contextNode,
    null,
    XPathResult.ANY_TYPE,
    null
  );

  let element;
  const elements = [];

  while ((element = result.iterateNext())) {
    elements.push(element);
  }

  return elements;
}
```

## Gist

{% gist 376477ed8386682cec8644cff5cbb5c9 %}

## Miscellaneous

Check out [XPath cheatsheet](https://devhints.io/xpath).
