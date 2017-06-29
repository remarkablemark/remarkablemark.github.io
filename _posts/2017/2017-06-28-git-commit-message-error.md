---
layout: post
title: Git commit editor error
date: 2017-06-28 23:46:41 -4000
excerpt: How to Git commit when there's a problem with the editor 'vi'.
categories: git bash
---

Has a commit ever failed because of a problem with the editor?

```sh
$ git commit
error: There was a problem with the editor 'vi'.
Please supply the message using either -m or -F option.
```

Well, it must be a pain to rewrite the message again.

But if you saved the message before quitting the editor, it should still be there:

```sh
$ cat .git/COMMIT_EDITMSG
```

This means that you can commit without having to rewrite the message:

```sh
$ git commit -m "$(cat .git/COMMIT_EDITMSG)"
```
