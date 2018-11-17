---
layout: post
title: TypeScript integration with Jest
date: 2018-11-16 19:56:57 -4000
excerpt: How to write Jest tests in TypeScript (and React).
categories: typescript jest test react
---

# Initial test

Install [Jest](https://jestjs.io/):

```sh
$ yarn add jest
```

Create a test:

```sh
$ touch test.js
```

And add the test suite and case:

```js
// test.js
describe('test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});
```

Run and verify that the test passes:

```sh
$ yarn jest
 PASS  ./test.js
  test
    ✓ should pass (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.02s
Ran all test suites.
✨  Done in 1.83s.
```

# TypeScript integration

Install [ts-jest](https://kulshekhar.github.io/ts-jest/), [typescript](https://www.typescriptlang.org/), and [@types/jest](https://www.npmjs.com/package/@types/jest):

```sh
$ yarn add ts-jest \
           typescript \
           @types/jest
```

Change the file extension of the test:

```sh
$ mv test.js test.ts
```

But if you run the test, it now complains that `No tests found`:

```sh
$ yarn jest
No tests found
In /path/to/test
  1 file checked.
  testMatch: **/__tests__/**/*.js?(x),**/?(*.)+(spec|test).js?(x) - 0 matches
  testPathIgnorePatterns: /node_modules/ - 1 match
Pattern:  - 0 matches
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

To fix this, you'll need to create a [configuration file](https://kulshekhar.github.io/ts-jest/user/install#jest-config-file):

```sh
$ yarn ts-jest config:init
Jest configuration written to "/path/to/test/jest.config.js".
✨  Done in 0.51s.
```

It should add the [preset](https://jestjs.io/docs/en/configuration.html#preset-string) `ts-jest`:

```sh
$ cat jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```

When you run the test again:

```sh
$ yarn jest
 PASS  ./test.ts
  test
    ✓ should pass (4ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.135s
Ran all test suites.
✨  Done in 2.04s.
```

# React integration

Now what if we want to write a [React](https://reactjs.org/) test?

First you need to install the dependencies:

```sh
$ yarn add react@16 \
           enzyme \
           enzyme-adapter-react-16 \
           @types/enzyme \
           @types/react
```

To write in [JSX](https://reactjs.org/docs/introducing-jsx.html), you need to update the [compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html) so that it's supported in `.tsx` files.

Create `tsconfig.json`:

```sh
$ touch tsconfig.json
```

And add the option:

```json
{
  "compilerOptions": {
    "jsx": "react"
  }
}
```

Now rename `test.ts` to `test.tsx`:

```sh
$ mv test.ts test.tsx
```

Update the test:

```tsx
// test.tsx
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

configure({ adapter: new Adapter() });

const App = () => {};

describe('test', () => {
  it('should pass', () => {
    expect(<App />).toMatchSnapshot();
  });
});
```

A snapshot should be created when you run the test:

```sh
$ yarn jest
 PASS  ./test.tsx
  test
    ✓ should pass (5ms)

 › 1 snapshot written.
Snapshot Summary
 › 1 snapshot written from 1 test suite.

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   1 written, 1 total
Time:        1.066s
Ran all test suites.
✨  Done in 1.79s.
```

You can update `tsconfig.json` to allow default imports for a cleaner syntax:

```json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "jsx": "react"
  }
}
```

Now you can refactor the imports in `test.tsx`:

```diff
-import * as Adapter from 'enzyme-adapter-react-16';
-import * as React from 'react';
+import Adapter from 'enzyme-adapter-react-16';
+import React from 'react';
```
