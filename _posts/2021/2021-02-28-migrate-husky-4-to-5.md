---
layout: post
title: Migrate husky 4 to 8
date: 2021-02-28 16:16:29
updated: 2023-04-12 00:00:57
excerpt: How to migrate husky 4 to 8 using the npm package husky-4-to-5.
categories: npm npx cli husky migration
---

> **TL;DR**: migrate husky from 4 to 8:
>
> ```sh
> npx husky-4-to-5
> ```

This post goes over how to migrate [husky](https://github.com/typicode/husky) from 4 to 8 using the npm package [husky-4-to-5](https://github.com/remarkablemark/husky-4-to-5).

## Problem

[Husky](https://typicode.github.io/husky/)'s [maintainer](https://github.com/typicode) created a migration tool [husky-4-to-5](https://github.com/typicode/husky-4-to-5) but it didn't suit my needs.

It requires you to be on npm 7+ and there's a lot of manual work of updating scripts and removing leftover files:

```sh
npm exec -- github:typicode/husky-4-to-5 --package-manager npm
```

## Solution

As a result, I created my own CLI tool [husky-4-to-5](https://www.npmjs.com/package/husky-4-to-5) that's published on npm.

Migrating is as simple as:

```sh
npx husky-4-to-5
```

What wasn't automated was prepending `npx` in front of the binaries of the husky hooks.

For example:

```bash
jest → npx jest
     → yarn jest

jest && eslint → npx jest && npx eslint
               → yarn jest && yarn eslint

commitlint -E HUSKY_GIT_PARAMS → npx commitlint --edit $1
                               → yarn commitlint --edit $1
```
