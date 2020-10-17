---
layout: post
title: PHP decode Unicode string
date: 2020-10-16 21:33:33
excerpt: How to decode a Unicode string in PHP using Unicode codepoint escape syntax and `json_decode`.
categories: php decode unicode
---

Given the Unicode codepoint in hexadecimal form:

```
\u00e1
```

How do you decode the Unicode string in PHP?

## Unicode codepoint escape syntax

You can use [Unicode codepoint escape syntax](https://www.php.net/manual/en/migration70.new-features.php#migration70.new-features.unicode-codepoint-escape-syntax) if you're able to create the string:

```php
echo "\u{00e1}"; // á
```

As you can see, the characters after `\u` must be warpped in curly braces. Also, the string must be double-quoted.

## json_decode

Alternatively, you can use [`json_decode`](https://www.php.net/manual/en/function.json-decode.php):

```php
echo json_decode('"\u00e1"'); // á
```

This is useful for decoding dynamic strings:

```php
$string = '\u00e1';
var_dump(json_decode('"' . $string . '"')); // string(2) "á"
```
