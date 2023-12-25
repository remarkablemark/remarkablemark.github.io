---
layout: post
title: How to migrate from Parcel to Vite
date: 2023-12-24 18:05:49
excerpt: Step-by-step instructions on how to migrate from Parcel to Vite.
categories: parcel vite
---

This post goes over how to migrate from [Parcel](https://parceljs.org/) to [Vite](https://vitejs.dev/).

- [package.json](#packagejson)
- [Environment Variables](#environment-variables)
- [index.html](#indexhtml)
- [vite.config.mjs](#viteconfigmjs)
- [TypeScript](#typescript)
- [Port](#port)
- [CI](#ci)
- [Example](#example)

## package.json

Uninstall [parcel](https://www.npmjs.com/package/vite):

```sh
npm uninstall parcel
```

Install [vite](https://www.npmjs.com/package/vite):

```sh
npm install --save-dev vite
```

Remove "source" and update npm "scripts":

```diff
 {
-  "source": "public/index.html",
   "scripts": {
-    "build": "parcel build",
+    "build": "vite build",
+    "preview": "vite preview",
-    "start": "parcel --open"
+    "start": "vite --open"
   }
 }
```

## Environment Variables

[Environment variables](https://vitejs.dev/guide/env-and-mode) need to be prefixed with `VITE_`. For example:

```diff
-GOOGLE_ANALYTICS_ID=abc123
+VITE_GOOGLE_ANALYTICS_ID=abc123
```

Replace `process.env.` with `import.meta.env.VITE_`:

```sh
git grep -l 'process.env.' | xargs sed -i '' -e 's/process.env./import.meta.env.VITE_/g'
```

Replace `process.env.NODE_ENV` checks with `import.meta.env.DEV`. For example:

```diff
-if (process.env.NODE_ENV === 'development') {
+if (import.meta.env.DEV) {
```

If you're using TypeScript, create a type declaration file:

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly VITE_GOOGLE_ANALYTICS_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## index.html

Move `index.html` to the root:

```sh
find . -type f -name index.html -print0 | xargs -0 -I {} mv {} $(git rev-parse --show-toplevel)
```

Update all scripts, links, and asset paths.

## vite.config.mjs

Create a `vite.config.mjs` if you're using plugins. For example:

```js
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
});
```

## TypeScript

If you're getting the error:

```
error TS2307: Cannot find module './file.png' or its corresponding type declarations.
```

Then update your type declaration file:

```ts
declare module '*.png' {
  const src: string;
  export default src;
}
```

## Port

Replace `localhost:1234` with `localhost:5173`:

```sh
git grep -l 'localhost:1234' | xargs sed -i '' -e 's/localhost:1234/localhost:5173/g'
```

## CI

Update your environment variables with the `VITE_` prefix.

If you're using Parcel's `--public-url` option, replace it with Vite's `--base`:

```sh
git grep -l '--public-url' | xargs sed -i '' -e 's/--public-url/--base/g'
```

If you're running a Vite server in CI, then you'll need to pass the `--host` option:

```sh
npx vite --host
```

## Example

- [remarkablegames/button-clicker](https://github.com/remarkablegames/button-clicker/pull/310)
