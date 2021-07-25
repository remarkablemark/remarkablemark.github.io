---
layout: post
title: Git revert merge commit
date: 2020-05-20 20:10:50
excerpt: How to revert a merge commit in Git.
categories: git revert commit
---

> **TL;DR**: revert merge commit `<sha>` with:
>
> ```sh
> git revert -m 1 <sha>
> ```

How do you revert a merged pull request with Git?

## Find merge commit

Given you're on latest `master`:

```sh
git checkout master && git pull
```

Find the merge commit:

```sh
git log --grep='Merge pull request'
```

Copy the commit hash, which looks something like this:

```
ad8a33e72fc9ed5769f96b0bbb1e222e4bebf44c
```

## Revert on master

Revert a merge commit on `master` (see [Stackoverflow answer](https://stackoverflow.com/questions/7099833/how-to-revert-a-merge-commit-thats-already-pushed-to-remote-branch#answer-31223198)):

```sh
git revert -m 1 <commit>
```

> Replace `<commit>` with hash.

Now you can push your revert to `master`:

```sh
git push
```

However, reverting on a branch with a PR (pull request) is safer and better practice.

## Revert on branch

Create a branch for the revert:

```sh
git checkout -b revertBranch
```

Revert the merge commit:

```sh
git revert -m 1 <commit>
```

> Replace `<commit>` with hash.

Push the branch and open a PR (pull request):

```sh
git push -u origin revertBranch
```
