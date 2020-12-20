---
layout: post
title: Node.js read file using promise
date: 2020-12-20 14:59:36
excerpt: How to read a file using a promise (async/await) in Node.js.
categories: nodejs fs promise javascript
---

## Callback

Normally, [`fs.readFile`](https://nodejs.org/dist/latest/docs/api/fs.html#fs_fs_readfile_path_options_callback) is called with a [callback](https://javascript.info/callbacks):

```js
const fs = require('fs');
const path = require('path');

const filepath = path.resolve(__dirname, 'file.txt');

fs.readFile(filepath, 'utf8', (error, data) => {
  console.log(data);
});
```

## Promise

To call [`fs.promises.readFile`](https://nodejs.org/dist/latest/docs/api/fs.html#fs_filehandle_readfile_options) using [async/await](https://javascript.info/async-await):

```js
const fs = require('fs');
const path = require('path');

const filepath = path.resolve(__dirname, 'file.txt');

(async () => {
  const data = await fs.promises.readFile(filepath, 'utf8');
  console.log(data);
})();
```
