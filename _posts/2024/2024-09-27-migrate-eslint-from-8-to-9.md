---
layout: post
title: Migrate ESLint from 8 to 9
date: 2024-09-27 18:45:56
excerpt: How to migrate ESLint from version 8 to 9.
categories: eslint javascript
---

This post goes over how to [migrate ESLint from 8 to 9](https://eslint.org/docs/latest/use/configure/migration-guide):

- [Config](#config)
- [Ignore](#ignore)
- [Script](#script)
- [Example](#example)

## Config

Migrate the config:

```sh
npx @eslint/migrate-config .eslintrc.json
```

You may see the following:

```
Migrating .eslintrc.json

Wrote new config to ./eslint.config.mjs

You will need to install the following packages to use the new config:
- globals
- @eslint/js
- @eslint/eslintrc

You can install them using the following command:

npm install globals @eslint/js @eslint/eslintrc -D
```

Install the dependencies:

```sh
npm install globals @eslint/js @eslint/eslintrc -D
```

Delete the old config:

```sh
rm .eslintrc.json
```

## Ignore

Install ESLint compatibility utilities:

```sh
npm install @eslint/compat -D
```

Update `eslint.config.mjs`:

```js
import { includeIgnoreFile } from '@eslint/compat';
// ...

const gitignorePath = path.resolve(__dirname, '.gitignore');
// ...

export default [
  includeIgnoreFile(gitignorePath),
  // ...
];
```

To ignore a directory like `dist`:

```js
// ...
export default [
  {
    ignores: ['dist/'],
  },
  // ...
];
```

## Script

Run the script to ensure lint is working:

```sh
npx eslint .
```

Update `package.json` scripts (if applicable).

## Example

- [html-react-parser](https://github.com/remarkablemark/html-react-parser/pull/1497/files)
