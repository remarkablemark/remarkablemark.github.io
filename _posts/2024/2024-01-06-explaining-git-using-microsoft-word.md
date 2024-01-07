---
layout: post
title: Explaining Git using Microsoft Word
date: 2024-01-06 17:47:04
excerpt: Explaining how Git works using Microsoft Word.
categories: git
---

This post explains how [Git](https://git-scm.com/) works using [Microsoft Word](https://www.microsoft.com/microsoft-365/word).

- [Init](#init)
- [Clone](#clone)
- [Branch](#branch)
- [Commit](#commit)
- [Revert](#revert)
- [Push](#push)
- [Pull](#pull)
- [Merge](#merge)
- [Workflow](#workflow)
- [Terminology](#terminology)

## Init

[Initializing a Git repository](https://git-scm.com/docs/git-init) is the same as creating a Microsoft Word document on your local computer:

```sh
git init
```

## Clone

[Cloning a Git repository](https://git-scm.com/docs/git-clone) is the same as downloading a Microsoft Word document from the cloud (OneDrive) to your local computer:

```sh
git clone <repository>
```

## Branch

[Creating a Git branch](https://git-scm.com/docs/git-branch) is the same as duplicating a Microsoft Word document:

```sh
git branch <branchname>
```

## Commit

[Making a Git commit](https://git-scm.com/docs/git-commit) is the same as saving a new version of your Microsoft Word document:

```sh
git commit
```

In Git, there's an extra step where you need to add your changes before you can commit. Git also requires a commit message so that your changes are annotated if you ever need to view or rollback to a previous change.

## Revert

[Reverting a Git commit](https://git-scm.com/docs/git-revert) is the same as restoring a previously saved version of your Microsoft Word document:

```sh
git revert
```

## Push

[Pushing your local repository contents to a remote repository](https://git-scm.com/docs/git-push) is the same as syncing (uploading) your local Microsoft Word Document to the cloud (OneDrive):

```sh
git push
```

## Pull

[Pulling from a remote repository and integrating the contents to your local repository](https://git-scm.com/docs/git-pull) is the same as syncing (downloading) your local Microsoft Word Document from the cloud (OneDrive):

```sh
git pull
```

## Merge

[Merging changes from one branch to another](https://git-scm.com/docs/git-merge) is the same as consolidating two different Microsoft Word documents into one:

```sh
git merge
```

## Workflow

When two developers work on the same repository, they both download a copy of the codebase to their local computer. They commit their changes, push their code to GitHub, open a pull request (PR), and merge it into the default branch.

Describing this using Microsoft Word, two editors download the same document from OneDrive, make their changes, and upload their versions to the cloud. Then the documents are reviewed and combined into a single document.

Why does Git have so many steps? Because Git promotes **distributed workflows**. This means that multiple developers can work on the same codebase—whether they're online or offline. Imagine there are
10 editors who have to make offline edits. Now imagine there are 100 editors working on the same document. Git solves the problem of _scalable collaboration_.

## Terminology

| Git            | Microsoft Word             |
| -------------- | -------------------------- |
| Repository     | Document                   |
| Origin         | OneDrive (Cloud)           |
| Fork           | Duplicate on OneDrive      |
| Clone          | Download from OneDrive     |
| Push           | Upload (Sync to Cloud)     |
| Pull           | Download (Sync from Cloud) |
| Commit         | Save                       |
| Log            | Version History            |
| Revert         | Restore Previous Version   |
| Merge          | Combine Document           |
| Default Branch | Main Document              |
