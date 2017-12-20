---
layout: post
title: How to touch a file in Node.js
date: 2017-12-17 16:44:13 -4000
excerpt: How to touch a file in Node.js using synchronous and asynchronous fs.
categories: touch file fs promise nodejs javascript
---

To synchronously touch (or create an empty) a file in Node.js:

```js
const fs = require('fs');
const filename = 'file.txt';
fs.closeSync(fs.openSync(filename, 'w'));
```

But what if we don't want to block the event loop? We could convert it to the asynchronous callback style:

```js
// ...
fs.open(filename, 'w', (err, fd) => {
  if (err) throw err;
  fs.close(fd, err => { if (err) throw err; });
});
```

And for those who prefer the promise syntax:

```js
// ...
const { promisify } = require('util');
const open = promisify(fs.open);
const close = promisify(fs.close);
open(filename, 'w').then(close);
```

[`promisify`](https://nodejs.org/api/util.html#util_util_promisify_original) is available in Node.js 8+.

You can find a list of approaches below:

{% gist 17c9c6a22a41510b2edfa3041ccca95a %}
