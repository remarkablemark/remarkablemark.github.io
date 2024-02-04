---
layout: post
title: How to debug Node.js with Chrome
date: 2021-08-24 20:52:20
excerpt: How to debug and launch Node.js inspector with Chrome Dev Tools.
categories: nodejs debug chrome
---

This post goes over how to [debug](https://nodejs.org/api/debugger.html) [Node.js](https://nodejs.org/) with [Chrome](https://www.google.com/chrome/).

## inspect

Launch the internal debugger of Node.js:

```sh
node inspect <file>
```

## \--inspect

Enable Node.js inspector by running your `node` script with the `--inspect` option:

```sh
node --inspect <file>
```

To launch the V8 inspector for use with Chrome Dev Tools:

1. Open Chrome browser
2. Go to `chrome://inspect`
3. Click `inspect` under `Remote Target`

If you add `debugger` to your code and rerun your script with inspector, it will stop at the breakpoint.

## \--inspect-brk

Similar to [`--inspect`](#--inspect) except it breaks before the user code starts:

```sh
node --inspect-brk <file>
```
