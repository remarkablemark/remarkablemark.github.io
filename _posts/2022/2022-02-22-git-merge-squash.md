---
layout: post
title: Git merge squash
date: 2022-02-22 19:16:42
excerpt: How to merge Git commits with squash.
categories: git
---

This article goes over how to merge Git commits with squash.

## Squash

Given the branches:

```sh
git branch
* feature
  master
```

To merge `feature` into `master` with a squash commit:

```bash
git checkout master
git merge --squash feature
git commit -am "feat: add feature"
```

Alternatively, you can set the commit message during squash:

```sh
git merge --squash feature -m "feat: add feature"
```

However, the commit message will look like:

```
squash! Merge branch 'feature' into master

feat: add feature
```

If you don't like that, you can amend the commit message:

```sh
git commit --amend -m "feat: add feature"
```
