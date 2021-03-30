---
layout: post
title: 'find: rename files with a prefix'
date: 2021-03-29 23:02:04
excerpt: How to rename files with a prefix using the `find` command.
categories: bash find
---

Rename and prefix all files with `0` in the current and nested directories:

```sh
find . -type f -execdir mv {} 0{} \;
```

For example, given the file directory structure:

```sh
$ tree
.
├── 1.txt
├── 2.txt
└── 3.txt

0 directories, 3 files
```

After running the script, the files will be renamed to:

```sh
$ find . -type f -execdir mv {} 0{} \;
$ tree
.
├── 01.txt
├── 02.txt
└── 03.txt

0 directories, 3 files
```

See more [find examples]({% post_url 2018/2018-04-17-find-examples %}).
