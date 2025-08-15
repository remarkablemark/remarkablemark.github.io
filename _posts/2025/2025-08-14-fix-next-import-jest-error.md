---
layout: post
title: How to fix Next.js import Jest error
date: 2025-08-14 22:14:29
excerpt: How to fix Next.js import Jest error.
categories: next jest typescript test
---

## Problem

If you've updated [Next.js](https://nextjs.org/) and got the Jest test error:

```sh
npm test
```

```
Error: Jest: Failed to parse the TypeScript config file /home/runner/work/nextjs-typescript-template/nextjs-typescript-template/jest.config.ts
  Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/runner/work/nextjs-typescript-template/nextjs-typescript-template/node_modules/next/jest' imported from /home/runner/work/nextjs-typescript-template/nextjs-typescript-template/jest.config.ts
Did you mean to import "next/jest.js"?
    at readConfigFileAndSetRootDir (/home/runner/work/nextjs-typescript-template/nextjs-typescript-template/node_modules/jest-config/build/index.js:2269:13)
    at async readInitialOptions (/home/runner/work/nextjs-typescript-template/nextjs-typescript-template/node_modules/jest-config/build/index.js:1147:13)
    at async readConfig (/home/runner/work/nextjs-typescript-template/nextjs-typescript-template/node_modules/jest-config/build/index.js:918:7)
    at async readConfigs (/home/runner/work/nextjs-typescript-template/nextjs-typescript-template/node_modules/jest-config/build/index.js:1168:26)
    at async runCLI (/home/runner/work/nextjs-typescript-template/nextjs-typescript-template/node_modules/@jest/core/build/index.js:1393:7)
    at async Object.run (/home/runner/work/nextjs-typescript-template/nextjs-typescript-template/node_modules/jest-cli/build/index.js:656:9)
```

## Solution

The fix is that you need to replace `next/jest` with `next/jest.js` if you're using [TypeScript](https://nextjs.org/docs/app/guides/testing/jest#manual-setup):

```diff
 // jest.config.ts
 import type { Config } from 'jest'
-import nextJest from 'next/jest'
+import nextJest from 'next/jest.js'
```

See [example](https://github.com/remarkablemark/nextjs-typescript-template/commit/8faa647090427fcf7bc5ae4736b97b1fef1f1ab2).
