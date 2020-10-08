---
layout: post
title: Copy latest Git commit hash
date: 2020-10-08 19:14:32
excerpt: How to copy the latest Git commit sha1 hash at HEAD.
categories: git
---

> **TL;DR**: copy latest Git commit hash:
>
> ```sh
> git show --oneline | head -1 | awk '{ print $1 }' | pbcopy
> ```

## git show

[`git show`](https://git-scm.com/docs/git-show) the [object](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects) at `HEAD`:

```sh
git show --oneline
```

Extract the first line with [`head`](<https://en.wikipedia.org/wiki/Head_(Unix)>):

```sh
head -1
```

Print the first field with [`awk`](https://en.wikipedia.org/wiki/AWK):

```sh
awk '{ print $1 }'
```

Copy result to clipboard with [`pbcopy`](<https://en.wikipedia.org/wiki/Clipboard_(computing)#Apple_macOS>):

```sh
pbcopy
```

Putting it together with [pipe](<https://en.wikipedia.org/wiki/Pipeline_(Unix)>):

```sh
git show --oneline | head -1 | awk '{ print $1 }' | pbcopy
```

## git log

Copy the latest commit sha with [`git log`](https://git-scm.com/docs/git-log):

```sh
git log --oneline | head -1 | awk '{ print $1 }' | pbcopy
```
