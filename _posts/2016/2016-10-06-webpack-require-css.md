---
layout: post
title: Requiring CSS with webpack
date: 2016-10-06 19:59:00 -4000
excerpt: How to use webpack to load a required CSS file in a JavaScript module.
categories: webpack css node javascript
---

Let's say you have `style.css`:

```css
/* style.css */
.foo {
  color: #f00;
}
```

And you decide you want to require it in a JavaScript module:

```js
// entry.js
require('./style.css');
```

"_Heresy_," you say, "Node can't possibly do that!"

You're right. Node can't. But a module bundler like [webpack](https://webpack.github.io) can.

Install [webpack](https://www.npmjs.com/package/webpack) globally if you haven't already:

```sh
$ npm install webpack -g
```

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

Build your output file using the [webpack CLI](https://github.com/webpack/docs/wiki/cli):

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

What if you're requiring _multiple_ `.css` files and you'd like to bundle them into a _single_ stylesheet?

You can use [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin).

You'll need both the [package](https://www.npmjs.com/package/extract-text-webpack-plugin) and [webpack](https://www.npmjs.com/package/webpack) locally installed in this case:

```sh
$ npm install extract-text-webpack-plugin webpack
```

You'll also need to update your webpack configuration to make use of the plugin:

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

Now webpack will generate a **JavaScript bundle** as well as a **CSS bundle**:

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
