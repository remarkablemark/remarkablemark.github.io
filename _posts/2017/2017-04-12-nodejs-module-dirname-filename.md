---
layout: post
title: Node.js module filename and dirname
date: 2017-04-13 00:49:00 -4000
excerpt: To get the filename or directory name of a module in Node.js, use the globals `__filename` and `__dirname`.
categories: nodejs filename dirname
---

How do we get the directory and file name of a Node.js module?

With [__dirname](https://nodejs.org/docs/latest/api/globals.html#globals_dirname) we can get the **directory** name of a module:

```js
// `/path/to/file1.js`

console.log(__dirname); // `/path/to`
```

With [__filename](https://nodejs.org/docs/latest/api/globals.html#globals_filename) we can get the **file** name of a module:

```js
// `/path/to/file1.js`

console.log(__filename); // `/path/to/file1.js`
```

What if we only want the **name** of the file and _not_ the full path?

```js
// `/path/to/file1.js`

var path = require('path');
console.log(
    path.basename(__filename) // `file1.js`
);
```

Lastly, you can get the name of the [parent file](https://nodejs.org/docs/latest/api/modules.html#modules_accessing_the_main_module) that required the current module with `require.main.filename`:

```js
// `/path/to/file1.js`

require('/path/to/file2.js')
```

```js
// `/path/to/file2.js`

console.log(
    require.main.filename // `/path/to/file1.js`
);
```
