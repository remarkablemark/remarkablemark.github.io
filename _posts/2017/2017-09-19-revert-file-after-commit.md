---
layout: post
title: Revert file after commit
date: 2017-09-19 20:50:54 -4000
excerpt: How to revert a file after it has been committed.
categories: git commit reset
---

What if you accidentally committed `file.txt`, which you didn't intend to commit:

```sh
git commit -am "Commit all files"
```

How do you revert the file to its previous state before the commit?

The quick solution is to undo your last commit:

```sh
git reset HEAD~
```

However, you'll need to recommit everything all over again.

Alternatively, you could checkout the file at a state before it was committed:

```sh
git checkout HEAD~ -- file.txt
```

Then amend your commit:

```sh
git commit --amend
```
