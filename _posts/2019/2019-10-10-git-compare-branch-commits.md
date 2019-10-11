---
layout: post
title: Git compare branch commits
date: 2019-10-10 22:28:03
excerpt: How to compare the number of commits between Git branches.
categories: git bash
---

Given you have a local [Git](https://git-scm.com/) repository with the following branches:

```sh
$ git branch
* master
  myBranch
```

To see the commit messages that are on `master` but not on `myBranch`:

```sh
$ git log master ^myBranch
```

To see the commit messages (first line) that are on `myBranch` but not on `master`:

```sh
$ git log --oneline myBranch ^master
```

To count how many commits your branch is ahead of `master`:

```sh
$ git log --oneline $(git rev-parse --abbrev-ref HEAD) ^master | wc -l
```

> Note: `git rev-parse --abbrev-ref HEAD` returns the name of the branch you're currently on.

You can also format the data into a useful message:

```sh
$ COUNT_AHEAD=$(git log --oneline $(git rev-parse --abbrev-ref HEAD) ^master | wc -l | xargs)
$ COUNT_BEHIND=$(git log --oneline master ^$(git rev-parse --abbrev-ref HEAD) | wc -l | xargs)
$ echo "$COUNT_AHEAD commits ahead and $COUNT_BEHIND commits behind master"
```

> Note: `wc -l` outputs the line count and `xargs` trims the whitespace.

Example output:

```sh
13 commits ahead and 37 commits behind master
```
