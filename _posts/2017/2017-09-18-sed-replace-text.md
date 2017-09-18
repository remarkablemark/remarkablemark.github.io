---
layout: post
title: Replace text with sed
date: 2017-09-18 18:17:05 -4000
excerpt: The different ways to use sed to replace text in a file.
categories: sed cli text
---

Given a file with the content:

```sh
$ cat file.txt
Lorem ipsum dolor
```

Let's say you want to replace `or` with `OR`.

To do that for the first match without modifying the file:

```sh
$ sed 's/or/OR/' file.txt
LORem ipsum dolor
```

To do that globally and without modifying the file:

```sh
$ sed 's/or/OR/g' file.txt
LORem ipsum dolOR
```

To do that globally with the existing file being modified:

```sh
$ sed -i '' 's/or/OR/g' file.txt
$ cat file.txt
LORem ipsum dolOR
```

To do that globally with a new file being created:

```sh
$ sed -i .bak 's/or/OR/g' file.txt
$ cat file.txt.bak
LORem ipsum dolOR
```
