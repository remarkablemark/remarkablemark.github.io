---
layout: post
title: How to create a symlink
date: 2016-09-16 22:29:00 -4000
excerpt: How to create a symbolic link (symlink).
categories: symlink symbolic link
---

Use a **symlink** (symbolic link) to create a reference to another file or directory:

```sh
$ ln -s <source> <destination>
```

### Example

Given the following directory structure:

```sh
$ tree
.
└── path
    └── to
        └── source
```

You can create a symlink like below:

```sh
$ ln -s path/to/source path/to/target
```

You will now have the following:

```sh
$ tree
.
└── path
    └── to
        ├── target -> path/to/source
        └── source
```

But what if the target file already exists?

```sh
$ ln -s path/to/source path/to/target
ln: path/to/target: File exists
```

You can force an override with the `-f` option:

```sh
$ ln -sf path/to/source path/to/target
```

Also, if you don't want the symlink to be relative, then make the path absolute:

```sh
$ ln -s "$(pwd)/path/to/source" path/to/target
```

This ensures the symlink still points to the expected location even if it's moved.

For more information, check out the manual page for the `ln` command:

```sh
$ man ln
```
