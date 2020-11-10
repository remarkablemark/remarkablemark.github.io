---
layout: post
title: Explaining async/await using promises
date: 2020-08-19 21:46:46
updated: 2020-11-09 21:13:08
excerpt: Comparing how JavaScript async/await works using promises.
categories: javascript async-await promise
---

## Promise

Calling [`Promise.resolve`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) with a value:

```js
Promise.resolve('value');
```

Is the same as instantiating a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) with a _fulfilled_ value in the callback function:

```js
new Promise(resolve => {
  resolve('value');
});
```

In terms of [`Promise.reject`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject):

```js
Promise.reject('reason');
```

It's similar except the rejected reason is passed as the 2nd argument of the callback function:

```js
new Promise((resolve, reject) => {
  reject('reason');
});
```

## Async/Await

### Async Function

An [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) is declared with `async` in front of the function:

```js
async function () {};
```

Which is similar to the async [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions):

```js
async () => {};
```

When an async function is invoked, it returns a `Promise`:

```js
(async () => {})() instanceof Promise; // true
```

## Comparison

### Fulfilled

Async/await is syntactical sugar that makes promises look synchronous (but the code is still async):

```js
(async () => {
  const result = await Promise.resolve('value');
  console.log(result); // 'value'
})();
```

This is the same thing as:

```js
(() => {
  Promise.resolve('value').then(result => {
    console.log(result); // 'value'
  });
})();
```

For a fulfilled promise, you can think of `await` as the [`then`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) in the method chain.

### Rejected

When a promise is rejected, it can be handled with an [try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) inside an async function:

```js
(async () => {
  try {
    await Promise.reject('reason');
  } catch (error) {
    console.error(error); // 'reason'
  }
})();
```

This is the same thing as:

```js
(() => {
  Promise.reject('reason').catch(error => {
    console.error(error); // 'reason'
  });
})();
```

Even though async/await `catch` looks synchronous, the code is asynchronous.
