---
layout: post
title: Pruning Git branches
date: 2017-09-11 19:23:00 -4000
excerpt: How to prune Git branches.
categories: git prune branch
---

> **TL;DR**: You can delete all local branches merged into master with
> `git branch --merged master | grep -v master | xargs git branch -d`

You can list all local branches that are already merged into `master`:

```sh
$ git branch --merged master
```

From the list, you can grep all branches except `master`:

```sh
$ git branch --merged master | grep -v master
```

Then delete all local branches that have been merged to `master`:

```sh
$ git branch --merged master | grep -v master | xargs git branch -d
```

If you want to delete branches merged into `dev` while excluding `master`:

```sh
$ git branch --merged dev | grep -v 'master\|dev' | xargs git branch -d
# or
$ git branch --merged dev | grep -v -e master -e dev | xargs git branch -d
```
