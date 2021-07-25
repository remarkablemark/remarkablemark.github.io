---
layout: post
title: Start vim without vimrc
date: 2018-04-20 19:38:21 -4000
excerpt: How to start vim with or without initializing vimrc.
categories: vim vimrc
---

To start `vim` without initializing `vimrc`:

```sh
vim -u NONE
```

To start `vim` with a different `vimrc` other than the default (`~/.vimrc`):

```sh
vim -u path/to/vimrc
```
