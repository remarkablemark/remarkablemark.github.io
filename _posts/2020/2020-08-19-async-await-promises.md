---
layout: post
title: Explaining async/await with promises
date: 2020-08-19 21:46:46
excerpt: Explaining how JavaScript async/await works with promises.
categories: javascript promises async-await
---

## Promise

Calling [`Promise.resolve`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) with a value:

```js
Promise.resolve('value');
```

Is the same as instantiating [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) with a _fulfilled_ value in the callback function:

```js
new Promise(resolve => {
  resolve('value');
});
```

[`Promise.reject`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject) is similar except it's used when a promise is rejected:

```js
Promise.reject('reason');
```

```js
new Promise((resolve, reject) => {
  reject('reason');
});
```

## Async/Await

### Function

A [no-op](<https://en.wikipedia.org/wiki/NOP_(code)>) function looks like:

```js
function () {};
```

Which is similar to the [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions):

```js
() => {};
```

### Async Function

An [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) is declared with `async` in front of the function:

```js
async function () {};
```

Which is similar to the async arrow function:

```js
async () => {};
```

When an async function is called, it returns a `Promise`:

```js
const a = async () => {};
a() instanceof Promise; // true
```

## Comparison

### Fulfilled

Async/await is syntactical sugar for promises:

```js
const promise = Promise.resolve('value');

async () => {
  const result = await promise;
  console.log(result);
};
```

The above can be transpiled to the following code using promises:

```js
const promise = Promise.resolve('value');

() => {
  promise.then(result => {
    console.log(result);
  });
};
```

Think of `await` as the [`then`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) method in the chain (for a fulfilled promise).

### Rejected

Rejected promises are handled with [try/catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch):

```js
const promise = Promise.reject('reason');

async () => {
  try {
    await promise;
  } catch (error) {
    console.log(error);
  }
};
```

And the above can be transpiled to the following code using promises:

```js
const promise = Promise.reject('reason');

() => {
  promise.catch(error => {
    console.log(error);
  });
};
```

The difference here is that the async/await `catch` looks synchronous even though the code is asynchronous.
