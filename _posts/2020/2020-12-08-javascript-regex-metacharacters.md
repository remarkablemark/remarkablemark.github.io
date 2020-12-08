---
layout: post
title: JavaScript regex metacharacters
date: 2020-12-08 15:23:07
excerpt: JavaScript regular expression metacharacters.
categories: javascript regex
---

| Metacharacter | Alternative     | Description                                          |
| ------------- | --------------- | ---------------------------------------------------- |
| `\d`          | `[0-9]`         | Match any digit character                            |
| `\D`          | `[^0-9]`        | Match any non-digit character                        |
| `\w`          | `[a-zA-Z0-9_]`  | Match any word character                             |
| `\W`          | `[^a-zA-Z0-9_]` | Match any non-word character                         |
| `\s`          |                 | Match any whitespace character (space, tab, newline) |
| `\S`          |                 | Match any non-whitespace character                   |
| `\0`          |                 | Match null character                                 |
| `\t`          |                 | Match tab character                                  |
| `\n`          |                 | Match newline character                              |
| `\r`          |                 | Match carriage return character                      |
| `.`           |                 | Match any character except newline                   |

Sources:

- [A guide to JavaScript Regular Expressions](https://flaviocopes.com/javascript-regular-expressions/#meta-characters)
- [A Practical Guide to Regular Expressions (RegEx) In JavaScript](https://blog.bitsrc.io/a-beginners-guide-to-regular-expressions-regex-in-javascript-9c58feb27eb4#e7de)
