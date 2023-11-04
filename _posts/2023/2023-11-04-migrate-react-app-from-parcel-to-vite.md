---
layout: post
title: Migrate a React app from Parcel to Vite
date: 2023-11-04 14:46:52
excerpt: How to migrate a React app from Parcel to Vite.
categories: react app parcel vite
---

This post goes over how to migrate a [React](https://react.dev/) app from [Parcel](https://parceljs.org/) to [Vite](https://vitejs.dev/).

## Dependencies

Uninstall `parcel` dependencies:

```sh
npm uninstall @parcel/packager-raw-url @parcel/transformer-webmanifest parcel
```

Install `vite` dependencies:

```sh
npm install --save-dev @vitejs/plugin-react-swc vite
```

## package.json

Remove `source` and update `scripts`:

```diff
-  "source": "public/index.html",
   "scripts": {
-    "build": "parcel build",
+    "build": "vite build",
-    "clean": "rm -rf .parcel-cache dist",
+    "clean": "rm -rf dist",
+    "preview": "vite preview",
-    "start": "parcel --open",
+    "start": "vite --open",
```

## .gitignore

Remove `.parcel-cache`:

```diff
-/.parcel-cache
```

## index.html

Move `index.html` to the root:

```sh
mv public/index.html index.html
```

## vite.config.ts

Add vite config:

```sh
touch vite.config.ts
```

```ts
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
});
```

## Path alias

Replace [tilde specifiers](https://parceljs.org/features/dependency-resolution/#tilde-specifiers) in JavaScript source files:

```diff
-import '~/src/utils';
+import 'src/utils';
```

Then update `vite.config.ts`:

```diff
 import react from '@vitejs/plugin-react-swc';
+import { resolve } from 'path';
 import { defineConfig } from 'vite';

 export default defineConfig({
+  resolve: {
+    alias: {
+      src: resolve(__dirname, 'src'),
+    },
+  },
   plugins: [react()],
 });
```

Update `tsconfig.json`:

```diff
     "paths": {
-      "~*": ["./*"]
+      "src/*": ["./src/*"],
     }
```

And update `jest.config.ts`:

```diff
   moduleNameMapper: {
-    '^~(.*)$': '<rootDir>/$1',
+    '^src/(.*)$': '<rootDir>/src/$1',
```

## Port

Replace `localhost:1234` with `localhost:5173`:

```sh
git grep -l "localhost:1234" | xargs sed -i "" -e "s/localhost:1234/localhost:5173/g"
```

## CI

Pass argument `--host` when starting a server in GitHub Actions:

```sh
npx vite --host
```

## Examples

- [remarkablemark/mui-template#233](https://github.com/remarkablemark/mui-template/pull/233)
