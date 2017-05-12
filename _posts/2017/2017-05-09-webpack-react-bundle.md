---
layout: post
title: Bundle a React app with webpack@1
date: 2017-05-09 23:52:01 -4000
excerpt: How to build a React bundle using webpack@1.
categories: webpack babel react jsx es6
---

Imagine you have a React project with the following `package.json`:

```json
{
  "dependencies": {
    "react": "15",
    "react-dom": "15"
  }
}
```

You have an `index.html`:

```html
<!-- index.html -->
<html>
  <body>
    <div id="root"></div>
    <script src="main.js"></script>
  </body>
</html>
```

And your `main.js` looks like this:

```js
// main.js
var React = require('react');
var ReactDOM = require('react-dom');

function Component(props) {
  return <h1>Hello, {props.name}!</h1>;
}

ReactDOM.render(
  <Component name='Mark' />,
  document.getElementById('root')
);
```

If you try to load the page, it fails because the browser doesn't understand [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) syntax.

As a result, the code needs to be **transpiled** for it to be run in the browser. Here's where [webpack](https://webpack.github.io/), a module bundler, comes in.

### Dependencies

Install [webpack](https://www.npmjs.com/package/webpack):

```sh
$ npm install webpack@1
```

Then install [babel-loader](https://www.npmjs.com/package/babel-loader) and [babel-core](https://www.npmjs.com/package/babel-core), which will help with the transpilation:

```sh
$ npm install babel-loader@6 babel-core@6
```

To transpile JSX, you'll need [babel-preset-react](https://www.npmjs.com/package/babel-preset-react):

```sh
$ npm install babel-preset-react@6
```

### Configuration

Create your [webpack config](https://webpack.github.io/docs/configuration.html):

```js
// webpack.config.js
module.exports = {
  entry: './main.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react']
        },
        // match files based on pattern
        test: /\.js$/,
        // ignore files matching pattern
        exclude: /node_modules/
      }
    ]
  }
};
```

You could also create a build script in your `package.json`:

```json
{
  "scripts": {
    "build": "webpack"
  }
}
```

To generate the bundle, run:

```sh
$ npm run build
```

Update `index.html` with the new file path:

```html
<!-- index.html -->
<html>
  <body>
    <div id="root"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

When you refresh the page, the app now loads.

### ES6

But what if you want to use [ES6](https://babeljs.io/learn-es2015/) syntax?

You'll need [babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015):

```sh
$ npm install babel-preset-es2015
```

Add the preset to your webpack config:

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          // add `es2015` to presets
          presets: ['react', 'es2015']
        },
        // ...
      }
    ]
  }
};
```

Now you can refactor `main.js` with ES6:

```js
// main.js
import React from 'react';
import { render } from 'react-dom';

const Component = ({ name }) => <h1>Hello, {name}!</h1>;

render(
  <Component name='Mark' />,
  document.getElementById('root')
);
```

Don't forget to rebuild your bundle before refreshing the page:

```sh
$ npm run build
```

### .babelrc

Alternatively, you can keep your babel presets in [.babelrc](https://babeljs.io/docs/usage/babelrc/):

```json
{
  "presets": ["react", "es2015"]
}
```

Instead of defining them in your webpack config:

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        // query: {
        //   presets: ['react', 'es2015']
        // },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};
```
