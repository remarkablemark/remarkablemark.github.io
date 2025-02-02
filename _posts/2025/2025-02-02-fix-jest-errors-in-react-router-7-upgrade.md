---
layout: post
title: Fix Jest errors in React Router 7 upgrade
date: 2025-02-02 17:21:30
excerpt: How to fix Jest test errors when upgrading React Router from version 6 to 7.
categories: jest test react router upgrade
---

This post goes over how to fix [Jest](https://jestjs.io/) test errors when [upgrading React Router from version 6 to 7](https://reactrouter.com/upgrading/v6):

- [TextEncoder is not defined](#textencoder-is-not-defined)
- [Cannot destructure property 'basename' of 'React10.useContext(...)'](#cannot-destructure-property-basename-of-react10usecontext)

## TextEncoder is not defined

If you see the Jest error when [`react-router-dom`](https://www.npmjs.com/package/react-router-dom) is bumped from version 6 to 7:

```
ReferenceError: TextEncoder is not defined
```

The fix is to install [`text-encoding`](https://www.npmjs.com/package/text-encoding) and polyfill `TextEncoder` in the Node.js environment:

```sh
npm install --dev text-encoding
```

Then add it to your Jest [setupFiles](https://jestjs.io/docs/configuration#setupfiles-array):

```js
// test/setupFiles.js
import { TextDecoder, TextEncoder } from 'text-encoding';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
```

And update your Jest config:

```js
// jest.config.js
module.exports = {
  setupFiles: ['<rootDir>/test/setupFiles.js'],
  // ...
};
```

See [example](https://github.com/lilboards/lilboards/pull/2373/files).

## Cannot destructure property 'basename' of 'React10.useContext(...)'

If you see the error:

```
Cannot destructure property 'basename' of 'React10.useContext(...)' as it is null.
```

Then you should replace:

```diff
-import { RouterProvider } from "react-router-dom";
+import { RouterProvider } from "react-router";
```

This is because you need to use a top-level import for non-DOM contexts.

See [example](https://github.com/lilboards/lilboards/pull/2373/files).
