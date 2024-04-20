---
layout: post
title: Generate unique pairs with JavaScript
date: 2024-04-19 21:04:04
excerpt: How to generate unique pairs with JavaScript.
categories: javascript array pair algorithm data
---

This post goes over how to generate unique pairs with JavaScript.

## Problem

Given an array:

```json
[1, 2, 3]
```

How do you generate unique pairs like the following?

```json
[
  [1, 2],
  [1, 3],
  [2, 3]
]
```

## Solution

The approach is to iterate through the array if the length is greater than 2:

```js
const array = [1, 2, 3];
const pairs = [];

for (const value of array) {
  // ...
}
```

Then create a sliced copy of the array and form the pairs:

```js
const copy = array.slice(array.indexOf(value) + 1);

for (const element of copy) {
  pairs.push([value, element]);
}
```

Here's a function that uses native Array methods:

```js
function uniquePairs(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('First argument must be an array');
  }

  if (array.length < 3) {
    return [array];
  }

  return array.reduce(
    (previousValue, currentValue, index) =>
      previousValue.concat(
        array.slice(index + 1).map((value) => [currentValue, value])
      ),
    []
  );
}
```

## Demo

[Replit](https://replit.com/@remarkablemark/Generate-unique-pairs-with-JavaScript):

<iframe height="600px" width="100%" src="https://replit.com/@remarkablemark/Generate-unique-pairs-with-JavaScript?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
