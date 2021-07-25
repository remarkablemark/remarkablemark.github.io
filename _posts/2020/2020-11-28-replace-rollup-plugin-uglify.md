---
layout: post
title: Replace rollup-plugin-uglify
date: 2020-11-28 19:28:29
excerpt: Replace `rollup-plugin-uglify` with `rollup-plugin-terser` to support rollup 2.
categories: npm rollup
---

<!--email_off-->

## Problem

When [upgrading](https://www.npmjs.com/package/npm-check-updates) my npm package dependencies, I encountered an error with the [`rollup`](https://www.npmjs.com/package/rollup) upgrade:

```sh
npm install
```

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! Found: rollup@2.33.3
npm ERR! node_modules/rollup
npm ERR!   dev rollup@"^2.12.1" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer rollup@">=0.66.0 <2" from rollup-plugin-uglify@6.0.4
npm ERR! node_modules/rollup-plugin-uglify
npm ERR!   dev rollup-plugin-uglify@"^6.0.4" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
```

I discovered that [`rollup-plugin-uglify`](https://github.com/TrySound/rollup-plugin-uglify#readme) was no longer compatible with rollup 2 (see [issue](https://github.com/TrySound/rollup-plugin-uglify/issues/82)).

The [recommendation](https://github.com/TrySound/rollup-plugin-uglify/issues/82#issuecomment-662298218) was to replace `rollup-plugin-uglify` with [`rollup-plugin-terser`](https://github.com/TrySound/rollup-plugin-terser#readme).

Luckily, the process was straightforward.

## Solution

Install [`rollup-plugin-terser`](https://www.npmjs.com/package/rollup-plugin-terser) and remove [`rollup-plugin-uglify`](https://www.npmjs.com/package/rollup-plugin-uglify):

```sh
npm i rollup-plugin-terser -D && npm rm rollup-plugin-uglify -D
```

Update `rollup.config.js`:

```diff
 // rollup.config.js
-import { uglify } from 'rollup-plugin-uglify';
+import { terser } from 'rollup-plugin-terser';

 const config = {
   // ...
-  plugins: [uglify()],
+  plugins: [terser()],
 };

 export default config;
```

## Miscellaneous

- [Build Rollup UMD bundle for CommonJS]({% post_url 2019/2019-07-12-rollup-commonjs-umd %})

<!--/email_off-->
