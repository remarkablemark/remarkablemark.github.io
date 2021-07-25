---
layout: post
title: SVG to PNG with ImageMagick
date: 2018-04-13 19:07:17
excerpt: How to convert SVG to PNG with ImageMagick on Mac.
categories: convert svg png imagemagick
---

Install [ImageMagick](https://www.imagemagick.org) with RSVG lib:

```sh
brew remove imagemagick && brew install imagemagick --with-librsvg
```

Convert SVG to PNG:

```sh
convert infile.svg outfile.png
```

With additional options:

```sh
convert -background none -size 200x200 infile.svg outfile.png
```
