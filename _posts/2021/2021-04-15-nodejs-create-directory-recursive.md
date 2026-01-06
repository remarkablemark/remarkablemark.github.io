---
layout: post
title: 'Node.js: create directory recursive'
date: 2021-04-15 21:08:35
excerpt: How to create directories recursively using Node.js.
categories: nodejs javascript
---

## fs.mkdirSync

[Synchronously creates a directory](https://nodejs.org/api/fs.html#fs_fs_mkdirsync_path_options):

```js
const fs = require('fs');
const path = 'a';

fs.mkdirSync(path, { recursive: true });
```

## fs.mkdir

[Asynchronously creates a directory](https://nodejs.org/api/fs.html#fs_fs_mkdir_path_options_callback):

```js
const fs = require('fs');
const path = 'a/b';

fs.mkdir(path, { recursive: true }, error => {
  if (error) {
    throw error;
  }
});
```

## fs.promises.mkdir

[Asynchronously creates a directory with a promise](https://nodejs.org/api/fs.html#fs_fspromises_mkdir_path_options):

```js
(async () => {
  try {
    const path = 'a/b/c';
    await fs.promises.mkdir(path, { recursive: true });
  } catch (error) {
    throw error;
  }
})();
```

## Demo

[Repl.it](https://replit.com/@remarkablemark/Nodejs-create-directory-recursive):

<iframe height="400px" width="100%" src="https://replit.com/@remarkablemark/Nodejs-create-directory-recursive?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
