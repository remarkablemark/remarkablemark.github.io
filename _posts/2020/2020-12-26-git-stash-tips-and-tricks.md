---
layout: post
title: Git stash tips and tricks
date: 2020-12-26 22:19:11
excerpt: Git stash tips and tricks.
categories: git stash
---

<!--email_off-->

[`git stash`](https://git-scm.com/docs/git-stash) saves your work-in-progress changes.

## Save

Stash changes not staged for commit:

```sh
git stash
```

Stash changes not staged for commit and untracked files:

```sh
git add .
git stash
```

Stash one or multiple files:

```sh
git stash push <file>
```

Stash using patch mode:

```sh
git stash -p
```

Stash with a message:

```sh
git stash save 'my message'
```

> There's [discussion](https://git-scm.com/book/en/v2/Git-Tools-Stashing-and-Cleaning#_git_stashing) to deprecate `git stash save` in favor of `git stash push`.

## List

List stashes:

```sh
git stash list
```

## Show

Show most recent stash:

```sh
git show stash@{0}
```

> Replace `0` with the index of the stash you wish to see.

## Pop

Pop most recent stash:

```sh
git stash pop
```

> This removes the stash from the list.

Pop a specific stash:

```sh
git stash pop stash@{0}
```

> Replace `0` with the index of the stash you wish to pop.

## Apply

Apply most recent stash:

```sh
git stash apply
```

> This does not remove the stash from the list.

Apply a specific stash:

```sh
git stash apply stash@{0}
```

<!--/email_off-->
