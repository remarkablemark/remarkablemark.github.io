---
layout: post
title: How to rename a file extension
date: 2022-05-16 21:27:22
excerpt: How to rename a file extension with mv, find, and xargs.
categories: bash
---

This article goes over how to rename a file extension.

## Single

Use `mv` to rename `file.txt` to `file.md`:

```sh
mv file.txt file.md
```

## Multiple

Use `find` to list files with extension `txt`:

```sh
find $DIR -type f -name '*.txt'
```

> Replace `$DIR` with the file directory.

Rename with `mv`:

```sh
find $DIR -type f -name '*.txt' -exec sh -c 'mv "$1" "${1%.txt}.md"' _ {} \;
```

Or with `xargs`:

```sh
find $DIR -type f -name '*.txt' | xargs -n 1 bash -c 'mv "$0" "${0%.txt}.md"'
```
