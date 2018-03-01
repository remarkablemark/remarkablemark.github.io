---
layout: post
title: Beautify JSON in Vim
date: 2018-02-28 20:22:18 -4000
excerpt: How to beautify JSON in Vim using python or jq.
categories: vim json python jq
---

Given the file is opened in your editor:

```sh
$ vim example.json
```

You can use [`python`](http://pascalprecht.github.io/2014/07/10/pretty-print-json-in-vim/):

```vim
:%!python -m json.tool
```

Or [`jq`](https://stedolan.github.io/jq/):

```vim
:%!jq '.'
```

And for completeness, there's a [site](http://jsbeautifier.org) for beautifying JSON too.
