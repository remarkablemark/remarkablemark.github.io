---
layout: post
title: 'Webpack Dev Server: Hot Module Replacement'
date: 2017-05-07 15:55:35
updated: 2021-04-27 20:25:50
excerpt: How to set up Hot Module Replacement (HMR) for Webpack Dev Server (WDS).
categories: webpack development webpack-dev-server server wds
---

This article goes over how to set up [Hot Module Replacement (HMR)](https://webpack.js.org/guides/hot-module-replacement/) with [Webpack Dev Server (WDS)](https://webpack.js.org/configuration/dev-server/).

## Prerequisite

Set up an app with [webpack-dev-server]({% post_url 2017/2017-05-06-webpack-dev-server %}).

We are using the `package.json` dependencies:

```json
{
  "devDependencies": {
    "webpack": "^5.35.0",
    "webpack-cli": "^4.6.0",
    "webpack-dev-server": "^3.11.2"
  }
}
```

## Quickstart

Enable HMR for WDS using the CLI by passing [`--hot`](https://webpack.js.org/configuration/dev-server/#devserverhot) and [`--inline`](https://webpack.js.org/configuration/dev-server/#devserverinline):

```sh
npx webpack serve --hot --inline
```

Start the server:

```sh
npm start
```

Output:

```
> @ start path/to/project
> webpack serve --hot --inline

ℹ ｢wds｣: Project is running at http://localhost:8080/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: Content not from webpack is served from path/to/project
⚠ ｢wdm｣: asset main.js 160 KiB [emitted] [minimized] (name: main) 1 related asset
```

Open `http://localhost:8080/` in the browser:

```sh
open http://localhost:8080/
```

See the console logs:

```
[HMR] Waiting for update signal from WDS...
[WDS] Hot Module Replacement enabled.
[WDS] Live Reloading enabled.
```

But that's not enough for HMR to work. You'll need to accept the hot update:

```js
// src/index.js
// ...
if (module.hot) {
  module.hot.accept();
}
```

Edit and save the file and the page should update without a hard reload.

You should see the console logs:

```
[WDS] App updated. Recompiling...
[WDS] App hot update...
[HMR] Checking for updates on the server...
[HMR] Updated modules:
[HMR]  - ./src/index.js
[HMR] App is up to date.
```

## Config

HMR can also be enabled from the config file:

```js
// webpack.config.js
module.exports = {
  devServer: {
    hot: true,
    inline: true,
  },
};
```

Run `webpack-dev-server` without passing any options:

```sh
npx webpack serve
```

## Demo

[Repl.it](https://repl.it/@remarkablemark/webpack-dev-server-hot-module-replacement):

<iframe height="400px" width="100%" src="https://repl.it/@remarkablemark/webpack-dev-server-hot-module-replacement?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Resources

- [Hot Module Replacement](https://survivejs.com/webpack/appendices/hmr/)
