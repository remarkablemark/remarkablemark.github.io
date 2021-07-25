---
layout: post
title: Updating a Git commit
date: 2017-04-30 10:21:00
excerpt: How to update a git commit with amend or rebase.
categories: git commit amend rebase
---

This post goes over how to update a git commit with amend or rebase:

- [Amend](#amend)
- [Rebase](#rebase)

## Amend

Updating the most recent commit is very simple with [amend](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History):

```sh
git commit --amend
```

This will open the editor with the option to modify the commit message.

If you want to keep the same commit message and not open the editor:

```sh
git commit --amend --no-edit
```

With amend, you can even change metadata information like the author and/or date:

```sh
git commit --amend --author="Name <user@domain.com>"
```

## Rebase

If the commit is not recent, then you want to use [rebase](https://git-scm.com/docs/git-rebase).

First, you'll want to list out the commits to be interactively rebased:

```sh
git rebase -i HEAD~3 # last 3 commits from HEAD
```

A hash is also accepted:

```sh
git rebase -i hash123^ # commits from hash123 to HEAD
```

The editor will open and change `pick` to `edit` for the commit(s) you plan to modify.

Amend the commit:

```sh
git commit --amend
```

And continue:

```sh
git rebase --continue
```

If merge conflicts arise, resolve them. Keep going until the rebase is finished.

Otherwise, you can abort it if you changed your mind or made a mistake:

```sh
git rebase --abort
```

One final note, if the commits are already pushed to a remote branch, it's advisable **_not_** to amend them becase a _force push_ is required to update the branch, which will cause _conflicts_ for collaborators.
