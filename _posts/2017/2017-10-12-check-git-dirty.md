---
layout: post
title: Check if Git working tree is dirty
date: 2017-10-12 20:15:17
updated: 2020-10-26 21:29:20
excerpt: How to check if your Git working tree is dirty or has untracked files.
categories: git repository diff status bash cli
---

We can use the following [Git](https://git-scm.com/) commands to check if the working directory is dirty or not:

- [git diff](#git-diff)
- [git status](#git-status)

## git diff

Use [`git diff`](https://git-scm.com/docs/git-diff) to check if the working directory is dirty:

```sh
$ git diff HEAD
```

> This assumes that you don't care about untracked files.

If files are modified, then there will be an output. If the working directory is clean, then there will be no output.

### conditional statement

Here's an example of checking with a conditional statement:

```sh
if [[ $(git diff --stat) != '' ]]; then
  echo 'dirty'
else
  echo 'clean'
fi
```

### logical operator

Here's an example of checking with a logical operator:

```sh
$ git diff --quiet || echo 'dirty'
```

## git status

To check for the presence of untracked files, you'll need [`git status`](https://git-scm.com/docs/git-status):

```sh
$ git status --short
```

> The [`--short`](https://git-scm.com/docs/git-status#Documentation/git-status.txt--s) option returns the output in short-format.

For example, if `README.md` is modified and `LICENSE` is untracked:

```sh
$ git status -s
M  README.md
?? LICENSE
```

Then you can use `-z` to test that `git status -s` is null or empty:

```sh
$ [[ -z $(git status -s) ]] || echo 'modified and/or untracked'
```

Or use `-n` to test that `git status -s` is not empty:

```sh
$ [[ -n $(git status -s) ]] || echo 'clean'
```

### porcelain

There's also the [`--porcelain`](https://git-scm.com/docs/git-status#Documentation/git-status.txt---porcelainltversiongt) option, which formats the output like `--short`.

Because it's a high level command, it could be slow for large repositories. But I was [told](https://github.com/remarkablemark/remarkablemark.github.io/issues/5) that others found it fast and efficient.
