---
layout: post
title: Getting started with webpack
date: 2016-09-23 17:40:00
updated: 2021-05-05 22:15:53
excerpt: How to get started with webpack.
categories: webpack javascript
---

This article goes over how to get started with [webpack](https://webpack.js.org/).

## Background

Given a module that returns the sum of 2 numbers:

```js
// src/add.js
module.exports = function add(a, b) {
  return a + b;
};
```

```js
// src/index.js
var add = require('./add');

console.log('2 + 2 =', add(2, 2));
console.log('1 + 1 =', add(1, 1));
```

Running the module on [Node.js](https://nodejs.org) works:

```sh
node src/index.js
2 + 2 = 4
1 + 1 = 2
```

But what if you want to load the module in your browser?

```html
<!-- index.html -->
<script src="src/index.js"></script>
```

Since the browser doesn't understand [CommonJS](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailcommonjs), you'll need to bundle your modules.

## Install

Install [webpack](https://www.npmjs.com/package/webpack) and [webpack-cli](https://www.npmjs.com/package/webpack-cli):

```sh
npm install webpack webpack-cli --save-dev
```

Your `package.json` will look like:

```json
{
  "devDependencies": {
    "webpack": "^5.36.2",
    "webpack-cli": "^4.6.0"
  }
}
```

## CLI

Build the bundle with the [CLI](https://webpack.js.org/api/#cli):

```sh
npx webpack
```

> By default, the entry point is `./src/index.js` and the output is `./dist/main.js`.

Update the script tag:

```html
<!-- index.html -->
<script src="dist/main.js"></script>
```

You should see the logs in your browser console:

```sh
open index.html
```

## Configuration

Instead of passing options to the CLI, create a [configuration file](https://webpack.js.org/configuration/):

```js
// webpack.config.js
const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
};
```

Webpack uses `webpack.config.js` if it exists:

```sh
npx webpack
```

## Resources

- [Webpack](https://webpack.js.org/)
