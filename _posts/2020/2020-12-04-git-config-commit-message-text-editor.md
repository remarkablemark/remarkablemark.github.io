---
layout: post
title: Configure Git text editor
date: 2020-12-04 22:43:20
excerpt: Learn how to configure the Git text editor used to edit commit messages.
categories: git editor
---

Let's go over how to configure the [Git text editor](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration#_core_editor) used for commit messages.

## Local

To check what editor you're using:

```sh
git config core.editor # /usr/bin/vim
```

To set the editor to `nano`:

```sh
git config core.editor nano
```

To set the editor to a custom binary of `vim`:

```sh
git config core.editor /usr/local/bin/vim
```

## Global

To reference global options, pass `--global` after `git config`.

### Examples

To see the global config:

```sh
git config --global --list
```

To set the global `core.editor` to `emacs`:

```sh
git config --global core.editor emacs
```

> This means when you create or clone a Git repository, the text editor used to edit commit messages&mdash;given no local overrides&mdash;is `emacs`.
