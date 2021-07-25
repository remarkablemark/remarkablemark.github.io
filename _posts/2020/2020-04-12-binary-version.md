---
layout: post
title: How to get the binary version
date: 2020-04-12 16:24:07
excerpt: How to get the version of bash, node, php, python, and ruby.
categories: bash node php python ruby
---

Get the version of:

- [bash](#bash)
- [node](#node)
- [php](#php)
- [python](#python)
- [ruby](#ruby)

## bash

See the version:

```sh
bash --version
```

```
GNU bash, version 3.2.57(1)-release (x86_64-apple-darwin18)
Copyright (C) 2007 Free Software Foundation, Inc.
```

Get the version:

```sh
bash --version | awk '{print $4}' | head -1
```

```
3.2.57(1)-release
```

Get the major version:

```sh
bash --version | awk '{print $4}' | head -1 | awk -F. '{print $1}'
```

```
3
```

> Check out this [post]({% post_url 2018/2018-04-18-awk-parse-semver %}) to learn how to parse semver with `awk`.

## node

See the version:

```sh
node --version # node -v
```

```
v12.16.2
```

Cut the `v` out from the version:

```sh
node -v | cut -c 2-
```

```
12.16.2
```

Get the major version:

```sh
node -v | cut -c 2- | awk -F. '{print $1}'
```

```
12
```

> Check out this [post]({% post_url 2018/2018-04-18-awk-parse-semver %}) to learn how to parse semver with `awk`.

## python

See the version:

```sh
python --version # python -V
```

```
Python 2.7.17
```

Remove `Python` from the version:

```sh
python -V 2>&1 | awk '{print $2}'
```

```
2.7.17
```

We're redirecting stderr to stdout with `2>&1` because python writes the version to stderr.

Get the major version:

```sh
python -V 2>&1 | awk '{print $2}' | awk -F. '{print $1}'
```

```
2
```

> Check out this [post]({% post_url 2018/2018-04-18-awk-parse-semver %}) to learn how to parse semver with `awk`.

## php

See the version:

```sh
php --version # php -v
```

```
PHP 7.1.33 (cli) (built: Jan 26 2020 22:52:32) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.1.0, Copyright (c) 1998-2018 Zend Technologies
```

Get the version and remove all extraneous details:

```sh
php -v | awk '{print $2}' | head -1
```

```
7.1.33
```

Get the major version:

```sh
php -v | awk '{print $2}' | head -1 | awk -F. '{print $1}'
```

```
7
```

> Check out this [post]({% post_url 2018/2018-04-18-awk-parse-semver %}) to learn how to parse semver with `awk`.

## ruby

See the version:

```sh
ruby --version # ruby -v
```

```
ruby 2.7.0p0 (2019-12-25 revision 647ee6f091) [x86_64-darwin18]
```

Get the version:

```sh
ruby -v | awk '{print $2}'
```

```
2.7.0p0
```

Get the major version:

```sh
ruby -v | awk '{print $2}' | awk -F. '{print $1}'
```

```
2
```

> Check out this [post]({% post_url 2018/2018-04-18-awk-parse-semver %}) to learn how to parse semver with `awk`.
