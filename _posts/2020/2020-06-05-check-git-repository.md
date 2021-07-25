---
layout: post
title: Check if path is a Git repository
date: 2020-06-05 18:54:37
excerpt: How to check if a directory or path is a git repository.
categories: git repository directory path bash
---

> TL;DR: To check if `$PATH` is a Git repository:
>
> ```sh
> git -C $PATH rev-parse 2>/dev/null; echo $? # 0 = git repository
> ```

## Problem

If you try to run a git command in a directory that's not a repository, you'll get:

```sh
git status
fatal: not a git repository (or any of the parent directories): .git
```

So how can you tell if a directory is within a git repository?

You can get the exit status code (`$?`) from git commands like `git status`:

```sh
git status 2>/dev/null; echo $?
0
```

Exit code of `0` means it's a git repository. Any other code (e.g., `128`) means it's not.

## git rev-parse

For better performance and to specify a path, you can use [`git rev-parse`](https://git-scm.com/docs/git-rev-parse):

```sh
git -C <path> rev-parse 2>/dev/null
```

Here's an example of when the current working directory is not a git repository:

```sh
git -C . rev-parse 2>/dev/null; echo $?
128
```
