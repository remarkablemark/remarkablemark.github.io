---
layout: post
title: Jest clear cache
date: 2018-11-21 19:57:06
excerpt: Fix incorrect test coverage by clearing Jest cache.
categories: jest test cache coverage
---

## Problem

When your [Jest](https://jestjs.io/) tests used to pass but suddenly started to fail, this may be related to cache.

In my case, the test coverage was reporting uncovered lines. When I cleared my [Jest cache](https://jestjs.io/docs/en/cli.html#clearcache), the tests passed again.

## Solution

To clear cache with [Yarn](https://yarnpkg.com/):

```sh
yarn jest --clearCache
```

Output:

```
yarn run v1.9.4
./node_modules/.bin/jest --clearCache
Cleared /var/folders/c8/hg7gtddj49qgpvghtv2grkp9j21wxz/T/jest_r86htr
✨  Done in 0.54s.
```

Or with [npx](https://www.npmjs.com/package/npx):

```sh
npx jest --clearCache
```
