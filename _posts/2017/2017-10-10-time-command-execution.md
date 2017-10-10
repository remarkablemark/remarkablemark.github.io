---
layout: post
title: How to time a command or script
date: 2017-10-10 19:38:56 -4000
excerpt: How to time a command or script execution in seconds.
categories: time command execution cli
---

`time` is a useful utility for measuring the time elapsed (in seconds) after a command is run.

```sh
$ time (YOUR_COMMAND_OR_SCRIPT)
```

For example:

```sh
$ time (sleep 1)
( sleep 1; )  0.00s user 0.00s system 0% cpu 1.005 total
```

The output stats are as follows:
1. the total time elapsed by the command,
2. the time consumed by system overhead,
3. the time until the utility is executed to stderr (standard error stream).

If there's a lot of text in the stdout (standard output) due to the script or command, you can hide it like so:

```sh
$ time (yes hi | head -n 10) 2>&1 1>/dev/null
( yes hi | head -n 10; ) 2>&1 > /dev/null  0.00s user 0.00s system 130% cpu 0.005 total
```
