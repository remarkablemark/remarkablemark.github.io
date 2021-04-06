---
layout: post
title: 'Node.js: filename with trailing slash'
date: 2021-04-05 21:12:56
excerpt: How to write to a filename with a trailing slash in Node.js
categories: nodejs javascript file
---

> **TL;DR**: replace `/` with `\u2215`.

## Problem

In Node.js, when writing to a filename with a trailing slash (/), it gets evaluated as a directory path.

### Example

Writing to the filename `try/catch.txt`:

```js
const filename = 'try/catch.txt';
require('fs').writeFileSync(filename);
```

Throws the error:

```
Error: ENOENT: no such file or directory, open 'try/catch.txt'
```

## Solution

To write to a filename with a trailing slash, [replace](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/replace) the `/` with the [Unicode](https://www.educative.io/edpresso/how-to-insert-unicode-in-javascript) equivalent `\u2215`:

```js
const filename = 'try/catch.txt'.replace('/', '\u2215');
require('fs').writeFileSync(filename);
```

To [replace all](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll) trailing slashes with the Unicode equivalent:

```js
const filename = 'try/catch/finally.txt'.replace(/\//g, '\u2215');
require('fs').writeFileSync(filename);
```

## Demo

[Repl.it](https://repl.it/@remarkablemark/Nodejs-filename-with-trailing-slash):

<iframe height="400px" width="100%" src="https://repl.it/@remarkablemark/Nodejs-filename-with-trailing-slash?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
