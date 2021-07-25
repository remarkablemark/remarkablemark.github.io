---
layout: post
title: 'Bash: Check Operating System is Mac'
date: 2020-10-31 21:44:56
updated: 2020-12-31 16:28:47
excerpt: How to check that your OS (operating system) is macOS in Bash or Shell.
categories: bash shell mac
---

To verify the operating system is [macOS](https://wikipedia.org/wiki/MacOS) in [Bash](<https://wikipedia.org/wiki/Bash_(Unix_shell)>), check the environment variable `$OSTYPE`:

```sh
echo $OSTYPE # darwin18.7.0
```

Notice that the string contains `darwin`.

## Conditional

To check macOS using an [if statement](https://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO-6.html):

```bash
if [[ $OSTYPE == 'darwin'* ]]; then
  echo 'macOS'
fi
```

## Logical Operator

To check macOS using a one-line logical operator:

```bash
[[ $OSTYPE == 'darwin'* ]] && echo 'macOS'
```

## uname

Alternatively, you can check OS type using [`uname`](https://en.wikipedia.org/wiki/Uname):

```sh
uname # Darwin
```
