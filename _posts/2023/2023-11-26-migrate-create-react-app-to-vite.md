---
layout: post
title: Migrate Create React App to Vite
date: 2023-11-26 22:18:36
excerpt: How to migrate from Create React App (CRA) to Vite.
categories: create react app cra vite
---

This post goes over how to migrate from [Create React App](https://create-react-app.dev/) (CRA) to [Vite](https://vitejs.dev/) since the former is [deprecated](https://github.com/reactjs/react.dev/pull/5487#issuecomment-1409720741).

1. [package.json](#packagejson)
2. [Environment Variables](#environment-variables)
3. [index.html](#indexhtml)
4. [vite.config.mjs](#viteconfigmjs)
5. [Jest](#jest)
6. [ESLint](#eslint)
7. [TypeScript](#typescript)
8. [Port](#port)
9. [CI](#ci)
10. [Example](#example)

## package.json

Uninstall [react-scripts](https://www.npmjs.com/package/react-scripts):

```sh
npm uninstall react-scripts
```

Install [vite](https://www.npmjs.com/package/vite) dependencies:

```sh
npm install --save-dev vite @vitejs/plugin-react-swc
```

Update scripts in `package.json`:

```diff
 {
   "scripts": {
-    "build": "react-scripts build",
+    "build": "vite build",
-    "eject": "react-scripts eject",
-    "start": "react-scripts start",
+    "start": "vite --open",
-    "test": "react-scripts test"
+    "test": "jest --watch"
   }
 }
```

## Environment Variables

Replace `process.env.REACT_APP` with `import.meta.env.VITE_APP`:

```sh
git grep -l 'process.env.REACT_APP' | xargs sed -i '' -e 's/process.env.REACT_APP/import.meta.env.VITE_APP/g'
```

Then replace `REACT_APP` with `VITE_APP` in `.env`:

```sh
git grep -l REACT_APP | xargs sed -i '' -e 's/REACT_APP/VITE_APP/g'
```

You should also replace `process.env.NODE_ENV` checks with `import.meta.env.DEV`.

If you're using TypeScript, you can create a type declaration file:

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

It's good practice to consolidate all your environment variables in `src/config/index.js` so that you can mock them in your tests with `src/config/__mocks__/index.js` by adding the mock file to `src/setupTests.js`:

```sh
echo 'jest.mock('./config');' >> src/setupTests.js
```

This fixes the TypeScript error:

```
src/config/index.ts:01:20 - error TS1343: The 'import.meta' meta-property is only allowed when the '--module' option is 'es2020', 'es2022', 'esnext', 'system', 'node16', or 'nodenext'.

01 export const DEV = import.meta.env.DEV;
                      ~~~~~~~~~~~
```

## index.html

Move `public/index.html` to the root:

```sh
mv public/index.html .
```

Replace `%PUBLIC_URL%` with the correct path:

```sh
sed -i '' -e 's/%PUBLIC_URL%/public/g' index.html
```

Add the script tag to `src/index.js` before the closing body tag:

```html
<script type="module" src="src/index.js"></script>
```

For example:

```html
    <div id="root"></div>
    <script type="module" src="src/index.js"></script>
  </body>
</html>
```

## vite.config.mjs

Create `vite.config.mjs`:

```js
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
});
```

If you want to keep the build directory consistent with CRA:

```diff
 import react from '@vitejs/plugin-react-swc';
 import { defineConfig } from 'vite';

 export default defineConfig({
+  build: {
+    outDir: '../build',
+  },
   plugins: [react()],
 });
```

Otherwise, Vite will build to `dist`.

Now run your app:

```sh
npm start
```

If you get the error in your browser console:

```
require is not defined
```

Then install [vite-plugin-commonjs](https://github.com/vite-plugin/vite-plugin-commonjs):

```sh
npm install --save-dev vite-plugin-commonjs
```

And update `vite.config.mjs`:

```diff
 import react from '@vitejs/plugin-react-swc';
 import { defineConfig } from 'vite';
+import commonjs from 'vite-plugin-commonjs'

 export default defineConfig({
   build: {
     outDir: '../build',
   },
-  plugins: [react()],
+  plugins: [react(), commonjs()],
 });
```

## Jest

Install `jest` dependencies:

```sh
npm install --save-dev jest jest-environment-jsdom
```

If you're using TypeScript, install `ts-jest` dependencies:

```sh
npm install --save-dev ts-jest ts-node
```

Move your Jest config from `package.json` to `jest.config.js`.

This is optional but create a test directory:

```sh
mkdir -p test
```

Move `src/setupTests.js` to the test directory and fix the imports:

```sh
mv src/setupTests.js test/setupTests.js
```

Create `test/__mocks__/fileMock.js`:

```js
module.exports = 'test-file-stub';
```

Create `test/__mocks__/styleMock.js`:

```js
module.exports = {};
```

Create `test/__mocks__/svgMock.js`:

```js
module.exports = {
  ReactComponent: () => 'IconMock',
};
```

Your `jest.config.js` should look like the following:

```js
/** @type {import('jest').Config} */
const config = {
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx}'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/test/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/__mocks__/fileMock.js',
    '\\.svg$': '<rootDir>/test/__mocks__/svgMock.js',
  },
  // preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  testEnvironment: 'jsdom',
};

module.exports = config;
```

Fix any failing tests and update snapshots:

```sh
npx jest -u
```

If you're getting the error:

```
ReferenceError: Request is not defined
```

This means you need to [polyfill fetch]({% post_url 2023/2023-11-26-fix-jest-error-request-is-not-defined %}).

## ESLint

Install `eslint`:

```sh
npm install --save-dev eslint
```

Remove `react-app` from `.eslintrc`:

```diff
 {
-  "extends": ["react-app", "react-app/jest"]
 }
```

If you're using TypeScript, install the dependencies:

```sh
npm install --save-dev @typescript-eslint/{eslint-plugin,parser}
```

Then update `.eslintrc`:

```json
{
  "parser": "@typescript-eslint/parser",
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"]
}
```

Run ESLint and fix any errors:

```sh
npx eslint .
```

## TypeScript

If you're getting the error:

```
error TS2307: Cannot find module './file.png' or its corresponding type declarations.
```

Then create a type declaration file:

```ts
declare module '*.png' {
  const src: string;
  export default src;
}
```

## Port

Replace `localhost:3000` with `localhost:5173`:

```sh
git grep -l 'localhost:3000' | xargs sed -i '' -e 's/localhost:3000/localhost:5173/g'
```

## CI

If you're running Vite in CI, you may need to pass the `--host` option:

```sh
npx vite --host
```

## Example

- [lilboards#1542](https://github.com/lilboards/lilboards/pull/1542)
