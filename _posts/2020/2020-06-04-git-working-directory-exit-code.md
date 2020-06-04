---
layout: post
title: Git working directory exit code
date: 2020-06-04 18:13:52
excerpt: How to get the exit status code of whether a git working directory is clean or dirty.
categories: git diff exit status code bash
---

In "[Check if Git working tree is dirty]({% post_url 2017/2017-10-12-check-git-dirty %})", [`git diff`](https://git-scm.com/docs/git-diff) and [`git status`](https://git-scm.com/docs/git-status) were used to check if a working directory is dirty.

To get the exit status code, you can extract the value from the shell variable `$?`:

```sh
$ git diff --quiet
$ echo $?
```

Exit code of `0` means the working directory is clean. Exit code of `1` means the working directory is dirty.

| Code | Type  |
| :--: | :---: |
|  0   | Clean |
|  1   | Dirty |

For faster performance, you can use [`git diff-index`](https://git-scm.com/docs/git-diff-index) since it's a lower level operation:

```sh
$ git diff-index --quiet HEAD
$ echo $?
```
