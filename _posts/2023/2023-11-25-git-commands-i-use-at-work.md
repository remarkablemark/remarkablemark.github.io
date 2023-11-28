---
layout: post
title: Git commands I use at work
date: 2023-11-25 11:22:14
updated: 2023-11-27 19:42:38
excerpt: The top 10 Git commands I use at my job.
categories: git
---

Here are the top 10 [Git](https://git-scm.com/) commands I use at work:

1. [git status](#git-status)
2. [git pull](#git-pull)
3. [git checkout](#git-checkout)
4. [git add](#git-add)
5. [git commit](#git-commit)
6. [git push](#git-push)
7. [git branch](#git-branch)
8. [git merge](#git-merge)
9. [git rebase](#git-rebase)
10. [git stash](#git-stash)

## git status

Show the working status tree with [`git status`](https://git-scm.com/docs/git-status):

```sh
git status
```

Show changes in the working tree with [`git diff`](https://git-scm.com/docs/git-diff):

```sh
git diff
```

## git pull

Sync the current branch with remote using [`git pull`](https://git-scm.com/docs/git-pull):

```sh
git pull origin <branch>
```

If an upstream is set, you can run a shorter command:

```sh
git pull
```

To set an upstream:

```sh
git branch --set-upstream-to <branch>
```

If there are divergent changes, then pull with rebase:

```sh
git pull --rebase
```

## git checkout

Create a new branch with [`git checkout`](https://git-scm.com/docs/git-checkout):

```sh
git checkout -b <branch>
```

Switch to a branch:

```sh
git checkout <branch>
```

Return to the previous branch:

```sh
git checkout -
```

Restore a working tree file:

```sh
git checkout -- <file>
```

Restore all working tree files:

```sh
git checkout .
```

## git add

Add a file with [`git add`](https://git-scm.com/docs/git-add):

```sh
git add <file>
```

Add all files:

```sh
git add .
```

Add files in interactive mode:

```sh
git add -i
```

Unstage a file:

```sh
git reset <file>
```

Unstage all files:

```sh
git reset
```

## git commit

Record changes with [`git commit`](https://git-scm.com/docs/git-commit):

```sh
git commit -am "<message>"
```

Use editor when committing:

```sh
git commit -v
```

Change your editor:

```sh
git config --global core.editor "<editor>"
```

## git push

Update the remote branch with [`git push`](https://git-scm.com/docs/git-push):

```sh
git push origin <branch>
```

If an upstream is set, you can run a shorter command:

```sh
git push
```

Update and track the remote branch:

```sh
git push -u origin <branch>
```

Or update your Git config to automatically set up remote tracking:

```sh
git config --global push.autoSetupRemote true
```

Which allows you to do the following:

```sh
git push
```

## git branch

List all branches with [`git branch`](https://git-scm.com/docs/git-branch):

```sh
git branch
```

Rename your current branch:

```sh
git branch -m <branch>
```

Delete a branch:

```sh
git branch -d <branch>
```

## git merge

Join 2 development histories with [`git merge`](https://git-scm.com/docs/git-merge):

```sh
git merge <branch>
```

Revert the merge:

```sh
git revert -m 1 <commit>
```

## git rebase

Reapply your commits on top of another branch with [`git rebase`](https://git-scm.com/docs/git-rebase):

```sh
git rebase <branch>
```

Rebase in interactive mode:

```sh
git rebase -i <commit>^
```

## git stash

Record the current state and go back to a clean working directory with [`git stash`](https://git-scm.com/docs/git-stash):

```sh
git stash
```

List all stashes:

```sh
git stash list
```

Restore and remove the most recent stash:

```sh
git stash pop
```

Restore and keep the nth stash:

```sh
git stash apply stash@{<n>}
```

Remove the most recent stash:

```sh
git stash drop
```
