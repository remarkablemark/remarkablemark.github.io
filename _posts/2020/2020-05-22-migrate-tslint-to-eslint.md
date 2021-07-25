---
layout: post
title: Migrate TSLint to ESLint
date: 2020-05-22 18:30:43
updated: 2020-05-22 19:32:45
excerpt: How to replace TSLint with ESLint.
categories: tslint eslint lint npm
---

This post goes over how to migrate a project from [TypeScript](https://www.typescriptlang.org/) to [ESLint](https://eslint.org/) since [TSLint](https://palantir.github.io/tslint/) is [deprecated](https://medium.com/palantir/tslint-in-2019-1a144c2317a9).

## Prerequisites

The project should contain the files:

- package.json
- tsconfig.json
- tslint.json

## Uninstall

First, uninstall [tslint](https://www.npmjs.com/package/tslint) from `package.json`:

```sh
npm remove tslint
```

Verify [typescript](https://www.npmjs.com/package/typescript) is still present:

```sh
npm list typescript
```

## Install

Then install [eslint](https://www.npmjs.com/package/eslint) and the TypeScript [eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) and [parser](https://www.npmjs.com/package/@typescript-eslint/parser):

```sh
npm install --save-dev eslint @typescript-eslint/{eslint-plugin,parser}
```

## Config

Initialize `.eslintrc`:

```sh
npx eslint --init
```

Your base `.eslintrc` should look something like this:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"]
}
```

Move your `tslint.json` rules to `.eslintrc`.

Add [`env`](https://eslint.org/docs/user-guide/configuring#specifying-environments) to your `.eslintrc` (if applicable):

```json
{
  "env": {
    "browser": true,
    "es6": true,
    "jest": true,
    "node": true
  }
}
```

## Script

Update your `lint` [script](https://docs.npmjs.com/cli/run-script) in `package.json`:

```diff
 {
   "scripts": {
-    "lint": "tslint -c tslint.json 'src/**/*.ts'"
+    "lint": "eslint --ignore-path .gitignore --ext .js,.ts .",
   }
 }
```

Test that it still works:

```sh
npm run lint
```

## Misc

Migrate any TSLint configs/plugins to ESLint (if applicable).

The following example is for [Prettier](https://prettier.io/):

```sh
npm rm tslint-config-prettier && npm i -D eslint-plugin-prettier
```

Don't forget to update `.eslintrc`:

```js
{
  // ...
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

Here's a [pull request](https://github.com/remarkablemark/phonetic-alphabet-converter/pull/3) that I opened for [phonetic-alphabet-converter](https://www.npmjs.com/package/phonetic-alphabet-converter).

Lastly, you can use [tslint-to-eslint-config](https://github.com/typescript-eslint/tslint-to-eslint-config) to migrate from TSLint to ESLint:

```sh
npx tslint-to-eslint-config
```
