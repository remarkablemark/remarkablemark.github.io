---
layout: post
title: How to skip Git hooks
date: 2024-07-31 12:00:05
excerpt: Bypass Git hooks with option --no-verify.
categories: git
---

Skip Git hooks with `--no-verify`:

```
--no-verify
```

For example, here's how to skip Git commit hook:

```sh
git commit --no-verify
```

Or to skip Git push hook:

```sh
git push --no-verify
```
