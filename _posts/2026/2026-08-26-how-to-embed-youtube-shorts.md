---
layout: post
title: How to embed YouTube Shorts
date: 2026-08-26 13:46:10
excerpt: This post goes over how to embed YouTube Shorts using an iframe.
categories: youtube shorts embed iframe
---

This post goes over to how to embed a YouTube Short using an [iframe](https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/iframe).

## Video ID

Copy the video ID from the URL. For example, the video ID is `abc123` for the link below:

```
https://youtube.com/shorts/abc123
```

Also, make sure to copy the ID between the last `/` and `?`:

```
https://youtube.com/shorts/abc123?si=def456
```

## Embed

Now replace `<VIDEO_ID>` with the video ID:

```html
<iframe
  width="360"
  height="640"
  src="https://www.youtube.com/embed/<VIDEO_ID>"
  title="YouTube Short"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>
```

For a bigger 16:9 player, you can replace the `width` and `height` with 405×720 or 450×800. For example:

```diff
 <iframe
-  width="360"
-  height="640"
+  width="450"
+  height="800"
   src="https://www.youtube.com/embed/<VIDEO_ID>"
   title="YouTube Short"
   frameborder="0"
   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
   referrerpolicy="strict-origin-when-cross-origin"
   allowfullscreen
 ></iframe>
```

If you want to center the video player horizontally, then add the attribute `style="display: block; margin: 0 auto;"`:

```diff
 <iframe
   width="360"
   height="640"
+  style="display: block; margin: 0 auto;"
   src="https://www.youtube.com/embed/<VIDEO_ID>"
   title="YouTube Short"
   frameborder="0"
   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
   referrerpolicy="strict-origin-when-cross-origin"
   allowfullscreen
 ></iframe>
```

## Demo

Here's an example of an embedded YouTube Short:

```html
<iframe
  width="405"
  height="720"
  style="display: block; margin: 0 auto;"
  src="https://www.youtube.com/embed/chYGYjH2E2c"
  title="YouTube Short"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>
```

<iframe width="405" height="720" style="display: block; margin: 0 auto;" src="https://www.youtube.com/embed/chYGYjH2E2c" title="YouTube Short" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
