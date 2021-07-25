---
layout: post
title: Git orphan branch
date: 2016-10-21 15:23:00
excerpt: To checkout a branch with no commit history, you can use the `--orphan` option.
categories: git branch
---

Given a [Git](https://git-scm.com) repository with a [commit history](https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History):

```sh
git status
On branch master
nothing to commit, working directory clean
```

```sh
git log --oneline
```

Is it possible to create a new [branch](https://git-scm.com/docs/git-branch) with no commits?

It is possible with the `orphan` option, you definitely can!

```sh
git checkout --orphan orphan
```

Output:

```
Switched to a new branch 'orphan'
```

Delete all your existing files:

```sh
git rm -rf .
```

And now you have a branch with zero commits and files.

```sh
git status
On branch orphan
Initial commit
nothing to commit (create/copy files and use "git add" to track)
```
