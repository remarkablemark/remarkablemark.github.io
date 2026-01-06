---
layout: post
title: 'JavaScript generator: sync vs async'
date: 2021-04-22 19:55:12
excerpt: Examples of sync and async JavaScript generator.
categories: javascript generator
---

This article goes over the difference between synchronous and asynchronous [generators](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator).

## Sync

Example of a sync generator:

```js
const fruits = ['Apple', 'Banana', 'Orange'];

function* getFruitsIterator() {
  for (const fruit of fruits) {
    yield fruit;
  }
}

const getFruits = getFruitsIterator();

console.log(getFruits.next());
console.log(getFruits.next());
console.log(getFruits.next());
console.log(getFruits.next());
```

Which outputs the logs:

```
{ value: 'Apple', done: false }
{ value: 'Banana', done: false }
{ value: 'Orange', done: false }
{ value: undefined, done: true }
```

## Async

Example of an async generator:

```js
const names = [Promise.resolve('Adam'), Promise.resolve('Eve')];

async function* getNamesIterator() {
  try {
    for (const name of names) {
      yield name;
    }
  } catch (error) {
    throw error;
  }
}

(async () => {
  const getNames = getNamesIterator();

  console.log(await getNames.next());
  console.log(await getNames.next());
  console.log(await getNames.next());
})();
```

Which outputs the logs:

```
{ value: 'Adam', done: false }
{ value: 'Eve', done: false }
{ value: undefined, done: true }
```

## Demo

[Repl.it](https://replit.com/@remarkablemark/Generators):

<iframe height="400px" width="100%" src="https://replit.com/@remarkablemark/Generators?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
