---
layout: post
title: Explaining async/await using promises
date: 2020-08-19 21:46:46
updated: 2020-11-10 19:15:50
excerpt: Comparing how JavaScript async/await works using promises.
categories: javascript async-await promise
---

## Promise

### Resolve

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

### Reject

Calling [`Promise.reject`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject) with a reason:

```js
Promise.reject('reason');
```

Is the same as instantiating a `Promise` with a _rejected_ reason in the callback function:

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

Async/await is the syntactical sugar that makes promises look synchronous (but it's actually not):

```js
(async () => {
  const result = await Promise.resolve('value');
  console.log(result); // 'value'
})();
```

This is equivalent to:

```js
Promise.resolve('value').then(result => {
  console.log(result); // 'value'
});
```

For a fulfilled promise, you can think of `await` as the [`then()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) method in the promise chain.

### Rejected

When a promise is rejected inside an async function, you can handle it with a [try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch):

```js
(async () => {
  try {
    await Promise.reject('reason');
  } catch (error) {
    console.log(error); // 'reason'
  }
})();
```

This is the same thing as:

```js
Promise.reject('reason').catch(error => {
  console.log(error); // 'reason'
});
```

For a rejected promise, you can think of the `catch` block as the [`catch()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) method in the promise chain.
