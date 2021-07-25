---
layout: post
title: git checkout, clean, vs reset
date: 2018-10-09 19:59:53
updated: 2020-03-14 16:00:55
excerpt: 'The difference between the git commands: checkout, clean, and reset.'
categories: git checkout clean reset bash
---

This post goes over the difference between `git checkout`, `git clean`, and `git reset`:

- [git checkout](#git-checkout)
- [git clean](#git-clean)
- [git reset](#git-reset)

They will be compared using the example below.

## Example

Given the index and working tree:

```sh
git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   modified.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        untracked.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

Or in the short format:

```sh
git status -s
 M modified.txt
?? untracked.txt
```

## git checkout

Changes to modified files are discarded but untracked files are untouched:

```sh
git checkout .
```

```sh
git status -s
?? untracked.txt
```

> See docs on [git checkout](https://git-scm.com/docs/git-checkout) for more info.

## git clean

Untracked files are removed but modified files are unchanged:

```sh
git clean -f
Removing untracked.txt
```

```sh
git status -s
 M modified.txt
```

To remove untracked directories in addition to untracked files, run:

```sh
git clean -f -d
```

> See docs on [git clean](https://git-scm.com/docs/git-clean) for more info.

## git reset

Changes to modified files are discarded but untracked files are untouched:

```sh
git reset --hard
HEAD is now at sha1234 my commit message
```

```sh
git status -s
?? untracked.txt
```

Thus, to discard modified files and remove untracked files:

```sh
git reset --hard && git clean -f -d
```

> See docs [git reset](https://git-scm.com/docs/git-reset) for more info.
