---
layout: post
title: Webpack Dev Server
date: 2017-05-06 20:59:35
updated: 2021-05-01 18:05:36
excerpt: How to get started with webpack-dev-server (WDS).
categories: webpack development webpack-dev-server
---

This article goes over how to set up [webpack-dev-server](https://webpack.js.org/configuration/dev-server/).

## Prerequisites

HTML:

```html
<!-- index.html -->
<h1>Hello, World!</h1>
<script src="src/index.js"></script>
```

JavaScript:

```js
// src/index.js
const h1 = document.querySelector('h1');
h1.innerText = 'Hello, webpack!';
```

Installed dependencies in `package.json`:

```json
{
  "devDependencies": {
    "webpack": "^5.35.0",
    "webpack-cli": "^4.6.0"
  }
}
```

## Install

Install [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server):

```sh
$ npm install webpack-dev-server --save-dev
```

Your `package.json` will look like:

```json
{
  "devDependencies": {
    "webpack": "^5.35.0",
    "webpack-cli": "^4.6.0",
    "webpack-dev-server": "^3.11.2"
  }
}
```

## Serve

Run the server with `npx`:

```sh
$ npx webpack serve
```

Or create an [npm script](https://docs.npmjs.com/cli/run-script):

```json
{
  "scripts": {
    "start": "webpack serve"
  }
}
```

And start the server with:

```sh
$ npm start

> @ start path/to/project
> webpack serve

ℹ ｢wds｣: Project is running at http://localhost:8080/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: Content not from webpack is served from path/to/project
⚠ ｢wdm｣: asset main.js 149 KiB [emitted] [minimized] (name: main) 1 related asset
```

Open `http://localhost:8080/` in the browser:

```sh
$ open http://localhost:8080/
```

Edit and save `src/index.js`:

```js
// src/index.js
const h1 = document.querySelector('h1');
h1.innerText = 'Hello, webpack-dev-server!';
```

Refresh the page to see changes.
