---
layout: post
title: 'Webpack: Require CSS'
date: 2016-10-06 19:59:00
updated: 2021-05-31 17:26:04
excerpt: How to import CSS files in JavaScript modules with Webpack.
categories: webpack css stylesheet
---

This article goes oer how to require CSS files in JavaScript modules with Webpack.

## Problem

Given `style.css`:

```css
/* src/style.css */
.foo {
  color: #f00;
}
```

And `index.html`:

```html
<!-- index.html -->
<p class="foo">CSS</p>
<script src="dist/main.js"></script>
```

Can you import a `.css` file?

```js
// src/index.js
import './style.css';
```

No, you can't. But you can bundle the styles with [Webpack](https://webpack.js.org/).

## Webpack

Install [`webpack`](https://www.npmjs.com/package/webpack) and [`webpack-cli`](https://www.npmjs.com/package/webpack-cli):

```sh
npm install webpack webpack-cli
```

## CSS Loader

Install [`css-loader`](https://github.com/webpack/css-loader):

```sh
npm install css-loader
```

Update your [webpack configuration](https://webpack.js.org/concepts/configuration/):

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['css-loader'],
      },
    ],
  },
};
```

Run `webpack` to build the bundle:

```sh
npx webpack --mode=development
```

Output:

```
asset main.js 7.12 KiB [compared for emit] (name: main)
runtime modules 937 bytes 4 modules
cacheable modules 1.91 KiB
  ./src/index.js 24 bytes [built] [code generated]
  ./src/style.css 331 bytes [built] [code generated]
  ../../node_modules/css-loader/dist/runtime/api.js 1.57 KiB [built] [code generated]
webpack 5.38.1 compiled successfully in 199 ms
```

The default export of `style.css` is an array with the method `.toString()`:

```js
// src/index.js
import style from './style.css';

console.log(style); // [ Array[3] ]
console.log(style.toString()); // ".foo { color: #foo; }"
```

How would your load the styles on the page?

One approach is to do it manually with JavaScript:

```js
// src/index.js
import style from './style.css';

const css = style.toString();
const styleElement = document.createElement('style');

if (styleElement.styleSheet) {
  styleElement.styleSheet.cssText = css;
} else {
  styleElement.appendChild(document.createTextNode(css));
}

document.head.appendChild(styleElement);
```

Another approach is to use [Style Loader](https://github.com/webpack-contrib/style-loader).

## Style Loader

Install [`style-loader`](https://npmjs.com/package/style-loader):

```sh
npm install style-loader
```

Add the loader to your webpack config:

```diff
 // webpack.config.js
 module.exports = {
   module: {
     rules: [
       {
         test: /\.css$/i,
-        use: ['css-loader'],
+        use: ['style-loader', 'css-loader'],
       },
     ],
   },
 };
```

To inject the styles in your webpage, you only need:

```js
// src/index.js
import './style.css';
```

Run webpack:

```sh
npx webpack --mode=development
```

Output:

```
asset main.js 16.6 KiB [emitted] (name: main)
runtime modules 937 bytes 4 modules
cacheable modules 8.91 KiB
  modules by path ./src/ 691 bytes
    ./src/index.js 22 bytes [built] [code generated]
    ./src/style.css 338 bytes [built] [code generated]
    ../../node_modules/css-loader/dist/cjs.js!./src/style.css 331 bytes [built] [code generated]
  modules by path ../../node_modules/ 8.23 KiB
    ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js 6.67 KiB [built] [code generated]
    ../../node_modules/css-loader/dist/runtime/api.js 1.57 KiB [built] [code generated]
webpack 5.38.1 compiled successfully in 204 ms
```

View the webpage:

```sh
open index.html
```

To extract CSS into separate files, check out [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin).

## Resources

- [webpack-recipes](https://github.com/remarkablemark/webpack-recipes)
