---
layout: post
title: Creating global constants with webpack
date: 2017-01-25 21:26:00 -4000
excerpt: How to create global constants with webpack.
categories: webpack global constants javascript
---

How do we create global constants (e.g., environment variables) with [webpack](https://webpack.github.io)?

First, let's assume you have the following configuration:

```js
// webpack.config.js

module.exports = {
    entry: './main.js',
    output: {
        path: __dirname + '/build/',
        filename: 'bundle.js'
    }
};
```

To define `process.env.NODE_ENV`, you use [DefinePlugin](https://webpack.github.io/docs/list-of-plugins.html#defineplugin):

```js
// webpack.config.js

const webpack = require('webpack');

module.exports = {
    // ...
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production') // '"production"'
            }
        })
    ]
};
```

Now, you can use the global constant as the value will be replaced at compile time:

```js
// main.js

console.log(process.env.NODE_ENV); // "production"
```
