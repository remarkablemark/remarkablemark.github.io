---
layout: post
title: Jest TypeScript ESM support
date: 2026-02-02 19:36:15
excerpt: How to enable ECMAScript Modules (ESM) support for Jest tests written in TypeScript.
categories: jest test esm typescript
---

This post goes over how to enable [ECMAScript Modules (ESM) support](https://jestjs.io/docs/ecmascript-modules) for [Jest](https://jestjs.io/) tests written in TypeScript.

## Prerequisites

Your Jest is configured with [ts-jest](https://kulshekhar.github.io/ts-jest/):

```ts
// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
};

export default config;
```

## Scripts

Update your `package.json` script "test":

```diff
 {
   "scripts": {
-    "test": "jest"
+    "test": "node --experimental-vm-modules $(npx which jest)"
   }
 }
```

> `npx which jest` evaluates to `node_modules/.bin/jest`.

Or alternatively:

```diff
 {
   "scripts": {
-    "test": "jest"
+    "test": "NODE_OPTIONS=\"$NODE_OPTIONS --experimental-vm-modules\" jest
   }
 }
```

## Configs

Update your Jest config to [transform using ESM](https://kulshekhar.github.io/ts-jest/docs/getting-started/options/useESM):

```diff
 // jest.config.ts
 import type { Config } from 'jest';

 const config: Config = {
-  preset: 'ts-jest',
+  extensionsToTreatAsEsm: ['.mts', '.ts'],
+  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' },
+  transform: { '^.+\\.m?[tj]sx?$': ['ts-jest', { useESM: true }] },
 };

 export default config;
```

Set `module` to `esnext` (or `es2022`) in your `tsconfig.json`:

```diff
 {
   "compilerOptions": {
     "target": "es2022",
+    "module": "esnext",
     "moduleResolution": "node"
   }
 }
```

## Tests

Import [`jest`](https://jestjs.io/docs/ecmascript-modules#differences-between-esm-and-commonjs) to access the object:

```ts
import { jest } from '@jest/globals';
```

```ts
jest.fn();
```

Use `await import` to import relative files:

```ts
const { myUtil } = await import('./my-util.js');
```

> ESM relative import must include the file extension.

[Mock](https://jestjs.io/docs/ecmascript-modules#module-mocking-in-esm) a module with `jest.unstable_mockModule`:

```ts
jest.unstable_mockModule('node:os', () => ({
  platform: jest.fn(),
}));
```

> Both the 1st and 2nd arguments are required.

[Unmock](https://jestjs.io/docs/ecmascript-modules#module-unmocking-in-esm) with `jest.unstable_unmockModule`:

```ts
jest.unstable_unmockModule('node:os');
```
