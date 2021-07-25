---
layout: post
title: 'Webpack: ignore module'
date: 2017-02-25 21:20:00
updated: 2021-05-18 22:58:15
excerpt: How to ignore a module with webpack.
categories: webpack
---

Given you're using module `logger`:

```js
// src/index.js
const logger = require('./logger');
logger('hi');
```

Your bundle is built using the [webpack config](https://webpack.js.org/concepts/configuration/):

```js
// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
  },
};
```

When you build the bundle, how can `logger` be removed?

```sh
NODE_ENV=development npx webpack
asset main.js 2.46 KiB [emitted] (name: main)
./src/index.js 50 bytes [built] [code generated]
./src/logger.js 30 bytes [built] [code generated]
webpack 5.37.0 compiled successfully in 67 ms
```

## IgnorePlugin

With [IgnorePlugin](https://webpack.js.org/plugins/ignore-plugin/), a regular expression can be tested to prevent the module from being generated:

<!-- prettier-ignore-start -->

```diff
 // webpack.config.js
+const { IgnorePlugin } = require('webpack');
 
 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
   },
+  plugins: [
+    new IgnorePlugin({
+      resourceRegExp: /logger/,
+    }),
+  ],
 };
```

<!-- prettier-ignore-start -->

When you build the bundle, notice how `logger` is no longer part of the generated code:

```sh
webpack-dev-serverNODE_ENV=development npx webpack
asset main.js 2.33 KiB [emitted] (name: main)
./src/index.js 50 bytes [built] [code generated]
webpack 5.37.0 compiled successfully in 61 ms
```

But when you open your webpage:

```html
<!-- index.html -->
<script src="dist/main.js"></script>
```

The **Console** will show a JavaScript error:

```
Uncaught Error: Cannot find module './logger'
    at webpackMissingModule (index.js:1)
    at eval (index.js:1)
    at Object../src/index.js (main.js:18)
    at __webpack_require__ (main.js:42)
    at main.js:53
    at main.js:55
```

This is because `logger` is still required in `src/index.js`.

## DefinePlugin

To have webpack prune unused code, use [DefinePlugin](https://webpack.js.org/plugins/define-plugin/):

<!-- prettier-ignore-start -->

```diff
 // webpack.config.js
-const { IgnorePlugin } = require('webpack');
+const { DefinePlugin, IgnorePlugin } = require('webpack');
 
+const { NODE_ENV } = process.env;
 
 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'main.js',
   },
   plugins: [
-    new IgnorePlugin({
-      resourceRegExp: /logger/,
-    }),
+   NODE_ENV === 'production' &&
+     new IgnorePlugin({
+       resourceRegExp: /logger/,
+     }),
+    new DefinePlugin({
+      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
+    }),
   ],
 };
```

<!-- prettier-ignore-end -->

The plugin allows you to create global constants that are injected at **compile** time:

```js
// src/index.js
if (process.env.NODE_ENV === 'development') {
  const logger = require('./logger');
  logger('hi');
}
```

Build the bundle:

```sh
NODE_ENV=production npx webpack
asset main.js 0 bytes [emitted] [minimized] (name: main)
./src/index.js 102 bytes [built] [code generated]
webpack 5.37.0 compiled successfully in 134 ms
```

Open the webpage to see no **Console** errors.

```sh
open index.html
```

To learn more about Webpack global constants, check out the following [post]({% post_url 2017/2017-01-25-webpack-global-constants %}).
