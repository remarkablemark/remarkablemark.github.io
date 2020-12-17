---
layout: post
title: Capture webcam video on webpage
date: 2020-12-17 16:05:23
excerpt: How to capture webcam video on webpage using HTML5 and JavaScript.
categories: web video html javascript
---

Add [`<video>`](https://developer.mozilla.org/docs/Web/HTML/Element/video) element with the [`autoplay`](https://developer.mozilla.org/docs/Web/HTML/Element/video#attr-autoplay) attribute enabled:

```html
<!-- index.html -->
<video autoplay></video>
```

Stream the video media using [`MediaDevices.getUserMedia()`](https://developer.mozilla.org/docs/Web/API/MediaDevices/getUserMedia):

```js
// script.js
var constraints = { video: true };
var video = document.querySelector('video');
navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
  video.srcObject = stream;
});
```

Full example (see [demo](https://webcam-video.remarkablemark.repl.co/) and [code](https://repl.it/@remarkablemark/webcam-video)), which is inspired by the article ["Capture Audio and Video in HTML5"](https://www.html5rocks.com/en/tutorials/getusermedia/intro/):

```html
<!-- index.html -->
<video autoplay></video>
<script>
  var constraints = { video: true };
  var video = document.querySelector('video');
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    video.srcObject = stream;
  });
</script>
```
