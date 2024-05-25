---
layout: post
title: ES6 Spread Operator
date: 2024-05-25 12:36:36
excerpt: How JavaScript ES6 spread operator syntax works.
categories: javascript es6 spread operator syntax
---

This post goes over how [ES6 spread operator](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Spread_syntax) works.

- [Object](#object)
- [Array](#array)
- [Function](#function)

## Object

Use spread to make a shallow copy of an object:

```js
const object = {
  key: 'value',
};

const copy = {
  ...object,
};

assert.deepEqual(object, copy);
assert.notStrictEqual(object, copy);
```

[`Object.assign()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) is an alternative to object spread syntax:

```js
const object = {
  key: 'value',
};

const copy = Object.assign({}, object);

assert.deepEqual(object, copy);
```

If the value is not an object or array, spread will do nothing:

```js
assert.deepEqual({}, { ...undefined });
assert.deepEqual({}, { ...null });
assert.deepEqual({}, { ...false });
assert.deepEqual({}, { ...0 });
```

Spread can be used to merge objects:

```js
const john = {
  name: 'John',
  age: 42,
};

const mary = {
  name: 'Mary',
};

const merge = {
  ...john,
  ...mary,
};

assert.deepEqual(merge, { name: 'Mary', age: 42 });
```

Note that the order matters:

```js
const merge = {
  ...mary,
  ...john,
};

assert.deepEqual(merge, { name: 'John', age: 42 });
```

## Array

Use spread to make a shallow copy of an array:

```js
const array = [0, 1, 2];
const copy = [...array];

assert.deepEqual(array, copy);
assert.notStrictEqual(array, copy);
```

[`Array.slice`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) is an alternative to array spread syntax:

```js
const array = [0, 1, 2];
const copy = array.slice();

assert.deepEqual(array, copy);
```

If the value is not an iterable, spread will throw an error:

```js
// Uncaught TypeError: undefined is not iterable
assert.throws(() => [...undefined]);
```

Spread can be used to merge arrays:

```js
const animals = ['cat', 'dog'];
const fruits = ['apple', 'banana'];
const merge = [...animals, ...fruits];

assert.deepEqual(merge, ['cat', 'dog', 'apple', 'banana']);
```

Note that the _order_ matters:

```js
const animals = ['cat', 'dog'];
const fruits = ['apple', 'banana'];
const merge = [...fruits, ...animals];

assert.deepEqual(merge, ['apple', 'banana', 'cat', 'dog']);
```

## Function

Spread function arguments:

```js
function fun(...args) {
  assert(Array.isArray(args));
}
```

Spread can be a replacement for [`arguments`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/arguments):

```js
function fun(...args) {
  assert.deepEqual(args, [...arguments]);
}
```
