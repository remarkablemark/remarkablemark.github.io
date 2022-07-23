---
layout: post
title: Jest mock default and named export
date: 2018-06-28 19:42:39 -4000
excerpt: How to use the Jest testing framework to mock default and/or named exports for ES modules.
categories: test jest mock es6 module export javascript
---

We know that [Jest](https://jestjs.io) can easily mock a CommonJS module:
```js
jest.mock('./path/to/commonjs', mockedValue);
```

But what about an ES module?
```js
// esModule.js
export default 'defaultExport';
export const namedExport = () => {};
```

For Jest to mock the exports, the property `__esModule` must be enabled in the return value:
```js
// esModule.test.js
jest.mock('./esModule', () => ({
  __esModule: true, // this property makes it work
  default: 'mockedDefaultExport',
  namedExport: jest.fn(),
}));

import defaultExport, { namedExport } from './esModule';
defaultExport; // 'mockedDefaultExport'
namedExport; // mock function
```
