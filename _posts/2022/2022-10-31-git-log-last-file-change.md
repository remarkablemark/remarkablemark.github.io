---
layout: post
title: How to see last file change with Git
date: 2022-10-31 19:52:21
excerpt: How to see last file or path change with git log.
categories: git log
---

Use [`git log`](https://git-scm.com/docs/git-log) to see the last file or path change:

```sh
git log -p -- path/to/file
```

> Replace `path/to/file`.

This includes files that have been modified, moved, and removed.

To limit the number of commits to show to 1:

```sh
git log -p -1 -- path/to/file
```
