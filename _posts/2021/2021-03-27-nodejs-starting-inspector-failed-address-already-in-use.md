---
layout: post
title: 'Starting inspector failed: address already in use'
date: 2021-03-27 22:35:48
excerpt: "How to resolve the Node.js error 'Starting inspector failed: address already in use'."
categories: nodejs debug
---

> **TL;DR**: To terminate all `node` processes:
>
> ```sh
> $ killall -9 node
> ```
>
> However, make sure to it's **safe** to do so.

## Problem

When debugging a Node.js app:

```sh
$ node --inspect app.js
```

You may get the error:

```
Starting inspector on 127.0.0.1:9229 failed: address already in use
```

This means the address is already in use by another Node.js app and you may have forgotten to exit it.

## Solution

Grep for all running processes with `node`:

```sh
$ ps ax | grep node
```

You'll see something like the following:

```
86789 s007  S      0:03.12 node --inspect app.js
12345 s021  S+     0:00.00 grep --color=auto --exclude-dir=.bzr --exclude-dir=CVS --exclude-dir=.git --exclude-dir=.hg --exclude-dir=.svn --exclude-dir=.idea --exclude-dir=.tox node
```

Verify it's safe to kill the process before terminating it:

```sh
$ kill -9 86789
```

Remember to replace `<pid>` with your process id:

```sh
$ kill -9 <pid>
```

To kill all `node` processes:

```sh
$ killall -9 node
```

This solution is inspired by the [Stackoverflow answer](https://stackoverflow.com/questions/47609400/how-to-stop-the-node-js-inspector-chrome-debugger-on-sigint#answer-49797588).
