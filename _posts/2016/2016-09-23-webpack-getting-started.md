---
layout: post
title: Getting started with webpack@1
date: 2016-09-23 17:40:00 -4000
excerpt: Learn how to perform module bundling with webpack@1.
categories: webpack nodejs commonjs module javascript
---

Let's say you have an `add` module that returns the sum of two numbers:

```js
// add.js
module.exports = function add(a, b) {
  return a + b;
};
```

And `main.js` uses `add`:

```js
// main.js
var add = require('./add');
console.log('2 + 2 =', add(2, 2));
console.log('1 + 1 =', add(1, 1));
```

We know running `main.js` with [node](https://nodejs.org) on the command-line works:

```sh
$ node main.js
2 + 2 = 4
1 + 1 = 2
```

But what if we want to load `main.js` in the browser?

```html
<!-- index.html -->
<html>
<body>
  <!-- will this work? -->
  <script src="main.js"></script>
</body>
</html>
```

This obviously doesn't work. The browser doesn't understand [CommonJS](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailcommonjs) so it's unable to load the module.

To make this work, we'll need to perform _**module bundling**_.

[Webpack](https://webpack.github.io) is a popular module bundler that takes CommonJS modules and concatenates them into a single JavaScript file. There are loaders and plugins that can enhance the compilation, but that's beyond the scope of this tutorial.

### Install

To get started, install [webpack](https://www.npmjs.com/package/webpack) globally:

```sh
$ npm install -g webpack@1
```

The quickest way to build your bundle without having to create a [configuration file](https://webpack.github.io/docs/configuration.html) is with the CLI command:

```sh
$ webpack main.js bundle.js
# webpack <entry> <output>
```

Update the script tag to the bundle path and it should now work:

```html
<!-- index.html -->
<html>
<body>
  <!-- open your console to see the logs -->
  <script src="bundle.js"></script>
</body>
</html>
```

Additionally, webpack has some useful [plugins](https://github.com/webpack/docs/wiki/cli#plugins).

### Watch

Enable the [watch](https://github.com/webpack/docs/wiki/cli#watch-mode---watch) option for automatic recompilation on file change:

```sh
$ webpack main.js bundle.js -w
```

### Debug

Enable the [debug](https://github.com/webpack/docs/wiki/cli#development-shortcut--d) option to create [source maps](http://blog.teamtreehouse.com/introduction-source-maps) to see where errors occur:

```sh
$ webpack main.js bundle.js -d
```

### Production

Enable the [production](https://github.com/webpack/docs/wiki/cli#production-shortcut--p) option to minify or compress your bundle:

```sh
$ webpack main.js bundle.js -p
```
