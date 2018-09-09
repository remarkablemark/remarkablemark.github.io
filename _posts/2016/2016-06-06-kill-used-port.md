---
layout: post
title: Free a port that's in use
date: 2016-06-06 21:15:00 -4000
excerpt: Learn how to free an address that is already in use by killing the process associated with the port.
categories: bash process kill port address
---

The following error can be encountered when running multiple servers:
```
> Error: Address already in use
> Error: listen EADDRINUSE
```

This is because the port has already been bound to a running server and now another server is trying to listen on that port.

There are 2 things that can be done:
1. Start your server on a different port.
2. Or free the port by killing the process associated with it.

**_Warning_**: If you choose the 2nd option, make sure you're not killing anything important.

### Getting the pid

Use [`lsof`](https://wikipedia.org/wiki/Lsof) to get the process id (pid) associated with the port:
```sh
$ lsof -ti :<PORT> # replace <PORT> with the port number
```

### Killing the pid

To [kill](http://manpages.ubuntu.com/manpages/precise/man1/kill.1.html) the process associated with the port:
```sh
$ kill $(lsof -ti :<PORT>) # replace <PORT> with the port number
```

There may be a scenario where you'll need to pass the `SIGKILL` [signal](https://wikipedia.org/wiki/Signal_%28computing%29) to stop and kill the process immediately:
```sh
$ kill -9 $(lsof -ti :<PORT>)
```

Use `sudo` if you don't have permissions:
```sh
$ sudo kill -9 $(lsof -ti :<PORT>)
```

And Unix users can accomplish the same thing with [`fuser`](https://wikipedia.org/wiki/Fuser_(Unix)):
```sh
$ fuser -k <PORT>/tcp # replace <PORT> with the port number
```
