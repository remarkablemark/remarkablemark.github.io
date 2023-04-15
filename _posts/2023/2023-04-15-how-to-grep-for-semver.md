---
layout: post
title: How to grep for semver
date: 2023-04-15 18:18:18
excerpt: How to grep for semver (semantic versioning) with Bash.
categories: grep semver bash
---

> **TL;DR**: pipe to grep for semver:
>
> ```bash
> grep -Eo '[0-9]{1,}.[0-9]{1,}.[0-9]{1,}'
> ```

This post goes over how to [grep](https://wikipedia.org/wiki/Grep) for [semver](https://semver.org/) (semantic versioning).

## Prerequisites

Given `package.json`:

```json
{
  "version": "1.2.3"
}
```

## Grep

Find the line with semver:

```sh
cat package.json | grep '[0-9].[0-9].[0-9]'
```

Output:

```
  "version": "1.2.3"
```

But what if the semver is `10.20.30`?

```json
{
  "version": "10.20.30"
}
```

Then the previous grep command won't work. You'll need to extend the pattern to include one or more digits:

```sh
cat package.json | grep -E '[0-9]{1,}.[0-9]{1,}.[0-9]{1,}'
```

> `-E` is `--extended-regexp`, which interprets the pattern as an extended regular expression (forces grep to behave as egrep).

To print only the matching part of the lines, set `-o` or `--only-matching`:

```sh
cat package.json | grep -Eo '[0-9]{1,}.[0-9]{1,}.[0-9]{1,}'
```

Output:

```
10.20.30
```
