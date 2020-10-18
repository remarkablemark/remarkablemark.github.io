---
layout: post
title: Copy a file to directories
date: 2020-10-18 18:07:37
excerpt: How to copy a file to all directories using `find`.
categories: find copy
---

> **TL;DR**: copy `source` file to `target` directories given `root` path:
>
> ```sh
> $ find <root> -type d -name <target> -exec cp <source> {} \;
> ```

Given the following directory structure:

```sh
$ tree
.
├── dir1
├── dir2
├── dir3
└── file

3 directories, 1 file
```

How can we copy `file` to `dir1/`, `dir2/`, and `dir3/` to get something like this:

```
$ tree
.
├── dir1
│   └── file
├── dir2
│   └── file
├── dir3
│   └── file
└── file

3 directories, 4 files
```

## cp

We can explicitly call `cp` to copy the source file to each target directory:

```sh
$ cp file dir1; cp file dir2; cp file dir3
```

But this doesn't feel [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)&mdash;especially when the number of directories increases.

## find

With [`find`]({% post_url 2018/2018-04-17-find-examples %}), we can list all the directories:

```sh
$ find . -type d
.
./dir2
./dir3
./dir1
```

To match the directory name starting with `dir`:

```sh
$ find . -type d -name 'dir*'
./dir2
./dir3
./dir1
```

Then we can execute `cp` and pass each directory as `{}`:

```sh
$ find . -type d -name 'dir*' -exec cp file {} \;
```
