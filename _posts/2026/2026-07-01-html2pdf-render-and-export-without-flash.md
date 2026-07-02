---
layout: post
title: html2pdf.js render and export without flash
date: 2026-07-01 20:49:26
excerpt: How to render and export a PDF with html2pdf.js without a flash of content.
categories: html2pdf javascript
---

This post shows how to render HTML for [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) and export it as a PDF without causing a visible flash of content.

## Problem

Sometimes you need to clone and render the content before passing it to `html2pdf.js`, for example when preparing a print-friendly version.

```html
<div id="content">My content...</div>
```

```js
const original = document.getElementById('content');
const clone = original.cloneNode(true);

clone.style.position = 'fixed';
clone.style.left = '-9999px';
clone.style.top = '0';
clone.style.width = `${original.offsetWidth}px`;

document.body.appendChild(clone);

html2pdf()
  .set({
    filename: 'document.pdf',
  })
  .from(clone)
  .save()
  .then(() => {
    clone.remove();
  });
```

However, rendering the clone offscreen can produce blank PDFs because `html2canvas` won't capture it correctly. Rendering it in the viewport avoids that problem, but causes a visible flash of content.

## Solution

The trick is to set `z-index: -1`:

```diff
 const original = document.getElementById('content');
 const clone = original.cloneNode(true);

 clone.style.position = 'fixed';
-clone.style.left = '-9999px';
+clone.style.left = '0';
 clone.style.top = '0';
+clone.style.zIndex = '-1';
 clone.style.width = `${original.offsetWidth}px`;

 document.body.appendChild(clone);

 html2pdf()
   .set({
     filename: 'document.pdf',
   })
   .from(clone)
   .save()
   .then(() => {
     clone.remove();
   });
```

This works because the clone remains inside the viewport, allowing `html2canvas` to capture it correctly. Setting `z-index: -1` places it behind the rest of the page, so users never see it.

## Tip

To exclude an element from the exported PDF, add the `data-pdf-exclude="true"` attribute:

```html
<div data-pdf-exclude="true">Don't export me</div>
```
