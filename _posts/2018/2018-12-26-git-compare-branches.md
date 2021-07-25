---
layout: post
title: Git compare branches
date: 2018-12-26 19:52:56 -4000
excerpt: How to compare commits and files modified between Git branches.
categories: git log diff branch
---

## Compare commits

To compare `master` branch with current `HEAD`:

```sh
git log master..HEAD
```

This is equivalent to:

```sh
git log master..
```

To see commits in oneline:

```sh
git log master.. --oneline
```

To see commits as a decorated graph:

```sh
git log master.. --oneline --decorate --graph
```

## Compare code

To see the difference in regards to files modified:

```sh
git diff master..
```
