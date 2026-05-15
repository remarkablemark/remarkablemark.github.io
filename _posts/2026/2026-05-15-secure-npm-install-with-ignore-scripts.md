---
layout: post
title: Secure npm installs with --ignore-scripts
date: 2026-05-15 15:15:09
excerpt: How to make npm installs safer with --ignore-scripts.
categories: npm scripts security
---

This post explains how to make `npm install` safer with `--ignore-scripts`:

- [Problem](#problem)
- [Disable Lifecycle Scripts](#disable-lifecycle-scripts)
- [Global Disable](#global-disable)

## Problem

When you run `npm install`, package lifecycle scripts can execute arbitrary shell commands on your machine.

For example, a `package.json` may contain:

```json
{
  "scripts": {
    "postinstall": "echo do something malicious..."
  }
}
```

This is how attacks like the [Shai-Hulud worm](https://securitylabs.datadoghq.com/articles/shai-hulud-2.0-npm-worm/) work.

A malicious or compromised dependency can:

- steal secrets or tokens
- install malware or backdoors
- access or modify files on your machine
- tamper with build artifacts

## Disable Lifecycle Scripts

Ignore lifecycle scripts during install:

```sh
npm install --ignore-scripts
```

This downloads dependencies normally, but prevents lifecycle hooks from executing:

- `preinstall`
- `install`
- `postinstall`
- `prepare`

This is useful when:

- auditing unfamiliar repositories
- testing untrusted dependencies
- reducing supply-chain attack surface
- running installs in CI

> One caveat of disabling scripts is that it can break packages that rely on native builds or binary downloads (e.g., `bcrypt`, `esbuild`, `sqlite3`, etc.).

## Global Disable

To disable lifecycle scripts globally:

```sh
npm config set ignore-scripts true
```

Verify the current setting:

```sh
npm config get ignore-scripts
```
