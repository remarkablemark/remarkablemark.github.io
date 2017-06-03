---
layout: post
title: How to update a Git branch
date: 2017-06-02 21:45:00 -4000
excerpt: How to update a Git branch with merge or rebase.
categories: git branch merge rebase
---

Assuming you've been working on a `feature` branch:

```sh
$ git branch
* master
$ git checkout -b feature
Switched to a new branch 'feature'
# make some commits...
```

You find out there are some new commits on `master`:

```sh
$ git checkout master
$ git pull
```

And you want to merge them to your `feature` branch.

How would you go about doing that?

## Merge

The simplest approach is to [`merge`](https://git-scm.com/docs/git-merge) the changes:

```sh
$ git checkout feature
$ git merge master
```

If there are differences, then merge will apply the commits to the top of `feature` and create a new **merge commit**. Otherwise, the merge will be resolved by a _fast-forward_.

## Rebase

Alternatively, there's [`rebase`](https://git-scm.com/docs/git-rebase):

```sh
$ git checkout feature
$ git rebase master
```

Rebase, on the other hand, moves all diverging commits of `feature` to the top.

This means that the diverging commits will have **_new hashes_** because history will be rewritten.

Accordingly, if you've previously pushed your `feature` branch to remote, then the only way to update it is with **force push**:

```sh
$ git push origin feature --force
```

However, if developers have checked out your `feature` branch, then I don't recommend this method. Stick with merge.
