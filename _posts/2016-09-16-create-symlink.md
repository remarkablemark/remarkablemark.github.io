---
layout: post
title: How to create a symlink
date: 2016-09-16 22:29:00 -4000
excerpt: How to create a symlink (symbolic link) in a Unix-like operating system.
categories: symlink command-line terminal unix posix
---

Sometimes we want to have an existing file/directory but in another location.

One solution is to **copy** it to the destination path but this results in redundant data and inconsistencies if the source changes.

A better solution is to use **symbolic links** or **symlinks** for short. Think of them as _aliases_ or _shortcuts_ that point to the actual file/directory.

Let's go over how to create one. Given the following directory structure:

```sh
$ tree
.
└── path
    └── to
        └── source.file
```

You can create a symlink like below:

```sh
$ ln -s path/to/source.file path/to/target.file
```

You will now have the following:

```sh
$ tree
.
└── path
    └── to
        ├── target.file -> path/to/source.file
        └── source.file
```

But what if the target file already exists?

```sh
$ ln -s path/to/source.file path/to/target.file
ln: path/to/target.file: File exists
```

You can pass the `-f` option to force an override:

```sh
$ ln -s -f path/to/source.file path/to/target.file
```

For more information, check out the manual page for the `ln` command:

```sh
$ man ln
```
