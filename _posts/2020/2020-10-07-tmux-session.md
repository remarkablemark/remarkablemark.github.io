---
layout: post
title: tmux session
date: 2020-10-07 19:21:08
excerpt: How to start, kill, rename, attach, detach, and list tmux sessions using the command-line.
categories: tmux command-line cli
---

This is an overview of basic interactions of [tmux](https://github.com/tmux/tmux/wiki) sessions using the [command-line](https://en.wikipedia.org/wiki/Command-line_interface).

Start an unnamed session:

```sh
$ tmux
```

## kill-session

Kill current session:

```sh
$ tmux kill-session
```

## new-session

Start a session named `foo`:

```sh
$ tmux new -s foo
```

## rename-session

Rename current session to `bar`:

```sh
$ tmux rename bar
```

## detach-session

Detech current session:

```sh
$ tmux detach
```

## list-sessions

List all sessions:

```sh
$ tmux ls
```

> The first column is the session name. Unnamed sessions follow [zero-based numbering](https://en.wikipedia.org/wiki/Zero-based_numbering).

## attach-session

Attach session `bar`:

```sh
$ tmux attach -t bar
```

See [tmux cheat sheet](https://tmuxcheatsheet.com/) for more tips and tricks.
