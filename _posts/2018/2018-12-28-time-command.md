---
layout: post
title: Time command
date: 2018-12-28 19:54:32 -4000
excerpt: Measuring the execution time of command(s) with `time`.
categories: time command bash
---

To measure the execution time of a command:

```sh
$ time sleep 0.5
sleep 0.5  0.00s user 0.00s system 0% cpu 0.507 total
```

To measure the execution time of multiple commands:

```sh
$ time (sleep 0.5 && sleep 0.5)
( sleep 0.5 && sleep 0.5; )  0.00s user 0.00s system 0% cpu 1.013 total
```

To measure the execution time of a script:

```sh
# echo 'sleep 61' > file.sh && chmod +x file.sh
$ time ./script.sh
./script.sh  0.00s user 0.00s system 0% cpu 1:01.00 total
```
