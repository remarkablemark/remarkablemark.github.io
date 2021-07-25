---
layout: post
title: How to update a Git branch
date: 2017-06-02 21:45:00
excerpt: How to update a Git branch with merge or rebase.
categories: git branch merge rebase
---

This post goes over how to update a Git branch:

- [Merge](#merge)
- [Rebase](#rebase)

## Prerequisites

Given you're on branch `feature`:

```sh
git branch
* feature
```

And there are new commits on `origin/master`:

```sh
git fetch
```

```
From github.com
   abc12345..def67890  master -> origin/master
```

How would you go about merging the commits to your `feature` branch?

## Merge

To [`merge`](https://git-scm.com/docs/git-merge) the commits:

```sh
git merge origin/master
```

If there are differences, the merge will apply the commits to the top of `feature` and create a new **merge commit**. Otherwise, the merge will be resolved by a _fast-forward_.

## Rebase

To [`rebase`](https://git-scm.com/docs/git-rebase) the commits:

```sh
git rebase origin/master
```

Rebase moves all diverging commits of `feature` to the top.

This means that the diverging commits will have **_new commit hashes_** because history will be rewritten.

Also, if you've previously pushed your `feature` branch to remote, then you need to **force push** to update it:

```sh
git push origin feature --force
```

However, if developers have checked out your `feature` branch, then I don't recommend this method. Stick with merge.
