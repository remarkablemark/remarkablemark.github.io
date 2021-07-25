---
layout: post
title: Add Prettier to ESLint
date: 2021-03-26 11:43:56
excerpt: How to add Prettier to your ESLint config so files are linted with the code formatter.
categories: prettier eslint lint
---

This article goes over how add [Prettier](https://prettier.io/) to your [ESLint](https://eslint.org/) config.

## Prerequisites

This article assumes you have [`eslint`](https://www.npmjs.com/package/eslint) installed and an [`.eslintrc`](https://eslint.org/docs/user-guide/configuring/) created.

## Prettier

Save [`prettier`](https://www.npmjs.com/package/prettier) and [`eslint-plugin-prettier`](https://www.npmjs.com/package/eslint-plugin-prettier) to devDependencies:

```sh
npm install --save-dev prettier eslint-plugin-prettier
```

Or with [Yarn](https://yarnpkg.com/package/eslint-plugin-prettier):

```sh
yarn add --dev prettier eslint-plugin-prettier
```

If you don't want the default [prettier format options](https://prettier.io/docs/en/options.html), create a `.prettierrc`:

```sh
touch .prettierrc
```

For example, to use single quotes instead of double quotes:

```json
{
  "singleQuote": true
}
```

## ESLint

Add prettier to plugins and rules in `.eslintrc`:

```json
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

Remove or disable any ESLint rule that conflicts with Prettier.

For example, remove `indent` since this conflicts with Prettier's default indent of 2 spaces:

```diff
 {
   "plugins": ["prettier"],
   "rules": {
-    "indent": ["error", 4],
     "prettier/prettier": "error"
   }
 }
```

## CLI

To lint all files in the current directory:

```sh
npx eslint .
```

Or with Yarn:

```sh
yarn eslint .
```

To automatically fix lint problems:

```sh
npx eslint . --fix
```

Or with Yarn:

```sh
yarn eslint . --fix
```

## Example

Here's an example [repository](https://github.com/remarkablemark/web-app-template) that has ESLint and Prettier set up.
