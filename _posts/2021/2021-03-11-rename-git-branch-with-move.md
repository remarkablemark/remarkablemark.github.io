---
layout: post
title: Rename Git branch with move
date: 2021-03-11 13:55:25
excerpt: Rename a Git branch with `git branch -m` (move option).
categories: git branch move
---

Rename or [move](https://git-scm.com/docs/git-branch#Documentation/git-branch.txt--m) a Git branch with the `-m` option:

```sh
git branch -m <newbranch>
```

This is useful when you accidentally commit to `master`:

```sh
git branch -m feature
git checkout master
```

Learn more about `git branch` with:

```sh
git branch --help
```
