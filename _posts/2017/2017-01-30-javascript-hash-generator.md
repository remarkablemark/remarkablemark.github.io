---
layout: post
title: JavaScript hash generator
date: 2017-01-31 03:31:00 -4000
excerpt: Several ways of generating a simple hash with JavaScript.
categories: javascript hash
---

There are a few ways to generate a hash with JavaScript.

One quick and easy way is to convert a number to **base 36** with [toString()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number/toString).

You can generate that number using [Math.random()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/random):

```js
Math.random().toString(36);
// '0.t8422kr67xeufojkb4piizfr'
```

Or, you can get the current [milliseconds since the UNIX epoch](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/now):

```js
Date.now().toString(36);
// 'iyl0uscb'
```

However, the above solutions don't guarantee **_unique_** hashes if used multiple times simultaneously.

In such a case, I recommend checking out [uuid](https://www.npmjs.com/package/uuid) and [shortid](https://www.npmjs.com/package/shortid).
