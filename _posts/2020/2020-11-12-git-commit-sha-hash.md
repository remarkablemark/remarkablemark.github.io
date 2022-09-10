---
layout: post
title: Copy Git commit SHA hash
date: 2020-11-12 20:26:29
updated: 2022-09-10 12:50:10
excerpt: How to copy a Git commit SHA hash on macOS.
categories: git sha hash mac
---

Get most recent [Git commit](https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection) [SHA-1](https://en.wikipedia.org/wiki/SHA-1) hash from `HEAD`:

```sh
git log --oneline | head -1 | awk '{print $1}'
```

Copy Git commit SHA-1 hash to macOS clipboard:

```sh
git log --oneline | head -1 | awk '{print $1}' | pbcopy
```

Alternative command:

```sh
git log -1 --format=format:%H | pbcopy
```
