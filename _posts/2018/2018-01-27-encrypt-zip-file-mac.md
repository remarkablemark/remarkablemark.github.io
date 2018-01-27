---
layout: post
title: Encrypt zip files in Mac
date: 2018-01-27 18:13:49 -4000
excerpt: How to encrypt and decrypt zip files and archives in Mac.
categories: zip encrypt decrypt password mac bash cli
---

> ###### TL;DR
>
> ```sh
> # zip file with password
> $ zip -e path/to/archive.zip path/to/file
>
> # zip folder with password
> $ zip -er path/to/archive.zip path/to/folder
> ```

### Example

Let's say you have the following directory layout:

```sh
$ tree
.
└── secrets
    ├── keys.txt
    └── passwords.txt

1 directory, 2 files
```

To _zip a **file**_ with encryption:

```sh
$ zip -e Archive.zip secrets/passwords.txt
```

`Archive.zip` is the compressed archive.

To _zip a **directory**_ with encryption:

```sh
$ zip -er Archive.zip secrets/
```

To _unzip an **archive**_:

```sh
$ unzip Archive.zip
```

You'll be prompted for the password if it's encrypted.

And you can also do the same through the GUI:

```sh
$ open Archive.zip
```
