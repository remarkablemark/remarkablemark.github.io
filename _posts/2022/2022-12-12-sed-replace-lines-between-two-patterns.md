---
layout: post
title: Sed replace lines between two patterns
date: 2022-12-12 17:35:35
excerpt: How to replace lines between two patterns with sed.
categories: sed bash
---

This post goes over how to replace lines between two patterns with [sed](https://wikipedia.org/wiki/Sed):

- [Inclusive](#inclusive)
- [Exclusive](#exclusive)

This post was inspired by [Sed: Mutli-Line Replacement Between Two Patterns](https://fahdshariff.blogspot.com/2012/12/sed-mutli-line-replacement-between-two.html). See related post [Sed delete lines between two patterns]({% post_url 2022/2022-12-12-sed-delete-lines-between-two-patterns %})

## Inclusive

Create sed command file `command_file`:

```
# command_file
/<PATTERN1>/{
  :a
    N
    /<PATTERN2>/!ba
    N
    s/.*\n/<REPLACEMENT>\n/
}
p
```

> Replace `$PATTERN1` with your 1st pattern, `$PATTERN2` with your 2nd pattern, and `$REPLACEMENT` with your replacement.

Run sed command to replace lines between 2 patterns (inclusive):

```
sed -nf command_file $FILE
```

> Replace `$FILE` with your file path.

On Linux, this can be run without a command file:

```sh
sed -n "/$PATTERN1/{:a;N;/$PATTERN2/!ba;N;s/.*\n/$REPLACEMENT\n/};p" $FILE
```

### Example

Given file `file.txt`:

```
one
two
three
four
five
```

Create command file:

```sh
touch command_file
```

Update command file to replace lines between `two` and `four` with `replace` (inclusive):

```
# command_file
/two/{
  :a
    N
    /four/!ba
    N
    s/.*\n/four\n/
}
p
```

Run sed command:

```sh
sed -nf command_line file.txt
```

Output:

```
one
replace
five
```

Write the output to the same file (macOS):

```sh
sed -i '' -nf command_file file.txt
```

> On Linux, remove the `''` after `-i`.

## Exclusive

Create sed command file `command_file`:

```
# command_file
/<PATTERN1>/{
  p
    :a
    N
    /<PATTERN2>/!ba
    s/.*\n/<REPLACEMENT>\n/
}
p
```

> Replace `$PATTERN1` with your 1st pattern, `$PATTERN2` with your 2nd pattern, and `$REPLACEMENT` with your replacement.

Run sed command to replace lines between 2 patterns (exclusive):

```
sed -nf command_file $FILE
```

> Replace `$FILE` with your file path.

On Linux, this can be run without a command file:

```sh
sed -n "/$PATTERN1/{p;:a;N;/$PATTERN2/!ba;s/.*\n/$REPLACEMENT\n/};p" $FILE
```

### Example

Given file `file.txt`:

```
one
two
three
four
five
```

Create command file:

```sh
touch command_file
```

Update command file to replace lines between `two` and `four` with `replace` (exclusive):

```
# command_file
/two/{
  p
    :a
    N
    /four/!ba
    s/.*\n/replace\n/
}
p
```

Run sed command:

```sh
sed -nf command_line file.txt
```

Output:

```
one
two
replace
four
five
```

Write the output to the same file (macOS):

```sh
sed -i '' -nf command_file file.txt
```

> On Linux, remove the `''` after `-i`.
