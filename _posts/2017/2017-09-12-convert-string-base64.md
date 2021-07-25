---
layout: post
title: Convert string to Base64
date: 2017-09-12 20:11:36
updated: 2021-04-21 20:33:57
excerpt: How to convert a string to Base64 from the command-line, Node.js, or the browser.
categories: base64 bash cli nodejs javascript browser
---

Convert a string to [Base64](https://wikipedia.org/wiki/Base64) using:

- [CLI](#cli)
- [Node.js](#nodejs)
- [Browser](#browser)

## CLI

Use `base64` to Base64 encode your string on the command-line:

```sh
base64 <<< 'your string'
```

Output:

```
eW91ciBzdHJpbmcK
```

However, this includes the newline at the end. To encode without the newline, use `printf`:

```sh
printf 'your string' | base64
```

Output:

```
eW91ciBzdHJpbmc=
```

For those on macOS, use `pbcopy` to copy the output to your clipboard:

```sh
printf 'your string' | base64 | pbcopy
```

If you don't have `base64` installed, use `openssl`:

```sh
printf 'your string' | openssl base64
```

## Node.js

Use [`Buffer`](https://nodejs.org/api/buffer.html) to convert your string to Base64 in Node.js:

```sh
node
> Buffer.from('your string').toString('base64')
'eW91ciBzdHJpbmc='
```

Or do this in one-line:

```sh
node -p 'Buffer.from("your string").toString("base64")'
```

## Browser

Use [`btoa`](https://developer.mozilla.org/docs/Glossary/Base64) to encode the string in your browser's JavaScript console:

```js
window.btoa('your string');
```
