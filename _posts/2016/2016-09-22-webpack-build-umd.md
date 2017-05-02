---
layout: post
title: Build to UMD with webpack@1
date: 2016-09-22 20:38:00 -4000
excerpt: How to use webpack@1 to build a UMD (Universal Module Definition) compatible bundle.
categories: webpack build umd javascript
---

[Webpack](https://webpack.github.io) is an excellent module bundler:

> [It] takes modules with dependencies and generates static assets representing those modules. (_[Source](http://webpack.github.io/docs/what-is-webpack.html)._)

For JavaScript modules, webpack can be used to build a bundle for the browser and/or the server.

As a result, this means that you can generate a [UMD](https://github.com/umdjs/umd) build with webpack. This **Universal Module Definition** format allows JavaScript modules to be loaded via [CommonJS](https://webpack.github.io/docs/commonjs.html), [AMD](http://requirejs.org/docs/whyamd.html#amd), or [script tag](http://www.html5rocks.com/en/tutorials/speed/script-loading/#toc-first-script).

Let's learn how to use webpack to output UMD.

### Example

To get started, install [webpack@1](https://www.npmjs.com/package/webpack) globally:

```sh
npm install -g webpack@1
```

Create an `add` module that returns the sum of two numbers:

```js
// add.js
module.exports = function add(a, b) {
  return a + b;
};
```

Next, we'll set up the [webpack configuration](https://webpack.github.io/docs/configuration.html):

```js
// webpack.config.js
module.exports = {
  entry: './add.js',
  output: {
    filename: './dist/add.js',
    // export to AMD, CommonJS, or window
    libraryTarget: 'umd',
    // the name exported to window
    library: 'add'
  }
};
```

Build your bundle with the `webpack` command:

```sh
$ webpack
Hash: 81d114e86560c48d887b
Version: webpack 1.13.2
Time: 45ms
        Asset     Size  Chunks             Chunk Names
./dist/add.js  1.81 kB       0  [emitted]  main
   [0] ./add.js 55 bytes {0} [built]
```

You'll see that the file is outputted to `dist`:

```sh
$ tree
.
├── add.js
├── dist
│   └── add.js
└── webpack.config.js
```

Now you can load your module via [CommonJS](#commonjs), [AMD](#amd), or a [script tag](#script-tag).

### CommonJS

```sh
$ node
> var add = require('./dist/add');
> add(1, 2);
```

### AMD

```html
<!-- amd.html -->
<html>
<body>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.2/require.min.js"></script>
  <script>
    window.requirejs(['dist/add'], function(add) {
      console.log(add(1, 2));
    });
  </script>
</body>
</html>
```

### Script Tag

```html
<!-- script-tag.html -->
<html>
<body>
  <script src="./dist/add.js"></script>
  <script>
    console.log(window.add(1, 2));
  </script>
</body>
</html>
```
