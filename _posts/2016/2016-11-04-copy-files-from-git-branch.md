---
layout: post
title: Copy files from a Git branch
date: 2016-11-04 19:31:00
excerpt: Copy files from another Git branch using checkout.
categories: git
---

If you're using [Git](https://git-scm.com), there may be a time where you need to copy a file from another branch.

How would you go about doing that without [cherry picking](https://git-scm.com/docs/git-cherry-pick)?

Easy. You can use [checkout](https://git-scm.com/docs/git-checkout) and let me show you how with an example.

Given the following:

```sh
git status
On branch master
nothing to commit, working directory clean
```

Create and commit a file on another branch:

```sh
git checkout -b other_branch
```

```sh
echo hello > world.txt
```

```sh
git add world.txt
```

```sh
git commit -m "Create world"
```

Switch back to the `master` branch:

```sh
git checkout master
```

Now to copy the file, we checkout the file from the other branch:

```sh
git checkout other_branch world.txt # git checkout <branch> <path>
```

Now your file has been staged to your current branch:

```sh
git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

      new file:   world.txt
```

You can do this for single files or whole directories.
