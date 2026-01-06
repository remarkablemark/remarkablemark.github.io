---
layout: post
title: 'JavaScript: Find N in a row'
date: 2020-12-25 17:51:17
excerpt: How to find N in a row using JavaScript.
categories: javascript
---

## Problem

Given array:

```js
const items = [0, 1, 1];
```

How can you identify if there are N items in a row?

## Solution

To identify if there are 2 items in a row, iterate through the items and keep a count:

```js
const N = 2;
let previous;
let count;

for (const item of items) {
  if (item === previous) {
    count++;
  } else {
    count = 1;
    previous = item;
  }

  if (count === N) {
    console.log(item);
    break;
  }
}
```

### findNInARow

A function to return the array item if it repeats N times in a row:

```js
/**
 * Find N in a row.
 *
 * @param {number} N
 * @param {any[]} items
 * @return {any}
 */
function findNInARow(N, items) {
  if (N < 1) {
    return;
  }

  if (items.length === 0) {
    return;
  }

  let previous = Symbol();
  let count = 0;

  for (const item of items) {
    if (item === previous) {
      count += 1;
    } else {
      count = 1;
      previous = item;
    }

    if (count === N) {
      return item;
    }
  }

  return;
}
```

> [`Symbol()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol) is used to generate a unique identifier since there's no previous item when the loop first begins.

### hasNInARow

A function to check if array has N items in a row:

```js
/**
 * Has N in a row.
 *
 * @param {number} n
 * @param {any[]} items
 * @return {boolean}
 */
function hasNInARow(N, items) {
  if (N < 1) {
    return true;
  }

  if (items.length === 0) {
    return false;
  }

  let previous = Symbol();
  let count = 0;

  for (const item of items) {
    if (item === previous) {
      count += 1;
    } else {
      count = 1;
      previous = item;
    }

    if (count === N) {
      return true;
    }
  }

  return false;
}
```

## Demo

[Repl.it](https://replit.com/@remarkablemark/Find-N-in-a-row):

<iframe height="400px" width="100%" src="https://replit.com/@remarkablemark/Find-N-in-a-row?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
