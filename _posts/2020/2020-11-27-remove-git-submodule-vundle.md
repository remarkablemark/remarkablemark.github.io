---
layout: post
title: Remove Vundle from Git submodule
date: 2020-11-27 21:36:39
excerpt: How to remove Vundle from Git submodule in a repository.
categories: git submodule vundle vim
---

My `.vim` repository used to track [`bundle/Vundle.vim`](https://github.com/VundleVim/Vundle.vim#readme) as a [Git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules).

But I found it was no longer necessary so I removed the Git submodule:

```sh
git rm bundle/Vundle.vim
rm -rf .git/modules/bundle/Vundle.vim
rm .gitmodules
```

[Stackoverflow](https://stackoverflow.com/questions/1260748/how-do-i-remove-a-submodule) mentioned using [git submodule deinit](https://git-scm.com/docs/git-submodule#Documentation/git-submodule.txt-deinit-f--force--all--ltpathgt82308203):

```sh
git submodule deinit -f bundle/Vundle.vim
```

But I didn't have to use it.
