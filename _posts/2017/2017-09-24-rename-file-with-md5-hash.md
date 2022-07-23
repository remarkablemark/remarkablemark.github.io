---
layout: post
title: Rename files with MD5 hash
date: 2017-09-24 20:50:54
updated: 2019-12-20 18:49:21
excerpt: How to rename a file or multiple files with its MD5 hash.
categories: rename file md5 cli bash commandline
---

This post goes over how to rename file(s) with [MD5](https://wikipedia.org/wiki/MD5) hash.

## Rename single file

To generate an [MD5 hash]({% post_url 2017/2017-04-20-nodejs-md5-hash %}) based on the file content:

```sh
md5 -q file.txt
```

Output:

```
d41d8cd98f00b204e9800998ecf8427e
```

Then to rename the file with its hash:

```sh
mv file.txt "file.$(md5 -q file.txt).txt"
```

```sh
ls
file.d41d8cd98f00b204e9800998ecf8427e.txt
```

## Rename multiple files

To rename each file with its MD5 hash:

```sh
find . -type f -exec bash -c 'mv "${1%.*}.$(md5 -q $1).${1##*.}"' bash {} \;
```

Let's break down what's happening.

1\. We're using [`find`](https://math2001.github.io/article/bashs-find-command/) to list all the files in directory `.` (current):

```sh
find . -type f
./file1.txt
./file2.txt
```

2\. For each argument (referenced by `$1`), you can execute a bash command with `-exec bash -c`:

```sh
find . -type f -exec bash -c 'echo $1' bash {} \;
```

3\. Get the file basename with `${1%.*}`:

```sh
find . -type f -exec bash -c 'echo ${1%.*}' bash {} \;
```

4\. Get the file extension with `${1##*.}`:

```sh
find . -type f -exec bash -c 'echo ${1##*.}' bash {} \;
```

5\. Generate the MD5 hash with `$(md5 -q $1)`:

```sh
find . -type f -exec bash -c 'echo $(md5 -q $1)' bash {} \;
```

6\. Finally, concatenate the string with `.` and rename each file with `mv`:

```sh
find . -type f -exec bash -c 'mv $1 "${1%.*}.$(md5 -q $1).${1##*.}"' bash {} \;
```

To rename files with spaces, wrap `$1` in double quotes (credit goes to [Andreas Sahlbach](https://disq.us/p/263g9pp)):

```sh
find . -type f -exec bash -c 'mv "$1" "${1%.*}.$(md5 -q "$1").${1##*.}"' bash {} \;
```
