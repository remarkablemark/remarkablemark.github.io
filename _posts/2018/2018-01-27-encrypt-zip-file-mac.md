---
layout: post
title: Encrypt zip files on Mac OS
date: 2018-01-27 18:13:49
excerpt: How to encrypt and decrypt zip files and archives on macOS.
categories: zip encrypt decrypt password mac bash
---

> **TL;DR:** Zip file with password:
>
> ```sh
> zip -e archive.zip file
> ```
>
> Zip folder with password:
>
> ```sh
> zip -er archive.zip folder/
> ```

Let's say you have the following directory layout:

```sh
tree
.
└── secrets
    ├── keys.txt
    └── passwords.txt

1 directory, 2 files
```

To _zip a **file**_ with encryption:

```sh
zip -e Archive.zip secrets/passwords.txt
```

`Archive.zip` is the compressed archive.

To _zip a **directory**_ with encryption:

```sh
zip -er Archive.zip secrets/
```

To _unzip an **archive**_:

```sh
unzip Archive.zip
```

You'll be prompted for the password if it's encrypted.

And you can also do the same through the GUI:

```sh
open Archive.zip
```
