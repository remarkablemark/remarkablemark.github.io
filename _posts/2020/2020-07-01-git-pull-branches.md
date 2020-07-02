---
layout: post
title: How to git pull all branches
date: 2020-07-01 21:04:19
excerpt: How to git pull all local branches in a git repository.
categories: git bash
---

> **TL;DR**: To sync all local git branches with remote origin:
>
> ```sh
> $ git branch --format='%(refname:short)' | xargs -I {} sh -c 'git checkout {}; git pull'
> ```

## Problem

Let's say you have the following branches for your git repository:

```sh
$ git branch
  foo
  bar
  baz
* master
```

If you wanted to sync all your local branches with remote origin, you might do something like this:

```sh
$ git checkout foo
$ git pull
$ git checkout bar
$ git pull
$ git checkout baz
$ git pull
```

Wouldn't it be nice to automate this with a one-line script?

## Solution

First, you want to list all your [git branches](https://git-scm.com/docs/git-branch):

```sh
$ git branch
  foo
  bar
  baz
* master
```

An asterisk is prepended on the current checked out branch.

To remove it, you can pass the option [`--format='%(refname:short)'`](https://git-scm.com/docs/git-branch#Documentation/git-branch.txt---formatltformatgt):

```
$ git branch --format='%(refname:short)'
foo
bar
baz
master
```

Then pipe the branch names to [`xargs`](https://en.wikipedia.org/wiki/Xargs):

```sh
xargs -I {} sh -c # 'echo {}'
```

And [checkout](https://git-scm.com/docs/git-checkout) and [pull](https://git-scm.com/docs/git-pull):

```sh
git checkout {}; git pull
```

This leaves us with the final command:

```sh
$ git branch --format='%(refname:short)' | xargs -I {} sh -c 'git checkout {}; git pull'
```
