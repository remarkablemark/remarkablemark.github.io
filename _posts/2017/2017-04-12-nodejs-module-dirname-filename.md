---
layout: post
title: 'Node.js: filename and dirname'
date: 2017-04-12 20:49:00
updated: 2021-06-25 20:40:31
excerpt: Use globals `__filename` and `__dirname` to get the filename or directory name of a module in Node.js.
categories: nodejs filename dirname
---

How do you get the filename and directory name of a Node.js module?

## \_\_filename

With [`__filename`](https://nodejs.org/docs/latest/api/modules.html#modules_filename), you can get the filename of a module:

```js
// /path/to/file.js
console.log(__filename); // /path/to/file.js
```

## \_\_dirname

With [`__dirname`](https://nodejs.org/docs/latest/api/modules.html#modules_dirname), you can get the directory name of a module:

```js
// /path/to/file.js
console.log(__dirname); // /path/to
```

## filename

What if you want the filename without the full path?

```js
// /path/to/file.js
const path = require('path');
console.log(
  path.basename(__filename) // file.js
);
```

## parent

To get the [parent filename](https://nodejs.org/docs/latest/api/modules.html#modules_accessing_the_main_module) that required the module, use `require.main.filename`:

```js
// /path/to/parent.js
require('/path/to/child.js');
```

```js
// /path/to/child.js
console.log(
  require.main.filename // /path/to/parent.js
);
```
