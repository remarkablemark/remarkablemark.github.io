---
layout: post
title: 'JavaScript: fill array with N items'
date: 2019-07-22 19:49:10
excerpt: How to fill an array with N items in JavaScript while supporting older browsers.
categories: javascript array
---

I needed to fill an array with N items in JavaScript. However, this also needed to work in [Internet Explorer 11](https://wikipedia.org/wiki/Internet_Explorer_11).

Although there's [`Array.from()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/from) and [`Array.fill()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/fill), I couldn't use them without requiring a polyfill.

I ended up finding a [Stackoverflow answer](https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n#answer-20066663) that uses `Array.apply`:

```js
Array.apply(null, { length: 10 });
```

```js
[ undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined ]
```

You can map and replace the value so it's the index number instead of `undefined` so it's the index number instead of `undefined`:

```js
Array.apply(null, { length: 10 }).map(function(_, index) {
  return index;
});
```

```js
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
```

If you're transpiling ES6 down to ES5, you can use [spread syntax](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Spread_syntax) with [`Object.keys()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/keys):

```js
[...Array(10).keys()];
```
