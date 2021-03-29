---
layout: post
title: Conventional Release Setup
date: 2020-02-28 20:45:17
updated: 2021-03-28 20:51:17
excerpt: Conventional Release Setup is a command-line tool that sets up committing and releasing with conventional commits.
categories: npm package binary executable command-line conventional-release-setup conventional-commits husky commitlint standard-version cli
---

Run [`conventional-release-setup`](https://www.npmjs.com/package/conventional-release-setup) in your Terminal to enable your project to be released with [Conventional Commits](https://www.conventionalcommits.org/):

```sh
npx conventional-release-setup
```

## Motivation

Most of my projects rely on [Conventional Commits](https://conventionalcommits.org/) for releasing. But because the setup is repetitive, I decided to automate the process.

So in the past, I would manually:

- set up [commitlint](https://github.com/conventional-changelog/commitlint#what-is-commitlint):
  - which checks if my commit messages meet the [conventional commits format](https://conventionalcommits.org/) (this information is key when generating a release)
- add [husky](https://github.com/typicode/husky#husky):
  - which lints the commit message via a Git hook
- and include [standard-version](https://github.com/conventional-changelog/standard-version#readme):
  - which bumps the version and generate the CHANGELOG

Now I run the executable and it does all that for me.

## Usage

If the binary is installed globally, you can execute it like so:

```sh
npm install --global conventional-release-setup
conventional-release-setup
```

Otherwise, execute it with [npx](https://www.npmjs.com/package/npx):

```sh
npx conventional-release-setup
```

For your first release, it's recommended to do the following:

```sh
git stash
npx standard-version --release-as 1.1.0
git stash pop
```

See [standard-version > First Release](https://github.com/conventional-changelog/standard-version#first-release) for more details.

## Package

You can find `conventional-release-setup` on:

- [npm](https://www.npmjs.com/package/conventional-release-setup)
- [yarn](https://yarnpkg.com/package/conventional-release-setup)

Feel free to check out the [GitHub repository](https://github.com/remarkablemark/conventional-release-setup).
