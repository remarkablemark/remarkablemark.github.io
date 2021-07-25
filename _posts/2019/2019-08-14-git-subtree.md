---
layout: post
title: Import repository with git subtree
date: 2019-08-14 20:52:49
updated: 2020-03-14 16:32:30
excerpt: How to import a Git repository into another repository using git-subtree.
categories: git subtree repository
---

[`git subtree`](https://github.com/git/git/blob/master/contrib/subtree/git-subtree.txt) can be used to import a Git repository into another repository.

## git subtree add

Import a Git repository into another repository with [`add`](https://github.com/git/git/blob/v2.22.1/contrib/subtree/git-subtree.txt#L69):

```sh
git subtree add --prefix <prefix> <repository> <revision>
```

### add example

To import the repository `git@github.com:remarkablemark/example.git` into the current repository's subdirectory `./example/`:

```sh
git subtree add -P example git@github.com:remarkablemark/example.git master
```

You can check the commit output with `git show`:

```sh
git show
```

```
Add 'examaple/' from commit 'e28d0c5ef4c8e69eacea877af979923926f0c5e9'

git-subtree-dir: example
git-subtree-mainline: 32120bbb677c6786d7219de6c8c83b4bb8fc9ba0
git-subtree-split: e28d0c5ef4c8e69eacea877af979923926f0c5e9
```

## git subtree pull

Update to the latest revision on the subtree repository with [pull](https://github.com/git/git/blob/v2.22.1/contrib/subtree/git-subtree.txt#L90):

```sh
git subtree pull --prefix <prefix> <repository> <revision>
```

### pull example

Continuing with our earlier [example](#add-example), we can do the following to fetch and merge the latest from our subtree:

```sh
git subtree pull -P example git@github.com:remarkablemark/example.git master
```
