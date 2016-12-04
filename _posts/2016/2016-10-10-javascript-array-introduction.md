---
layout: post
title: "JavaScript Array: Introduction"
date: 2016-10-10 18:45:00 -4000
excerpt: An introduction to JavaScript arrays.
categories: javascript array
---

What's an [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) in JavaScript?

In the simplest of terms, it's a list:

```js
var list = ['item1', 'item2', 'item3'];
// array created using the literal notation
```

An array can hold any type of value:

```js
var array = [
    'string',
    Number(1),
    Boolean(true),
    { object: '' },
    [ 'array' ],
    Function,
    null,
    undefined
];
```

Arrays are also [zero-indexed](https://en.wikipedia.org/wiki/Zero-based_numbering), which means the first element starts at `0`:

```js
var array = ['first', 'second'];
array[0]; // 'first'
array[1]; // 'second'
```

Then, what's the index of the last element?

```js
var array = ['first', 'last'];
array.length; // 2
var lastIndex = array.length - 1;
array[lastIndex]; // 'last'
```

Although an array is an instance of `Array`, it's actually a type `Object`:

```js
var arr = [];
arr.constructor;      // [Function: Array]
arr instanceof Array; // true
typeof arr;           // 'object'
```

Therefore, you can think of arrays as a hash:

```js
var array = ['apple', 'banana', 'carrot'];
var associativeArray  = {
    '0': 'apple',
    '1': 'banana',
    '2': 'carrot'
};
```

You can specifically set an array element to a value:

```js
var array = [];
array[0] = 'initial';
array; // [ 'initial' ]
array[0] = 'override';
array; // [ 'override' ]
```

If it's set to an index beyond the array's length, the unset elements will be `undefined`:

```js
var array = ['one'];
var array[2] = 'three';
array; // [ 'one', undefined, 'three' ]
```

And array elements can also be deleted:

```js
var array = ['one', 'two', 'three'];
delete array[2];
array; // [ 'one', 'two', undefined ]
```

What to learn more about [array methods]({% post_url 2016/2016-10-18-javascript-array-methods %})? Check out the post for more information.
