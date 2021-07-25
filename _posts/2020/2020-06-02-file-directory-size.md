---
layout: post
title: Display file or directory size
date: 2020-06-02 19:31:00
excerpt: How to display the file or directory size in human-readable format using `ls` or `du` commands.
categories: file size ls du bash
---

This post goes over how to a display the size of a file or directory in human-readable format.

## ls

To display a _human-readable_ file size in long format using [`ls`](https://en.wikipedia.org/wiki/Ls):

```sh
ls -lh <file>
```

To display the size of files in a directory:

```sh
ls -lh <directory>
```

## sort

To sort by size in _descending_ order:

```sh
ls -lhS <directory>
```

To sort by size in _ascending_ order:

```sh
ls -lhrS <directory>
```

## du

To get the size of a directory, use the [`du`](<https://en.wikipedia.org/wiki/Du_(Unix)>) command:

```sh
du -sh <directory>
```
