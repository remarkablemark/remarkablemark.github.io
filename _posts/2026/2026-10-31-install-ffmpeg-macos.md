---
layout: post
title: How to install FFmpeg on macOS
date: 2026-10-31 12:51:09
excerpt: How to install FFmpeg on macOS.
categories: ffmpeg binary install macos bash
---

This post explains how to install [FFmpeg](https://ffmpeg.org/) on macOS.

## Homebrew

Install FFmpeg with [Homebrew](https://brew.sh/):

```sh
brew install ffmpeg
```

## Binary

[Download](https://evermeet.cx/ffmpeg/) the latest static FFmpeg binary for macOS Intel:

```sh
curl -sS https://evermeet.cx/ffmpeg/info | jq -r '.[0].download.zip.url' | xargs -I{} curl -L '{}' -o ffmpeg.zip
```

> This is an Intel binary. Apple silicon Macs can run it with Rosetta 2, but for native performance, use an Apple-silicon-compatible build.

Extract the binary:

```sh
unzip ffmpeg.zip
```

Check the binary's permissions:

```sh
ls -l ffmpeg
```

If it isn't executable (doesn't have the `x`), then change the mode:

```sh
chmod +x ffmpeg
```

Move the binary to `/usr/local/bin/` or `/usr/bin/`:

```sh
sudo mv ffmpeg /usr/local/bin/
```

Verify that it's working:

```sh
ffmpeg -version
```
