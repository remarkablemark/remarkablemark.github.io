---
layout: post
title: Check if Git working tree is dirty
date: 2017-10-12 20:15:17 -4000
excerpt: How to check if Git working tree is dirty or has new untracked files.
categories: git repository diff status bash cli
---

## git diff

`git diff` can be used to check if the working directory is dirty (assuming you don't care about untracked files):

```sh
$ git diff HEAD
```

If files are modified, then it will output text. If the working directory is clean, then it will output nothing.

Using the conditional if statement:

```sh
#!/bin/bash
if [[ $(git diff --stat) != '' ]]; then
  echo 'dirty'
else
  echo 'clean'
fi
```

Or a logical operator:

```sh
$ git diff --quiet || echo 'dirty'
```

## git status

But to check for the presence of untracked files, you'll need `git status`:

```sh
$ git status --short
```

For example, if `LICENSE` is created and `README.md` is modified:

```sh
$ git status -s
M  README.md
?? LICENSE
```

Using a logical operator to check if working tree has modified/untracked files (`-z` tests if the string is null or empty):

```sh
$ [[ -z $(git status -s) ]] || echo 'modified/untracked'
```

And using a logical operator to check if working tree is clean (`-n` tests if the string is not empty):

```sh
$ [[ -n $(git status -s) ]] || echo 'clean'
```

Also, there's the option `--porcelain` which formats the output like `--short`. But because it's a high level command, it's known to be slow for larger repositories.
