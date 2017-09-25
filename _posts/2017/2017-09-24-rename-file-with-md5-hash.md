---
layout: post
title: Rename file with MD5 hash
date: 2017-09-24 20:50:54 -4000
excerpt: How to rename a file or multiple files with its MD5 hash.
categories: rename file md5 cli
---

### Rename single file

To generate an [MD5 hash]({% post_url 2017/2017-04-20-nodejs-md5-hash %}) based on the file content:

```sh
$ md5 -q file.txt
d41d8cd98f00b204e9800998ecf8427e
```

Then to rename the file with hash:

```sh
$ mv file.txt "file.$(md5 -q file.txt).txt"
$ ls
file.d41d8cd98f00b204e9800998ecf8427e.txt
```

### Rename multiple files

To rename each file with its MD5 hash:

```sh
$ find . -type f -exec bash -c 'mv "${1%.*}.$(md5 -q $1).${1##*.}"' bash {} \;
```

Let's break down what's happening.

We use `find` to list all files in our current directory:

```sh
$ find . -type f
./file1.txt
./file2.txt
```

For each argument (referenced by `$1`), we want to execute the `mv` command. For the sake of example, we'll use `echo` instead of `mv`:

```sh
$ find . -type f -exec bash -c 'echo $1' bash {} \;
```

We use `${1%.*}` to get the basename:

```sh
$ find . -type f -exec bash -c 'echo ${1%.*}' bash {} \;
```

We use `${1##*.}` to get the extension:

```sh
$ find . -type f -exec bash -c 'echo ${1##*.}' bash {} \;
```

We use `$(md5 -q $1)` to generate the MD5 hash:

```sh
$ find . -type f -exec bash -c 'echo $(md5 -q $1)' bash {} \;
```

Finally we concatenate the string with `.` and rename each file with `mv`:

```sh
$ find . -type f -exec bash -c 'mv $1 "${1%.*}.$(md5 -q $1).${1##*.}"' bash {} \;
```
