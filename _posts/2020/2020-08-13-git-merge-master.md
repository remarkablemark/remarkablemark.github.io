---
layout: post
title: Git merge master
date: 2020-08-13 21:19:06
excerpt: How to merge or rebase master to your branch using git.
categories: git fetch merge rebase master
---

> **TL;DR**: Merge branch with latest `master`:
>
> ```sh
> $ git fetch && git merge origin/master
> ```

Given [git branches](https://git-scm.com/docs/git-branch) `master` and `feature`:

```sh
$ git branch
* feature
  master
```

[Merging](https://git-scm.com/docs/git-merge) `master` into your `feature` branch can be tedious:

```sh
$ git checkout master
$ git pull
$ git checkout feature
$ git merge master
```

Luckily, there's a solution without having to [checkout](https://git-scm.com/docs/git-checkout) another branch:

```sh
$ git fetch
$ git merge origin/master
```

This means you can [rebase](https://git-scm.com/docs/git-rebase) your branch with `master`:

```sh
$ git fetch
$ git rebase origin/master
```

[Rebase](https://git-scm.com/docs/git-rebase) rewinds and replays your commits on top of [`HEAD`](https://git-scm.com/book/en/v2/Git-Internals-Git-References#ref_the_ref), which requires a force [push](https://git-scm.com/docs/git-push) if you've pushed your branch to remote:

```sh
$ git push -f
```
