---
layout: post
title: Bulk Image Converter
date: 2026-08-21 14:34:37
excerpt: How I built a browser-based bulk image converter that converts multiple images at once — no uploads, no server, fully client-side.
categories: image react javascript canvas browser website
---

How I built a [bulk image converter](https://remarkablemark.org/bulk-image-converter/) that converts multiple images in your browser.

## Motivation

Most bulk image converters online require uploading files to a server. That raises privacy concerns, especially for sensitive images. Bandwidth costs add up for large batches and free services often have ads or limit file counts.

**Bulk Image Converter** sidesteps all of that by processing images entirely in the browser using the HTML Canvas API.

## Features

- **Drag-and-drop or click to upload** multiple images at once.
- **Batch conversion** to WebP, JPEG, PNG, or AVIF.
- **Quality control** with a slider for lossy formats (WebP, JPEG, AVIF).
- **ZIP download** of all converted images in one click.
- **Per-file status** tracking (pending, converting, done, error).

## How It Works

1. **Upload images** — drag-and-drop or click to browse.
2. **Select a format** — select from WebP (default), JPEG, PNG, or AVIF.
3. **Adjust quality** — a slider appears for lossy formats (PNG is always lossless).
4. **Convert & download** — all images are converted in parallel and archived into a single ZIP file.

## Technical Decisions

### Canvas API

Each image is loaded into an `HTMLImageElement`, drawn to a `HTMLCanvasElement`, and exported via `canvas.toBlob()` with the target MIME type and quality.

### JSZip

The converted blobs are bundled into a ZIP file using [JSZip](https://stuk.github.io/jszip/). The ZIP is generated in memory and downloaded via a temporary `<a>` element with `URL.createObjectURL()`.

## Try It

You can try the [Bulk Image Converter](https://remarkablemark.org/bulk-image-converter/) or check out the [source code](https://github.com/remarkablemark/bulk-image-converter).
