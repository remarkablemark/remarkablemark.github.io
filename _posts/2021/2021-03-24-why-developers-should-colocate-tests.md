---
layout: post
title: Why developers should colocate tests
date: 2021-03-24 19:50:04
excerpt: The benefits of colocating tests in software development.
categories: test
---

Colocating tests is putting your test next to its file.

Why colocate tests? Because colocating provides:

- Better visibility
- Simpler mental models
- Less context switching

## Layout

Example of a directory structure containing colocated tests:

```
.
└── src
    ├── file.js
    └── file.test.js
```

Example of a directory structure containing non-colocated tests:

```
.
├── src
│   └── file.js
└── test
    └── file.test.js
```

## Import

Colocated tests simplifies import paths:

```js
// src/file.test.js
const file = require('./file');
```

Compared to non-colocation:

```js
// test/file.test.js
const file = require('../test/file');
```

For small projects, non-colocation is manageable. But for larger projects, the import paths can get unwieldly:

```js
const file = require('../../../test/dir/subdir/file');
```

## Refactor

For colocated tests, the test will pass even if the directory is renamed.

For non-colocated tests, the test will fail if the directory is renamed, which leads to a **false negative**.

When a feature is removed, it's simple to delete both the file and the test.

## Runners

[Jest](https://jestjs.io/) supports colocation by default.

[Mocha](https://mochajs.org/) requires some configuration:

```sh
$ npx mocha src/**/*.test.js
```
