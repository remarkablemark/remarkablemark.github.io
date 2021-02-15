---
layout: post
title: How to lint your Git commit messages
date: 2019-05-29 20:01:42
updated: 2021-02-15 15:35:51
excerpt: How to automate linting of your Git commit message with commitlint and husky.
categories: git hook commitlint husky npm
---

This post goes over how to lint your Git commit messages with [commitlint](https://github.com/conventional-changelog/commitlint) and [husky](https://github.com/typicode/husky).

- [husky v5](#husky-5)
- [husky v4](#husky-4)

## Prerequisites

- [Node.js](https://b.remarkabl.org/nodejs-site)

## Husky 5

Install [`commitlint`](https://www.npmjs.com/package/commitlint) with a config:

```sh
$ npm install @commitlint/{cli,config-conventional}
```

> This command installs both [`@commitlint/cli`](https://www.npmjs.com/package/@commitlint/cli) and [`@commitlint/config-conventional`](https://www.npmjs.com/package/@commitlint/config-conventional).

[config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) is a [standard](https://www.conventionalcommits.org/) based on the [Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

Create `.commitlintrc.json`, which extends the rules from [config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional):

```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

Or export the rules in `commitlint.config.js`:

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

Install [`husky`](https://www.npmjs.com/package/husky):

```sh
$ npm install husky
```

Enable [Git hooks](https://git-scm.com/docs/githooks):

```sh
$ npx husky install
```

Or add `postinstall` script to `package.json` to enable Git hooks after `npm install`:

```json
{
  "private": true,
  "scripts": {
    "postinstall": "husky install"
  },
  "devDependencies": {
    "husky": "5"
  }
}
```

> It's assumed that your package is **private**. If your package is **public**, then make sure to disable `postinstall` script using [`pinst`](https://github.com/typicode/pinst). See [Husky docs](https://typicode.github.io/husky/#/?id=install) for more information.

Add the `commit-msg` hook:

```sh
$ npx husky add .husky/commit-msg 'npx commitlint --edit $1'
```

[Test](#test) that your commit hook works.

## Husky 4

Install `commitlint` with a config:

```sh
$ npm install @commitlint/{cli,config-conventional}
```

Create `.commitlintrc.json`, which extends the rules from [config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional):

```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

Or export the rules in `commitlint.config.js`:

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

Install `husky@4`, which sets up your [Git hooks](https://git-scm.com/docs/githooks):

```sh
$ npm install husky@4
```

Create `.huskyrc` (or `.huskyrc.json`) and add the Git `commit-msg` hook that runs `commitlint`:

```json
{
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

Or add the hook to `package.json`:

```json
{
  "devDependencies": {
    "@commitlint/cli": "latest",
    "@commitlint/config-conventional": "latest",
    "husky": "4"
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

[Test](#test) that your commit hook works.

## Test

Commit and verify that the message is following the [Conventional Commits](https://www.conventionalcommits.org/) format:

```sh
$ git commit -m 'add commitlint'       # fail
$ git commit -m 'feat: add commitlint' # success
```

## Resources

- [Demo](https://github.com/remarkablemark/husky-commitlint-demo)
