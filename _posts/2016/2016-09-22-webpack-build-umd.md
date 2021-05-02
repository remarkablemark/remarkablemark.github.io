---
layout: post
title: 'Webpack: Build UMD bundle'
date: 2016-09-22 20:38:00
updated: 2021-05-02 12:32:00
excerpt: How to build a UMD (Universal Module Definition) bundle with webpack.
categories: webpack build umd commonjs amd script javascript
---

This article goes over how to build a [UMD](https://github.com/umdjs/umd#readme) (Universal Module Definition) JavaScript bundle with [webpack](https://webpack.js.org/).

The UMD format allows JavaScript modules to be imported using:

- [CommonJS](#commonjs)
- [AMD](#amd)
- [script](#script)

## Prerequisites

Install [webpack](https://www.npmjs.com/package/webpack) and [webpack-cli](https://www.npmjs.com/package/webpack-cli):

```sh
$ npm install webpack webpack-cli --save-dev
```

Your `package.json` will look like:

```json
{
  "devDependencies": {
    "webpack": "^5.36.2",
    "webpack-cli": "^4.6.0"
  }
}
```

## Module

Create module:

```js
// src/add.js
module.exports = function add(a, b) {
  return a + b;
};
```

Add [webpack configuration](https://webpack.js.org/configuration/):

```js
// webpack.config.js
module.exports = {
  entry: './src/add.js',
  output: {
    filename: 'add.js',
    library: {
      type: 'umd',
      name: 'add',
    },
    // prevent error: `Uncaught ReferenceError: self is not define`
    globalObject: 'this',
  },
};
```

Run `webpack` to build your bundle:

```sh
$ npx webpack
asset add.js 399 bytes [compared for emit] [minimized] (name: main)
./src/add.js 57 bytes [built] [code generated]
```

The output file will be in `dist`:

```sh
$ tree -I node_modules
.
├── dist
│   └── add.js
├── package.json
└── src
    └── index.js

2 directories, 3 files
```

## Import

### CommonJS

Require module with [CommonJS](https://wikipedia.org/wiki/CommonJS):

```sh
$ node
> const add = require('./dist/add');
> add(1, 2);
```

### AMD

Load module with [AMD](https://requirejs.org/docs/whyamd.html#amd):

```html
<!-- amd.html -->
<h1></h1>
<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>
<script>
  window.requirejs(['dist/add'], function (add) {
    document.querySelector('h1').innerText = add(1, 2);
  });
</script>
```

### Script

Load module with [script tag](https://www.html5rocks.com/en/tutorials/speed/script-loading/#toc-first-script):

```html
<!-- script.html -->
<h1></h1>
<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>
<script>
  window.requirejs(['dist/add'], function (add) {
    document.querySelector('h1').innerText = add(1, 2);
  });
</script>
```

## Demo

[Repl.it](https://repl.it/@remarkablemark/webpack-umd):

<iframe height="400px" width="100%" src="https://repl.it/@remarkablemark/webpack-umd?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
