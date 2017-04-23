---
layout: post
title: JavaScript hash generator
date: 2017-01-31 03:31:00 -4000
excerpt: Several ways of generating a simple hash with JavaScript.
categories: javascript hash
---

There are a few ways to generate a hash with JavaScript.

One approach is to use [toString()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number/toString) to convert a **number to base 36**:

```js
(19440).toString(36); // 'f00'
```

You can generate the number using [Math.random()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/random):

```js
Math.random().toString(36); // '0.t8422kr67xeufojkb4piizfr'
```

Or get the current [milliseconds since the UNIX epoch](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/now):

```js
Date.now().toString(36); // 'iyl0uscb'
```

However, the above solutions don't guarantee _uniqueness_ because `Math.random` could return the same number and `Date.now` will return the same value if time hasn't changed.

As a result, I recommend checking out [uuid](https://www.npmjs.com/package/uuid) and [shortid](https://www.npmjs.com/package/shortid). Also, there's a way to generate an [MD5 hash]({% post_url 2017/2017-04-20-nodejs-md5-hash %}) with Node.js.
