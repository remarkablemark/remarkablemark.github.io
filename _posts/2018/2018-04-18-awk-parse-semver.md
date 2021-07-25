---
layout: post
title: Parsing semver with awk
date: 2018-04-18 19:30:05 -4000
excerpt: How to parse semantic versioning with awk.
categories: awk semver version command cli
---

From `man awk`:

> Awk scans each input file for lines that match any of a set of patterns &hellip;

## Parsing [semver](https://semver.org)

Given version:

```sh
version=1.2.3
```

### Major version

To get the **major** version:

```sh
echo $version | awk -F '.' '{print $1}'
1
```

Here, the input field separator is the period and we're returning the 1st field.

A more concise way to write this is:

```sh
awk -F. '{print $1}' <<< $version
1
```

### Minor version

To get the **minor** version:

```sh
awk -F. '{print $2}' <<< $version
2
```

### Patch version

And to get the **patch** version:

```sh
awk -F. '{print $3}' <<< $version
3
```

### Pre-release version

What about the **pre-release** version?

```sh
version=1.2.3-alpha.4
```

Instead of using the period as the field separator, we can use the hyphen:

```sh
awk -F- '{print $NF}' <<< $version
alpha.4
```

Here, `$NF` refers to the total number of fields (which is 2 in this case).
