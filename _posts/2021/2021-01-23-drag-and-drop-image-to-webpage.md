---
layout: post
title: Drag and drop image to webpage
date: 2021-01-23 18:35:49
excerpt: How to drag and drop an image to a webpage.
categories: html javascript image youtube livestream
---

I went over how to drag and drop an image to a webpage in my [2021-01-23 livestream](https://youtu.be/UsaXP2f0zYQ?list=PLVgOtoUBG2mdLpj6qT5DXfg5_pGPTDrJZ):

<iframe width="100%" height="720" src="https://www.youtube.com/embed/UsaXP2f0zYQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Overview

Create a dropzone element (I used a [`<main>`](https://developer.mozilla.org/docs/Web/HTML/Element/main) element but you can create a different element):

```html
<main></main>
<script>
  const dropzone = document.querySelector('main');
</script>
```

Give the dropzone a dashed [border style](https://developer.mozilla.org/docs/Web/CSS/border):

```html
<style>
  main {
    border: 1px border lightgray;
    width: 100px;
    height: 100px;
  }
</style>
```

Highlight the dropzone when the [`dragenter`](https://developer.mozilla.org/docs/Web/API/Document/dragenter_event) event is fired (image is dragged over the dropzone):

```html
<style>
  .active {
    border: 1px dashed black;
  }
</style>

<script>
  // ...
  dropzone.addEventListener('dragenter', event => {
    event.preventDefault();
    dropzone.classList.add('active');
  });
</script>
```

> [`event.preventDefault()`](https://developer.mozilla.org/docs/Web/API/Event/preventDefault) is necessary or else the image will be opened from your local file explorer.

Remove the dropzone highlight when the [`dragleave`](https://developer.mozilla.org/docs/Web/API/Document/dragleave_event) event is fired (image is no longer dragged over the dropzone):

```html
<script>
  // ...
  dropzone.addEventListener('dragleave', event => {
    event.preventDefault();
    dropzone.classList.remove('active');
  });
</script>
```

It's necessary to handle the [`dragover`](https://developer.mozilla.org/docs/Web/API/Document/dragover_event) event before `drop` happens:

```html
<script>
  // ...
  dropzone.addEventListener('dragover', event => {
    event.preventDefault();
  });
</script>
```

Now handle the [`drop`](https://developer.mozilla.org/docs/Web/API/Document/drop_event) event (when the image is released inside the dropzone):

```html
<script>
  // ...
  dropzone.addEventListener('drop', event => {
    event.preventDefault();
    dropzone.classList.remove('active');

    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener('loadend', () => {
      const img = document.createElement('img');
      img.src = reader.result;
      dropzone.append(img);
    });
  });
</script>
```

Here's a breakdown of what's happening:

1. `event.preventDefault()` is called to ensure the file is not opened in the local file explorer.
2. The dropzone highlight is removed.
3. The image is retrieved from [`event.dataTransfer.files`](https://developer.mozilla.org/docs/Web/API/DataTransfer/files).
4. The image is read as data URL using [`FileReader`](https://developer.mozilla.org/docs/Web/API/FileReader).
5. The image is [appended](https://developer.mozilla.org/docs/Web/API/ParentNode/append) to the dropzone when it's loaded.

### Note

The `dragenter` and `dragleave` events aren't required for drag and drop to work. They are simply there to improve user experience.

## Demo

[Replit](https://replit.com/@remarkablemark/HTML-drag-and-drop-image):

<iframe height="600px" width="100%" src="https://replit.com/@remarkablemark/HTML-drag-and-drop-image?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
