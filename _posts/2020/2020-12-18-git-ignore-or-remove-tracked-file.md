---
layout: post
title: Git ignore or remove tracked file
date: 2020-12-18 21:11:24
excerpt: How to ignore or remove a tracked file from a Git repository.
categories: git
---

If a file is tracked by Git, adding it to `.gitignore` won't stop Git from tracking it since `.gitignore` only applies to untracked files.

To prevent file changes of a `.gitignore` file from showing up during `git status`, you can do the following:

1. [Ignore changes](#ignore-changes)
2. [Remove file](#remove-file)

## Ignore changes

To ignore changes of tracked `<file>`:

```sh
git update-index --assume-unchanged <file>
```

To start tracking changes of `<file>` again:

```sh
git update-index --no-assume-unchanged <file>
```

## Remove file

To remove tracked file `<file>`:

```sh
git rm --cached <file>
git commit -m 'chore: remove file'
```
