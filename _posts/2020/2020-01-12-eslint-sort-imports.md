---
layout: post
title: ESLint sort imports
date: 2020-01-12 21:39:51
updated: 2021-10-04 21:17:09
excerpt: How to automatically sort imports with ESLint.
categories: eslint javascript
---

This article goes over how to **sort imports** with [ESLint](https://eslint.org/).

<p>
<details markdown="1">
<summary>Table of Contents</summary>

- [Prerequites](#prerequites)
  - [Install](#install)
  - [Config](#config)
  - [Run](#run)
- [Problem](#problem)
- [Solution](#solution)
  - [sort-imports](#sort-imports)
  - [eslint-plugin-simple-import-sort](#eslint-plugin-simple-import-sort)
- [Demo](#demo)

</details>
</p>

## Prerequites

### Install

Install [`eslint`](https://www.npmjs.com/package/eslint) with npm:

```sh
npm install --save-dev eslint
```

Or with yarn:

```sh
yarn add --dev eslint
```

Your `package.json` should look like:

```json
{
  "devDependencies": {
    "eslint": "^7.25.0"
  }
}
```

### Config

Create an ESLint config:

```sh
npx eslint --init
```

Your `.eslintrc` will look like:

```json
{
  "env": {
    "es2021": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {}
}
```

### Run

Execute the `eslint` binary with [npx](https://www.npmjs.com/package/npx):

```sh
npx eslint .
```

Or create a `package.json` [script](https://docs.npmjs.com/cli/commands/npm-run):

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "npm run lint -- --fix"
  },
  "devDependencies": {
    "eslint": "^7.25.0"
  }
}
```

To call it from the command line:

```sh
npm run lint
```

If you encounter the parsing error:

```
The keyword 'import' is reserved
```

Update your `.eslintrc` with the following:

```json
{
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  }
}
```

## Problem

Let's say you have the `index.js`:

```js
// index.js
import foo from './foo';
import { resolve, join } from 'path';
import fs from 'fs';
```

As more modules are imported, it can get messy. So how can we enforce a sorting order without having to do it manually each time? With ESLint.

## Solution

### sort-imports

ESLint has the rule [`sort-imports`](https://eslint.org/docs/rules/sort-imports). To enable it in `.eslintrc`:

```json
{
  "rules": {
    "sort-imports": "error"
  }
}
```

But when you run `eslint`, you'll get the errors:

```sh
npm run lint
```

```
> @ lint /home/runner/eslint-sort-imports
> eslint .


/home/runner/eslint-sort-imports/index.js
  3:1   error  Expected 'multiple' syntax before 'single' syntax                        sort-imports
  3:19  error  Member 'join' of the import declaration should be sorted alphabetically  sort-imports

✖ 2 problems (2 errors, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

Autofixable errors can be fixed by passing `--fix` in the CLI:

```sh
npm run lint -- --fix
```

```
> @ lint /home/runner/eslint-sort-imports
> eslint . "--fix"

/home/runner/eslint-sort-imports/index.js
  3:1  error  Expected 'multiple' syntax before 'single' syntax  sort-imports

✖ 1 problem (1 error, 0 warnings)
```

This fixes the **member sort** error, as shown in the diff below:

```diff
 // index.js
 import foo from './foo';
-import { resolve, join } from 'path';
+import { join, resolve } from 'path';
 import fs from 'fs';
```

But the **declaration sort** error still persists. This is because changing the evaluation order of imported modules may lead to unexpected changes in how the code works (see [#11542](https://github.com/eslint/eslint/issues/11542)).

As a result, there's no automatic fix for this rule. You'll either need to manually fix it or ignore the sorting of import declaration statements like below:

```json
{
  "rules": {
    "sort-imports": ["error", { "ignoreDeclarationSort": true }]
  }
}
```

This isn't ideal so what can you do? You can find other ESLint plugins that handle import sorting.

### eslint-plugin-simple-import-sort

One ESLint plugin that performs autofixable import sorting is [`eslint-plugin-simple-import-sort`](https://www.npmjs.com/package/eslint-plugin-simple-import-sort).

Install the package with npm:

```sh
npm install --save-dev eslint-plugin-simple-import-sort
```

Or with yarn:

```sh
yarn add --dev eslint-plugin-simple-import-sort
```

Your `package.json` will look like:

```json
{
  "devDependencies": {
    "eslint": "^7.25.0",
    "eslint-plugin-simple-import-sort": "^7.0.0"
  }
}
```

Add the plugin and [rules](https://github.com/lydell/eslint-plugin-simple-import-sort#usage) to `.eslintrc`:

```json
{
  "plugins": ["simple-import-sort"],
  "rules": {
    "simple-import-sort/imports": "error"
  }
}
```

To sort exports, add the ESLint rule:

```json
{
  "plugins": ["simple-import-sort"],
  "rules": {
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error"
  }
}
```

> **Reminder**: Don't forget to remove or disable the `sort-imports` rule.

When you run `eslint . --fix`:

```sh
npm run lint:fix
```

```
> @ lint:fix /home/runner/eslint-sort-imports
> npm run lint -- --fix

> @ lint /home/runner/eslint-sort-imports
> eslint . "--fix"
```

You will see no more errors.

The file `index.js` will look like:

```js
// index.js
import fs from 'fs';
import { join, resolve } from 'path';

import foo from './foo';
```

Congratulations! You've set up import sorting with ESLint.

## Demo

[Replit](https://replit.com/@remarkablemark/eslint-sort-imports#.eslintrc.json) example:

<iframe height="400px" width="100%" src="https://replit.com/@remarkablemark/eslint-sort-imports?lite=true#.eslintrc.json" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
