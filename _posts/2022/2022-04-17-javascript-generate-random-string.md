---
layout: post
title: Generate random string with native JavaScript
date: 2022-04-17 22:52:41
excerpt: How to generate a random string with native JavaScript.
categories: javascript
---

This article goes over how to generate a random string with native JavaScript:

- [Math.random](#mathrandom)
- [Date.now](#datenow)
- [Random Letter Case](#random-letter-case)

## Math.random

Generate string with [`Math.random`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/random):

```js
Math.random().toString(36);
// '0.kq72bptq60s'
```

Generate string with `Math.random` without the period:

```js
(Math.random() * 1e17).toString(36);
// 'k7bk5iit9io'
```

## Date.now

Generate string with [`Date.now`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/now):

```js
Date.now().toString(36);
// 'l243fe20'
```

Generate string with `Date.now` and `Math.random`:

```js
(Date.now() * Math.random()).toString(36);
// 'hrl8r78d.88'
```

Generate string with `Date.now` and `Math.random` without the period:

```js
(Date.now() * Math.random() * 1e5).toString(36);
// 'fc7gf0tyc6g'
```

## Random Letter Case

Randomize letter case:

```js
function randomCase(string) {
  return string
    .split('')
    .map((letter) => (Math.random() > 0.5 ? letter.toUpperCase() : letter))
    .join('');
}
```

Randomize letter case given string generated with `Math.random`:

```js
randomCase(Math.random().toString(36));
// '0.2vLmxFrq4l2'
```
