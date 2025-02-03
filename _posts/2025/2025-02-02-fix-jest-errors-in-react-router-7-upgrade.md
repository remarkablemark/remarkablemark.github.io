---
layout: post
title: Fix Jest errors in React Router 7 upgrade
date: 2025-02-02 19:08:11
excerpt: How to fix Jest test errors when upgrading React Router from version 6 to 7.
categories: jest test react router upgrade
---

This post goes over how to fix [Jest](https://jestjs.io/) test errors when [upgrading React Router from version 6 to 7](https://reactrouter.com/upgrading/v6):

- [TextEncoder is not defined](#textencoder-is-not-defined)
- [Cannot destructure property 'basename' of 'React10.useContext(...)'](#cannot-destructure-property-basename-of-react10usecontext)

## TextEncoder is not defined

This error occurs when you bump [`react-router-dom`](https://www.npmjs.com/package/react-router-dom) from version 6 to 7 (see [remix-run/react-router#12363](https://github.com/remix-run/react-router/issues/12363)):

```
ReferenceError: TextEncoder is not defined
```

The fix is to polyfill `TextEncoder` in the Node.js environment:

```js
// test/setupFiles.js
import { TextEncoder } from 'util';

global.TextEncoder = TextEncoder;
```

If your Node.js version does not support this, then install [`text-encoding`](https://www.npmjs.com/package/text-encoding):

```sh
npm install --dev text-encoding
```

```js
// test/setupFiles.js
import { TextEncoder } from 'text-encoding';

global.TextEncoder = TextEncoder;
```

Update your Jest config with [setupFiles](https://jestjs.io/docs/configuration#setupfiles-array):

```js
// jest.config.js
module.exports = {
  setupFiles: ['<rootDir>/test/setupFiles.js'],
  // ...
};
```

See [example](https://github.com/remarkablemark/mui-template/pull/1168/files).

## Cannot destructure property 'basename' of 'React10.useContext(...)'

If you see this error:

```
Cannot destructure property 'basename' of 'React10.useContext(...)' as it is null.
```

Then you should replace:

```diff
-import { RouterProvider } from "react-router-dom";
+import { RouterProvider } from "react-router";
```

This occurs because you need to use a top-level import for non-DOM contexts (e.g., Jest).

See [example](https://github.com/remarkablemark/mui-template/pull/1168/files).
