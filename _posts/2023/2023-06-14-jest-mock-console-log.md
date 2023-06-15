---
layout: post
title: Jest mock console.log
date: 2023-06-14 22:01:59
excerpt: How to mock `console.log` with Jest.
categories: jest javascript
---

Mock `console.log` with [`jest.spyOn`](https://jestjs.io/docs/jest-object#jestspyonobject-methodname):

```js
jest.spyOn(console, 'log');
```

Restore `console.log` with [`mockRestore`](https://jestjs.io/docs/mock-function-api#mockfnmockrestore):

```js
console.log.mockRestore();
```

Silence or suppress `console.log` with [`mockImplementation`](https://jestjs.io/docs/mock-function-api#mockfnmockimplementationfn):

```js
jest.spyOn(console, 'log').mockImplementation();
```
