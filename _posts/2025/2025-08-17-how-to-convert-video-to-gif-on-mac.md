---
layout: post
title: How to convert video to GIF on Mac
date: 2025-08-17 12:51:51
excerpt: How to convert video to GIF on macOS.
categories: video gif mac
---

This post goes over how to convert video to GIF on macOS:

- [ffmpeg](#ffmpeg)
- [imagemagick](#imagemagick)

## ffmpeg

Install [ffmpeg](https://ffmpeg.org/) with [Homebrew](https://brew.sh/):

```sh
brew install ffmpeg
```

Convert `input.mov` to `output.gif`:

```sh
ffmpeg -i input.mov output.gif
```

## imagemagick

Install [imagemagick](https://imagemagick.org/) with [Homebrew](https://brew.sh/):

```sh
brew install imagemagick
```

Convert `input.mov` to `output.gif`:

```sh
magick input.mov output.gif
```

## -loop

Control looping with `-loop`:

| Value | Effect        |
| ----- | ------------- |
| -1    | No loop       |
| 0     | Infinite loop |
| 1     | Loop twice    |

To loop 3 times:

```sh
ffmpeg -i input.mov -loop 2 output.gif
```

```sh
magick -loop 2 input.mov output.gif
```
