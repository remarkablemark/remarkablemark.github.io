---
layout: post
title: Bash date command
date: 2020-10-29 21:47:18
excerpt: How to use the `date` command on macOS.
categories: mac date shell
---

This post goes over how to use the `date` command on macOS.

## date

Display the current date and time:

```sh
date
```

```
Tue Oct 20 20:20:20 EDT 2020
```

## format

Get the date in `YYYY-MM-DD` format:

```sh
date +%Y-%m-%d
```

```
2020-10-20
```

## epoch

Get the seconds since epoch:

```sh
date +%s
```

```
1603239620
```

## adjust

Adjust the date with the `-v` option:

```sh
date -j -v <ADJUSTMENT> -f "%Y-%m-%d" $(date +%Y-%m-%d)
```

Adjust the date 1 day from now (`+1d`):

```sh
date -j -v +1d -f "%Y-%m-%d" $(date +%Y-%m-%d)
```

```
Wed Oct 21 20:20:20 EDT 2020
```

Adjust the date 2 hours before now (`-2H`):

```sh
date -j -v -2H -f "%Y-%m-%d" $(date +%Y-%m-%d)
```

```
Tue Oct 20 18:20:20 EDT 2020
```

What each value represents:

| val | representation |
| --- | -------------- |
| y   | year           |
| m   | month          |
| w   | week           |
| d   | day            |
| H   | hour           |
| M   | minute         |
| S   | second         |

## manual

Read the `date` manual:

```sh
man date
```
