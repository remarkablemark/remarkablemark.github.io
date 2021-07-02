---
layout: post
title: Jest mock Node module in Create React App
date: 2021-07-01 20:31:40
excerpt: How to mock a module from node_modules using Jest in Create React App.
categories: jest mock node_modules create-react-app
---

This post goes over how to mock `node_modules` using [Jest](https://jestjs.io/) in [Create React App](https://create-react-app.dev/).

## Mock function

A [mock function](https://jestjs.io/docs/mock-functions) is created directly in the test code.

Use [`jest.mock`](https://jestjs.io/docs/jest-object#jestmockmodulename-factory-options) to auto-mock a module:

```js
// src/test.js
import lodash from 'lodash';

jest.mock('lodash');

it('mocks lodash', () => {
  expect(jest.isMockFunction(lodash)).toBe(true);
});
```

To mock a module export, use [`jest.fn`](https://jestjs.io/docs/jest-object#jestfnimplementation):

```js
// src/test.js
// ...
lodash.get = jest.fn();

it('mocks lodash.get', () => {
  expect(jest.isMockFunction(lodash.get)).toBe(true);
});
```

Or specify a module factory in [`jest.mock`](https://jestjs.io/docs/jest-object#jestmockmodulename-factory-options):

```js
// src/test.js
import lodash from 'lodash';

jest.mock('lodash', () => ({
  get: jest.fn(),
}));

it('mocks lodash.get', () => {
  expect(jest.isMockFunction(lodash.get)).toBe(true);
});
```

## Manual mock

A [manual mock](https://jestjs.io/docs/manual-mocks) is a stub that overrides a module dependency.

From the [docs](https://jestjs.io/docs/manual-mocks#mocking-node-modules):

> If the module you are mocking is a Node module, the mock should be placed in the `__mocks__` directory adjacent to `node_modules`.

However, this doesn't work for Create React App because [`roots`](https://jestjs.io/docs/configuration#roots-arraystring) is configured to point to `'<rootDir>/src/'`.

As a result, the module must be placed in the `__mocks__` directory adjacent to `<rootDir>/src/`:

```
.
└── src
    └── __mocks__
        └── lodash.js
```

```js
// src/__mocks__/lodash.js
export const get = jest.fn();
```

```js
// src/test.js
import lodash from 'lodash';

it('mocks lodash.get', () => {
  expect(jest.isMockFunction(lodash.get)).toBe(true);
});
```

See GitHub issue [facebook/create-react-app##7539](https://github.com/facebook/create-react-app/issues/7539) for more information.
