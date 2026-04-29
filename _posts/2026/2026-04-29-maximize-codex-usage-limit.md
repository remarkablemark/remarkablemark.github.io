---
layout: post
title: How to maximize Codex usage
date: 2026-04-29 13:11:14
excerpt: How to maximize your OpenAI Codex usage without going over the 5 hour window.
categories: openai codex ai tui
---

This post goes over how to maximize your [OpenAI Codex usage](https://chatgpt.com/codex/settings/usage) without going over the 5 hour window.

## Problem

If you're constantly hitting your 5 hour usage limit on Codex:

> ⚠ Heads up, you have less than 25% of your 5h limit left. Run /status for a breakdown.

> ■ You've hit your usage limit. To get more access now, send a request to your admin or try again at Apr 20th, 2026 4:20 AM.

Then try disabling fast mode and/or changing your model.

## Fast Mode

Disable fast mode temporarily in your current session:

```
/fast off
```

Or disable it permanently in `~/.codex/config.toml`:

```toml
[features]
fast_mode = false
```

If you have `service_tier = "flex"` in `~/.codex/config.toml`, then delete it or replace it with another value:

```toml
service_tier = "flex"
```

## Model

If you're working on simpler coding tasks (e.g., writing tests), choose a smaller, faster, and more cost-efficient model like `gpt-*-mini`:

```
/model
```

Now you should be able to use Codex more and for a longer period.
