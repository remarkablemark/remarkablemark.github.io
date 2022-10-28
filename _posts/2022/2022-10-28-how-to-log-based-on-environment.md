---
layout: post
title: How to log based on environment
date: 2022-10-28 11:12:03
excerpt: How to log based on environment in Node.js.
categories: log nodejs
---

This post goes over how to log based on environment in [Node.js](https://nodejs.org/).

## Environment Variable

To log in `development`, check `NODE_ENV` before logging information:

```js
if (process.env.NODE_ENV === 'development') {
  console.log('...');
}
```

Alternatively, to log everywhere except `production`:

```js
if (process.env.NODE_ENV !== 'production') {
  console.log('...');
}
```

Make sure to set the environment variable before running the app or script:

```sh
NODE_ENV=development
```

## debug

[debug](https://github.com/debug-js/debug#readme) can toggle the output based on the `DEBUG` environment variable.

First install [`debug`](https://www.npmjs.com/package/debug):

```sh
npm install debug
```

Then create a `debug` function named `myapp`:

```js
const debug = require('debug')('myapp');
```

Call debug with data:

```js
debug('...');
```

Enable debug logs by setting the `DEBUG` environment variable with the name `myapp`:

```sh
DEBUG=myapp
```

Or enable all debug output with `*`:

```sh
DEBUG=*
```

See the [repository](https://github.com/debug-js/debug#readme) for more details.
