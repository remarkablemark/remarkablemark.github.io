---
layout: post
title: How to ignore a module with webpack
date: 2017-02-25 21:20:00 -4000
excerpt: To prevent a required module from being bundled, use webpack's IgnorePlugin, DefinePlugin, and UglifyJsPlugin.
categories: webpack plugin
---

Let's say you're doing some logging in `main.js` for development:

```js
// main.js

var logger = require('./logger');
logger();

// ...
```

And your [webpack config](https://webpack.github.io/docs/configuration.html) is as follows:

```js
// webpack.config.js

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    }
};
```

But given how webpack works, it bundles all required modules (_see last 2 lines_):

```sh
$ webpack --display-chunks
Hash: 9d1935249bd4e4d05276
Version: webpack 2.2.1
Time: 89ms
    Asset     Size  Chunks             Chunk Names
    bundle.js  2.63 kB       0  [emitted]  main
    chunk    {0} bundle.js (main) 44 bytes [entry] [rendered]
        [0] ./logger.js 23 bytes {0} [built]
        [1] ./main.js 21 bytes {0} [built]
```

So how can we ignore the `logger` module in _production_? With a combination of webpack's plugins.

### IgnorePlugin

With [IgnorePlugin](https://webpack.github.io/docs/list-of-plugins.html#ignoreplugin), a regular expression can be tested to prevent the module from being generated:

```js
// webpack.config.js

var webpack = require('webpack');
var isProduction = process.env.NODE_ENV === 'production';

var plugins = [];
if (isProduction) {
    plugins.push(
        /**
         * IgnorePlugin will skip any require
         * that matches the following regex.
         */
        new webpack.IgnorePlugin(/logger/)
    );
}

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    },
    plugins: plugins
};
```

Now when you build the bundle, you'll see that `logger` is no longer included as a chunk:

```sh
$ webpack --display-chunks
Hash: 0dc6a44b438e4bff97d1
Version: webpack 2.2.1
Time: 67ms
    Asset     Size  Chunks             Chunk Names
    bundle.js  2.69 kB       0  [emitted]  main
    chunk    {0} bundle.js (main) 21 bytes [entry] [rendered]
        [0] ./main.js 21 bytes {0} [built]
```

However, if you load your bundle in a webpage, you'll receive the error:

```
Cannot find module "./logger"
```

This is because `logger` is still being called in `main.js` and webpack doesn't know that any logic related to it should be removed.

Wouldn't it be nice if you could doing something like this:

```js
// main.js

if (isDevelopment) {
    var logger = require('./logger');
    logger();
}

// ...
```

And have webpack strip out the _if statement_ when `isDevelopment` is false?

That's where **DefinePlugin** and **UglifyJsPlugin** comes in.

### DefinePlugin

With [DefinePlugin](https://webpack.github.io/docs/list-of-plugins.html#defineplugin), you can create global constants that are injected at compile time. See [post]({% post_url 2017/2017-01-25-webpack-global-constants %}) on how to do that.

Now you can use the global constant in `main.js`:

```js
// main.js

if (process.env.NODE_ENV === 'development') {
    var logger = require('./logger');
    logger();
}

// ...
```

### UglifyJsPlugin

Finally with [UglifyJsPlugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin), you can eliminate the dead code when the _if statement_ is false:

```js
// webpack.config.js

var webpack = require('webpack');
var isProduction = process.env.NODE_ENV === 'production';

var plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
    })
];

if (isProduction) {
    plugins.push(
        new webpack.IgnorePlugin(/redux-logger/)
    );
    plugins.push(
        /**
         * UglifyJS will compress the bundle and
         * eliminate any dead code.
         */
        new webpack.optimize.UglifyJsPlugin()
    );
}

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    },
    plugins: plugins
};
```

Now you can have separate builds for each environment:

```sh
$ NODE_ENV=development webpack --display-chunks
Hash: b7f5f05d03abe533ec77
Version: webpack 2.2.1
Time: 89ms
    Asset     Size  Chunks             Chunk Names
    bundle.js  2.68 kB       0  [emitted]  main
    chunk    {0} bundle.js (main) 121 bytes [entry] [rendered]
        [0] ./logger.js 23 bytes {0} [built]
        [1] ./main.js 98 bytes {0} [built]

$ NODE_ENV=production webpack --display-chunks
Hash: a8169341174e7bc6437a
Version: webpack 2.2.1
Time: 130ms
    Asset       Size  Chunks             Chunk Names
    bundle.js  536 bytes       0  [emitted]  main
    chunk    {0} bundle.js (main) 98 bytes [entry] [rendered]
        [0] ./main.js 98 bytes {0} [built]
```
