---
layout: post
title: Deleting swap files
date: 2017-08-13 21:56:00 -4000
excerpt: How to delete swap (.swp) files using find.
categories: bash find delete swap
---

As a Vim user, I sometimes have a buildup of unremoved swap files (`.swp`) floating around in my directories. Here's how I find and delete these pesky files.

### find

First, I use `find` to list out all the swap filepaths:

```sh
find . -name '*.swp'
```

You can see that it's traversing the current directory `.` and trying to match the pattern `*.swp`.

### delete

> Before deleting the swap files, make sure to quit Vim so swap files currently in use aren't accidentally deleted.

To delete the files, all you need to do is pass the `-delete` option (**_warning: this operation cannot be undone_**):

```sh
find . -name '*.swp' -delete
```

To be safe and target only file types, you can pass `-type f`:

```sh
find . -type f -name '*.swp' -delete
```

To ignore files in the `./dist` directory, pass `-path ./dist -prune -o` and `-print`:

```sh
find . -path ./dist -prune -o -name '*.swp' -print -delete
```

The `-print` option ensures that the `./dist` directory is excluded from the `find` output.

Your directory should now be pruned of swap files!
