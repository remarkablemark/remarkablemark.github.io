---
layout: post
title: Build to UMD with webpack
date: 2016-09-22 20:38:00 -4000
excerpt: Output UMD (Universal Module Definition) using the webpack module loader.
categories: webpack build umd javascript
---

[Webpack](https://webpack.github.io) is an excellent **module bundler**.

> [It] takes modules with dependencies and generates static assets representing those modules. (_[Source](http://webpack.github.io/docs/what-is-webpack.html)._)

In other words, if you have a JavaScript file that requires another JavaScript file, webpack can build a bundle that can be used in the **browser** and/or on the **server** ([Node.js](https://nodejs.org)).

Hence with webpack, you can create a bundle that is UMD compatible.

[UMD](https://github.com/umdjs/umd) (**Universal Module Definition**) is a format that allows JavaScript modules to be loaded by [CommonJS](https://webpack.github.io/docs/commonjs.html), [AMD](http://requirejs.org/docs/whyamd.html#amd), or a [script tag](http://www.html5rocks.com/en/tutorials/speed/script-loading/#toc-first-script).

Let's learn how to build a simple JavaScript module to UMD.

To get started, install [webpack](https://www.npmjs.com/package/webpack) globally:

```sh
npm install -g webpack
```

Let's create an `add` module that returns the sum of two numbers:

```js
// add.js
module.exports = function(a, b) {
    return a + b;
};
```

Next, we'll set up our [webpack configuration](https://webpack.github.io/docs/configuration.html):

```js
// webpack.config.js
module.exports = {
    entry: './add.js',
    output: {
        filename: './dist/add.js',
        // export to AMD, CommonJS, or window
        libraryTarget: 'umd',
        // set the following name if exporting to window
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

You can find your bundle in the `dist` directory:

```sh
$ tree
.
├── add.js
├── dist
│   └── add.js
└── webpack.config.js
```

And now you can load your module via [CommonJS](#commonjs), [AMD](#amd), or a [script tag](#script-tag).

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
