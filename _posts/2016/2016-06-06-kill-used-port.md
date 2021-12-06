---
layout: post
title: 'How to fix error "Address already in use"'
date: 2016-06-06 21:15:00
updated: 2021-12-06 15:44:27
excerpt: To fix the error "Address already in use" (EADDRINUSE), kill the process associated with the port.
categories: bash
---

This post goes over how to fix the error `Address already in use` (EADDRINUSE).

## Problem

Did you encounter the error when starting a server?

```
> Error: Address already in use
> Error: listen EADDRINUSE
```

This happens because the port is already bound to a server.

There are 2 things you can do:

1. Start your server on a different port, or
2. Free the port by killing the process associated with it.

> **Warning**: If you choose the 2nd option, make sure you're not killing anything important.

## Solution

### Get the pid

Use [`lsof`](https://wikipedia.org/wiki/Lsof) to get the process id or pid associated with the port:

```sh
lsof -ti :$PORT
```

> Replace `$PORT` with the port number.

### Kill the pid

To [kill](<https://wikipedia.org/wiki/Kill_(command)>) the process associated with the port:

```sh
kill $(lsof -ti :$PORT)
```

> Replace `$PORT` with the port number.

There may be a scenario where you'll need to pass the `SIGKILL` [signal](https://wikipedia.org/wiki/Signal_%28computing%29) to stop and kill the process immediately:

```sh
kill -9 $(lsof -ti :$PORT)
```

> Replace `$PORT` with the port number.

Use `sudo` if you don't have permissions:

```sh
sudo kill -9 $(lsof -ti :$PORT)
```

> Replace `$PORT` with the port number.

Unix users can accomplish the same thing with [`fuser`](<https://wikipedia.org/wiki/Fuser_(Unix)>):

```sh
fuser -k $PORT/tcp
```

> Replace `$PORT` with the port number.
