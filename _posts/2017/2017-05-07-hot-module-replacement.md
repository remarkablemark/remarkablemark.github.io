---
layout: post
title: Setting up Hot Module Replacement
date: 2017-05-07 15:55:35 -4000
excerpt: How to set up hot module replacement (HMR) for webpack-dev-server.
categories: webpack development
---

By adding [webpack-dev-server (WDS)]({% post_url 2017/2017-05-06-webpack-dev-server %}) to our app, the page will automatically refresh on change.

But wouldn't it be better if our app updates _without a hard reload_?

With [Hot Module Replacement (HMR)](https://webpack.github.io/docs/hot-module-replacement.html), we can do just that.

### Prerequisite

Make sure you have [webpack-dev-server]({% post_url 2017/2017-05-06-webpack-dev-server %}) set up.

### Quickstart

The easiest way to enable HMR for WDS is to update the CLI command:

```json
{
  "scripts": {
    "start": "webpack-dev-server --hot --inline"
  }
}
```

Now when you restart the server, the additional **chunks** should be displayed in the command-line output.

If you open `http://localhost:8080/`, you should get the following logs in the browser:

```
[HMR] Waiting for update signal from WDS...
[WDS] Hot Module Replacement enabled.
```

But that's not enough for HMR to work. You'll also need to **accept the hot update**:

```js
// main.js
console.log('Hello, world!');

// https://webpack.github.io/docs/hot-module-replacement.html#api
if (module.hot) {
  module.hot.accept();
}
```

Now if you edit and save the app, you should get an update without a hard refresh.

And you should see the following console logs:

```
[WDS] App updated. Recompiling...
[WDS] App hot update...
[HMR] Checking for updates on the server...
[HMR] Updated modules:
[HMR]  - 77
[HMR] App is up to date.
```

One more thing, you could add a plugin to see the _named module_ instead of the _module id_ in the browser console:

```js
// webpack.config.js
var webpack = require('webpack');
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.NamedModulesPlugin()
  ]
};
```

When you restart the server and update `main.js`, you should be able to see:

```
[HMR] Updated modules:
[HMR]  - ./main.js
```

### Config

The alternative to enabling HMR from the CLI is through the configuration file:

```js
// webpack.config.js
var webpack = require('webpack');
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    inline: true,
    hot: true
  }
};
```

But you must revert `package.json` since you can't have HMR enabled in both the CLI and the config:

```json
{
  "scripts": {
    "start": "webpack-dev-server"
  }
}
```

Now if you restart the server, HMR should continue to work like before.

You can learn more about HMR from the ["SurviveJS - Webpack" chapter](https://survivejs.com/webpack/appendices/hmr/).
