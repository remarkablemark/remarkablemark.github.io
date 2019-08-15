---
layout: post
title: Git subtree
date: 2019-08-14 20:52:49
excerpt: How to import a Git repository into another repository using git-subtree.
categories: git repository subtree
---

## [add](https://github.com/git/git/blob/v2.22.1/contrib/subtree/git-subtree.txt#L69)

Use [`git-subtree`](https://github.com/git/git/blob/master/contrib/subtree/git-subtree.txt) to import a Git repository into another repository:

```sh
$ git subtree add --prefix <prefix> <repository> <revision>
```

For instance, to import the repository `git@github.com:remarkablemark/example.git` into the current repository's subdirectory `./example/`:

```sh
$ git subtree add -P example git@github.com:remarkablemark/example.git master
```

You can check the commit output with `git show`:

```sh
$ git show
Add 'examaple/' from commit 'e28d0c5ef4c8e69eacea877af979923926f0c5e9'

git-subtree-dir: example
git-subtree-mainline: 32120bbb677c6786d7219de6c8c83b4bb8fc9ba0
git-subtree-split: e28d0c5ef4c8e69eacea877af979923926f0c5e9
```

## [pull](https://github.com/git/git/blob/v2.22.1/contrib/subtree/git-subtree.txt#L90)

To update to the latest revision on the subtree repository:

```sh
$ git subtree pull --prefix <prefix> <repository> <revision>
```

In our example, we would do the following:

```sh
$ git subtree pull -P example git@github.com:remarkablemark/example.git master
```
