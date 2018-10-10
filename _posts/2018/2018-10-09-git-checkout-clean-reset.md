---
layout: post
title: git checkout, clean, or reset
date: 2018-10-09 19:59:53 -4000
excerpt: The difference between git checkout, git clean, and git reset.
categories: git shell
---

Do you know the difference between `git checkout`, `git clean`, and `git reset`?

We'll compare them with the example below.

### Example

Given the following index and working tree:
```sh
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   modified.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        untracked.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

Or in the short format:
```sh
$ git status -s
 M modified.txt
?? untracked.txt
```

### [git checkout](https://git-scm.com/docs/git-checkout)

Changes to modified files are discarded but untracked files are untouched:
```sh
$ git checkout .
$ git status -s
?? untracked.txt
```

### [git clean](https://git-scm.com/docs/git-clean)

Untracked files are removed but modified files are unchanged:
```sh
$ git clean -f
Removing untracked.txt
$ git status -s
 M modified.txt
```

To remove untracked directories in addition to untracked files, run `git clean -f -d`.

### [git reset](https://git-scm.com/docs/git-reset)

Changes to modified files are discarded but untracked files are untouched:
```sh
$ git reset --hard
HEAD is now at sha1234 my commit message
$ git status -s
?? untracked.txt
```

Thus to discard modified files and remove untracked files:
```sh
$ git reset --hard && git clean -f -d
```
