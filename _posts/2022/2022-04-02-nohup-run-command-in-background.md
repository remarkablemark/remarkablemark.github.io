---
layout: post
title: Run background command with nohup
date: 2022-04-02 20:03:44
excerpt: How to run a command in the background with nohup.
categories: bash nohup
---

This article goes over how to run a command in the background with [nohup](https://wikipedia.org/wiki/Nohup).

## Problem

Imagine you're creating a script that runs `redis-server` then `redis-cli`:

```bash
redis-server
redis-cli
```

`redis-cli` never starts since `redis-server` runs forever.

## Solution

One solution is to run `redis-server` in the background with `&`:

```bash
redis-server &
```

However, to run `redis-server` with no hang up, use `nohup`:

```bash
nohup redis-server &
```

The output of `redis-server` is saved to `nohup.out`:

```sh
cat nohup.out
```

To pass the argument `redis.conf` to `redis-server`:

```bash
nohup redis-server redis.conf &
```

To silence the nohup output in the command-line:

```bash
nohup redis-server redis.conf >/dev/null 2>&1 &
```

Now you can run `redis-server` and `redis-cli` in the same script:

```bash
nohup redis-server redis.conf &
redis-cli
```

But one problem is that `redis-server` never shuts down.

Thus, save the [pid](https://wikipedia.org/wiki/Process_identifier):

```bash
nohup redis-server redis.conf >/dev/null 2>&1 &
echo $! > /tmp/redis-server.pid
```

And kill it before it runs (if applicable):

```bash
kill $(cat /tmp/redis-server.pid)
```

## Script

Working example script:

```bash
# shut down redis-server (if applicable)
REDIS_SERVER_PID_FILE=/tmp/redis-server.pid
(kill $(cat $REDIS_SERVER_PID_FILE) 2>&1) >/dev/null
sleep 0.1

# start redis-server
nohup redis-server redis.conf >/dev/null 2>&1 &
sleep 0.1
echo $! > $REDIS_SERVER_PID_FILE

# start redis-cli
redis-cli
```

## Demo

[Replit](https://replit.com/@remarkablemark/Redis#runner.sh):

<iframe height="600px" width="100%" src="https://replit.com/@remarkablemark/Redis?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
