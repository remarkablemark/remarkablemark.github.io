---
layout: post
title: 'Vim: convert a file from DOS to UNIX'
date: 2020-12-07 21:20:40
updated: 2021-10-06 22:34:47
excerpt: How to convert a file from DOS to UNIX and vice versa using Vim.
categories: vim dos unix
---

This post goes over how to convert a file from [DOS](https://wikipedia.org/wiki/DOS) to [UNIX](https://wikipedia.org/wiki/Unix) using [Vim](https://www.vim.org/):

- [DOS to UNIX](#dos-to-unix)
- [UNIX to DOS](#unix-to-dos)
- [Replace ^M](#replace-m)

## DOS to UNIX

To convert `file.txt` from DOS to UNIX, open the file with Vim:

```sh
vim file.txt
```

Set `fileformat` to `unix`:

```vim
:set fileformat=unix
```

Save and quit the file:

```vim
:wq
```

This is the same as running the command:

```sh
vim '+set ff=unix' '+x' file.txt
```

## UNIX to DOS

To convert `file.txt` from UNIX to DOS, open the file with Vim:

```sh
vim file.txt
```

Set `fileformat` to `dos` and write and quit the file:

```vim
:set fileformat=dos
```

Save and quit the file:

```vim
:wq
```

This is the same as running the command:

```sh
vim '+set ff=dos' '+x' file.txt
```

## Replace ^M

To replace `^M`, run a global string replace in Vim:

```vim
:%s/^M//g
```

`^M` is entered by typing `Ctrl` + `v` and `Ctrl` + `m`.
