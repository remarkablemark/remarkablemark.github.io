---
layout: post
title: Getting started with webpack
date: 2016-09-23 17:40:00 -4000
excerpt: Get started with module bundling with webpack.
categories: webpack javascript commonjs html
---

Let's say you have an `add` module that returns the sum of two numbers:

```js
// add.js
module.exports = function(a, b) {
    return a + b;
};
```

And `add` is being used in `main.js`:

```js
// main.js
var add = require('./add');
console.log(add(2, 2));
console.log(add(1, 1));
```

We know we can run `main.js` in [Node.js](https://nodejs.org) with no issue:

```sh
$ node main.js
4
2
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

This _breaks_ of course. The browser doesn't understand [CommonJS](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailcommonjs) so it's unable to load the module.

So what can we do to make this work? We can use _**module bundling**_.

[Webpack](https://webpack.github.io), a popular module bundler, takes CommonJS modules and bundles them into a browser-friendly JavaScript file.

To begin, install [webpack](https://www.npmjs.com/package/webpack) globally:

```sh
$ npm install -g webpack
```

The quickest way to build your bundle (without having to create a [config](https://webpack.github.io/docs/configuration.html)) is via the _CLI_ or _command-line interface_:

```sh
$ webpack main.js bundle.js
# webpack <entry> <output>
```

Let's update the script tag in `index.html` and it should work now:

```html
<!-- index.html -->
<html>
<body>
    <!-- open your console to see the logs -->
    <script src="bundle.js"></script>
</body>
</html>
```

Additionally, webpack has some useful [plugins](https://github.com/webpack/docs/wiki/cli#plugins):

### Watch

Enable the [watch](https://github.com/webpack/docs/wiki/cli#watch-mode---watch) option for automatic recompilation on change:

```sh
$ webpack main.js bundle.js -w
```

### Debug

Enable the [debug](https://github.com/webpack/docs/wiki/cli#development-shortcut--d) option to create [source maps](http://blog.teamtreehouse.com/introduction-source-maps) to see where the JavaScript error occurs:

```sh
$ webpack main.js bundle.js -d

# or for both `watch` and `debug`
$ webpack main.js bundle.js -w -d
```

### Production

Enable the [production](https://github.com/webpack/docs/wiki/cli#production-shortcut--p) option to minify/uglify your bundle:

```sh
$ webpack main.js bundle.js -p
```
