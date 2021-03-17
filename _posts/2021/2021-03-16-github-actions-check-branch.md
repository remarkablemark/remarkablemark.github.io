---
layout: post
title: GitHub Actions check branch
date: 2021-03-16 22:57:40
excerpt: How to check or skip a branch before running a job in a GitHub Actions workflow.
categories: github actions workflow ci
---

[GitHub Actions](https://b.remarkabl.org/github-actions) workflow that checks if branch is `master` before running job `master-check`:

```yml
# .github/workflows/check.yml
on: push
jobs:
  master-check:
    if: github.ref == 'refs/heads/master'
    runs-on: ubuntu-latest
    steps:
      - run: echo "Running on branch $GITHUB_REF"
```

The [`if` conditional](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idif) checks that the branch is `master`:

```yml
if: github.ref == 'refs/heads/master'
```

To skip the `master` branch, use the [`!=` operator](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#operators):

```yml
if: github.ref != 'refs/heads/master'
```

See GitHub Actions documentation [example](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#determining-when-to-use-contexts).
