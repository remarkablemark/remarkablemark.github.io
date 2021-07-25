---
layout: post
title: Get name of current Git branch
date: 2017-10-11 20:08:32
excerpt: How to get the name of the current Git branch.
categories: git branch bash
---

You can get the name of the current Git branch with:

```sh
git symbolic-ref --short HEAD
```

Or:

```sh
git rev-parse --abbrev-ref HEAD
```

And if you wish to assign the name to a variable:

```bash
current_branch=$(git symbolic-ref --short HEAD)
echo $current_branch
```
