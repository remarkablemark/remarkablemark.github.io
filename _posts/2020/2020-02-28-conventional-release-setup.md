---
layout: post
title: Conventional Release Setup
date: 2020-02-28 20:45:17
updated: 2023-09-02 14:06:46
excerpt: Conventional Release Setup is a command-line binary that sets up your project so that you can commit and release with Conventional Commits.
categories: npm cli binary
---

Run [`conventional-release-setup`](https://www.npmjs.com/package/conventional-release-setup) in your command-line to enable your project to be released with [Conventional Commits](https://www.conventionalcommits.org/):

```sh
npx conventional-release-setup@latest
```

## Motivation

Many of my projects use [Conventional Commits](https://conventionalcommits.org/) for the release process. Because setting it up is repetitive, I automated the steps.

In the past, I would:

- create [commitlint](https://github.com/conventional-changelog/commitlint#what-is-commitlint)
  - checks if my commit messages meet the [conventional commits format](https://conventionalcommits.org/) (this information is key when generating a release)
- set up [husky](https://github.com/typicode/husky#husky)
  - lints the commit message via a Git hook
- add [Release Please](https://github.com/google-github-actions/release-please-action)
  - bumps the version and generates the CHANGELOG

Now I run the CLI and it does all the work for me.

## Usage

Run with [npx](https://www.npmjs.com/package/npx):

```sh
npx conventional-release-setup
```

Or run globally:

```sh
npm install --global conventional-release-setup && conventional-release-setup
```

## Package

You can find `conventional-release-setup` on:

- [NPM](https://www.npmjs.com/package/conventional-release-setup)
- [Yarn](https://yarnpkg.com/package/?name=conventional-release-setup)

See the [GitHub repository](https://github.com/remarkablemark/conventional-release-setup).
