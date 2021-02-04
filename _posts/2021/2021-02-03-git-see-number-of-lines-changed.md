---
layout: post
title: See the number of lines changed with git
date: 2021-02-03 19:33:31
excerpt: How to see the number of lines changed with `git diff --stat`.
categories: git
---

To see the number of lines changed in the current working directory:

```sh
$ git diff --stat
```

The output will look something like this:

```
file.txt | 2 +-
1 file changed, 1 insertion(+), 1 deletion(-)
```

To see the number of lines changed in a git commit:

```sh
$ git diff --stat <commit>
```

This means you can see the number of lines changed for the most recent git commit:

```sh
$ git diff --stat HEAD~
```

To remove a dirty working directory from the diff, use [git stash](https://git-scm.com/docs/git-stash):

```sh
$ git stash
$ git diff --stat HEAD~
$ git stash pop
```

See [git diff](https://git-scm.com/docs/git-diff) to learn more.
