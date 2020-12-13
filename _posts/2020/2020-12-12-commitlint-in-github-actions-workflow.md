---
layout: post
title: Lint commit with GitHub Actions
date: 2020-12-12 17:53:17
updated: 2020-12-12 19:43:47
excerpt: How to set up and run commitlint with GitHub Actions.
categories: commitlint github nodejs git
---

## Problem

[Commitlint](https://github.com/conventional-changelog/commitlint) has [CI setup](https://commitlint.js.org/#/guides-ci-setup) documentation for [Travis CI](https://travis-ci.org/) and [CircleCI](https://circleci.com/) but not for [GitHub Actions](https://github.com/features/actions).

I added the [step](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsrun) to run `npx commitlint --from=HEAD~1` in my workflow:

```yml
# .github/workflows/build.yml
jobs:
  build:
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 14
      - run: npm install
      - run: npx commitlint --from=HEAD~1
```

But got the error:

```
Error: fatal: ambiguous argument 'HEAD~1..HEAD': unknown revision or path not in the working tree.
```

## Solution

I discovered that [`actions/checkout@v2`](https://github.com/marketplace/actions/checkout) does a shallow checkout by default, which means it only checks out the last commit:

```yml
- uses: actions/checkout@v2
  with:
    fetch-depth: 1
```

To fetch the entire commit history, set `fetch-depth` to `0`:

```yml
- uses: actions/checkout@v2
  with:
    fetch-depth: 0
```

Alternatively, a positive integer can be passed to fetch N commits.

However, if a shallow checkout is permissible (`fetch-depth: 1`), then update `commitlint` to lint only the last commit message:

```yml
- run: git log -1 --pretty=format:"%s" | npx commitlint
```

## Resources

Check out ["Migrate Travis CI to GitHub Actions (Node.js)"]({% post_url 2020/2020-12-11-migrate-travis-ci-to-github-actions-nodejs-workflow %}) for more information on how to set up GitHub Actions.
