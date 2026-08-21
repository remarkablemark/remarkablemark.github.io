---
layout: post
title: File Converter with FFmpeg WebAssembly
date: 2026-08-20 22:12:02
excerpt: How I built a browser-based file converter that converts media files client-side using FFmpeg WebAssembly.
categories: ffmpeg wasm react javascript site browser
---

How I built a [File Converter](https://remarkablemark.org/file-converter/) that converts media files in the browser. It runs [FFmpeg](https://ffmpeg.org/) compiled to WebAssembly via [@ffmpeg/ffmpeg](https://github.com/ffmpegwasm/ffmpeg.wasm).

## Motivation

Traditional file converters send files to a server. That raises privacy concerns, requires bandwidth for large files, and costs money to host — which is why many existing services are ad-supported. With FFmpeg.wasm, all processing happens client-side in the browser.

## File Types

The file converter supports the file types:

| Category | Inputs                              | Outputs                        |
| -------- | ----------------------------------- | ------------------------------ |
| Image    | PNG, JPEG, WebP, GIF, BMP, ICO, SVG | PNG, JPEG, WebP, GIF, BMP, ICO |
| Video    | MP4, WebM, MOV, AVI, MKV, GIF       | MP4, WebM, MOV, AVI, MKV, GIF  |
| Audio    | MP3, WAV, OGG, AAC, FLAC, M4A       | MP3, WAV, OGG, AAC, FLAC, M4A  |

SVG inputs are rasterized to the chosen bitmap format.

## How It Works

1. **Upload a file** — drag-and-drop or click to upload. It auto-detects the category (image, video, audio) from the MIME type and file extension.
2. **Select a format** — only compatible output formats are shown for the detected category.
3. **Controls** — an advanced options panel appears based on the category:
   - **Image**: dimensions, fit mode (contain, cover, stretch, force), quality, transparency preservation, background color.
   - **Video**: dimensions, fit mode, frame rate, CRF quality, audio preservation with bitrate, GIF loop toggle.
   - **Audio**: bitrate, sample rate, channels (mono/stereo).
4. **Convert** — FFmpeg.wasm processes the file and a progress bar tracks the transcode.
5. **Download** — the converted file is ready to download with an editable filename.

## Technical Decisions

### Lazy-Loading FFmpeg

FFmpeg core and WASM are loaded from the [jsDelivr](https://cdn.jsdelivr.net) CDN only after the user clicks "Convert". This keeps the initial page load fast since the ~30 MB WASM payload loads on demand, not on page render. The assets are pinned at the specific URLs:

- [https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.js](https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.js)
- [https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.wasm](https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.wasm)

Local serving via a Vite plugin was attempted but reverted since Vite intercepts the dynamic `import()` calls inside the FFmpeg worker, which breaks loading.

### Conversion Flow

FFmpeg.wasm runs in a Web Worker with its own virtual file system. The conversion pipeline is:

1. Write the input file to the virtual FS with `ffmpeg.writeFile()`
2. Execute the FFmpeg command with `ffmpeg.exec()` — args are built from the selected format and options
3. Read the output file from the virtual FS with `ffmpeg.readFile()`
4. Wrap the result in a `Blob` and generate a download link with `URL.createObjectURL()`

### MP4 to WebM

The default VP9 encoder hangs in the single-threaded ffmpeg.wasm build. Switching to VP8 with `-deadline good -cpu-used 5` fixes it.

### Large File Limitation

Since FFmpeg.wasm runs entirely in memory, very large files can fail or freeze the tab. The app warns when a file exceeds 100 MB but conversions are not blocked.

## Try It

You can try the [File Converter](https://remarkablemark.org/file-converter/) or check out the [source code](https://github.com/remarkablemark/file-converter).
