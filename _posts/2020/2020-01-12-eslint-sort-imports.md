---
layout: post
title: Sort imports with ESLint
date: 2020-01-12 21:39:51
excerpt: How to automatically sort imports with ESLint.
categories: javascript eslint es6 cli
---

This post goes over how to _automatically_ **sort imports** with [ESLint](https://eslint.org/).

## Prerequites

Make sure you have [eslint](https://www.npmjs.com/package/eslint) installed:

```sh
$ npm install eslint
```

Your `package.json` should contain the following:

```json
{
  "dependencies": {
    "eslint": "^6.8.0"
  }
}
```

Create an ESLint configuration file (if you haven't already):

```sh
$ npx eslint --init
```

As you can tell, one of the ways to execute the `eslint` binary is to use [npx](https://www.npmjs.com/package/npx):

```sh
$ npx eslint .
```

Alternatively, you can create a `package.json` [script](https://docs.npmjs.com/cli/run-script):

```js
{
  "scripts": {
    "lint": "eslint ."
  },
  // ...
}
```

And call it via the command line:

```sh
$ npm run lint
```

To resolve the parsing error `The keyword 'import' is reserved`, my `.eslintrc` contains the following:

```json
{
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module"
  }
}
```

## Problem

Let's say we have the following `index.js` file:

```js
// index.js

import foo from './foo';
import { resolve, join } from 'path';
import fs from 'fs';

// ...
```

As we import more modules, it can get pretty messy and unreadable. So how can we enforce a sorting order without having to do it manually each time? We can use ESLint to help us with that.

## sort-imports

ESLint has the rule [sort-imports](https://eslint.org/docs/rules/sort-imports). To enable it in `.eslintrc`:

```js
{
  "rules": {
    "sort-imports": "error"
  },
  // ...
}
```

But when you run eslint, you get the following errors:

```sh
$ npx eslint .

./index.js
  4:1   error  Expected 'multiple' syntax before 'single' syntax sort-imports
  4:19  error  Member 'join' of the import declaration should be sorted alphabetically sort-imports

✖ 2 problems (2 errors, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

Autofixable errors can be fixed by passing `--fix` in the CLI:

```sh
$ npx eslint . --fix # npm run lint -- --fix

./index.js
  4:1  error  Expected 'multiple' syntax before 'single' syntax  sort-imports

✖ 1 problem (1 error, 0 warnings)
```

This fixes the _member sort_ error, as shown in the diff below:

```diff
// index.js

import foo from './foo';
-import { resolve, join } from 'path';
+import { join, resolve } from 'path';
import fs from 'fs';

// ...
```

But the _declaration sort_ error still persists. The reason for this is because changing the evaluation order of imported modules may lead to unexpected changes in how the code works (see issue [#11542](https://github.com/eslint/eslint/issues/11542)).

As a result, there's no automatic fix for this rule. You'll either need to manually fix it or ignore the sorting of import declaration statements like below:

```js
{
  "rules": {
    "sort-imports": ["error", { "ignoreDeclarationSort": true }]
  },
  // ...
}
```

This isn't ideal so what can we do? We can look at other ESLint plugins that perform autofixable import sorting.

## eslint-plugin-simple-import-sort

One plugin that performs autofixable import sorting is [eslint-plugin-simple-import-sort](https://www.npmjs.com/package/eslint-plugin-simple-import-sort).

Install the package:

```sh
$ npm install eslint-plugin-simple-import-sort
```

Then configure it in `.eslintrc`:

```js
{
  "plugins": ["simple-import-sort"],
  "rules": {
    "simple-import-sort/sort": "error"
  },
  // ...
}
```

> **Note**: Don't forget to remove or disable the `sort-imports` rule.

Now when you run eslint:

```sh
$ npx eslint . --fix # npm run lint -- --fix
```

There will be no more errors.

If you open up `index.js`, you can see the following changes:

```js
// index.js

import fs from 'fs';
import { join, resolve } from 'path';

import foo from './foo';

// ...
```

And that's how one sets up autofixable import sorting with ESLint.
