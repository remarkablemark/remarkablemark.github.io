---
layout: post
title: How to manage Claude Code sessions
date: 2026-02-27 17:21:00
excerpt: How to manage Claude Code sessions in the command-line.
categories: claude code cli bash
---

This post goes over how to manage [Claude Code](https://github.com/anthropics/claude-code) sessions in the command-line:

- [List](#list)
- [Resume](#resume)
- [Clear](#clear)
- [Delete](#delete)

## List

Claude Code stores session data in `~/.claude/projects/`:

```sh
ls ~/.claude/projects/
```

Each session is a [JSON Lines](https://jsonlines.org/) file:

```sh
find ~/.claude/projects -type f -name '*.jsonl'
```

Print an example output:

```sh
cat $(find ~/.claude/projects -type f -name '*.jsonl' | head -n 1)
```

## Resume

Resume a session:

```sh
claude --resume
```

## Clear

You can clear the current conversation context inside a session:

```
/clear
```

But the session file does not get deleted.

## Delete

Delete all project sessions:

```sh
rm -rf ~/.claude/projects/
```

Remove all sessions from a specific project:

```sh
rm -rf ~/.claude/projects/<PROJECT>/*.jsonl
```

> Replace `<PROJECT>` with your project path.
