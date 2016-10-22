---
layout: post
title: "JavaScript Array: Methods"
date: 2016-10-18 22:51:00 -4000
excerpt: JavaScript array methods.
categories: javascript array
---

If you don't know what JavaScript arrays are, check out this [introduction]({% post_url 2016-10-10-javascript-array-introduction %}).

### Array.indexOf()

Use `indexOf()` to find the position of an element:

```js
var array = ['one', 'two', 'three'];
array.indexOf('two');  // 1
array.indexOf('four'); // -1
```

### Array.push()

Use `push()` to append an element to the end of an array:

```js
var array = [];
array.push('foo');
array; // [ 'foo' ]
```

Or append multiple elements:

```js
var array = ['foo'];
array.push('bar', 'baz');
array; // [ 'foo', 'bar', 'baz' ]
```

What does the method return?

```js
var array = ['foo'];
var result = array.push('bar');
result; // 2
result === array.length; // true
```

### Array.pop()

Use `pop()` to remove the last element from an array:

```js
var array = ['first', 'last'];
array.pop();
array; // [ 'first' ]
```

What does the method return?

```js
var array = ['first', 'last'];
var result = array.pop();
result; // 'last'
```

### Array.unshift()

Use `unshift()` to insert an element to the beginning of an array:

```js
var array = ['foo'];
array.unshift('first');
array; // [ 'first', 'foo' ]
```

What does the method return?

```js
var array = ['foo'];
var result = array.unshift('first');
result; // 2
result === array.length; // true
```

### Array.shift()

Use `shift()` to remove the first element from an array:

```js
var array = ['first', 'last'];
array.shift();
array; // [ 'last' ]
```

What does the method return?

```js
var array = ['first', 'last'];
var result = array.shift();
result; // 'first'
```

### Array.slice()

Use `slice()` to extract element(s) from an array:

```js
var array = ['one', 'two', 'three'];
var start, end;

// extract elements from index 1 to end
start = 1;
array.slice(start); // [ 'two', 'three' ]

// extract 1 element from the end
start = -1;
array.slice(start); // [ 'three' ]

// extract elements from index 1 to 2
start = 1;
end = 2;
array.slice(start, end); // [ 'two' ]
```

What does the method return?

```js
var array = ['one', 'two', 'three'];
var result = array.slice();
result; // [ 'one', 'two', 'three' ]
```

Because the method returns a shallow copy of the array, this means that [objects are passed by reference]({% post_url 2016-08-23-javascript-object-reference %}).

### Array.splice()

Use `splice()` to mutate an array:

```js
var array = ['one', 'two', 'three'];

// remove elements from index 1 to end
array.splice(1); // [ 'two', 'three' ]
array; // [ 'one' ]
```

You can remove a set number of elements:

```js
var array = ['one', 'two', 'three'];
var start, number;

// remove 1 element from index 0
start = 0;
number = 1;
array.splice(start, number); // [ 'one' ]
array; // [ 'two', 'three' ]

// remove 1 element from the end
start = -1;
array.splice(start); // [ 'three' ]
array; // [ 'two' ]
```

Or even insert new elements:

```js
var array = ['one', 'two', 'three'];

// remove 0 elements and insert an element at index 2
array.splice(2, 0, 'new'); // []
array; // [ 'one', 'two', 'new', 'three' ]
```

Or do both:

```js
var array = ['one', 'two', 'three'];

// remove 1 element from index 1
// and insert an element at the same position
array.splice(1, 1, 'mid'); // [ 'two' ]
array; // [ 'one', 'mid', 'three' ]
```

What does the method return?

```js
var array = ['one', 'two', 'three'];
var result = array.splice();
result; // []

result = array.splice(2, 1);
result // [ 'three' ]
```

Lastly, I must make a quick admission.

Although the methods seem to be properties of the `Array` constructor, they're actually properties of `Array.prototype`.

You can find a list of array methods if you run the following in a JavaScript console:

```js
Object.getOwnPropertyNames(Array.prototype);
```
