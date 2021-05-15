---
layout: post
title: 'Node.js: filename without extension'
date: 2021-05-14 20:45:27
excerpt: How to get a filename without the extension using Node.js `path.basename`.
categories: nodejs javascript
---

Use [`path.basename`](https://nodejs.org/api/path.html#path_path_basename_path_ext) to get the filename without the `.js` extension:

```js
// file.js
const path = require('path');

path.basename('foo.js', '.js'); // foo
path.basename('foo/bar.js', '.js'); // bar
path.basename(__filename, '.js'); // file
```
