---
layout: post
title: 'Webpack: Build a React app'
date: 2017-05-09 23:52:01
updated: 2021-05-31 21:49:59
excerpt: How to build a React app with Webpack.
categories: webpack babel react jsx
---

<!--email_off-->

> If you're looking to bootstrap a React app, check out [Create React App](https://create-react-app.dev/).

This article goes over how to build a React app with Webpack.

## Problem

Given the `package.json`:

```json
{
  "dependencies": {
    "react": "17",
    "react-dom": "17"
  }
}
```

The `index.html`:

```html
<!-- index.html -->
<div id="root"></div>
<script src="dist/main.js"></script>
```

And `src/index.js`:

```jsx
// src/index.js
import React from 'react';
import { render } from 'react-dom';

function App(props) {
  return <p>Hello, world!</p>;
}

render(<App />, document.getElementById('root'));
```

If you try to open the webpage:

```sh
open index.html
```

It fails because the browser doesn't understand [JSX](https://reactjs.org/docs/jsx-in-depth.html). The code needs to be **transpiled** before it can be run. [Webpack](https://webpack.js.org/) is a module bundler that can do that.

## Dependencies

Install [`webpack`](https://www.npmjs.com/package/webpack) and [`webpack-cli`](https://www.npmjs.com/package/webpack-cli):

```sh
npm install webpack webpack-cli
```

Install [`babel-loader`](https://www.npmjs.com/package/babel-loader), [`@babel/core`](https://www.npmjs.com/package/@babel/core), and [`@babel/preset-env`](https://www.npmjs.com/package/@babel/preset-env):

```sh
npm install babel-loader @babel/core @babel/preset-env
```

To transpile JSX, install [`@babel/preset-react`](https://www.npmjs.com/package/@babel/preset-react):

```sh
npm install @babel/preset-react
```

## Configuration

Create your [webpack config](https://webpack.js.org/configuration/):

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
```

Build the webpack bundle:

```sh
npx webpack --mode=development
```

Open the webpage to see your app:

```sh
open index.html
```

To use the latest ECMAScript features, check out [`@babel/preset-env`](https://www.npmjs.com/package/@babel/preset-env).

Also, you can keep your Babel presets in [`.babelrc`](https://babeljs.io/docs/en/config-files/):

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

Which allows you to remove them from your webpack config:

```diff
 // webpack.config.js
 module.exports = {
   module: {
     rules: [
       {
         test: /\.jsx?$/,
         exclude: /node_modules/,
         use: {
           loader: 'babel-loader',
-          options: {
-            presets: ['@babel/preset-env', '@babel/preset-react'],
-          },
         },
       },
     ],
   },
 };
```

## Resources

- [webpack-recipes](https://github.com/remarkablemark/webpack-recipes)

<!--/email_off-->
