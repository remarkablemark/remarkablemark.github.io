---
layout: post
title: 'Vim: prettify JSON'
date: 2018-02-28 20:22:18
updated: 2019-09-01 22:30:00
excerpt: How to beautify JSON in Vim using python, jq, or an external website.
categories: vim json python jq prettier
---

Open the [JSON](https://wikipedia.org/wiki/JSON) file in your [Vim](<https://wikipedia.org/wiki/Vim_(text_editor)>) text editor:

```sh
$ vim my-file.json
```

## python

To prettify using [`python`](https://pascalprecht.github.io/posts/pretty-print-json-in-vim/):

```vim
:%!python -m json.tool
```

## jq

To prettify using [`jq`](https://stedolan.github.io/jq/):

```vim
:%!jq '.'
```

## site

[Copy the contents](https://superuser.com/questions/227385/how-do-i-select-all-text-in-vi-vim/1230483#answer-405085):

```vim
:%y+
```

Paste and prettify using a site below:

- [Online JavaScript Beautifier](https://beautifier.io/)
- [Prettier](https://prettier.io/playground/)
