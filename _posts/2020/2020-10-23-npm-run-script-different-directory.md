---
layout: post
title: Run npm script from another directory
date: 2020-10-23 21:47:55
excerpt: How to run a package.json script from a different directory using npm and yarn.
categories: npm yarn script nodejs cli
---

## npm

To run an [npm script](https://docs.npmjs.com/cli-commands/run-script.html) from another directory, use `--prefix`:

```sh
npm --prefix <path> run <command>
```

## yarn

To run a [yarn script](https://classic.yarnpkg.com/en/docs/cli/run/) from another directory, use `--cwd`:

```sh
yarn --cwd <path> <command>
```

## Example

If you have a `package.json`:

```json
{
  "scripts": {
    "command": "echo hello world"
  }
}
```

In the following directory:

```
.
└── path
    └── package.json

1 directory, 1 file
```

Then to run script `command` from your working directory:

```sh
npm --prefix ./path/ run command

yarn --cwd ./path/ command
```
