---
layout: post
title: Print CSV column with awk
date: 2023-06-12 19:20:54
excerpt: How to print CSV column with awk.
categories: awk csv
---

This post goes over how to print [CSV](https://wikipedia.org/wiki/Comma-separated_values) column with [awk](https://wikipedia.org/wiki/AWK):

## Prerequisites

Given `file.csv`:

```
headerA,headerB
row2A,row2B
row3A,row3B
```

## CSV first column

Print the first column:

```sh
awk -F',' '{ print $1 }' file.csv
```

Output:

```
headerA
row2A
row3A
```

Print the first column excluding the header:

```sh
awk -F',' '{ print $1 }' file.csv | tail -n +2
```

Output:

```
row2A
row3A
```

## CSV second column

Print the second column of a CSV file:

```sh
awk -F',' '{ print $2 }' file.csv
```

Output:

```
headerB
row2B
row3B
```

Print the second column excluding the header:

```sh
awk -F',' '{ print $2 }' file.csv | tail -n +2
```

Output:

```
row2B
row3B
```
