---
layout: post
title: Parsing semver with awk
date: 2018-04-18 19:30:05
updated: 2023-04-09 00:16:05
excerpt: How to parse semantic versioning with awk.
categories: awk semver version command cli
---

This post goes over how to parse [semantic versioning](https://semver.org) with [awk](https://wikipedia.org/wiki/AWK):

- [Prerequisites](#prerequisites)
- [Major version](#major-version)
- [Minor version](#minor-version)
- [Patch version](#patch-version)
- [Pre-release version](#pre-release-version)

From `man awk`:

> Awk scans each input file for lines that match any of a set of patterns &hellip;

## Prerequisites

Given version:

```sh
version='1.2.3'
```

## Major version

To get the **major** version:

```sh
echo $version | awk -F '.' '{ print $1 }'
```

The input field separator is the period and we're returning the 1st field.

A more concise way to write this is:

```sh
awk -F. '{ print $1 }' <<< $version
```

## Minor version

To get the **minor** version:

```sh
awk -F. '{ print $2 }' <<< $version
```

## Patch version

To get the **patch** version:

```sh
awk -F. '{ print $3 }' <<< $version
```

## Pre-release version

What about the **pre-release** version `alpha.4`?

```sh
version=1.2.3-alpha.4
```

Instead of using the period as the field separator, use the hyphen:

```sh
awk -F- '{ print $NF }' <<< $version
```

`$NF` refers to the total number of fields (which is 2 in this case).
