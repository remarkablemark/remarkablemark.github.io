---
layout: post
title: Fix React Native Redux Toolkit error
date: 2024-04-04 21:27:34
excerpt: How to fix React Native Redux Toolkit error.
categories: react native redux toolkit
---

This post goes over how to fix [React Native](https://reactnative.dev/) [Redux Toolkit](https://redux-toolkit.js.org/) error (see [#4324](https://github.com/reduxjs/redux-toolkit/issues/4324)).

## Error

When I ran the build after upgrading [Redux Toolkit](https://redux-toolkit.js.org/usage/migrating-rtk-2) in my [React Native](https://reactnative.dev/) app:

```sh
npx react-native bundle --dev false --entry-file index.js --bundle-output bundle.js --reset-cache
```

I got the error:

```
error node_modules/@reduxjs/toolkit/dist/query/cjs/rtk-query.production.min.cjs: Unexpected token: operator (?) in file node_modules/@reduxjs/toolkit/dist/query/cjs/rtk-query.production.min.cjs at 878:32.
Error: Unexpected token: operator (?) in file node_modules/@reduxjs/toolkit/dist/query/cjs/rtk-query.production.min.cjs at 878:32
    at minifyCode (node_modules/metro-transform-worker/src/index.js:101:13)
    at transformJS (node_modules/metro-transform-worker/src/index.js:319:28)
    at transformJSWithBabel (node_modules/metro-transform-worker/src/index.js:410:16)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async Object.transform (node_modules/metro-transform-worker/src/index.js:571:12)
```

## Fix

I was on an older React Native version (<0.72) so I had to update [`metro.config.js`](https://metrobundler.dev/docs/configuration/) to fix the error.

### sourceExts

Since Redux was rewritten to `.cjs` extension, I updated [`resolver.sourceExts`](https://metrobundler.dev/docs/configuration/#sourceexts) to include the extension:

```js
const { sourceExts } = require('metro-config/src/defaults/defaults');

module.exports = {
  resolver: {
    sourceExts: sourceExts.concat('cjs'),
  },
};
```

### resolveRequest

I updated [`resolver.resolveRequest`](https://metrobundler.dev/docs/configuration/#resolverequest) to use a legacy Redux dist file:

```js
const { resolve } = require('path');
// ...

module.exports = {
  resolver: {
    // ...
    resolveRequest(context, moduleName, platform) {
      if (moduleName === '@reduxjs/toolkit/query') {
        return {
          type: 'sourceFile',
          filePath: resolve(
            __dirname,
            'node_modules/@reduxjs/toolkit/dist/query/rtk-query.legacy-esm.js',
          ),
        };
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};
```

After running the build:

```sh
npx react-native bundle --dev false --entry-file index.js --bundle-output bundle.js --reset-cache
```

It succeeded:

```
warning: the transform cache was reset.
                    Welcome to Metro!
              Fast - Scalable - Integrated


info Writing bundle output to:, bundle.js
info Done writing bundle output
warn Assets destination folder is not set, skipping...
✨  Done in 29.29s.
```
