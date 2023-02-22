---
layout: post
title: Write Detox tests in TypeScript
date: 2023-02-21 19:29:56
excerpt: How to write React Native Detox tests in TypeScript.
categories: react-native detox test typescript
---

This post goes over how to write [Detox](https://wix.github.io/Detox/) tests in [TypeScript](https://www.typescriptlang.org/).

## Prerequisites

You have a [React Native project with Detox](https://wix.github.io/Detox/docs/introduction/project-setup) set up.

## Setup

Install the typings for `detox` and `jest`:

```sh
yarn add --dev @types/detox @types/jest
```

Update `e2e/jest.config.js`:

```diff
 /** @type {import('@jest/types').Config.InitialOptions} */
 module.exports = {
+  preset: 'react-native',
   rootDir: '..',
-  testMatch: ['<rootDir>/e2e/**/*.test.js'],
+  testMatch: ['<rootDir>/e2e/**/*.test.ts'],
   testTimeout: 120000,
   maxWorkers: 1,
   globalSetup: 'detox/runners/jest/globalSetup',
   globalTeardown: 'detox/runners/jest/globalTeardown',
   reporters: ['detox/runners/jest/reporter'],
   testEnvironment: 'detox/runners/jest/testEnvironment',
   verbose: true,
 };
```

The Jest `react-native` preset transforms TypeScript with [babel-jest](https://www.npmjs.com/package/babel-jest).

Rename `e2e/starter.test.js` to `e2e/starter.test.ts`:

```sh
mv e2e/starter.test.js e2e/starter.test.ts
```

Update `e2e/starter.test.ts` and import the [detox](https://www.npmjs.com/package/detox) functions instead of using the globals:

```ts
import { by, device, expect, element, waitFor } from 'detox';
```

Run your E2E tests (assuming you already ran [build](https://wix.github.io/Detox/docs/introduction/project-setup#step-5-build-the-app)):

```sh
yarn detox test --configuration ios.sim.debug
```

Voilà! You're Detox tests should run with TypeScript.

## Demo

See [example repository](https://github.com/remarkablemark/react-native-cli-quickstart).
