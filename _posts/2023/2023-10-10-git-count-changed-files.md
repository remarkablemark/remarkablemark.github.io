---
layout: post
title: Git count changed files
date: 2023-10-10 13:35:36
excerpt: How to count the number of modified files with git.
categories: git bash
---

Count changed files:

```sh
git diff --stat | wc -l
```

Count staged files:

```sh
git diff --stat --staged | wc -l
```
