---
layout: post
title: Environment detection in CommonJS
date: 2016-10-13 16:14:00 -4000
excerpt: How to detect browser environment in a CommonJS (JavaScript) module.
categories: javascript commonjs module webpack
---

When writing a [CommonJS module](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailcommonjs), sometimes you may need to separate the code that runs in the **_server_** from the code that runs in the **_client_**.

In other words, how would you detect the _environment_?

In [Node.js](https://nodejs.org), there are a few globals you can check against. Here's an approach using `process`:

```js
if (process && process.title === 'node') {
    // in node
}
```

Whereas in the browser, there's `window`:

```js
if (typeof window === 'object') {
    // window exists
}
```

However, this is not a _foolproof solution_ as the _global can be instantiated or **polyfilled**_.

For example, you can't trust `window` anymore if you're using [jsdom](https://github.com/tmpvar/jsdom).

But if you're using a module bundler like [webpack](https://webpack.github.io) or [browserify](https://browserify.org), you can check the _shimmed_ `process` global:

```js
if (process.browser === true) {
    // in browser
}
```

Alternatively, there's `process.title`:

```js
if (process.title === 'browser') {
    // in browser
}
```

And to detect that `webpack` is the bundler, then you can do the following:

```js
if (typeof __webpack_require__ === 'function') {
    // in webpack (and in browser)
}
```
