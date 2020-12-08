---
layout: post
title: Vim convert file from DOS to UNIX
date: 2020-12-07 21:20:40
excerpt: How to convert a file from DOS to UNIX and vice versa using Vim.
categories: vim dos unix shell
---

## DOS to UNIX

Here's how to convert file `dos.txt` from [DOS](https://en.wikipedia.org/wiki/DOS) to [UNIX](https://en.wikipedia.org/wiki/Unix) using [Vim](https://www.vim.org/).

Open `dos.txt` with the Vim editor:

```sh
$ vim dos.txt
```

Set `fileformat` to `unix` and write and quit the file:

```vim
:set fileformat=unix
:wq
```

This is equivalent to running the Vim commands from the shell:

```sh
$ vim '+set ff=unix' '+x' dos.txt
```

## UNIX to DOS

Here's how to convert file `unix.txt` from [UNIX](https://en.wikipedia.org/wiki/Unix) to [DOS](https://en.wikipedia.org/wiki/DOS) using [Vim](https://www.vim.org/).

Open `unix.txt` with the Vim editor:

```sh
$ vim unix.txt
```

Set `fileformat` to `dos` and write and quit the file:

```vim
:set fileformat=dos
:wq
```

This is equivalent to running the Vim commands from the shell:

```sh
$ vim '+set ff=dos' '+x' unix.txt
```
