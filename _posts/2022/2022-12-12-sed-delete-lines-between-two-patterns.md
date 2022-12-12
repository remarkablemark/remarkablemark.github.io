---
layout: post
title: Sed delete lines between two patterns
date: 2022-12-12 13:52:38
excerpt: How to delete the lines between two patterns with sed.
categories: sed bash
---

This post goes over how to delete lines between two patterns with [sed](https://wikipedia.org/wiki/Sed):

- [Inclusive](#inclusive)
- [Exclusive](#exclusive)

This post was inspired by [Sed: Mutli-Line Replacement Between Two Patterns](https://fahdshariff.blogspot.com/2012/12/sed-mutli-line-replacement-between-two.html). See related post [Sed replace lines between two patterns]({% post_url 2022/2022-12-12-sed-replace-lines-between-two-patterns %})

## Inclusive

Delete lines between 2 patterns (inclusive):

```sh
sed "/$PATTERN1/,/$PATTERN2/d" $FILE
```

> Replace `$PATTERN1` with your 1st pattern, `$PATTERN2` with your 2nd pattern, and `$FILE` with your file path.

### Example

Given file `file.txt`:

```
one
two
three
four
five
```

Remove lines between `two` and `four` (inclusive):

```sh
sed '/two/,/four/d' file.txt
```

Output:

```
one
five
```

Write the output to the same file (macOS):

```sh
sed -i '' '/two/,/four/d' file.txt
```

> On Linux, remove the `''` after `-i`.

## Exclusive

Delete lines between 2 patterns (exclusive):

```sh
sed "/$PATTERN1/,/$PATTERN2/{/$PATTERN1/n;/$PATTERN2/!d;}" $FILE
```

> Replace `$PATTERN1` with your 1st pattern, `$PATTERN2` with your 2nd pattern, and `$FILE` with your file path.

### Example

Given file `file.txt`:

```
one
two
three
four
five
```

Remove lines between `two` and `four` (exclusive):

```sh
sed '/two/,/four/{/two/n;/four/!d;}' file.txt
```

Output:

```
one
two
four
five
```

Write the output to the same file (macOS):

```sh
sed -i '' '/two/,/four/{/two/n;/four/!d;}' file.txt
```

> On Linux, remove the `''` after `-i`.
