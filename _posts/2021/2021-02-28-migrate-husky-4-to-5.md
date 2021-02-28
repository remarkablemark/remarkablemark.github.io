---
layout: post
title: Migrate husky 4 to 5
date: 2021-02-28 16:16:29
excerpt: Migrate husky 4 to 5 using npm CLI husky-4-to-5.
categories: npm npx cli husky migration
---

> **TL;DR**: run in your command-line:
>
> ```sh
>  npx husky-4-to-5
> ```

## Problem

[Husky](https://typicode.github.io/husky/)'s [maintainer](https://github.com/typicode) created a migration tool [husky-4-to-5](https://github.com/typicode/husky-4-to-5) but it didn't suit my needs.

It requires you to be on npm 7+ and there's a lot of manual work of updating scripts and removing leftover files.

To migrate for an npm project:

```sh
npm exec -- github:typicode/husky-4-to-5 --package-manager npm
```

## Solution

As a result, I created my own CLI tool [husky-4-to-5](https://www.npmjs.com/package/husky-4-to-5) that's published to npm.

Migrating is as simple as:

```sh
npx husky-4-to-5
```

The one step I didn't automate is prepending `npx` in front of the binaries in the husky hooks.

For example:

```sh
jest → npx jest
     → yarn jest

jest && eslint → npx jest && npx eslint
               → yarn jest && yarn eslint

commitlint -E HUSKY_GIT_PARAMS → npx commitlint --edit $1
                               → yarn commitlint --edit $1
```

## Resources

- [Repository](https://github.com/remarkablemark/husky-4-to-5)
- [Husky 4](https://github.com/typicode/husky/tree/master)
- [Husky 5](https://github.com/typicode/husky/tree/main)
