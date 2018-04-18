---
layout: post
title: Find examples
date: 2018-04-17 19:52:02 -4000
excerpt: Examples and common uses of the `find` command.
categories: find command cli
---

From `man find`:

> The find utility recursively descends the directory tree for each path listed, evaluating an expression &hellip; in terms of each file in the tree.

### Examples

Given the following directory tree:

```sh
$ tree
.
├── file1.txt
├── file2.txt
├── folder
│   └── file3
└── tmp
    └── file4
```

To list all files and directories in your current working directory:

```sh
$ find .
.
./file1.txt
./file2.txt
./folder
./folder/file3
./tmp
./tmp/file4
```

To list only files:

```sh
$ find . -type f
./file1.txt
./file2.txt
./folder/file3
./tmp/file4
```

To list only directories:

```sh
$ find . -type d
.
./folder
./tmp
```

To list all files with extension `.txt`:

```sh
$ find . -type f -name '*.txt'
./file1.txt
./file2.txt
```

To list all files in `folder`:

```sh
$ find folder -type -f
folder/file3
```

To list all files except those in  `tmp`:

```sh
$ find . -type f ! -path './tmp/*'
./file1.txt
./file2.txt
./folder/file3
```

To list all files except those in `folder` and `tmp`:

```sh
$ find . -type f ! -path './tmp/*' ! -path './folder/*'
./file1.txt
./file2.txt
```
