---
layout: post
title: Find examples
date: 2018-04-17 19:52:02
updated: 2020-04-09 21:58:23
excerpt: Examples and common uses of the `find` command.
categories: bash find command cli
---

From `man find`:

> The find utility recursively descends the directory tree for each path listed, evaluating an expression &hellip; in terms of each file in the tree.

## Prerequisites

Given the following directory tree:

```sh
tree
.
├── file1.txt
├── file2.txt
├── folder
│   └── file3
└── tmp
    └── file4

2 directories, 4 files
```

To recreate the directory layout, run the command:

```sh
mkdir -p folder tmp && touch file1.txt file2.txt folder/file3 tmp/file4
```

## Examples

### find

To list all files and directories in your current working directory:

```sh
find .
```

Output:

```
.
./file2.txt
./file1.txt
./folder
./folder/file3
./tmp
./tmp/file4
```

To list all files and directories in `folder`:

```sh
find folder
```

Output:

```
folder
folder/file3
```

### -type

To list only files:

```sh
find . -type f
```

Output:

```
./file2.txt
./file1.txt
./folder/file3
./tmp/file4
```

To list only directories:

```sh
find . -type d
```

Output:

```
.
./folder
./tmp
```

To list all files in `folder`:

```sh
find folder -type -f
```

Output:

```
folder/file3
```

### -name

To list all files with the extension `.txt`:

```sh
find . -type f -name '*.txt'
```

Output:

```
./file2.txt
./file1.txt
```

Which is the same as:

```sh
find . -type f -name \*.txt
```

### -path

To list all files excluding those in `tmp`:

```sh
find . -type f ! -path './tmp/*'
```

Output:

```
./file2.txt
./file1.txt
./folder/file3
```

To list all files excluding those in `folder` and `tmp`:

```sh
find . -type f ! -path './tmp/*' ! -path './folder/*'
```

Output:

```
./file2.txt
./file1.txt
```

### -or

To test against multiple conditions:

```sh
find . -name '*.txt' -or -name '*tmp*'
```

Output:

```
./file2.txt
./file1.txt
./tmp
```

This is the same as:

```sh
find . -name '*.txt' -o -name '*tmp*'
```

The following test operators are available to be used:

- `-and`
- `-or`
- `-not`

### -exec

To execute a command for each match:

```sh
find . -name '*.txt' -exec echo {} \;
```

Output:

```
./file2.txt
./file1.txt
```

The `{}` is the argument and `\;` is to ensure the semicolon is escaped.

This is the same as:

```sh
echo ./file2.txt && echo ./file1.txt
```

To execute a single command for all matches:

```sh
find . -name '*.txt' -exec echo {} +
```

Output:

```
./file2.txt ./file1.txt
```

This is the same as:

```sh
echo ./file2.txt ./file1.txt
```

## Resources

Here's an [article](https://math2001.github.io/article/bashs-find-command/) with more usage examples of the `find` command.
