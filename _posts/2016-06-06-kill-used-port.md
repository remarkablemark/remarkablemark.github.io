---
layout: post
title: Freeing a port already in use
date: 2016-06-06 21:15:00 -4000
excerpt: Learn how to free a port already in use by killing the process associated with the port.
categories: bash port kill server
---

Sometimes when you're running multiple web servers on your local machine, you may encounter the following error:

```
> Error: Address already in use
> Error: listen EADDRINUSE
```

Huh? What does this error even mean? Well, it means that when you tried to start your web server on a given port, there's already an _existing **process** bound to that **port**_.

Thus, you have 2 options:

1. you can either have your server listen on a different port or
2. free the current port by killing the process associated with it.

Of course, if you do decide to kill the process, _make sure that it's not running something important_. Only you can be the judge on that.

Run the following command to free a port:

```sh
# make sure to replace `$PORT` with the port number

# for Mac
sudo lsof -t -i tcp:$PORT | xargs kill -9

# for Linux
fuser -k $PORT/tcp
```

You can see my example [here](https://gist.github.com/remarkablemark/2c2e0aed96fee28b8d8db8cc70654aa2):

<script src="https://gist.github.com/remarkablemark/2c2e0aed96fee28b8d8db8cc70654aa2.js"></script>
