---
layout: post
title: Convert a string to base64
date: 2017-09-12 20:11:36 -4000
excerpt: How to convert a string to base64 from the command-line or the browser.
categories: base64 bash cli
---

To base64 encode your string on the command-line:

```sh
$ base64 <<< 'your string'
```

However, this includes the newline at the end. To encode without the newline, use `printf`:

```sh
$ printf 'your string' | base64
```

For those on Mac, use `pbcopy` to copy the output to your clipboard:

```sh
$ printf 'your string' | base64 | pbcopy
```

If you don't have `base64` installed, you can try an alternative:

```sh
$ printf 'your string' | openssl base64
```

And you can always encode the string in the browser's JavaScript console:

```js
btoa('your string');
```

Or use [base64decode.org](https://www.base64decode.org).
