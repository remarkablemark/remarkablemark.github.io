---
layout: post
title: 'dtslint: estree has no exported member'
date: 2022-03-19 18:25:40
excerpt: How to fix the dtslint error estree has no exported member.
categories: dtslint typescript npm
---

> **TL;DR**: Install `@types/estree`:
>
> ```sh
> npm i -D @types/estree
> ```

This article goes over how to fix the [dtslint](https://github.com/microsoft/dtslint) error: [estree](https://github.com/estree/estree) `has no exported member`.

## Problem

If you run [`dtslint`](https://www.npmjs.com/package/dtslint):

```sh
npx dtslint .
```

And get the error:

```
Error: Errors in typescript@4.7 for external dependencies:
node_modules/@types/eslint/index.d.ts(450,42): error TS2724: '"./node_modules/@types/estree/index"' has no exported member named 'ChainExpression'. Did you mean 'ThisExpression'?
node_modules/@types/eslint/index.d.ts(473,43): error TS2694: Namespace '"./node_modules/@types/estree/index"' has no exported member 'ImportExpression'.

    at ./node_modules/dtslint/bin/index.js:207:19
    at Generator.next (<anonymous>)
    at fulfilled (./node_modules/dtslint/bin/index.js:6:58)
```

This means there's a conflicting `@types/estree` version in your `node_modules`:

```sh
npm ls @types/estree
```

```
├─┬ @rollup/plugin-commonjs@21.0.2
│ ├─┬ @rollup/pluginutils@3.1.0
│ │ └── @types/estree@0.0.39
│ └─┬ is-reference@1.2.1
│   └── @types/estree@0.0.39 deduped
└─┬ webpack@5.70.0
  ├─┬ @types/eslint-scope@3.7.3
  │ ├─┬ @types/eslint@8.4.1
  │ │ └── @types/estree@0.0.39 deduped
  │ └── @types/estree@0.0.39 deduped
  └── @types/estree@0.0.51
```

## Solution

The fix is to install [`@types/estree`](https://www.npmjs.com/package/@types/estree):

```sh
npm install --save-dev @types/estree
```

This ensures the deduped versions are using the latest version:

```sh
npm ls @types/estree
```

```
├─┬ @rollup/plugin-commonjs@21.0.2
│ ├─┬ @rollup/pluginutils@3.1.0
│ │ └── @types/estree@0.0.39
│ └─┬ is-reference@1.2.1
│   └── @types/estree@0.0.51 deduped
├── @types/estree@0.0.51
└─┬ webpack@5.70.0
  ├─┬ @types/eslint-scope@3.7.3
  │ ├─┬ @types/eslint@8.4.1
  │ │ └── @types/estree@0.0.51 deduped
  │ └── @types/estree@0.0.51 deduped
  └── @types/estree@0.0.51 deduped
```

You should be able to run `dtslint` without issues now:

```sh
npx dtslint .
```
