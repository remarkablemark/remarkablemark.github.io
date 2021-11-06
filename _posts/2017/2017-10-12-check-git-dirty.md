---
layout: post
title: How to check if a Git working tree is dirty
date: 2017-10-12 20:15:17
updated: 2021-11-05 22:46:57
excerpt: How to check if a Git working tree is clean, dirty, or has untracked files.
categories: git
---

This post goes over the ways to check if a Git working directory is dirty:

- [git diff](#git-diff)
- [git status](#git-status)

## git diff

Check if the working directory is dirty with [`git diff`](https://git-scm.com/docs/git-diff):

```sh
git diff HEAD
```

> This assumes you don't care about untracked files.

If files are _modified_, there will be an _output_. If the working directory is _clean_, there will be _no output_.

### conditional statement

Example of checking with a conditional statement:

```bash
if [[ $(git diff --stat) != '' ]]; then
  echo 'dirty'
else
  echo 'clean'
fi
```

### logical operator

Example of checking with a logical operator:

```sh
git diff --quiet || echo 'dirty'
```

## git status

To check for the presence of untracked files, use [`git status`](https://git-scm.com/docs/git-status):

```sh
git status --short
```

> [`--short`](https://git-scm.com/docs/git-status#Documentation/git-status.txt--s) returns the output in short-format.

### example

If `README.md` is modified and `LICENSE` is untracked:

```sh
git status -s
M  README.md
?? LICENSE
```

Use `-n` to test that `git status -s` is not empty:

```sh
[[ -n $(git status -s) ]] && echo 'modified and/or untracked'
```

Use `-z` to test that `git status -s` is null or empty:

```sh
[[ -z $(git status -s) ]] && echo 'clean'
```

### porcelain

[`--porcelain`](https://git-scm.com/docs/git-status#Documentation/git-status.txt---porcelainltversiongt) formats the output like `--short`:

```sh
git status --porcelain
```

It may be slow for large repositories since it's a high level command, but [others found it fast](https://github.com/remarkablemark/remarkablemark.github.io/issues/5).
