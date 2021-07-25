---
layout: post
title: Lerna bootstrap prepare in yarn workspaces
date: 2019-04-06 16:05:09
excerpt: How to run the npm prepare lifecycle script with lerna bootstrap in yarn workspaces.
categories: lerna bootstrap npm script prepare yarn workspaces
---

[`prepare`](https://docs.npmjs.com/misc/scripts) is a useful script for running a command before a package is published or on local install.

```sh
jq . packages/my-lerna-package/package.json # cat packages/my-lerna-package/package.json
```

```json
{
  "name": "my-lerna-package",
  "scripts": {
    "prepare": "echo 'called prepare in my-lerna-package'"
  }
}
```

However, [`lerna bootstrap`](https://github.com/lerna/lerna/tree/v3.13.1/commands/bootstrap#lernabootstrap) doesn't run `prepare` when using [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) (see [issue](https://github.com/lerna/lerna/issues/1021)).

```sh
yarn lerna bootstrap
```

```bash
yarn run v1.9.4
$ path/to/monorepo/node_modules/.bin/lerna bootstrap
lerna notice cli v3.13.1
lerna info versioning independent
lerna info bootstrap root only
[1/5] 🔍  Validating package.json...
[2/5] 🔍  Resolving packages...
success Already up-to-date.
✨  Done in 1.89s.
```

This is because when [`useWorkspaces`](https://github.com/lerna/lerna/blob/v3.13.1/commands/bootstrap/README.md#--use-workspaces) is enabled, `lerna bootstrap` only runs `yarn install`. Thus, the problem lies with yarn (see [issue](https://github.com/yarnpkg/yarn/issues/3911)).

The workaround is to add a `prepare` script to your root `package.json`:

```json
{
  "scripts": {
    "prepare": "lerna run prepare"
  },
  "private": true
}
```

Now when you run `lerna bootstrap`:

```sh
yarn lerna bootstrap
```

```bash
yarn run v1.9.4
$ path/to/monorepo/node_modules/.bin/lerna bootstrap
lerna notice cli v3.13.1
lerna info versioning independent
lerna info bootstrap root only
[1/5] 🔍  Validating package.json...
[2/5] 🔍  Resolving packages...
success Already up-to-date.
$ lerna run prepare
lerna notice cli v3.13.1
lerna info versioning independent
lerna info Executing command in 1 package: "yarn run prepare"
lerna info run Ran npm script 'prepare' in 'my-lerna-package' in 0.4s:
$ echo 'called prepare in my-lerna-package'
called prepare in my-lerna-package
lerna success run Ran npm script 'prepare' in 1 package in 0.4s:
lerna success - my-lerna-package
✨  Done in 2.78s.
```

You can also set the options `--stream` and `--sort` to optimize the current command (see [comment](https://github.com/yarnpkg/yarn/issues/3911#issuecomment-343270644)):

```sh
lerna run --stream --sort prepare
```
