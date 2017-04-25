---
layout: post
title: Freeing a port that's already in use
date: 2016-06-06 21:15:00 -4000
excerpt: Learn how to free a port that's already in use by killing the process associated with the port.
categories: bash process kill port
---

When running multiple servers, you may encounter the error:

```
> Error: Address already in use
> Error: listen EADDRINUSE
```

The error comes from trying to start a server when there's already a running process bound to that port.

You have 2 options:

1. You can start your server on a different port.
2. Or you can free the current port by killing the process associated with it.

Of course, if you choose the second option, **make sure it's not running anything important**.

### Example

To kill processes associated with port `8888`:

```sh
# Mac
$ sudo lsof -t -i tcp:8888 | xargs kill -9

# Linux
$ fuser -k 8888/tcp
```
