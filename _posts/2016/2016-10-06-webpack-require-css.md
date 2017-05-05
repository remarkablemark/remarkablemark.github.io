---
layout: post
title: Bundling CSS with webpack@1
date: 2016-10-06 19:59:00 -4000
excerpt: How to require and bundle CSS files with webpack@1.
categories: webpack css stylesheet nodejs
---

Given `style.css`:

```css
/* style.css */
.foo {
  color: #f00;
}
```

If you see it being required in a Node.js module:

```js
// entry.js
require('./style.css');
```

Your reaction would be, "_That doesn't work!_"

You're right. But if you're building a browser bundle, then it's possible with [webpack](https://webpack.github.io).

### Webpack

First, install [webpack](https://www.npmjs.com/package/webpack) globally:

```sh
$ npm install -g webpack@1
```

### Loader

In order to require `.css` files, you'll need to install the the respective [loader](https://github.com/webpack/css-loader):

```sh
$ npm install css-loader
```

Now create your [webpack configuration](https://webpack.github.io/docs/configuration.html):

```js
// webpack.config.js
module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'css-loader'
      }
    ]
  }
};
```

Use the [webpack CLI](https://github.com/webpack/docs/wiki/cli) to build the output:

```sh
$ webpack entry.js output.js

Hash: 450179c0dbbc679bc68a
Version: webpack 1.13.2
Time: 345ms
    Asset    Size  Chunks             Chunk Names
output.js  3.3 kB       0  [emitted]  main
   [0] ./entry.js 36 bytes {0} [built]
    + 2 hidden modules
```

The exports of `style.css` is an array:

```js
// entry.js
var style = require('./style.css');
console.log(style); // [ Array[3] ]
console.log(style.toString()); // the styles as a string
```

### Plugin

What if you want to require _**multiple**_ `.css` files but bundle them in a _**single**_ stylesheet?

You can do so with [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin).

Install both the [plugin](https://www.npmjs.com/package/extract-text-webpack-plugin) and [webpack](https://www.npmjs.com/package/webpack) locally in this case:

```sh
$ npm install extract-text-webpack-plugin webpack@1
```

Now update your webpack configuration:

```js
// webpack.config.js
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        // extract styles
        loader: ExtractTextPlugin.extract('css-loader')
      }
    ]
  },
  plugins: [
    // create CSS file named `output.css`
    new ExtractTextPlugin('output.css', {
      allChunks: true
    })
  ]
};
```

Webpack will generate a **JavaScript bundle** as well as a **CSS bundle**:

```sh
$ webpack entry.js output.js

Hash: ca4a8ab3e0b1963e60de
Version: webpack 1.13.2
Time: 370ms
     Asset      Size  Chunks             Chunk Names
 output.js   1.66 kB       0  [emitted]  main
output.css  42 bytes       0  [emitted]  main
   [0] ./entry.js 150 bytes {0} [built]
    + 1 hidden modules
Child extract-text-webpack-plugin:
        + 2 hidden modules
```
