---
layout: post
title: Bundle a React app with webpack@1
date: 2017-05-09 23:52:01 -4000
excerpt: How to build a React bundle using webpack@1.
categories: webpack babel react jsx
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
