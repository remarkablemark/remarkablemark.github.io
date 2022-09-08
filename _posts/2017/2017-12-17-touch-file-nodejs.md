---
layout: post
title: How to touch a file in Node.js
date: 2017-12-17 16:44:13
updated: 2022-09-08 10:35:55
excerpt: How to touch a file in Node.js using the standard promise (async) and legacy synchronous `fs` methods.
categories: touch file nodejs javascript
---

## Create file

To create an empty file in [Node.js](https://nodejs.org/):

```js
const fs = require('node:fs/promises');
const filename = 'file.txt';
let fh = await fs.open(filename, 'w');
await fh.close();
```

Here, a (blank) file is written with [fs.open](https://nodejs.org/api/fs.html#fspromisesopenpath-flags-mode) and then closed with [fh.close](https://nodejs.org/api/fs.html#filehandleclose).

## touch file

To `touch` a file, however, requires a bit more work (_credit [boutell](https://disq.us/p/21rurrt)_):

```js
const fs = require('node:fs/promises');
const filename = 'file.txt';
const time = new Date();

await fs.utimes(filename, time, time).catch(async function (err) {
    if ('ENOENT' !== err.code) {
        throw err;
    }
    let fh = await fs.open(filename, 'w');
    await fh.close();
});
```

[fs.utimes](https://nodejs.org/api/fs.html#fspromisesutimespath-atime-mtime) is used here to prevent existing file contents from being overwritten.

It also updates the last modification timestamp of the file, which is consistent with what POSIX `touch` does.

### Blocking

To do this synchronously, we can use the legacy blocking methods [fs.closeSync](https://nodejs.org/api/fs.html#fsclosesyncfd), [fs.openSync](https://nodejs.org/api/fs.html#fsopensyncpath-flags-mode), [fs.utimesSync](https://nodejs.org/api/fs.html#fsutimessyncpath-atime-mtime):

```js
const fs = require('node:fs');
const filename = 'file.txt';
const time = new Date();

try {
    fs.utimesSync(filename, time, time);
} catch (e) {
    let fd = fs.openSync(filename, 'w');
    fs.closeSync(fd);
}
```

## Examples

You can find a list of approaches in the [Gist](https://gist.github.com/remarkablemark/17c9c6a22a41510b2edfa3041ccca95a) below:

{% gist 17c9c6a22a41510b2edfa3041ccca95a %}
