---
layout: post
title: How to migrate from Yarn Classic to NPM
date: 2023-10-25 19:15:14
updated: 2023-10-28 12:20:42
excerpt: How to migrate from Yarn Classic (v1) to NPM.
categories: yarn npm
---

This post goes over how to migrate from [Yarn Classic (v1)](https://classic.yarnpkg.com/docs/install) to [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/).

## Prerequisites

NPM 9+ is installed:

```sh
npm --version
```

If you're on an older version, you can upgrade to the latest version:

```sh
npm install --global npm@latest
```

## Lockfile

Delete `yarn.lock` and `node_modules`:

```sh
rm -rf yarn.lock node_modules
```

Install and create `package-lock.json`:

```sh
npm install
```

## Scripts

If your `package.json` "scripts" use `yarn`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "yarn lint --fix"
  }
}
```

Then replace `yarn` with `npm`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "npm run lint -- --fix"
  }
}
```

### Note

1. `yarn <command>` becomes `npm run <command>`
2. Add `--` when passing arguments to commands
3. Replace `yarn` with `npx` when executing a binary

## Engines

If your `package.json` "engines" has `yarn`:

```json
{
  "engines": {
    "yarn": "1"
  }
}
```

Then replace `yarn` with `npm`:

```json
{
  "engines": {
    "npm": "9"
  }
}
```

## Files

Search for all files that contain `yarn`:

```sh
grep -nr 'yarn' .
```

Or search inside a Git repository:

```sh
git grep 'yarn'
```

Then refactor `yarn` to `npm`. For example:

- Documentation (e.g., README.md)
- Scripts (e.g., Git hooks)
- CI (e.g., GitHub Actions)

## Examples

- [remarkablemark/lerna-template#929](https://github.com/remarkablemark/lerna-template/pull/929)
- [lilboards/lilboards#1464](https://github.com/lilboards/lilboards/pull/1464)
