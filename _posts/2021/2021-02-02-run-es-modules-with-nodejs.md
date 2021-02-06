---
layout: post
title: How to run ES Modules with Node.js
date: 2021-02-02 21:34:24
updated: 2021-02-06 12:13:52
excerpt: How to run ES Modules with the Node.js binary in the command-line interface (CLI).
categories: es6 module nodejs
---

Given [ECMAScript module](https://nodejs.org/api/esm.html) `index.mjs`:

```js
// index.mjs
import util from 'util';
console.log(util.inspect('Hello, World!'));
```

To execute `index.mjs` with Node.js v12, pass the [`--experimental-modules`](https://nodejs.medium.com/announcing-a-new-experimental-modules-1be8d2d6c2ff) flag:

```sh
$ node --experimental-modules index.mjs
(node:84000) ExperimentalWarning: The ESM module loader is experimental.
'Hello, World!'
```

For Node.js v14 and up, the `--experimental-modules` flag isn't necessary:

```sh
$ node index.mjs
'Hello, World!'
```
