---
layout: post
title: Bash uppercase string
date: 2022-11-19 14:12:12
excerpt: How to uppercase a string in bash with awk and tr.
categories: bash awk tr
---

This post goes over how to uppercase a string in bash with:

- [awk](#awk)
- [tr](#tr)

## awk

To uppercase a string with [`awk`](https://wikipedia.org/wiki/AWK):

```sh
echo 'string' | awk '{ print toupper($0) }'
```

To lowercase the string, replace `toupper` with `tolower`:

```sh
echo 'string' | awk '{ print tolower($0) }'
```

## tr

To uppercase a string with [`tr`](<https://wikipedia.org/wiki/Tr_(Unix)>):

```sh
echo 'string' | tr '[:lower:]' '[:upper:]'
```

To lowercase the string, flip the order of `'[:lower:]' '[:upper:]'`:

```sh
echo 'string' | tr '[:upper:]' '[:lower:]'
```
