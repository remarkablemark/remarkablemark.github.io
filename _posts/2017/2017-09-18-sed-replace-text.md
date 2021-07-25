---
layout: post
title: Replace text with sed
date: 2017-09-18 18:17:05
updated: 2019-08-07 20:48:51
excerpt: How to use sed to replace text in a file.
categories: sed bash
---

This post goes over how to replace text with [sed](https://wikipedia.org/wiki/Sed).

## Prerequisites

Given file with content:

```sh
echo 'Hello world!' > file.txt
```

## Replace without file modification

To replace the first match of `l` with `r`:

```sh
sed 's/l/r/' file.txt
Herlo world!
```

To globally replace all matches of `l` with `r`:

```sh
sed 's/l/r/g' file.txt
Herro worrd!
```

To replace multiple patterns:

```sh
sed 's/ /, /; s/!/./' file.txt
Hello, world.
```

## Replace with file modification

To replace `Hello` with `Hi`:

```sh
sed -i '' 's/Hello/Hi/' file.txt
```

```sh
cat file.txt
Hi world!
```

To replace and modify the file and create a copy of the original file:

```sh
sed -i .original 's/Hi/Hey/' file.txt
```

```sh
cat file.txt
Hey world!
```

```sh
cat file.txt.original
Hi world!
```
