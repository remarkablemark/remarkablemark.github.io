---
layout: post
title: How to run Jest tests with Phaser
date: 2024-01-07 14:03:11
excerpt: How to run Jest tests with Phaser.
categories: jest test phaser
---

This post explains how to run [Jest](https://jestjs.io/) tests with [Phaser](https://phaser.io/).

- [Prerequisites](#prerequisites)
- [Environment](#environment)
- [Canvas](#canvas)
- [Spector](#spector)

## Prerequisites

Given you have [`jest`](https://www.npmjs.com/package/jest) and [`phaser`](https://www.npmjs.com/package/phaser) installed:

```sh
npm install --save-dev jest phaser
```

And a single test:

```js
// index.test.js
const Phaser = require('Phaser');

it('passes', () => {
  expect(Phaser).toBeTruthy();
});
```

## Environment

Run your test:

```sh
npx jest
```

You'll get an error:

```
ReferenceError: HTMLVideoElement is not defined
```

This is because Jest's [`testEnvironment`](https://jestjs.io/docs/configuration#testenvironment-string) defaults to `node`, so update your Jest config to use [`jsdom`](https://github.com/jsdom/jsdom):

```js
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
};
```

Run your test:

```sh
npx jest
```

You'll get an error:

```
● Validation Error:

  Test environment jest-environment-jsdom cannot be found. Make sure the testEnvironment configuration option points to an existing node module.

  Configuration Documentation:
  https://jestjs.io/docs/configuration


As of Jest 28 "jest-environment-jsdom" is no longer shipped by default, make sure to install it separately.
```

Follow the instructions and install [`jest-environment-jsdom`](https://www.npmjs.com/package/jest-environment-jsdom):

```sh
npm install --save-dev jest-environment-jsdom
```

This will fix the environment issues.

## Canvas

Run your test:

```sh
npx jest
```

You'll get an error:

```
Error: Not implemented: HTMLCanvasElement.prototype.getContext (without installing the canvas npm package)
```

You can either fix this by installing [`canvas`](https://www.npmjs.com/package/canvas):

```sh
npm install --save-dev canvas
```

Or installing [`jest-canvas-mock`](https://www.npmjs.com/package/jest-canvas-mock) and updating Jest config:

```sh
npm install --save-dev jest-canvas-mock
```

```diff
 // jest.config.js
 module.exports = {
+  setupFiles: ['jest-canvas-mock'],
   testEnvironment: 'jsdom',
 };
```

This will fix the canvas issues.

## Spector

Run your test:

```sh
npx jest
```

You'll get an error:

```
Cannot find module 'phaser3spectorjs' from './node_modules/phaser/src/renderer/webgl/WebGLRenderer.js'
```

You can either fix this by installing [`phaser3spectorjs`](https://www.npmjs.com/package/phaser3spectorjs):

```sh
npm install --save-dev phaser3spectorjs
```

Or mocking the module with Jest:

```sh
mkdir -p __mocks__ && echo 'module.exports = {};' > __mocks__/phaser3spectorjs.js
```

Your test should now pass!

```sh
npx jest
```
