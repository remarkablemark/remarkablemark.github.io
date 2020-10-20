---
layout: post
title: Bash string with newline
date: 2020-10-19 20:31:53
excerpt: How to include a newline in a string in Bash.
categories: bash newline string
---

If you're using the [Bash](<https://en.wikipedia.org/wiki/Bash_(Unix_shell)>) shell:

```sh
$ echo $0
bash
```

You may notice that [newline characters](https://en.wikipedia.org/wiki/Newline) are escaped in strings:

```sh
$ echo "hello\nworld"
hello\nworld
```

## echo

To preserve the newline in `echo`, you can set option `-e`:

```sh
$ echo -e 'hello\nworld'
hello
world
```

## variable

Alternatively, you can assign the newline character to a [variable](https://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO-5.html):

```sh
$ NL=$'\n'
```

And then substitute it via [parameter expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html):

```sh
$ echo "hello${NL}world"
hello
world
```

Make sure to use double quotes `"..."` or else your variable reference won't be expanded.
