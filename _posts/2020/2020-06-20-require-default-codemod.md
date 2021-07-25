---
layout: post
title: Add default to CommonJS require
date: 2020-06-20 17:13:17
updated: 2020-06-27 18:24:45
excerpt: To transform `require()` to `require().default`, use the JS codemod `require-default-codemod`.
categories: javascript jscodeshift codemod npm package commonjs
---

## Problem

If you ever needed to transform a JavaScript file from:

```js
require('foo');
```

To:

```js
require('foo').default;
```

> This codemod does not transform existing `require().default`.

## Solution

Then you can use [`require-default-codemod`](https://www.npmjs.com/package/require-default-codemod):

```sh
npx require-default-codemod <path>
```

The codemod appends the `default` property to CommonJS `require`.

To run the codemod in your current working directory:

```sh
npx require-default-codemod .
```

> For more ways to run the codemod, see [usage](https://github.com/remarkablemark/require-default-codemod#usage) or [options](https://github.com/remarkablemark/require-default-codemod#options).

## Methodology

This codemod was created using [`jscodeshift`](https://github.com/facebook/jscodeshift).

The implementation was pretty straightforward using the [AST explorer](https://astexplorer.net/):

1. Find the `require` identifier
2. Filter out those with `default` property
3. Replace with an expression that has the original value and the `default` property

## Code

Check out the [GitHub repository](https://github.com/remarkablemark/require-default-codemod) for more details.
