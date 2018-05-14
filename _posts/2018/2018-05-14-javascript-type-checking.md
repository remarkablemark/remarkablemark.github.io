---
layout: post
title: JavaScript type checking
date: 2018-05-14 19:55:39 -4000
excerpt: A simple overview on type checking in JavaScript.
categories: javascript type checking
---

How can we check if something is [`undefined`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)?

We can compare it against the variable itself:
```js
var something
something === undefined // true
```

Fun fact, before ES5, `undefined` was overwritable so you would use [`typeof`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/typeof):
```js
var something
typeof something === 'undefined' // true
```

How about [`null`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/null)?

We can do something similar:
```js
var something = null
something === null // true
```

However, `typeof` won't work here:
```js
typeof null // 'object'
```

[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) checks are consistent with `typeof`:
```js
var something = ''
typeof something // 'string'
```

And we could use it to check if it's a [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) as well:
```js
var something = 42
typeof something // 'number'
```

But there's a [catch](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/isNaN):
```js
var something = parseInt('foo') // NaN
typeof something // 'number'
```

So to check if something's truly a number:
```js
typeof something && !isNaN(something)
```

Because type casting happens even during comparison:
```js
1 > '0' // true
1 > '1' // false
```

[Function](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Functions) can be checked with `typeof`:
```js
var something = function() {}
typeof something // 'function'
```

So what about an [array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)?

Well there's always the [`length`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/length) property:
```js
var something = []
something.length >= 0 // true
```

But it will break for `undefined` and `null`:
```js
var something
something.length // TypeError

something = null
something.length // TypeError
```

So can we use `typeof` to check if a variable is an array?
```js
var something = []
typeof something // object
```

It seems like it's not consistent as well.

The best way to check if something is an array:
```js
var something = []
something instanceof Array // true
```

Alternatively you can use the [`constructor`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor) property as well but you need to make sure it's not `undefined` or `null`:
```js
(
  something && // make sure it's not `undefined` or `null`
  typeof something === 'object' && // make sure it's not a string or number
  something.constructor === Array
)
```

Now what about an [object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?

So you might be thinking about using [`instanceof`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/instanceof) here:
```js
var something = {}
something instanceof Object // true
```

However this can be inconsistent as well:
```js
var something = []
something instanceof Object // true
```

The best bet is to use `constructor` (be sure to make similar checks like array above):
```js
var something = {}
something.constructor === Object
```
