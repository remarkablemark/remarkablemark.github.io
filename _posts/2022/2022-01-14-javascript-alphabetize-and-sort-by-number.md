---
layout: post
title: 'JavaScript: alphabetize and sort by number'
date: 2022-01-14 19:39:17
excerpt: How to alphabetize and sort by number with JavaScript.
categories: javascript
---

This post goes over how to alphabetize and [sort](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) by number with JavaScript.

## Problem

Given an array of objects:

```js
const objects = [
  {
    number: 2,
    string: 'Two-B',
  },
  {
    number: 2,
    string: 'Two-A',
  },
  {
    number: 1,
    string: 'One',
  },
];
```

How does one alphabetize by property `string` and sort by property `number`?

## Solution

To alphabetize by property `string`:

```js
objects.sort((a, b) => a.string.localeCompare(b.string));
```

To sort by property `number`:

```js
objects.sort((a, b) => a.number - b.number);
```

Output:

```js
[
  { number: 1, string: 'One' },
  { number: 2, string: 'Two-A' },
  { number: 2, string: 'Two-B' },
];
```

Since `Array.prototype.sort()` mutates the array, create a copy of the array with [slice](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/slice):

```js
const copy = objects.slice();
```

Or by [spread](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Spread_syntax):

```js
const copy = [...objects];
```

## Demo

[Replit](https://replit.com/@remarkablemark/JavaScript-alphabetize-and-sort-by-number#index.js):

<iframe height="600px" width="100%" src="https://replit.com/@remarkablemark/JavaScript-alphabetize-and-sort-by-number?lite=true#index.js" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
