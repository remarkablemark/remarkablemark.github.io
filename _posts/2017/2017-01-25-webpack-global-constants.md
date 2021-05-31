---
layout: post
title: 'Webpack: Create global constants'
date: 2017-01-25 21:26:00
updated: 2021-05-18 23:14:00
excerpt: How to create global constants with webpack.
categories: webpack global constants javascript
---

This article goes over how to create global constants (environment variables) with [Webpack](https://webpack.js.org/).

## Prerequisites

Let's assume you have the [webpack config](https://webpack.js.org/configuration/):

```js
// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
  },
};
```

## DefinePlugin

To define `process.env.NODE_ENV`, use [DefinePlugin](https://webpack.js.org/plugins/define-plugin/):

```js
// webpack.config.js
const { DefinePlugin } = require('webpack');

module.exports = {
  // ...
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
```

The global constant will be injected at **compile** time:

```js
// src/index.js
console.log(process.env.NODE_ENV); // "production"
```

## Resources

- [webpack-recipes](https://github.com/remarkablemark/webpack-recipes)
