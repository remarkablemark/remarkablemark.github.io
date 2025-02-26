---
layout: post
title: How to patch a file
date: 2025-02-25 22:22:42
excerpt: How to patch a file in the command line.
categories: patch bash
---

This post goes over how to [patch](<https://wikipedia.org/wiki/Patch_(Unix)>) a file in the command line.

## Prerequisites

Given you have `file.old`:

```sh
echo 'This is an old file.' > file.old
```

And `file.new`:

```sh
echo 'This is a new file.' > file.new
```

## Diff

Create a `patch`:

```sh
diff -u file.old file.new > patch.diff
```

See `patch.diff`:

```diff
--- file.old	2025-02-25 22:22:22
+++ file.new	2025-02-25 22:22:42
@@ -1 +1 @@
-This is an old file.
+This is a new file.
```

## Patch

Apply a patch:

```sh
patch < patch.diff
```

`file.old` becomes:

```
This is a new file.
```

Reverse a patch:

```sh
patch -R < patch.diff
```

`file.old` becomes:

```
This is an old file.
```
