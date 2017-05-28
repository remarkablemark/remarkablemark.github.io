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

Can you run the following in Node.js?

```js
// entry.js
require('./style.css');
```

No, you can't.

But what you can do is build a browser bundle with [webpack](https://webpack.github.io).

### Webpack

Install [webpack](https://www.npmjs.com/package/webpack) if you haven't already:

```sh
$ npm install webpack@1 --global
```

Or you can install a local version of webpack and use the local binary:

```sh
$ npm install webpack
# ./node_modules/.bin/webpack
```

### Loader

The [css-loader](https://github.com/webpack/css-loader) comes handy here:

```sh
$ npm install css-loader
```

Create your [webpack configuration](https://webpack.github.io/docs/configuration.html):

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

The exports of `style.css` is an array with the method `.toString()`:

```js
// entry.js
var style = require('./style.css');
console.log(style); // [ Array[3] ]
console.log(style.toString()); // css string
```

### Style

But how would load the styles to your document?

One approach is to insert it with JavaScript:

```js
// entry.js
var css = require('./style.css').toString();
var style = document.createElement('style');
if (style.styleSheet) {
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}
document.head.appendChild(style);
```

Another approach is to use [style-loader](https://github.com/webpack-contrib/style-loader):

```sh
$ npm install style-loader
```

Now add the loader to your webpack config:

```js
// webpack.config.js
module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        // chained loaders are applied right to left
        loaders: ['style-loader', 'css-loader']
        // an alternative syntax:
        // loader: 'style-loader!css-loader'
      }
    ]
  }
};
```

### Plugin

What if you have **multiple** `.css` files and you want to combine them into a **single** stylesheet?

Here, you'll want to use [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin).

Install both the [plugin](https://www.npmjs.com/package/extract-text-webpack-plugin) and [webpack](https://www.npmjs.com/package/webpack) locally (if you haven't already):

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
