---
layout: post
title: Set up YouCompleteMe for Vim 8
date: 2025-07-13 23:22:05
excerpt: How to set up YouCompleteMe for Vim 8.
categories: vim youcompleteme plugin
---

This post goes over how to set up [YouCompleteMe](https://github.com/ycm-core/YouCompleteMe) for [Vim](https://www.vim.org/) 8.

## Problem

If you updated YouCompleteMe, you might get the error:

```
YouCompleteMe unavailable: requires Vim 9.1.0016+.
```

You have 2 solutions:

1. Upgrade Vim to 9.1
2. Use a YouCompleteMe version that supports Vim 8

## Solution

I tried upgrading Vim with [Homebrew](https://brew.sh/):

```sh
brew install vim
```

But the install took forever (see [Stack Overflow](https://stackoverflow.com/questions/78064984/brew-install-llvm-and-the-build-process-is-very-slow) and [Reddit](https://www.reddit.com/r/MacOS/comments/1ciehmh/llvm17_build_stuck_for_8_hours_home_brew_mac_os/)) so I canceled it. I decided to downgrade YouCompleteMe to support an older Vim version.

First, I deleted the plugin:

```sh
rm -rf bundle/YouCompleteMe/
```

Then I cloned the repository:

```sh
cd bundle && git clone https://github.com/ycm-core/YouCompleteMe.git
```

Afterwards, I checked out the branch [`legacy-vim-8.2`](https://github.com/ycm-core/YouCompleteMe/tree/legacy-vim-8.2):

```sh
cd YouCompleteMe && git checkout legacy-vim-8.2
```

I installed the submodules:

```sh
git submodule update --init --recursive
```

Finally, I built ycmd:

```sh
python3 install.py --all
```
